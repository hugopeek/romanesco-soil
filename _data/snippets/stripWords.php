id: 67
name: stripWords
description: 'Opposed to the native MODX stripString modifier (which only allows you to strip a single value), stripWords lets you enter multiple (comma separated) values.'
category: f_modifiers
properties: 'a:0:{}'

-----

/* stripWords snippet */
$words = array_map('trim', explode(',', $options));
return str_replace($words, '', $input);