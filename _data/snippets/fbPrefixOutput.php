id: 61
name: fbPrefixOutput
category: f_fb_modifiers
properties: 'a:0:{}'

-----

$id = $modx->resource->get('id');
//$idx = $modx->getPlaceholder('unique_idx');
$options = !empty($options) ? $options: 'fb' . $id . '-';

return $options.$input;