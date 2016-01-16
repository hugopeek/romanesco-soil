id: 53
name: cbHasField
description: 'Conditionally do stuff depending on the usage of a specific field on a resource. (Part of ContentBlocks)'
category: ContentBlocks
properties: null

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

// Make sure this is a contentblocks-enabled resource
$enabled = $resource->getProperty('_isContentBlocks', 'contentblocks');
if ($enabled !== true) return $else;

// Get the field counts
$counts = $resource->getProperty('fieldcounts', 'contentblocks');
if (is_array($counts)) {
    if (isset($counts[$fld])) return $then;
}
else {
    $modx->log(modX::LOG_LEVEL_ERROR, '[ContentBlocks.cbHasField] Resource ' . $resource->get('id') . ' does not contain field count data. This feature was added in ContentBlocks 0.9.2. Any resources not saved since the update to 0.9.2 need to be saved in order for the field counts to be calculated and stored.');
}
return $else;