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

$assetsPathJS = $modx->getOption('patternlab.custom_js_path');

// Footer
$modx->regClientScript($assetsPathJS . '/tablesort.js');