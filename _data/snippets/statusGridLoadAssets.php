id: 88
name: statusGridLoadAssets
description: 'Load JS dependencies for status grid.'
category: f_presentation
snippet: "/**\n * statusGridLoadAssets\n *\n */\n\n$assetsPathJS = $modx->getOption('romanesco.custom_js_path');\n\n// Footer\n$modx->regClientScript($assetsPathJS . '/tablesort.js');"
properties: 'a:0:{}'
content: "/**\n * statusGridLoadAssets\n *\n */\n\n$assetsPathJS = $modx->getOption('romanesco.custom_js_path');\n\n// Footer\n$modx->regClientScript($assetsPathJS . '/tablesort.js');"

-----

/**
 * statusGridLoadAssets
 *
 */

$assetsPathJS = $modx->getOption('romanesco.custom_js_path', $scriptProperties, '');

// Footer
$modx->regClientScript($assetsPathJS . '/tablesort.js');