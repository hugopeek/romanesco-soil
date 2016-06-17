id: 70
name: resourceTVInputOptions
description: 'Generates input option values that can be used in TV''s, for creating resource selectors.'
category: f_resources
snippet: "$parents = $modx->getOption('parents',$scriptProperties,true);\n\n$output = $modx->runSnippet('getResources', (array(\n    'parents' => $parents,\n    'showHidden' => 1,\n    'showUnpublished' => 1,\n    'limit' => '99',\n    'sortBy' => 'menuindex',\n    'sortDir' => 'ASC',\n    'tpl' => '@INLINE [[+pagetitle]]==[[+id]]',\n    'outputSeparator' => '||'\n)\n));\n\nreturn $output;"
properties: 'a:0:{}'
content: "$parents = $modx->getOption('parents',$scriptProperties,true);\n\n$output = $modx->runSnippet('getResources', (array(\n    'parents' => $parents,\n    'showHidden' => 1,\n    'showUnpublished' => 1,\n    'limit' => '99',\n    'sortBy' => 'menuindex',\n    'sortDir' => 'ASC',\n    'tpl' => '@INLINE [[+pagetitle]]==[[+id]]',\n    'outputSeparator' => '||'\n)\n));\n\nreturn $output;"

-----

/**
 * @todo: Is this snippet used anywhere?
 */

$parents = $modx->getOption('parents',$scriptProperties,true);

$output = $modx->runSnippet('getResources', (array(
    'parents' => $parents,
    'showHidden' => 1,
    'showUnpublished' => 1,
    'limit' => '99',
    'sortBy' => 'menuindex',
    'sortDir' => 'ASC',
    'tpl' => '@INLINE [[+pagetitle]]==[[+id]]',
    'outputSeparator' => '||'
)
));

return $output;