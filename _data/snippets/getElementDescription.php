id: 105
name: getElementDescription
description: 'Retrieve the description of an element of choice. Used in the front-end library to prevent having to enter the same information twice. So if you''re browsing the pattern library, then yes: this paragraph is also loaded with getElementDescription!'
category: f_basic
properties: 'a:0:{}'

-----

$elementType = $modx->getOption('type', $scriptProperties, '');
$elementName = $modx->getOption('name', $scriptProperties, '');

// Set correct database table information based on the element type
switch($elementType) {
    case stripos($elementType, 'electrontv') !== false:
        $dbTable = "site_tmplvars";
        $dbNameField = "name";
        $modxObject = "modTemplateVar";
        break;
    case stripos($elementType, 'atom') !== false:
        $dbTable = "site_htmlsnippets";
        $dbNameField = "name";
        $modxObject = "modChunk";
        break;
    case stripos($elementType, 'molecule') !== false:
        $dbTable = "site_htmlsnippets";
        $dbNameField = "name";
        $modxObject = "modChunk";
        break;
    case stripos($elementType,'organism') !== false:
        $dbTable = "site_htmlsnippets";
        $dbNameField = "name";
        $modxObject = "modChunk";
        break;
    case stripos($elementType, 'template') !== false:
        $dbTable = "site_templates";
        $dbNameField = "templatename";
        $modxObject = "modTemplate";
        break;
    case stripos($elementType, 'page') !== false:
        $dbTable = "site_content";
        $dbNameField = "pagetitle";
        $modxObject = "modResource";
        break;
    case stripos($elementType, 'formula') !== false:
        $dbTable = "site_snippets";
        $dbNameField = "name";
        $modxObject = "modSnippet";
        break;
    case stripos($elementType, 'computation') !== false:
        $dbTable = "site_plugins";
        $dbNameField = "name";
        $modxObject = "modPlugin";
        break;
    case stripos($elementType, 'bosonfield') !== false:
        $dbTable = "contentblocks_field";
        $dbNameField = "name";
        $modxObject = "cbField";
        break;
    case stripos($elementType, 'bosonlayout') !== false:
        $dbTable = "contentblocks_layout";
        $dbNameField = "name";
        $modxObject = "cbLayout";
        break;
    case stripos($elementType, 'bosontemplate') !== false:
        $dbTable = "contentblocks_template";
        $dbNameField = "name";
        $modxObject = "cbTemplate";
        break;
    default:
        $dbTable = "";
        $dbNameField = "";
        $modxObject = "";
        break;
}

// In case we are dealing with a ContentBlocks element, load CB service
if (stripos($dbTable, 'contentblocks')) {
    $cbCorePath = $modx->getOption('contentblocks.core_path', null, $modx->getOption('core_path').'components/contentblocks/');
    $ContentBlocks = $modx->getService('contentblocks','ContentBlocks', $cbCorePath.'model/contentblocks/');
}

// Prepare db query and retrieve description
if ($modxObject) {
    $query = $modx->newQuery($modxObject, array(
        $dbNameField => $elementName
    ));
    $query->select('description');
    $description = $modx->getValue($query->prepare());

    return $description;
} else {
    $modx->log(modX::LOG_LEVEL_ERROR, '[displayElementDescription] ' . $elementName . ' could not be processed');
}