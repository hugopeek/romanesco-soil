id: 100
name: includedPatternsLink
category: f_hub
properties: 'a:0:{}'

-----

// Turn category ID into category name
$category = $modx->runSnippet('Rowboat', (array(
    'table' => 'modx_categories',
    'tpl' => 'listIncludedElementsCategory',
    'where' => '{ "id":"' . $input . '" }'
)
));

// Grab only the last part of the category name
$category = preg_match('([^_]+$)', $category, $match);

// Get the resource with an alias that matches the category name
$link = $modx->runSnippet('pdoResources', (array(
    'parents' => '0',
    'context' => 'hub',
    'limit' => '1',
    'tpl' => 'listIncludedElementsLink',
    'where' => '{ "alias":"' . $match[0] . '" }'
)
));

return $link;