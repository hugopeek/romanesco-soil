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

$string = $input;
$tpl = $modx->getOption('tpl', $scriptProperties, 'includedPatternsRow');

// Find chunk names by their leading $ character
$regex = '/(?<!\w)\$\w+/';

if (preg_match_all($regex, $string, $matches)) {
    // Remove $ from all matches
    foreach ($matches as $match) {
        $match = str_replace('$', '', $match);
    }

    // Remove duplicates
    $result = array_unique($match);

    // Process matches individually
    foreach ($result as $key => $value) {
        $query = $modx->newQuery('modChunk', array(
            'name' => $value
        ));

        // Also fetch category, for internal pattern library link
        $query->select('category');
        $category = $modx->getValue($query->prepare());

        $output[] = $modx->getChunk($tpl, array(
            'name' => $value,
            'category' => $category
        ));
    }
}

return implode($output);