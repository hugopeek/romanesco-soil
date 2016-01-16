id: 72
name: jsonGetValue
description: 'Get the value of a specific key from a JSON string.'
category: f_json
properties: 'a:0:{}'

-----

$input = $modx->getOption('json', $scriptProperties);
$key = $modx->getOption('key', $scriptProperties);

$array = $modx->fromJSON($input);

foreach ($array as $result) {
    return $result[$key];
}