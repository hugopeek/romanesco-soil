id: 58
name: fbLoadAssets
category: f_formblocks
properties: 'a:0:{}'

-----

$assetsPathJS = $modx->getOption('romanesco.custom_js_path', $scriptProperties, '');
$assetsPathVendor = $modx->getOption('romanesco.custom_vendor_path', $scriptProperties, '');
$uploadFile = $modx->getOption('uploadFile', $scriptProperties, 0);

// Load FormBlocks JS in footer
$modx->regClientScript($assetsPathJS . '/formblocks.js');

// Load additional assets for file upload field, if present
if ($uploadFile) {
    $modx->regClientScript($assetsPathVendor . '/arrive/arrive.min.js');
    $modx->regClientScript($assetsPathJS . '/fileupload.js');
}

return '';