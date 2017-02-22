id: 68
name: getChildCount
description: 'Return the amount of child pages a resource has. Now you can make one of those shiny little badges inside a menu button, telling the user upfront how much treasure is inside.'
category: f_resources
properties: 'a:0:{}'

-----

$count = 0;
$parent = isset($parent) ? (integer) $parent : 0;
if ($parent > 0) {
    $criteria = array(
        'parent' => $parent,
        'deleted' => false,
        'published' => true,
    );
    $count = $modx->getCount('modResource', $criteria);
}
return (string) $count;