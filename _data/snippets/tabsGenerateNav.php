id: 84
name: tabsGenerateNav
description: 'Generate the tab buttons based on data-heading attribute in the tabs themselves. It basically links every tab button to the correct tab content.'
category: f_presentation
properties: 'a:0:{}'

-----

/**
 * tabsGenerateNav
 *
 * Create tab buttons based on the tab content's HTML.
 * Each content field contains data attributes with the correct text for each heading.
 *
 * Many thanks to @christianseel for the original idea and code.
 */

$doc = new DOMDocument();

// Set error level to suppress warnings in log over special characters in HTML
$internalErrors = libxml_use_internal_errors(true);

// Load HTML
$doc->loadHTML('<meta http-equiv="content-type" content="text/html; charset=utf-8">' . $input);

// Restore error level
$internalErrors = libxml_use_internal_errors(false);

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