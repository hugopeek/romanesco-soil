id: 82
name: getResourceLevel
description: 'Shows the level based on the number of parent ID''s.'
category: f_resources
properties: 'a:0:{}'

-----

$id = isset($id) ? $id : $modx->resource->get('id');
$pids = $modx->getParentIds($id, 100, array('context' => 'web'));
return count($pids);