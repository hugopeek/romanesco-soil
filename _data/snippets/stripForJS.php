id: 117
name: stripForJS
description: 'Prepare the input for being used in Javascript. This means escaping certain characters to make sure the surrounding HTML doesn''t break.'
category: f_modifiers
properties: 'a:0:{}'

-----

$output = $input;
$output = str_replace('/', '\/', $output);
$output = str_replace("'", "\'", $output);
$output = str_replace("\n", '', $output);
$output = preg_replace("/(>+(\s)*<+)/", '><', $output);
$output = preg_replace("/\s+/", ' ', $output);
return $output;