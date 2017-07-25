id: 112
name: filterLine
description: 'Search the input for lines containing a specific string. And then return those lines.'
category: f_modifiers
properties: 'a:0:{}'

-----

$lines = $modx->getOption('input', $scriptProperties, $input);
$file = $modx->getOption('file', $scriptProperties, '');
$search = $modx->getOption('searchString', $scriptProperties, $options);
$limit = $modx->getOption('limit', $scriptProperties, 10);
$tpl = $modx->getOption('tpl', $scriptProperties, '');

// Check first if we're dealing with an external file
if ($file) {
    $lines = file_get_contents($file);
}

// Create an array of all lines inside the input
$lines = explode("\n", $lines);
$i = 0;

// Check if the line contains the string we're looking for, and print if it does
foreach ($lines as $line) {
    if(strpos($line, $search) !== false) {
        $output[] = $line;

        $i++;
        if($i >= $limit) {
            break;
        }

        if ($tpl) {
            $output[] = $modx->getChunk($tpl, array(
                'content' => $line,
            ));
        }
    }
}

if (is_array($output)) {
    return implode('<br>', $output);
} else {
    return $output;
}