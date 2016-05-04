id: 75
name: sliderLoadAssets
description: 'Load CSS and JS dependencies for Slick slider through CDN.'
category: f_presentation
properties: 'a:0:{}'

-----

/**
 * sliderLoadAssets
 *
 * Loads dependencies for the Slick carousel (http://kenwheeler.github.io/slick/).
 */

$assetsPath = $modx->getOption('patternlab.custom_js_path');

// Head
$modx->regClientCSS('//cdn.jsdelivr.net/jquery.slick/1.5.9/slick.css');
$modx->regClientCSS('//cdn.jsdelivr.net/jquery.slick/1.5.9/slick-theme.css');

// Footer
$modx->regClientScript('//code.jquery.com/jquery-migrate-1.2.1.min.js');
$modx->regClientScript('//cdn.jsdelivr.net/jquery.slick/1.5.9/slick.min.js');
$modx->regClientScript($assetsPath . '/slider.js');