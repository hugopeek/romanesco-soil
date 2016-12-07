id: 98
name: includedSnippets
category: f_hub
properties: 'a:0:{}'

-----

/**
 * includedSnippets
 *
 * This snippet is intended to list the snippets that are being called
 * inside a given chunk. It needs the raw content of the chunk as input.
 *
 * See includedChunks for more detailed instructions.
 *
 * @author Hugo Peek
 */

$string = $input;
$tpl = $modx->getOption('tpl', $scriptProperties, 'includedPatternsRow');

// Create a list with all available snippets
$snippetList = $modx->runSnippet('Rowboat', (array(
    'table' => 'modx_site_snippets',
    'tpl' => 'inputOptionsRow',
    'limit' => '0',
    'columns' => '{ "name":"" }',
    'outputSeparator' => '|'
)
));

// Find included snippets by comparing them to the list
$regex = '"(' . $snippetList . ')"';

if (preg_match_all($regex, $string, $matches)) {
    // Remove $ from all matches
    foreach ($matches as $match) {
        $match = $match;
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