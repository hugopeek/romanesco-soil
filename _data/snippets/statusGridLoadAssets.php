id: 88
name: statusGridLoadAssets
description: 'Load JS dependencies for status grid.'
category: f_presentation
snippet: "/**\n * statusGridLoadAssets\n *\n */\n\n$assetsPath = $modx->getOption('patternlab.custom_js_path');\n\n// Footer\n$modx->regClientScript($assetsPath . '/tablesort.min.js');"
properties: 'a:0:{}'
content: "/**\n * statusGridLoadAssets\n *\n */\n\n$assetsPath = $modx->getOption('patternlab.custom_js_path');\n\n// Footer\n$modx->regClientScript($assetsPath . '/tablesort.min.js');"

-----

/**
 * statusGridLoadAssets
 *
 */

$assetsPathJS = $modx->getOption('patternlab.custom_js_path');

// Footer
$modx->regClientScript($assetsPathJS . '/tablesort.js');