id: 84
name: tabsGenerateNav
description: 'Generate the tab buttons based on data-heading attribute in the tabs themselves. It basically links every tab button to the correct tab content.'
category: f_presentation
snippet: "/**\n * tabsGenerateNav\n *\n * Create tab buttons based on the tab content's HTML.\n * Each content field contains data attributes with the correct text for each heading.\n *\n * Many thanks to @christianseel for coming up with the original idea and code!\n */\n\n$doc = new DOMDocument();\n\n// Set error level to suppress warnings in log over special characters in HTML\n$internalErrors = libxml_use_internal_errors(true);\n\n// Load HTML\n$doc->loadHTML('<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\">' . $input);\n\n// Restore error level\n$internalErrors = libxml_use_internal_errors(false);\n\n$divs = $doc->getElementsByTagName('div'); // Little flaky.. If div element changes, navigation breaks.\n\n$tabs = array();\n\n$idx = 1;\nforeach($divs as $div) {\n    if ($div->hasAttribute('data-tab')) {\n        $tabs[$div->getAttribute('data-tab')] = $div->getAttribute('data-heading');\n    }\n}\n\n$tabheaders = '';\n\n$idx = 1;\nforeach($tabs as $id => $title) {\n    $tabheaders .= $modx->getChunk('tabsNavItem', array(\n        'idx' => $idx,\n        'id' => $id,\n        'heading' => $title\n    ));\n    $idx++;\n}\n\nreturn $tabheaders;"
properties: 'a:0:{}'
content: "/**\n * tabsGenerateNav\n *\n * Create tab buttons based on the tab content's HTML.\n * Each content field contains data attributes with the correct text for each heading.\n *\n * Many thanks to @christianseel for coming up with the original idea and code!\n */\n\n$doc = new DOMDocument();\n\n// Set error level to suppress warnings in log over special characters in HTML\n$internalErrors = libxml_use_internal_errors(true);\n\n// Load HTML\n$doc->loadHTML('<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\">' . $input);\n\n// Restore error level\n$internalErrors = libxml_use_internal_errors(false);\n\n$divs = $doc->getElementsByTagName('div'); // Little flaky.. If div element changes, navigation breaks.\n\n$tabs = array();\n\n$idx = 1;\nforeach($divs as $div) {\n    if ($div->hasAttribute('data-tab')) {\n        $tabs[$div->getAttribute('data-tab')] = $div->getAttribute('data-heading');\n    }\n}\n\n$tabheaders = '';\n\n$idx = 1;\nforeach($tabs as $id => $title) {\n    $tabheaders .= $modx->getChunk('tabsNavItem', array(\n        'idx' => $idx,\n        'id' => $id,\n        'heading' => $title\n    ));\n    $idx++;\n}\n\nreturn $tabheaders;"

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