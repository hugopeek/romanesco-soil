id: 23
name: hideEmptyTVCategories
category: c_global
properties: 'a:0:{}'

-----

switch ($modx->event->name) {
    case 'OnManagerPageInit':
        $jsFile = '/assets/js/hide-empty-tv-categories.js';
        $modx->regClientStartupScript($jsFile);
        break;
}
return;