id: 85
name: getRawTVValue
description: 'Get the raw value of a TV. Usually when retrieving a TV value, it gets processed first before being returned. But sometimes you might want to get the unprocessed value instead, for instance if @inherit is being used.'
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