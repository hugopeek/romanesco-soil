id: 83
name: setUserPlaceholders
description: 'Make any extended fields that are attached to a MODX user available as placeholder.'
category: f_framework
properties: 'a:0:{}'

-----

/* setUserPlaceholders snippet */
$userId = $modx->getOption('userId', $scriptProperties, '');
//$pageId = $modx->getOption('id', $scriptProperties, '');

// Get a specific user
$usr = $modx->getObject('modUser', $userId);

// Get extended fields of this user
$profile = $usr->getOne('Profile');
if ($profile) {
    $extended = $profile->get('extended');
    $modx->toPlaceholders($extended, '');
} else {
    $modx->log(modX::LOG_LEVEL_ERROR, 'Could not find profile for user: ' . $usr->get('username'));
}