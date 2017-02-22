id: 94
name: textToNumber
description: 'Turn a written number into an actual numeric value. In other words: turn "three" into "3". Can come in handy if you want to use the Semantic UI column width classes for other purposes.'
category: f_modifiers
properties: 'a:0:{}'

-----

/**
 * textToNumber
 *
 * Turn a written number into an actual one.
 *
 * Written numbers are used for setting column counts in SemanticUI, but as
 * numeric values they can be reused in other places too.
 * For example: to set the number of visible slides in the Slick js settings.
 */

$numbers = array(
    '1' => 'one',
    '2' => 'two',
    '3' => 'three',
    '4' => 'four',
    '5' => 'five',
    '6' => 'six',
    '7' => 'seven',
    '8' => 'eight',
    '9' => 'nine',
    '10' => 'ten',
    '11' => 'eleven',
    '12' => 'twelve',
    '13' => 'thirteen',
    '14' => 'fourteen',
    '15' => 'fifteen',
    '16' => 'sixteen'
);

$output = array_search($input, $numbers);

return $output;