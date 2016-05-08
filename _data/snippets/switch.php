id: 89
name: switch
description: 'Simple switch snippet'
category: Switch
properties: 'a:0:{}'

-----

/**
 * Switch
 *
 * Created by Uro\\u0161 Likar
 * uros.likar@gmail.com
 * http://uros.likar.si
 *
 * Update to 1.1.0 by
 * Thomas Jakobi
 * thomas.jakobi@partout.info
 */

$default = $modx->getOption('default', $scriptProperties, '');
$get = trim($modx->getOption('get', $scriptProperties, false));

$output = $default;
if ($get !== false) {
    foreach ($scriptProperties as $key => $value) {
        if (substr($key, 0, 1) == 'c' && strlen($key) > 1 && isset($scriptProperties['do' . substr($key, 1)])) {
            if ($value == $get) {
                $output = $scriptProperties['do' . substr($key, 1)];
                break;
            }
        }
    }
}
return $output;