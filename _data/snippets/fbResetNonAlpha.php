id: 62
name: fbResetNonAlpha
category: f_fb_modifiers
properties: 'a:0:{}'

-----

$input = preg_replace('/\[and\]/', '&', $input);
$input = preg_replace('/\[qmark\]/', '?', $input);
$input = preg_replace('/\[semicolon\]/', ';', $input);
$input = preg_replace('/\[equals\]/', '=', $input);

return $input;