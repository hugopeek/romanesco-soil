id: 75
name: sliderLoadAssets
description: 'Load CSS and JS dependencies for Slick slider through CDN.'
category: f_presentation
properties: 'a:0:{}'

-----

// Head
$modx->regClientCSS('//cdn.jsdelivr.net/jquery.slick/1.5.8/slick.css');
$modx->regClientCSS('//cdn.jsdelivr.net/jquery.slick/1.5.8/slick-theme.css');

// Footer
$modx->regClientScript('//code.jquery.com/jquery-migrate-1.2.1.min.js');
$modx->regClientScript('//cdn.jsdelivr.net/jquery.slick/1.5.8/slick.min.js');
$modx->regClientScript(MODX_ASSETS_URL.'js/slider.js');