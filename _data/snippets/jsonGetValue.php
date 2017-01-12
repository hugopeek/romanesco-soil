id: 72
name: jsonGetValue
description: 'Get the value of a specific key from a JSON string.'
category: f_json
properties: 'a:0:{}'

-----

$input = $modx->getOption('json', $scriptProperties);
$key = $modx->getOption('key', $scriptProperties);
$tpl = $modx->getOption('tpl', $scriptProperties, '');

$input = utf8_encode($input);
$array = json_decode($input, true);

$output = $array[$key];

if ($tpl) {
    $output = $modx->getChunk($tpl, array(
        'content' => $output
    ));
}

return $output;