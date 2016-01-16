id: 55
name: cbFileFormatSize
description: 'Format a filesize. (Part of ContentBlocks)'
category: ContentBlocks
properties: null

-----

/**
 * $the cbFileFormatSize snippet is used for formatting a number of bytes, into a more user friendly format.
 * It is intended to be used as output filter. For example:
 *
 * [[+size:cbFileFormatSize]] where [[+size]] is an integer.
 *
 * Optionally, it is possible to specify the number of decimals that should be added. Do this by specifying
 * a numeric value as option, like this:
 *
 * [[+size:cbFileFormatSize=`0`]] => no decimals
 * [[+size:cbFileFormatSize=`2`]] => 2 decimals, which is also the default *
 *
 * @var modX $modx
 * @var array $input
 * @var array $options
 */

$cbCorePath = $modx->getOption('contentblocks.core_path', null, $modx->getOption('core_path').'components/contentblocks/');
$contentBlocks = $modx->getService('contentblocks','ContentBlocks', $cbCorePath.'model/contentblocks/');

$bytes = $input;
$decimals = (isset($options) && is_numeric($options)) ? $options : 2;
return $contentBlocks->formatBytes($bytes, $decimals);