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

$assetsPathJS = $modx->getOption('romanesco.custom_js_path', $scriptProperties, '');

// Footer
$modx->regClientScript($assetsPathJS . '/tablesort.js');