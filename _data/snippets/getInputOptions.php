id: 81
name: getInputOptions
category: SetInputOptions
properties: 'a:0:{}'

-----

/**
 * This snippet can be used to list the input option values in your chunks and templates.
 *
 * Example usage: [[getInputOptions? &tv=`[[*your_template_variable]]`]]
 *
 * @package SetInputOptions
 */

// Include SetInputOptions class
require_once $modx->getOption('setinputoptions.core_path', null, $modx->getOption('core_path').'components/setinputoptions/').'model/setinputoptions/setinputoptions.class.php';

$setinputoptions = $modx->getService('setinputoptions', 'setinputoptions', $modx->getOption('setinputoptions.core_path', null, $modx->getOption('core_path').'components/setinputoptions/').'model/setinputoptions/', $scriptProperties);

if (!($setinputoptions instanceof setinputoptions)) {
    return '';
}

$tpl = $modx->getOption('tpl', $scriptProperties, "inputOptionsRow");
$delimiter = $modx->getOption('delimiter', $scriptProperties, ",");
$templateVariable = $modx->getOption('tv', $scriptProperties);
$outputDelimiter = $modx->getOption('outputDelimiter', $scriptProperties, "\n");

if (is_null($templateVariable)) {
    return 'You forgot the tv parameter.';
}

$query = $modx->newQuery('SetInputOptionsInputOption');
$query->where(array('id:IN' => explode($delimiter, $templateVariable)));
$query->sortBy("position");
$inputOptions = $modx->getCollection('SetInputOptionsInputOption', $query);

$list = array();
foreach ($inputOptions as $value) {
    $list[] = $modx->getChunk($tpl, $value->toArray());
}

/* output */

$output = implode($outputDelimiter, $list);

/* by default just return output */
return $output;