id: 104
name: cbHasFields
description: 'This is a copy of the original cbHasField snippet that ships with ContentBlocks. The only difference is that it takes in a comma separate list of IDs, instead of just 1.'
category: f_contentblocks
properties: 'a:0:{}'

-----

/**
 * Use the cbHasField snippet for conditional logic depending on whether a certain field
 * is in use on a resource or not.
 *
 * For example, this can be useful if you need to initialise a certain javascript library
 * in your site's footer, but only when you have a Gallery on the page.
 *
 * Example usage:
 *
 * [[cbHasField?
 *      &field=`13`
 *      &then=`Has a Gallery!`
 *      &else=`Doesn't have a gallery!`
 * ]]
 *
 * An optional &resource param allows checking for fields on other resources.
 *
 * Note that if the resource does not use ContentBlocks for the content, it will default to the &else value.
 *
 * @var modX $modx
 * @var array $scriptProperties
 */
$resource = (isset($scriptProperties['resource']) && $scriptProperties['resource'] != $modx->resource->get('id')) ? $modx->getObject('modResource', $scriptProperties['resource']) : $modx->resource;
$fld = $modx->getOption('field', $scriptProperties, 0);
$then = $modx->getOption('then', $scriptProperties, '1');
$else = $modx->getOption('else', $scriptProperties, '');

// If comma-separated list in $fld, make array of IDs, else $fields = false
$fields = false;
if (strpos($fld, ',') !== false) {
    $fields = array_filter(array_map('trim', explode(',', $fld)));
    $fld = $fields[0]; // Let's not have $fld be a comma-separated string, in case it breaks something below
}
if(!$fld) {
    $showDebug = true;
}

// Make sure this is a contentblocks-enabled resource
$enabled = $resource->getProperty('_isContentBlocks', 'contentblocks');
if ($enabled !== true) return $else;

// Get the field counts
$counts = $resource->getProperty('fieldcounts', 'contentblocks');

// Loop through $fields and replace the $fld var with the first matching element
if (is_array($counts) && is_array($fields)) {
    foreach ($fields as $f) {
        if (isset($counts[$f])) {
            $fld = $f;
            break;
        }
    }
}

// Otherwise, $fld is the first ID provided and the snippet continues as in previous versions. No harm no foul.
if (is_array($counts)) {
    if (isset($counts[$fld])) return $then;
}

else {
    $modx->log(modX::LOG_LEVEL_ERROR, '[ContentBlocks.cbHasField] Resource ' . $resource->get('id') . ' does not contain field count data. This feature was added in ContentBlocks 0.9.2. Any resources not saved since the update to 0.9.2 need to be saved in order for the field counts to be calculated and stored.');
}
return $else;