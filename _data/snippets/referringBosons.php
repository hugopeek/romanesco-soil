id: 108
name: referringBosons
category: f_hub
properties: 'a:0:{}'

-----

$cbCorePath = $modx->getOption('contentblocks.core_path', null, $modx->getOption('core_path').'components/contentblocks/');
$ContentBlocks = $modx->getService('contentblocks','ContentBlocks', $cbCorePath.'model/contentblocks/');

$pattern = $modx->getOption('pattern', $scriptProperties, '');
$tpl = $modx->getOption('tpl', $scriptProperties, 'includedContentBlocksRow');

$htmlContentType = $modx->getObject('modContentType', array('name' => 'HTML'));

// Function to turn result into a link to its corresponding resource
if (!function_exists('createLink')) {
    function createLink($catID, $uriExtension) {
        global $modx;

        // Since we have an ID, let's go hunt for the category name
        $category = $modx->getObject('cbCategory', array(
            'id' => $catID
        ));

        if ($category) {
            $catName = strtolower($category->get('name'));
        } else {
            $modx->log(modX::LOG_LEVEL_WARN, '[referringBosons] Link could not be generated due to missing category ID');
        }

        // Use bosons as parent name, because we don't know if this is a layout or field
        $parentName = 'bosons';

        // Get the resource with an alias that matches both category and parent name
        $query = $modx->newQuery('modResource');
        $query->where(array(
            'uri:LIKE' => '%' . $parentName . '%',
            'AND:uri:LIKE' => '%' . $catName . $uriExtension
        ));
        $query->select('uri');
        $link = $modx->getValue($query->prepare());

        return $link;
    }
}

// First, we need to know which CB elements contain the pattern name
// Let's start searching inside fields first, since they're the most common
$result = $modx->getCollection('cbField', array(
    'template:LIKE' => '%' . $pattern . '%',
    'OR:properties:LIKE' => '%' . $pattern . '%',
    'OR:settings:LIKE' => '%' . $pattern . '%'
));

// Maybe the field type is Chunk, meaning it is referenced by ID instead of name
if (!$result) {
    $query = $modx->newQuery('modChunk');
    $query->where(array(
        'name' => $pattern
    ));
    $query->select('id');
    $patternID = $modx->getValue($query->prepare());

    $result = $modx->getObject('cbField', array(
        'properties:LIKE' => '%"chunk":"' . $patternID . '"%'
    ));

    if ($result) {
        $name = $result->get('name');
        $link = createLink($result->get('category'), $htmlContentType->get('file_extensions'));

        $output = $modx->getChunk($tpl, array(
            'name' => $name,
            'link' => $link
        ));

        return $output;
    }
}

// If no fields where found, try the layouts table instead
if (!$result) {
    $result = $modx->getCollection('cbLayout', array(
        'template:LIKE' => '%' . $pattern . '%',
        'OR:settings:LIKE' => '%' . $pattern . '%'
    ));
}

// Proceed if any matches are present
if ($result) {
    // Turn each match into a list item with a link
    foreach ($result as $boson) {
        $name = $boson->get('name');
        $link = createLink($boson->get('category'), $htmlContentType->get('file_extensions'));

        $output[] = $modx->getChunk($tpl, array(
            'name' => $name,
            'link' => $link,
            'label_classes' => 'blue'
        ));
    }

    return implode($output);

    //if ($placeholder) {
    //    $modx->toPlaceholder($placeholder, $output);
    //} else {
    //    return $output;
    //}
}