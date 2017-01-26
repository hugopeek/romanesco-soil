id: 97
name: includedChunks
category: f_hub
properties: 'a:0:{}'

-----

/**
 * includedChunks
 *
 * This snippet is intended to list the chunks that are being used
 * inside another chunk. It needs the raw content of the chunk as input.
 * A regular chunk call won't work, since the referenced chunks have
 * already been parsed there.
 *
 * You can get the raw input by looking directly in the database table
 * of the chunk, using Rowboat for example:
 *
 * [[!Rowboat:toPlaceholder=`raw_chunk`?
 *     &table=`modx_site_htmlsnippets`
 *     &tpl=`displayRawElement`
 *     &where=`{"name":"overviewRowBasic"}`
 * ]]
 *
 * Then scan the raw input for included chunks like this:
 *
 * [[!includedChunks? &input=`[[+raw_chunk]]`]]
 *
 * If you want to see which chunks have references to a specific chunk
 * (the reverse thing, basically), you can use Rowboat again:
 *
 * [[Rowboat?
 *     &table=`modx_site_htmlsnippets`
 *     &tpl=`includedPatternsRow`
 *     &sortBy=`name`
 *     &where=`{ "snippet:LIKE":"%$buttonHrefOverview%" }`
 * ]]
 *
 * This is not entirely accurate though, since a reference to a chunk
 * called something like 'buttonHrefOverviewBasic' will also be listed
 * in the results.
 *
 * @author Hugo Peek
 */

$string = $modx->getOption('input', $scriptProperties, '');
$patternName = $modx->getOption('name', $scriptProperties, '');
$patternType = $modx->getOption('type', $scriptProperties, '');
$tpl = $modx->getOption('tpl', $scriptProperties, 'includedPatternsRow');

// Finding chunks inside snippets only result in a lot of false positives, so let's disable that for now
// @todo: Create a different pattern for finding chunks inside snippets
if (stripos($patternType, 'formula')) {
    return '';
}

// Find chunk names by their leading $ character or '&tpl' string
$regex = '/((?<!\w)\&amp;tpl=&#96;\w+|(?<!\w)\$\w+)/';

// Set idx start value
$idx = 0;

// Define output array
$output = array();

if (preg_match_all($regex, $string, $matches)) {
    // Remove prefix from all matches
    foreach ($matches as $match) {
        $match = str_replace('$', '', $match);
        $match = str_replace('&amp;tpl=&#96;', '', $match);
    }

    //print_r($match);

    // Remove duplicates
    $result = array_unique($match);

    // Process matches individually
    foreach ($result as $name) {
        // Also fetch category, to help ensure the correct resource is being linked
        $query = $modx->newQuery('modChunk', array(
            'name' => $name
        ));
        $query->select('category');
        $category = $modx->getValue($query->prepare());

        // Up idx value by 1, so a unique placeholder can be created
        $idx++;

        // Output to a chunk that contains the link generator
        $output[] = $modx->getChunk($tpl, array(
            'name' => $name,
            'category' => $category,
            'idx' => $idx
        ));
    }
}

// If this pattern is a CB field with input type Chunk, then let's find that chunk
if (stripos($patternType, 'bosonfield')) {
    $cbCorePath = $modx->getOption('contentblocks.core_path', null, $modx->getOption('core_path').'components/contentblocks/');
    $ContentBlocks = $modx->getService('contentblocks','ContentBlocks', $cbCorePath.'model/contentblocks/');

    // First, let's check if this field contains a chunk ID
    $result = $modx->getObject('cbField', array(
        'name' => $patternName,
        'properties:LIKE' => '%"chunk":"%'
    ));

    // Do we have a winner?
    if ($result) {
        $properties = $result->get('properties');
        $array = json_decode($properties, true);

        $chunkID = $array['chunk'];

        $chunk = $modx->getObject('modChunk', array(
            'id' => $chunkID
        ));

        $idx++;

        $output[] = $modx->getChunk($tpl, array(
            'name' => $chunk->get('name'),
            'category' => $chunk->get('category'),
            'assigned' => 1,
            'idx' => $idx
        ));
    }

    // No? Then maybe it's a chunk selector
    if (!$result) {
        $result = $modx->getObject('cbField', array(
            'name' => $patternName,
            'properties:LIKE' => '%"available_chunks":"%'
        ));

        if (is_object($result)) {
            $properties = $result->get('properties');
            $array = json_decode($properties, true);

            $chunks = $array['available_chunks'];
            $result = explode(',', $chunks);

            foreach ($result as $name) {
                // Also fetch category, to help ensure the correct resource is being linked
                $query = $modx->newQuery('modChunk', array(
                    'name' => $name
                ));
                $query->select('category');
                $category = $modx->getValue($query->prepare());

                $idx++;

                $output[] = $modx->getChunk($tpl, array(
                    'name' => $name,
                    'category' => $category,
                    'assigned' => 1,
                    'idx' => $idx
                ));
            }
        }
    }
}

// No idea how it sorts the result, but seems better than the default
sort($output);

return implode($output);