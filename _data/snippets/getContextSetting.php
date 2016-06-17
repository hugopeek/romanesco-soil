id: 91
name: getContextSetting
description: 'Retrieve settings from a context of choice.'
category: f_basic
properties: 'a:0:{}'

-----

/**
 * getContextSetting
 *
 * Useful for retrieving settings from a different context.
 * Used in the Head chunk for always looking for custom css on main domain.
 *
 * @author Bob Ray
 */

$ctx = $modx->getOption('context', $scriptProperties, null);
$setting = $modx->getOption('setting', $scriptProperties, null);

if ($ctx == null) {
    return 'No Context set';
} elseif ($setting === null) {
    return 'No Setting set';
} else {
    $csObj = $modx->getObject('modContextSetting',
        array(
            'context_key' => $ctx,
            'key' => $setting
        )
    );
}

if ($csObj) {
    return $csObj->get('value');
} else {
    return 'Context Setting not found';
}