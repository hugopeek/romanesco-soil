id: 85
name: getRawTVValue
description: 'Get the raw value of a TV. Can be used to check if @inherit is being used.'
category: f_templatevars
properties: 'a:0:{}'

-----

$resourceId = $modx->getOption('resource', $scriptProperties, $modx->resource->get('id'));
$tvName = $modx->getOption('tv', $scriptProperties, '');

// Get the TV
$tv = $modx->getObject('modTemplateVar',array('name'=>$tvName));

// Get the raw content of the TV
$rawValue = $tv->getValue($resourceId);

return $rawValue;