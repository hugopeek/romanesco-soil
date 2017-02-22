id: 102
name: jsonToHTML
description: 'Turn a JSON object into an HTML table. For documentation purposes.'
category: f_json
properties: 'a:0:{}'

-----

// @todo: write documentation and use chunks for the HTML templating

$json = $modx->getOption('json', $scriptProperties, '');
//$filterKeys = $modx->getOption('filterKeys', $scriptProperties, 'template,process_tags,field_is_exposed');
//$filterKeys = $modx->getOption('filterKeys', $scriptProperties, '"template","process_tags","field_is_exposed"');

$jsonArray = json_decode($json, true);
//$filterArray = explode(',', $filterKeys);

if (!function_exists('jsonToHTML')) {
    function jsonToHTML($array) {
        $output = '<table class="ui compact very basic table"><tbody>';

        // @todo: For some strange reason, the function won't accept filterArray to be anything other that what's below
        $filterKeys = array("templates","process_tags","field_is_exposed");

        foreach ($array as $key => $value) {
            // Exclude unwanted keys and keys with an empty value from result
            // @todo: When not set to 'true', the first item in the array will always be excluded
            if (in_array($key, $filterKeys, true) == false && $value != false) {
                $output .= "<tr class='top aligned'>";
                $output .= "<td style='width:0;'><strong>$key</strong></td>";
                $output .= "<td>";
                if (is_array($value)) {
                    $output .= jsonToHTML($value);
                } else {
                    $output .= nl2br("$value");
                }
                $output .= "</td></tr>";
            }
        }

        $output .= "</tbody></table>";

        return $output;
    }
}

return (jsonToHTML($jsonArray));