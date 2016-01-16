id: 60
name: fbValidateProcessJSON
category: f_formblocks
properties: 'a:0:{}'

-----

/**
 * fbValidateProcessJSON
 *
 * A snippet for FormBlocks that generates the correct strings for the FormIt &validate property.
 *
 * @author Hugo Peek
 */

$input = $modx->getOption('json', $scriptProperties);
$array = $modx->fromJSON($input);
$id = $modx->resource->get('id');
$prefix = !empty($prefix) ? $prefix: 'fb' . $id . '-';
$emailField = $modx->getOption('emailField', $scriptProperties);

//$jsonString = $modx->getOption('json', $scriptProperties);
//$array = json_decode($jsonString, true);

// Function to search for required fields in JSON array
if (!function_exists('search')) {
    function search($array, $key, $value) {
        $results = array();

        if (is_array($array)) {
            if (isset($array[$key]) && $array[$key] == $value) {
                $results[] = $array;
            }
            foreach ($array as $subarray) {
                $results = array_merge($results, search($subarray, $key, $value));
            }
        }

        return $results;
    }
}

// Function to strip required field names correctly
// @todo: Replace this part with modx->runSnippet('fbStripAsAlias');
if (!function_exists('stripResults')) {

    function stripResults($row) {
        $row = strip_tags($row); // strip HTML
        $row = strtolower($row); // convert to lowercase
        $row = preg_replace('/[^\A-Za-z0-9 _-]/', '', $row); // strip non-alphanumeric characters
        $row = preg_replace('/\s+/', '-', $row); // convert white-space to dash
        $row = preg_replace('/-+/', '-', $row);  // convert multiple dashes to one
        $row = trim($row, '-'); // trim excess

        return $row;
    }
}

// Go through JSON array and collect all required fields
$results = search($array, 'field_required', '1');

// Create new array from all required results
$names = array();

// Generate FormIt validation string for each result
foreach ($results as $result) {
    if ($result['field_name'] == $emailField) {
        $names[] = $emailField . ":email:required,"; // Untested...
    } else {
        $names[] = $prefix . stripResults($result['field_name']) . ":required,";
    }
}

return implode('', $names);