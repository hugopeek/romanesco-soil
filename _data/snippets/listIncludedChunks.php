id: 92
name: listIncludedChunks
category: f_hub
properties: 'a:0:{}'

-----

/**
 * listIncludedChunks
 *
 * This snippet is intended to list the chunks that are being used
 * inside another chunk. It needs the raw content of the chunk as input.
 * A regular chunk call won't work, since the referenced chunks have
 * already been parsed there.
 *
 * You can get the raw input by looking directly in the database table
 * of the chunk, using Rowboat for example:
 *
 * [[!Rowboat:toPlaceholder=`rawChunk`?
 *     &table=`modx_site_htmlsnippets`
 *     &tpl=`displayRawElement`
 *     &where=`{"name":"overviewRowBasic"}`
 * ]]
 *
 * Then scan the raw input for included chunks like this:
 *
 * [[!listIncludedChunks? &input=`[[+rawChunk]]`]]
 *
 * If you want to see which chunks have references to a specific chunk
 * (the reverse thing, basically), you can use Rowboat again:
 *
 * [[Rowboat?
 *     &table=`modx_site_htmlsnippets`
 *     &tpl=`listIncludedElementsRow`
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
$tpl = $modx->getOption('tpl', $scriptProperties, 'listIncludedElementsRow');

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
        $output[] = $modx->getChunk($tpl, array(
            'name' => $value
        ));
    }
}

return implode($output);