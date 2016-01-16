id: 14
name: blockdown
description: 'MarkDown Input Type. Powered by EpicEditor and Parsedown.'
category: Blockdown
properties: null

-----

/**
 * @var modX $modx
 * @var ContentBlocks $contentBlocks
 * @var array $scriptProperties
 */
if ($modx->event->name == 'ContentBlocks_RegisterInputs') {
    // Load your own class. No need to require cbBaseInput, that's already loaded.
    $path = $modx->getOption('blockdown.core_path', null, MODX_CORE_PATH . 'components/blockdown/');
    require_once($path . 'elements/inputs/blockdown.class.php');
    $opts = array('assetsUrl' => $modx->getOption('blockdown.assets_url', null, $modx->getOption('assets_url',null,'assets/') . 'components/blockdown/'));
    $modx->regClientStartupHTMLBlock('<script>var ContentBlocksBlockDown = ' . $modx->toJson($opts) . '</script>');
    // Create an instance of your input type, passing the $contentBlocks var
    $instance = new blockDownInput($contentBlocks);
    
    // Pass back your input reference as key, and the instance as value
    $modx->event->output(array(
        'blockdown' => $instance
    ));
}