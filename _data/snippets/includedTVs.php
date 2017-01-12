id: 99
name: includedTVs
category: f_hub
properties: 'a:0:{}'

-----

/**
 * includedTVs
 *
 * This snippet is intended to list the TVs that are being used
 * inside a given chunk. It needs the raw content of the chunk as input.
 *
 * See includedChunks for more detailed instructions.
 *
 * @author Hugo Peek
 */

$string = $input;
$tpl = $modx->getOption('tpl', $scriptProperties, 'includedPatternsRow');

// Find possible TVs by looking at placeholders with a leading + character
// @todo: this should also consider other prefixes, such as &rowTpl or *.
$regex = '/(?<!\w)\+\w+/';

// Set idx start value to something high, to prevent overlap
$idx = 2000;

// Define output array
$output = array();

if (preg_match_all($regex, $string, $matches)) {
    // Remove + from all matches
    foreach ($matches as $match) {
        $match = str_replace('+', '', $match);
    }

    // Remove duplicates
    $result = array_unique($match);

    // Create a comma separated list of possible TVs
    foreach ($result as $key => $value) {
        $query = $modx->newQuery('modTemplateVar', array(
            'name' => $value
        ));

        $query->select('id');
        $possibleTVs[] = $modx->getValue($query->prepare());
    }

    // Filter results that returned false because TV name doesn't exist
    $tvList = array_filter($possibleTVs, function($value) {
        return ($value !== null && $value !== false && $value !== '');
    });

    // We have a list of positive IDs now (literally), so we can create a list
    // of links to their corresponding PL locations.
    foreach ($tvList as $value) {
        $tv = $modx->getObject('modTemplateVar', $value);
        $name = $tv->get('name');
        $category = $tv->get('category');

        // The actual TV categories often contain spaces and hyphens and they
        // don't accurately represent the file structure of the library.
        // That's why we get the parent category instead.
        $query = $modx->newQuery('modCategory', array(
            'id' => $category
        ));
        $query->select('parent');
        $parent = $modx->getValue($query->prepare());

        // Up idx value by 1, so a unique placeholder can be created
        $idx++;

        // Output to a chunk that contains the link generator
        $output[] = $modx->getChunk($tpl, array(
            'name' => $name,
            'category' => $parent,
            'idx' => $idx
        ));
    }
}

return implode($output);