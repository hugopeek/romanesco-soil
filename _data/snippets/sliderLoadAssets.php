id: 75
name: sliderLoadAssets
description: 'Load CSS and JS dependencies for Slick slider through CDN.'
category: f_presentation
snippet: "/**\n * sliderLoadAssets\n *\n * Loads dependencies for the Slick carousel (http://kenwheeler.github.io/slick/).\n */\n\n$assetsPath = $modx->getOption('patternlab.custom_js_path');\n\n// Head\n$modx->regClientCSS('//cdn.jsdelivr.net/jquery.slick/1.5.9/slick.css');\n$modx->regClientCSS('//cdn.jsdelivr.net/jquery.slick/1.5.9/slick-theme.css');\n\n// Footer\n$modx->regClientScript('//code.jquery.com/jquery-migrate-1.2.1.min.js');\n$modx->regClientScript('//cdn.jsdelivr.net/jquery.slick/1.5.9/slick.min.js');\n$modx->regClientScript($assetsPath . '/slider.js');"
properties: 'a:0:{}'
content: "/**\n * sliderLoadAssets\n *\n * Loads dependencies for the Slick carousel (http://kenwheeler.github.io/slick/).\n */\n\n$assetsPath = $modx->getOption('patternlab.custom_js_path');\n\n// Head\n$modx->regClientCSS('//cdn.jsdelivr.net/jquery.slick/1.5.9/slick.css');\n$modx->regClientCSS('//cdn.jsdelivr.net/jquery.slick/1.5.9/slick-theme.css');\n\n// Footer\n$modx->regClientScript('//code.jquery.com/jquery-migrate-1.2.1.min.js');\n$modx->regClientScript('//cdn.jsdelivr.net/jquery.slick/1.5.9/slick.min.js');\n$modx->regClientScript($assetsPath . '/slider.js');"

-----

/**
 * sliderLoadAssets
 *
 * Loads dependencies for the Slick carousel (http://kenwheeler.github.io/slick/).
 */

$assetsPathCSS = $modx->getOption('patternlab.custom_css_path');
$assetsPathJS = $modx->getOption('patternlab.custom_js_path');
$assetsPathVendor = $modx->getOption('patternlab.custom_vendor_path');

// Head
$modx->regClientCSS($assetsPathVendor . '/slick-carousel/slick.css');
$modx->regClientCSS($assetsPathVendor . '/slick-carousel/slick-theme.css');
$modx->regClientCSS($assetsPathVendor . '/slick-lightbox/slick-lightbox.css');

// Footer
//$modx->regClientScript('//code.jquery.com/jquery-migrate-1.2.1.min.js');
$modx->regClientScript($assetsPathVendor . '/slick-carousel/slick.min.js');
$modx->regClientScript($assetsPathVendor . '/slick-lightbox/slick-lightbox.min.js');
$modx->regClientScript($assetsPathJS . '/slider.js');