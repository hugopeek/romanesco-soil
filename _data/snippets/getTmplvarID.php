id: 103
name: getTmplvarID
description: 'Get the ID of a TV, in case you only know its name. Created for the front-end library, to help with listing included TVs.'
category: f_templatevars
properties: 'a:0:{}'

-----

$tvName = $modx->getOption('tv', $scriptProperties, '');

// Get the TV by name
$tv = $modx->getObject('modTemplateVar',array('name'=>$tvName));

// Get the ID of the TV
if ($tvName) {
    $id = $tv->get('id');

    return $id;
}