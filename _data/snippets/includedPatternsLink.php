id: 100
name: includedPatternsLink
category: f_hub
properties: 'a:0:{}'

-----

$catID = $modx->getOption('input', $scriptProperties, '');
$placeholder = $modx->getOption('toPlaceholder', $scriptProperties, '');
$prefix = $modx->getOption('prefix', $scriptProperties, '');

$htmlContentType = $modx->getObject('modContentType', array('name' => 'HTML'));

// Get category name and parent ID
$category = $modx->getObject('modCategory', array(
    'id' => $catID
));

if ($category) {
    $catName = $category->get('category');
    $parentID = $category->get('parent');
}

// If category or parent is empty, don't generate any link.
// All Romanesco elements are nested at least 1 level deep, so if a category
// has no parent, we can allow ourselves to assume it's part of a MODX extra.
if (!$category && $parentID == 0) {
    $modx->toPlaceholder('pl', $prefix);
    return;
}

// Get parent name as well, to avoid issues with multiple matches
$query = $modx->newQuery('modCategory', array(
    'id' => $parentID
));
$query->select('category');
$parentName = $modx->getValue($query->prepare());

// Grab only the last part of the category name
$catName = preg_match('([^_]+$)', $catName, $matchCat);
$parent = preg_match('([^_]+$)', $parentName, $matchParent);
$matchCat = strtolower($matchCat[0]);
$matchParent = strtolower($matchParent[0]);

// If category and parent are the same, squash them
if ($matchCat === $matchParent) {
    $match = $matchCat;
} else {
    $match = $matchParent . "/" . $matchCat;
}

// Get the resource with an alias that matches the category name
$query = $modx->newQuery('modResource');
$query->where(array(
    'uri:LIKE' => '%' . $match . $htmlContentType->get('file_extensions')
));
$query->select('uri');
$link = $modx->getValue($query->prepare());

// Output to placeholder if one is set
if ($placeholder) {
    $modx->toPlaceholder('pl', $prefix);
    $modx->toPlaceholder($placeholder, $link, $prefix);
} else {
    return $link;
}