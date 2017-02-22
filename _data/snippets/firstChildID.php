id: 113
name: firstChildID
description: 'The name says it all: retrieve the first child ID of a given ID.'
category: f_basic
properties: 'a:0:{}'

-----

/**
 * firstChildID
 * Finds the first child from the given id
 * Returns the first child id or the given id on failure
 *
 * @author Bert Oost <bert@oostdesign.nl> at OostDesign.nl
 *
 * Examples:
 *
 * As output filter:
 *   [[*id:firstChildID]]
 *
 * As snippet:
 *   [[firstChildID? &id=`[[*id]]`]]
 */

$id = (isset($input) && !empty($input)) ? $input : false;
if(empty($id)) { $id = $modx->getOption('id', $scriptProperties, $modx->resource->get('id')); }

// select the first child
$c = $modx->newQuery('modResource');
$c->select(array('id'));
$c->where(array(
    'parent' => $id,
    'published' => true,
));
$c->sortby('menuindex', 'ASC');
$c->limit(1);

$child = $modx->getObject('modResource', $c);
if(!empty($child) && $child instanceof modResource) {
    return $child->get('id');
}

return $id;