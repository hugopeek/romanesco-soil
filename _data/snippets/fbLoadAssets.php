id: 58
name: fbLoadAssets
category: f_formblocks
properties: 'a:0:{}'

-----

$assetsPath = $modx->getOption('romanesco.custom_js_path');

// Load JS in footer
$modx->regClientScript($assetsPath.'js/formblocks.js');

return '';