id: 58
name: fbLoadAssets
category: f_formblocks
snippet: "$assetsPath = $modx->getOption('romanesco.custom_js_path');\n\n// Load JS in footer\n$modx->regClientScript($assetsPath.'js/formblocks.js');\n\nreturn '';"
properties: 'a:0:{}'
content: "$assetsPath = $modx->getOption('romanesco.custom_js_path');\n\n// Load JS in footer\n$modx->regClientScript($assetsPath.'js/formblocks.js');\n\nreturn '';"

-----

$assetsPath = $modx->getOption('romanesco.custom_js_path', $scriptProperties, '');

// Load JS in footer
$modx->regClientScript($assetsPath.'js/formblocks.js');

return '';