id: 86
name: TwitterX
description: 'This package loads Twitter feeds using the new (and very annoying) Twitter 1.1 API.'
category: TwitterX
properties: 'a:0:{}'

-----

/**
 * TwitterX
 *
 * This package loads Twitter feeds using the new (and very annoying) Twitter
 * 1.1 API. You will need to create a Twitter app and get the keys and tokens
 * by creating a new app here: https://dev.twitter.com/apps/new
 *
 * This uses twitteroauth: https://github.com/abraham/twitteroauth
 *
 * TwitterX is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or (at your option) any
 * later version.
 *
 * TwitterX is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.

 * @author Stewart Orr @ Qodo Ltd <stewart@qodo.co.uk>
 * @version 1.3.7
 * @copyright Copyright Qodo Ltd 2014
 * With thanks to @Sepiariver http://www.sepiariver.ca/
 * With thanks to @hvoort
 * With thanks to @OostDesign
 * With thanks to Dameon87 https://github.com/Dameon87
 */

// Twitter API keys and secrets
$twitter_consumer_key          = isset($twitter_consumer_key) ? $twitter_consumer_key : FALSE ;
$twitter_consumer_secret       = isset($twitter_consumer_secret) ? $twitter_consumer_secret : FALSE ;
$twitter_access_token          = isset($twitter_access_token) ? $twitter_access_token : FALSE ;
$twitter_access_token_secret   = isset($twitter_access_token_secret) ? $twitter_access_token_secret : FALSE ;

// Other options
$limit = isset($limit) ? $limit : 5 ;
$chunk = isset($chunk) ? $chunk : 'TwitterXTpl' ;
$timeline = isset($timeline) ? $timeline : 'user_timeline' ;
$cache = isset($cache) ? $cache : 7200 ;
$screen_name = isset($screen_name ) ? $screen_name : '' ;
$include_rts = isset($include_rts) ? $include_rts : 1 ;
$exclude_replies  = isset($exclude_replies) ? $exclude_replies : 0 ;
$cache_id = isset($cache_id) ? $cache_id : 'TwitterX_' .  $modx->resource->id ;
$toPlaceholder = isset($toPlaceholder) ? $toPlaceholder : '' ;
$toPlaceholderPrefix = isset($toPlaceholderPrefix) ? $toPlaceholderPrefix . "." : '' ; // If you want to prefix the placeholders
$search = isset($search) ? $search : '' ;
$slug = isset($slug) ? $slug : '' ; // Slug is only used when viewing a list

// Here we support an old error where the parameter was incorrect.
if (isset($twitter_consumer_token_secret)) {
    $twitter_access_token_secret = isset($twitter_consumer_token_secret) ? $twitter_consumer_token_secret : FALSE ;
}

// Function to compare tweets based on their creation time
if (!function_exists('compareTweetsByDate')) {
    function compareTweetsByDate($a, $b) {
        $time_a = strtotime($a->created_at);
        $time_b = strtotime($b->created_at);

        if ($time_a == $time_b) {
          return 0;
        }
        return ($time_a > $time_b) ? -1 : 1;
    }
}

// Simple function to for use with array_map for sanitizing purposes.
if (!function_exists('sanitize_array')) {
    function sanitize_array($input) {
        return htmlentities($input, ENT_QUOTES, 'UTF-8', false);
    }
}

// HTML output 
$output = '';

//**************************************************************************

// If they haven't specified the required Twitter keys, we cannot continue...
if (!$twitter_consumer_key || !$twitter_consumer_secret || !$twitter_access_token || !$twitter_access_token_secret) {

    echo "<strong>TwitterX Error:</strong> Could not load TwitterX as required values were not passed.";

} else {

    // Test for required function(s)
    if (!function_exists('curl_init')) {
        
            echo "<strong>TwitterX Error:</strong> cURL functions do not exist, cannot continue.";  
            
    } else {

        // Try loading the data from MODX cache first
        $json = $modx->cacheManager->get($cache_id); // Added ability to set custom cache IDs
        
        if (!$json) { 

            // Load the TwitterOAuth lib required if not exists
            if (!class_exists('TwitterOAuth')) {
                require_once $modx->getOption('core_path').'components/twitterx/twitteroauth/twitteroauth/twitteroauth.php';
            }
            // Create new twitteroauth
            $twitteroauth = new TwitterOAuth($twitter_consumer_key, $twitter_consumer_secret, $twitter_access_token, $twitter_access_token_secret);

            // We want to use JSON format
            $twitteroauth->format = 'json';
            $twitteroauth->decode_json = FALSE;

            // If we are doing a search, we use the search timeline
            if ($search != '') {

                $timeline = 'search/tweets';
                $options = array(
                    'count' => 150, // This is large number because of the way twitter excludes retweets and replies
                    'q' => $search,
                );
                $json = $twitteroauth->get($timeline, $options);
                        
                // Because search returns info on the search, we need to decode, get the results and then encode again
                // This is so we can cache this too. Messy but it works!
                $json = json_decode($json);
                $json = $json->statuses;
                $json = json_encode($json);

            } else {

                // Request statuses with optional parameters
                $options = array(
                    'count' => 150, // This is large number because of the way twitter excludes retweets and replies
                    'include_rts' => $include_rts,
                    'exclude_replies' => $exclude_replies,
                );

                // If we are viewing favourites or regular statuses
                if ($timeline != 'favorites' && $timeline != 'lists/statuses') {
                    $timeline = 'statuses/' . $timeline;
                }

                // Favourites - thanks to @sepiariver
                if ($timeline === 'favorites') { $timeline = $timeline . '/list'; }


                // If we have one or multiple screen names
                if (strpos($screen_name, ',') !== FALSE) {

                    $tweets = array();

                    // Collect screen_names
                    $screen_name_array = preg_split("/,/", $screen_name, -1, PREG_SPLIT_NO_EMPTY);

                    if (count($screen_name_array) >= 1) {
                        // Get timeline for every screen name
                        foreach ($screen_name_array as $sn) {
                            $options['screen_name'] = $sn;
                            $json_part = $twitteroauth->get($timeline, $options);

                            // No error while loading timeline
                            if (!isset($json_part->error)) {
                                $tweets = array_merge($tweets, json_decode($json_part));
                            }
                        }
                    }
                    // Sort mixed tweets of different users
                    usort($tweets, 'compareTweetsByDate');

                    // Limit the combined result
                    $tweets = array_slice($tweets, 0, $limit);

                    // Convert array to json for saving to cache
                    $json = json_encode($tweets);

                } else {
                    // Here we are looking to see if we want a list instead of timeline
                    if ($slug != '') {
                        $options['owner_screen_name'] = $screen_name;
                        $options['slug'] = $slug;
                    } elseif ($screen_name != '') {
                        // If we have a single screen_name, pass this to Twitter API
                        $options['screen_name'] = $screen_name; 
                    }
                    $json = $twitteroauth->get($timeline, $options);
                }

            }

            // No errors? Save to MODX Cache
            if (!isset($json->error)) {
                $modx->cacheManager->set($cache_id, $json, $cache);
            }

        }

        // Decode this now that we have used it above in the cache
        $json = json_decode($json);

        // If there any errors from Twitter, output them...
        if (isset($json->errors)) {

            foreach($json->errors as $err) {
                $output .= "<strong>TwitterX Error:</strong> Could not load tweets as Twitter responded with the error: '" . $err->message . "'.";              
            }

        } else {

            // Any tweets present?
            if (is_array($json) && count($json) > 0) {

                // Counter for number of tweets
                $tweetCount = 0;
                
                // For each result, build output values
                foreach ($json as $j) {
                    
                    // If we already have enough tweets, break
                    if ($tweetCount >= $limit) break;

                    // Get placerholder values
                    // This has been updated to use search values if present
                    $placeholders = array(
                        $toPlaceholderPrefix . 'created_at' => $j->created_at,
                        $toPlaceholderPrefix . 'source' => $j->source,
                        $toPlaceholderPrefix . 'id' => $j->id,
                        $toPlaceholderPrefix . 'id_str' => $j->id_str,
                        $toPlaceholderPrefix . 'text' => $j->text,
                        $toPlaceholderPrefix . 'name' => isset($j->from_user_name) ? $j->from_user_name : $j->user->name,
                        $toPlaceholderPrefix . 'screen_name' => isset($j->from_user) ? $j->from_user : $j->user->screen_name,
                        $toPlaceholderPrefix . 'profile_image_url' => isset($j->profile_image_url_https) ? $j->profile_image_url_https : $j->user->profile_image_url_https,
                        $toPlaceholderPrefix . 'location' => $j->user->location,
                        $toPlaceholderPrefix . 'url' => $j->user->url,
                        $toPlaceholderPrefix . 'description' => $j->user->description,
                    );

                    // If this is a retweet, create placeholders for this too
                    if (isset($j->retweeted_status)) {
                        $placeholders = array_merge($placeholders, array(
                            // Here we change the text to prevent truncation
                            $toPlaceholderPrefix . 'text' => 'RT @' . $j->retweeted_status->user->screen_name . ': ' . $j->retweeted_status->text,
                            $toPlaceholderPrefix . 'retweet_count' => $j->retweeted_status->retweet_count,
                            $toPlaceholderPrefix . 'retweet_created_at' => $j->retweeted_status->created_at,
                            $toPlaceholderPrefix . 'retweet_source' => $j->retweeted_status->source,
                            $toPlaceholderPrefix . 'retweet_id' => $j->retweeted_status->id,
                            $toPlaceholderPrefix . 'retweet_id_str' => $j->retweeted_status->id_str,
                            $toPlaceholderPrefix . 'retweet_text' => $j->retweeted_status->text,
                            $toPlaceholderPrefix . 'retweet_name' => $j->retweeted_status->user->name,
                            $toPlaceholderPrefix . 'retweet_screen_name' => $j->retweeted_status->user->screen_name,
                            $toPlaceholderPrefix . 'retweet_profile_image_url' => $j->retweeted_status->user->profile_image_url_https,
                            $toPlaceholderPrefix . 'retweet_location' => $j->retweeted_status->user->location,
                            $toPlaceholderPrefix . 'retweet_url' => $j->retweeted_status->user->url,
                            $toPlaceholderPrefix . 'retweet_description' => $j->retweeted_status->user->description,
                            )
                        );
                    }

                    // For some added safety, lets sanitize the $placeholders variable first to ensure there isn't much room for potential exploit.
                    $placeholders = array_map('sanitize_array', $placeholders);

                    // Parse chunk passing values
                    $output .= $modx->getChunk($chunk, $placeholders); // Concatenate to output variable
                    
                    // Update number of tweets
                    $tweetCount++;
                }
            }
        }

        // Added option to output to placeholder
        if ($toPlaceholder != '') {
            $modx->setPlaceholder($toPlaceholder, $output);
        } else {
            return $output;
        }
    }
}