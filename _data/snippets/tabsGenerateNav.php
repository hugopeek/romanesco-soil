id: 84
name: tabsGenerateNav
description: 'Generates the navigation buttons needed by the Tabs CB.'
category: f_presentation
properties: 'a:0:{}'

-----

$doc = new DOMDocument();
$doc->loadHTML('<meta http-equiv="content-type" content="text/html; charset=utf-8">'.$input);
$divs = $doc->getElementsByTagName('div'); // Little flaky.. If div element changes, navigation breaks.

$tabs = array();

$idx = 1;
foreach($divs as $div) {
    if ($div->hasAttribute('data-tab')) {
        $tabs[$div->getAttribute('data-tab')] = $div->getAttribute('data-heading');
    }
}

$tabheaders = '';

$idx = 1;
foreach($tabs as $id => $title) {
    $tabheaders .= $modx->getChunk('tabsNavItem', array(
        'idx' => $idx,
        'id' => $id,
        'heading' => $title
    ));
    $idx++;
}

return $tabheaders;