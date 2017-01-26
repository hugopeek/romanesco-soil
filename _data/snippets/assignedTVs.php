id: 107
name: assignedTVs
category: f_hub
properties: 'a:0:{}'

-----

$templateName = $modx->getOption('template', $scriptProperties, '');
$tpl = $modx->getOption('tpl', $scriptProperties, 'includedPatternsRow');

// Get template as object
$template = $modx->getObject('modTemplate', array('templatename'=>$templateName));

// Get the ID of the template
if ($template) {
    $templateID = $template->get('id');
} else {
    $modx->log(modX::LOG_LEVEL_WARN, '[assignedTVs] ' . $templateName . ' could not be processed');
}

// Look in the tmplvar_templates table to find attached TVs
$assignedTVs = $modx->getCollection('modTemplateVarTemplate', array('templateid' => $templateID));

foreach ($assignedTVs as $tv) {
    $tmplvarid = $tv->get('tmplvarid');
    $tvList .= $tmplvarid . ",";
}

// Turn result into array
$tvList = array_filter(explode(',', $tvList));

// Sort list
// @todo: sort array alphabetically
sort($tvList);

// Set idx start value
$idx = 3000;

// Define output array
$output = array();

// Create a list of links to their corresponding PL locations
foreach ($tvList as $value) {
    $tv = $modx->getObject('modTemplateVar', $value);

    if (is_object($tv)) {
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
        // Filter all TVs under the Status tab, since that's not relevant info
        if (strpos($name, 'status_') === false) {
            $output[] = $modx->getChunk($tpl, array(
                'name' => $name,
                'category' => $parent,
                'idx' => $idx
            ));
        }
    }
}

return implode($output);