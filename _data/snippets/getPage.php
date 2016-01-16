id: 11
name: getPage
description: '<b>1.2.4-pl</b> A generic wrapper snippet for returning paged results and navigation from snippets that return limitable collections.'
properties: 'a:21:{s:9:"namespace";a:7:{s:4:"name";s:9:"namespace";s:4:"desc";s:114:"An execution namespace that serves as a prefix for placeholders set by a specific instance of the getPage snippet.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}s:5:"limit";a:7:{s:4:"name";s:5:"limit";s:4:"desc";s:62:"The result limit per page; can be overridden in the $_REQUEST.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:2:"10";s:7:"lexicon";N;s:4:"area";s:0:"";}s:6:"offset";a:7:{s:4:"name";s:6:"offset";s:4:"desc";s:171:"The offset, or record position to start at within the collection for rendering results for the current page; should be calculated based on page variable set in pageVarKey.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:1:"0";s:7:"lexicon";N;s:4:"area";s:0:"";}s:4:"page";a:7:{s:4:"name";s:4:"page";s:4:"desc";s:136:"The page to display; this is determined based on the value indicated by the page variable set in pageVarKey, typically in the $_REQUEST.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:1:"0";s:7:"lexicon";N;s:4:"area";s:0:"";}s:10:"pageVarKey";a:7:{s:4:"name";s:10:"pageVarKey";s:4:"desc";s:54:"The key of a property that indicates the current page.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:4:"page";s:7:"lexicon";N;s:4:"area";s:0:"";}s:8:"totalVar";a:7:{s:4:"name";s:8:"totalVar";s:4:"desc";s:101:"The key of a placeholder that must contain the total records in the limitable collection being paged.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:5:"total";s:7:"lexicon";N;s:4:"area";s:0:"";}s:9:"pageLimit";a:7:{s:4:"name";s:9:"pageLimit";s:4:"desc";s:69:"The maximum number of pages to display when rendering paging controls";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:1:"5";s:7:"lexicon";N;s:4:"area";s:0:"";}s:12:"elementClass";a:7:{s:4:"name";s:12:"elementClass";s:4:"desc";s:73:"The class of element that will be called by the getPage snippet instance.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:10:"modSnippet";s:7:"lexicon";N;s:4:"area";s:0:"";}s:10:"pageNavVar";a:7:{s:4:"name";s:10:"pageNavVar";s:4:"desc";s:71:"The key of a placeholder to be set with the paging navigation controls.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:8:"page.nav";s:7:"lexicon";N;s:4:"area";s:0:"";}s:10:"pageNavTpl";a:7:{s:4:"name";s:10:"pageNavTpl";s:4:"desc";s:54:"Content representing a single page navigation control.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:78:"<li[[+classes]]><a[[+classes]][[+title]] href="[[+href]]">[[+pageNo]]</a></li>";s:7:"lexicon";N;s:4:"area";s:0:"";}s:15:"pageNavOuterTpl";a:7:{s:4:"name";s:15:"pageNavOuterTpl";s:4:"desc";s:64:"Content representing the layout of the page navigation controls.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:47:"[[+first]][[+prev]][[+pages]][[+next]][[+last]]";s:7:"lexicon";N;s:4:"area";s:0:"";}s:13:"pageActiveTpl";a:7:{s:4:"name";s:13:"pageActiveTpl";s:4:"desc";s:57:"Content representing the current page navigation control.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:116:"<li[[+activeClasses]]><a[[+activeClasses:default=` class="active"`]][[+title]] href="[[+href]]">[[+pageNo]]</a></li>";s:7:"lexicon";N;s:4:"area";s:0:"";}s:12:"pageFirstTpl";a:7:{s:4:"name";s:12:"pageFirstTpl";s:4:"desc";s:55:"Content representing the first page navigation control.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:76:"<li class="control"><a[[+classes]][[+title]] href="[[+href]]">First</a></li>";s:7:"lexicon";N;s:4:"area";s:0:"";}s:11:"pageLastTpl";a:7:{s:4:"name";s:11:"pageLastTpl";s:4:"desc";s:54:"Content representing the last page navigation control.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:75:"<li class="control"><a[[+classes]][[+title]] href="[[+href]]">Last</a></li>";s:7:"lexicon";N;s:4:"area";s:0:"";}s:11:"pagePrevTpl";a:7:{s:4:"name";s:11:"pagePrevTpl";s:4:"desc";s:58:"Content representing the previous page navigation control.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:79:"<li class="control"><a[[+classes]][[+title]] href="[[+href]]">&lt;&lt;</a></li>";s:7:"lexicon";N;s:4:"area";s:0:"";}s:11:"pageNextTpl";a:7:{s:4:"name";s:11:"pageNextTpl";s:4:"desc";s:54:"Content representing the next page navigation control.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:79:"<li class="control"><a[[+classes]][[+title]] href="[[+href]]">&gt;&gt;</a></li>";s:7:"lexicon";N;s:4:"area";s:0:"";}s:5:"cache";a:7:{s:4:"name";s:5:"cache";s:4:"desc";s:84:"If true, unique page requests will be cached according to addition cache properties.";s:4:"type";s:13:"combo-boolean";s:7:"options";s:0:"";s:5:"value";b:0;s:7:"lexicon";N;s:4:"area";s:0:"";}s:9:"cache_key";a:7:{s:4:"name";s:9:"cache_key";s:4:"desc";s:120:"The key of the cache provider to use; leave empty to use the cache_resource_key cache partition (default is "resource").";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";b:0;s:7:"lexicon";N;s:4:"area";s:0:"";}s:13:"cache_handler";a:7:{s:4:"name";s:13:"cache_handler";s:4:"desc";s:99:"The cache provider implementation to use; leave empty unless you are caching to a custom cache_key.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";b:0;s:7:"lexicon";N;s:4:"area";s:0:"";}s:13:"cache_expires";a:7:{s:4:"name";s:13:"cache_expires";s:4:"desc";s:141:"The number of seconds before the cached pages expire and must be regenerated; leave empty to use the cache provider option for cache_expires.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";b:0;s:7:"lexicon";N;s:4:"area";s:0:"";}s:13:"pageNavScheme";a:7:{s:4:"name";s:13:"pageNavScheme";s:4:"desc";s:145:"Optionally specify a scheme for use when generating page navigation links; will use link_tag_scheme if empty or not specified (default is empty).";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}}'

-----

/**
 * @package getpage
 */
$output = '';

$properties =& $scriptProperties;
$properties['page'] = (isset($_GET[$properties['pageVarKey']]) && ($page = intval($_GET[$properties['pageVarKey']]))) ? $page : null;
if ($properties['page'] === null) {
    $properties['page'] = (isset($_REQUEST[$properties['pageVarKey']]) && ($page = intval($_REQUEST[$properties['pageVarKey']]))) ? $page : 1;
}
$properties['limit'] = (isset($_GET['limit'])) ? intval($_GET['limit']) : null;
if ($properties['limit'] === null) {
    $properties['limit'] = (isset($_REQUEST['limit'])) ? intval($_REQUEST['limit']) : intval($limit);
}
$properties['offset'] = (!empty($properties['limit']) && !empty($properties['page'])) ? ($properties['limit'] * ($properties['page'] - 1)) : 0;
$properties['totalVar'] = empty($totalVar) ? "total" : $totalVar;
$properties[$properties['totalVar']] = !empty($properties[$properties['totalVar']]) && $total = intval($properties[$properties['totalVar']]) ? $total : 0;
$properties['pageOneLimit'] = (!empty($pageOneLimit) && $pageOneLimit = intval($pageOneLimit)) ? $pageOneLimit : $properties['limit'];
$properties['actualLimit'] = $properties['limit'];
$properties['pageLimit'] = isset($pageLimit) && is_numeric($pageLimit) ? intval($pageLimit) : 5;
$properties['element'] = empty($element) ? '' : $element;
$properties['elementClass'] = empty($elementClass) ? 'modChunk' : $elementClass;
$properties['pageNavVar'] = empty($pageNavVar) ? 'page.nav' : $pageNavVar;
$properties['pageNavTpl'] = !isset($pageNavTpl) ? "<li[[+classes]]><a[[+classes]][[+title]] href=\"[[+href]]\">[[+pageNo]]</a></li>" : $pageNavTpl;
$properties['pageNavOuterTpl'] = !isset($pageNavOuterTpl) ? "[[+first]][[+prev]][[+pages]][[+next]][[+last]]" : $pageNavOuterTpl;
$properties['pageActiveTpl'] = !isset($pageActiveTpl) ? "<li[[+activeClasses:default=` class=\"active\"`]]><a[[+activeClasses:default=` class=\"active\"`]][[+title]] href=\"[[+href]]\">[[+pageNo]]</a></li>" : $pageActiveTpl;
$properties['pageFirstTpl'] = !isset($pageFirstTpl) ? "<li class=\"control\"><a[[+title]] href=\"[[+href]]\">First</a></li>" : $pageFirstTpl;
$properties['pageLastTpl'] = !isset($pageLastTpl) ? "<li class=\"control\"><a[[+title]] href=\"[[+href]]\">Last</a></li>" : $pageLastTpl;
$properties['pagePrevTpl'] = !isset($pagePrevTpl) ? "<li class=\"control\"><a[[+title]] href=\"[[+href]]\">&lt;&lt;</a></li>" : $pagePrevTpl;
$properties['pageNextTpl'] = !isset($pageNextTpl) ? "<li class=\"control\"><a[[+title]] href=\"[[+href]]\">&gt;&gt;</a></li>" : $pageNextTpl;
$properties['toPlaceholder'] = !empty($toPlaceholder) ? $toPlaceholder : '';
$properties['cache'] = isset($cache) ? (boolean) $cache : (boolean) $modx->getOption('cache_resource', null, false);
if (empty($cache_key)) $properties[xPDO::OPT_CACHE_KEY] = $modx->getOption('cache_resource_key', null, 'resource');
if (empty($cache_handler)) $properties[xPDO::OPT_CACHE_HANDLER] = $modx->getOption('cache_resource_handler', null, 'xPDOFileCache');
if (empty($cache_expires)) $properties[xPDO::OPT_CACHE_EXPIRES] = (integer) $modx->getOption('cache_resource_expires', null, 0);

if ($properties['page'] == 1 && $properties['pageOneLimit'] !== $properties['actualLimit']) {
    $properties['limit'] = $properties['pageOneLimit'];
}

if ($properties['cache']) {
    $properties['cachePageKey'] = $modx->resource->getCacheKey() . '/' . $properties['page'] . '/' . md5(http_build_query($modx->request->getParameters()) . http_build_query($scriptProperties));
    $properties['cacheOptions'] = array(
        xPDO::OPT_CACHE_KEY => $properties[xPDO::OPT_CACHE_KEY],
        xPDO::OPT_CACHE_HANDLER => $properties[xPDO::OPT_CACHE_HANDLER],
        xPDO::OPT_CACHE_EXPIRES => $properties[xPDO::OPT_CACHE_EXPIRES],
    );
}
$cached = false;
if ($properties['cache']) {
    if ($modx->getCacheManager()) {
        $cached = $modx->cacheManager->get($properties['cachePageKey'], $properties['cacheOptions']);
    }
}
if (empty($cached) || !isset($cached['properties']) || !isset($cached['output'])) {
    $elementObj = $modx->getObject($properties['elementClass'], array('name' => $properties['element']));
    if ($elementObj) {
        $elementObj->setCacheable(false);
        if (!empty($properties['toPlaceholder'])) {
            $elementObj->process($properties);
            $output = $modx->getPlaceholder($properties['toPlaceholder']);
        } else {
            $output = $elementObj->process($properties);
        }
    }

    include_once $modx->getOption('getpage.core_path',$properties,$modx->getOption('core_path', $properties, MODX_CORE_PATH) . 'components/getpage/').'include.getpage.php';

    $qs = $modx->request->getParameters();
    $properties['qs'] =& $qs;

    $totalSet = $modx->getPlaceholder($properties['totalVar']);
    $properties[$properties['totalVar']] = (($totalSet = intval($totalSet)) ? $totalSet : $properties[$properties['totalVar']]);
    if (!empty($properties[$properties['totalVar']]) && !empty($properties['actualLimit'])) {
        if ($properties['pageOneLimit'] !== $properties['actualLimit']) {
            $adjustedTotal = $properties[$properties['totalVar']] - $properties['pageOneLimit'];
            $properties['pageCount'] = $adjustedTotal > 0 ? ceil($adjustedTotal / $properties['actualLimit']) + 1 : 1;
        } else {
            $properties['pageCount'] = ceil($properties[$properties['totalVar']] / $properties['actualLimit']);
        }
    } else {
        $properties['pageCount'] = 1;
    }
    if (empty($properties[$properties['totalVar']]) || empty($properties['actualLimit']) || $properties[$properties['totalVar']] <= $properties['actualLimit'] || ($properties['page'] == 1 && $properties[$properties['totalVar']] <= $properties['pageOneLimit'])) {
        $properties['page'] = 1;
    } else {
        $pageNav = getpage_buildControls($modx, $properties);
        $properties[$properties['pageNavVar']] = $modx->newObject('modChunk')->process(array_merge($properties, $pageNav), $properties['pageNavOuterTpl']);
        if ($properties['page'] > 1) {
            $qs[$properties['pageVarKey']] = $properties['page'];
        }
    }

    $properties['firstItem'] = $properties['offset'] + 1;
    $properties['lastItem'] = ($properties['offset'] + $properties['limit']) < $totalSet ? ($properties['offset'] + $properties['limit']) : $totalSet;

    $properties['pageUrl'] = $modx->makeUrl($modx->resource->get('id'), '', $qs);
    if ($properties['cache'] && $modx->getCacheManager()) {
        $cached = array('properties' => $properties, 'output' => $output);
        $modx->cacheManager->set($properties['cachePageKey'], $cached, $properties[xPDO::OPT_CACHE_EXPIRES], $properties['cacheOptions']);
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