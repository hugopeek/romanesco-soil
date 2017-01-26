id: 110
name: cbRenderCodeField
description: 'This snippet can be used in a CB Code field in conjunction with a field setting, to control how the :tag modifier is rendered. Useful for dealing with MODX tags inside a Code field, i.e. when writing documentation.'
category: f_contentblocks
properties: 'a:0:{}'

-----

/**
 * cbRenderCodeField
 *
 * Useful when dealing with MODX tags inside a Code field, i.e. for documentation.
 * Used in conjunction with a field setting to control how the :tag modifier is rendered.
 *
 * Available options:
 *
 * render -> Render :tag modifier(s) anyway and set code_field_raw placeholder
 * respect -> Respect :tag modifier(s) and set code_field_rendered placeholder
 * ignore -> Process everything as usual, without setting any placeholders
 *
 */

$valueRaw = $modx->getOption('valueRaw', $scriptProperties, '');
$valueRendered = $modx->getOption('valueRendered', $scriptProperties, '');
$renderTag = $modx->getOption('renderTag', $scriptProperties, '');

$output = '';

switch($renderTag) {
    case $renderTag == 'render':
        $modx->toPlaceholder('code_field_raw', $valueRaw);
        $output = $valueRendered;
        break;
    case $renderTag == 'respect':
        $modx->toPlaceholder('code_field_rendered', $valueRendered);
        $output = $valueRaw;
        break;
    case $renderTag == 'ignore':
        $output = $valueRaw;
        break;
    default:
        $output = $valueRaw;
        break;
}

return $output;