id: 88
name: statusGridLoadAssets
description: 'Load JS dependencies for status grid.'
category: f_presentation
properties: 'a:0:{}'

-----

/**
 * statusGridLoadAssets
 *
 */

$assetsPath = $modx->getOption('patternlab.custom_js_path');

// Footer
$modx->regClientScript($assetsPath . '/tablesort.min.js');