id: 57
name: fbGetForms
category: f_formblocks
properties: 'a:0:{}'

-----

$parentID = $modx->getOption('formblocks.container_id');

$output = $modx->runSnippet('getResources', (array(
    'parents' => $parentID,
    'limit' => 99,
    'showHidden' => 1,
    'showUnpublished' => 1,
    'tpl' => '@INLINE [[+pagetitle]]=[[+id]]'
    )
));

return $output;