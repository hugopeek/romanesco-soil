id: 24
name: getSwitchColumnCol
category: MIGX
properties: null

-----

$scriptProperties = $_REQUEST;
$col = '';
// special actions, for example the showSelector - action
$tempParams = $modx->getOption('tempParams', $scriptProperties, '');

if (!empty($tempParams)) {
    $tempParams = $modx->fromJson($tempParams);
    $col = $modx->getOption('col', $tempParams, '');
}

return $col;