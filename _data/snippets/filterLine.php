id: 112
name: filterLine
description: 'Search the input for lines containing a specific string.'
category: f_modifiers
properties: 'a:0:{}'

-----

$lines = $modx->getOption('input', $scriptProperties, $input);
$search = $modx->getOption('searchString', $scriptProperties, $options);

// Create an array of all lines inside the input
$lines = nl2br($lines);
$lines = explode('<br />', $lines);

// Check if the line contains the string we're looking for, and print if it does
foreach ($lines as $line) {
    if(strpos($line, $search) !== false) {
        $output .= $line;
    }
}

// @todo: This will get messy when multiple lines are found
return $output;