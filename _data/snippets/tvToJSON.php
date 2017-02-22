id: 114
name: tvToJSON
description: 'Output the properties of given TV to a JSON object. The output could be used by jsonToHTML to generate an HTML table.'
category: f_json
properties: 'a:0:{}'

-----

/**
 * tvToJSON
 *
 * Output the properties of given TV to a JSON object.
 * The output could be used by jsonToHTML.
 *
 * Initially intended for use in the front-end library. TV settings can now be
 * loaded automatically, instead of copy/pasting the JSON from the GPM config by hand.
 *
 * Usage example:
 * [[tvToJSON? &tv=`[[+pattern_name]]`]]
 *
 */

$tvName = $modx->getOption('tv', $scriptProperties, '');

// Get the TV by name
$tv = $modx->getObject('modTemplateVar', array('name'=>$tvName));

if ($tv) {
    // Render category name for clarity
    $query = $modx->newQuery('modCategory', array(
        'id' => $tv->get('category')
    ));
    $query->select('category');
    $catName = $modx->getValue($query->prepare());

    // Render media source name for clarity
    $sourceID = $tv->get('source');
    if ($sourceID != false) {
        $query = $modx->newQuery('modMediaSource', array(
            'id' => $sourceID
        ));
        $query->select('name');
        $sourceName = $modx->getValue($query->prepare());
    }

    // Create a new object with altered elements
    // The new key names mimic the properties used by GPM
    $tvAltered = array(
        'caption' => $tv->get('caption'),
        'description' => $tv->get('description'),
        //'name' => $tv->get('name'),
        'type' => $tv->get('type'),
        'category' => $catName,
        'sortOrder' => $tv->get('rank'),
        'inputOptionValues' => str_replace('||', '<br>', $tv->get('elements')),
        'defaultValue' => $tv->get('default_text'),
        'inputProperties' => $tv->get('input_properties'),
        'outputProperties' => $tv->get('output_properties'),
        'mediaSource' => $sourceName // Not a GPM property, but good to know anyway
    );

    // Output as JSON object
    return json_encode($tvAltered);
}