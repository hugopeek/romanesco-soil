id: 115
name: responsiveImgSrcset
description: 'Generate a number of srcset properties, for use inside an img tag.'
category: f_framework
properties: 'a:0:{}'

-----

/**
 * responsiveImgSrcset
 *
 * Generates a number of srcset properties, for use inside an <img> tag.
 *
 * The dimensions for each srcset image are defined inside the
 * responsive_img_breakpoints configuration setting.
 *
 * @author: Hugo Peek
 * @license: MIT
 */

$src = $modx->getOption('src', $scriptProperties, '');
$crop = $modx->getOption('crop', $scriptProperties, '');
$width = $modx->getOption('width', $scriptProperties, '');
$tpl = $modx->getOption('tpl', $scriptProperties, 'imgResponsiveRowSrcset');
$placeholder = $modx->getOption('toPlaceholder', $scriptProperties, '');

// Output filters are also processed when the input is empty, so check for that.
if ($breakpoints == '') { return ''; }
$breakpoints = explode(',', $breakpoints);

// Process each breakpoint individually
foreach ($breakpoints as $key => $value) {
    $output[] = $modx->getChunk($tpl, array(
        'src' => $src,
        'crop' => $crop,
        'width' => $width,
        'breakpoint' => $value,
    ));
}

if ($placeholder) {
    $modx->toPlaceholder($placeholder, implode(",\n", $output));
    return '';
} else {
    return implode(",\n", $output);
}