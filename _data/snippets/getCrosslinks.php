id: 69
name: getCrosslinks
description: 'Return the IDs of all resources that link to current resource through a certain TV. Did that make sense? It means you can scan your project for other resources linked to the current one. I.e.: show relevant book reviews in blog posts and vice versa.'
category: f_resources
properties: 'a:0:{}'

-----

if (!$tvName) {
    $modx->log(modX::LOG_LEVEL_ERROR, '[getCrosslinks] The variable tvName is not given.');
    return;
}

if (!$page) {
    $modx->log(modX::LOG_LEVEL_ERROR, '[getCrosslinks] The variable page is not given.');
    return;
}

$templateVar = "SELECT `id` FROM `" . $modx->getOption(xPDO::OPT_TABLE_PREFIX) . "site_tmplvars` WHERE `name` = '" . $tvName . "'";

$result = $modx->query($templateVar);
$templateVarId = 0;
if (!is_object($result)) {
    $modx->log(modX::LOG_LEVEL_ERROR, '[getCrosslinks] An error has occured: result is not an object. Line 18.');
    return;
} else {
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $templateVarId = $row['id'];
}
if (!$templateVarId) {
    $modx->log(modX::LOG_LEVEL_ERROR, '[getCrosslinks] '. $templateVarName . ' is geen valide template variabel.');
    return;
}

$crosslinkIds = "SELECT `contentid`, `value` FROM `" . $modx->getOption(xPDO::OPT_TABLE_PREFIX) . "site_tmplvar_contentvalues` WHERE `tmplvarid` = '" . $templateVarId . "' AND `value` LIKE '%" . $page . "%'";
$result = $modx->query($crosslinkIds);
$resultsArray = array();
if (!is_object($result)) {
    $modx->log(modX::LOG_LEVEL_ERROR, '[getCrosslinks] An error has occured: result is not an object. Line 33');
    return;
} else {
    while ($r = $result->fetch(PDO::FETCH_ASSOC)) {
        $r['value'] = explode('||', $r['value']);
        if (in_array($page ,$r['value'])) {
            array_push($resultsArray, $r['contentid']);
        }
    }
    return implode(",", $resultsArray);
}