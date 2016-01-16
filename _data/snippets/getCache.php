id: 10
name: getCache
description: '<b>1.1.0-pl</b> A generic caching snippet for caching the output of any MODx Element using a configurable cache handler.'
properties: 'a:8:{s:9:"namespace";a:7:{s:4:"name";s:9:"namespace";s:4:"desc";s:115:"An execution namespace that serves as a prefix for placeholders set by a specific instance of the getCache snippet.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}s:7:"element";a:7:{s:4:"name";s:7:"element";s:4:"desc";s:80:"The name of a MODx Element that will be called by the getCache snippet instance.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}s:12:"elementClass";a:7:{s:4:"name";s:12:"elementClass";s:4:"desc";s:83:"The class of the MODx Element that will be called by the getCache snippet instance.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:10:"modSnippet";s:7:"lexicon";N;s:4:"area";s:0:"";}s:8:"cacheKey";a:7:{s:4:"name";s:8:"cacheKey";s:4:"desc";s:56:"The key identifying a cache handler for getCache to use.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}s:12:"cacheHandler";a:7:{s:4:"name";s:12:"cacheHandler";s:4:"desc";s:47:"The class of cache handler for getCache to use.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}s:12:"cacheExpires";a:7:{s:4:"name";s:12:"cacheExpires";s:4:"desc";s:139:"How many seconds the output of the Element is to be cached by getPage; 0 means indefinitely or until the cache items are purposely cleared.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:1:"0";s:7:"lexicon";N;s:4:"area";s:0:"";}s:15:"cacheElementKey";a:7:{s:4:"name";s:15:"cacheElementKey";s:4:"desc";s:233:"An optional explicit key to use to cache the output. Otherwise, the key is uniquely generated based on the Resource it is executing on, the properties being passed to the Element, and the $_REQUEST parameters passed when it executed.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}s:13:"toPlaceholder";a:7:{s:4:"name";s:13:"toPlaceholder";s:4:"desc";s:162:"The name of a placeholder the Element being called is setting it''s output into. This allows getCache to support Snippets that do not directly return their output.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}}'

-----

/**
 * Cache the output of any MODx Element using a configurable cacheHandler
 *
 * @author Jason Coward <jason@modx.com>
 * @version 1.0.1-dev
 * @since October 24, 2010
 * @package getcache
 */
$output = '';

if (empty($element) || empty($elementClass)) {
    $modx->log(modX::LOG_LEVEL_ERROR, "getClass requires an element and elementClass property to be set");
    return $output;
}

$properties = $scriptProperties;
/* Unset these to prevent filters from being applied to the element being processed
 * See http://bugs.modx.com/issues/2609
 */
unset($properties['filter_commands']);
unset($properties['filter_modifiers']);

if (empty($cacheKey)) $cacheKey = $modx->getOption('cache_resource_key', null, 'resource');
if (empty($cacheHandler)) $cacheHandler = $modx->getOption('cache_resource_handler', null, $modx->getOption(xPDO::OPT_CACHE_HANDLER, null, 'xPDOFileCache'));
if (!isset($cacheExpires)) $cacheExpires = (integer) $modx->getOption('cache_resource_expires', null, $modx->getOption(xPDO::OPT_CACHE_EXPIRES, null, 0));
if (empty($cacheElementKey)) $cacheElementKey = $modx->resource->getCacheKey() . '/' . md5($modx->toJSON($properties) . $modx->toJSON($modx->request->getParameters()));
$cacheOptions = array(
    xPDO::OPT_CACHE_KEY => $cacheKey,
    xPDO::OPT_CACHE_HANDLER => $cacheHandler,
    xPDO::OPT_CACHE_EXPIRES => $cacheExpires,
);

$cached = $modx->cacheManager->get($cacheElementKey, $cacheOptions);
if (!isset($cached['properties']) || !isset($cached['output'])) {
    $elementObj = $modx->getObject($elementClass, array('name' => $element));
    if ($elementObj) {
        $elementObj->setCacheable(false);
        if (!empty($properties['toPlaceholder'])) {
            $elementObj->process($properties);
            $output = $modx->getPlaceholder($properties['toPlaceholder']);
        } else {
            $output = $elementObj->process($properties);
        }

        if ($modx->getCacheManager()) {
            $cached = array('properties' => $properties, 'output' => $output);
            $modx->cacheManager->set($cacheElementKey, $cached, $cacheExpires, $cacheOptions);
        }
    } else {
        $modx->log(modX::LOG_LEVEL_ERROR, "getCache could not find requested element {$element} of class {$elementClass}");
    }
} else {
    $properties = $cached['properties'];
    $output = $cached['output'];
}
$modx->setPlaceholders($properties, $properties['namespace']);
if (!empty($properties['toPlaceholder'])) {
    $modx->setPlaceholder($properties['toPlaceholder'], $output);
    $output = '';
}

return $output;