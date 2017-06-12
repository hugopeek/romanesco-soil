id: 91
name: getContextSetting
description: 'Retrieve a specific setting from a context of choice. A possible scenario where you might want to "borrow" a setting from another context, is when certain assets are only available in that context. This snippet lets you retrieve the correct site_url.'
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
    $modx->log(modX::LOG_LEVEL_ERROR, '[getContextSetting] No Context set');
    return '';
} elseif ($setting === null) {
    $modx->log(modX::LOG_LEVEL_ERROR, '[getContextSetting] No Setting set');
    return '';
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
    $modx->log(modX::LOG_LEVEL_ERROR, '[getContextSetting] Context Setting not found');
    return '';
}