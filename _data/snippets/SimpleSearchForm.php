id: 47
name: SimpleSearchForm
category: SimpleSearch
properties: 'a:5:{s:3:"tpl";a:7:{s:4:"name";s:3:"tpl";s:4:"desc";s:19:"sisea.tpl_form_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:10:"SearchForm";s:7:"lexicon";s:16:"sisea:properties";s:4:"area";s:0:"";}s:7:"landing";a:7:{s:4:"name";s:7:"landing";s:4:"desc";s:18:"sisea.landing_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:16:"sisea:properties";s:4:"area";s:0:"";}s:11:"searchIndex";a:7:{s:4:"name";s:11:"searchIndex";s:4:"desc";s:22:"sisea.searchindex_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:6:"search";s:7:"lexicon";s:16:"sisea:properties";s:4:"area";s:0:"";}s:6:"method";a:7:{s:4:"name";s:6:"method";s:4:"desc";s:17:"sisea.method_desc";s:4:"type";s:13:"combo-boolean";s:7:"options";a:2:{i:0;a:2:{s:4:"text";s:9:"sisea.get";s:5:"value";s:3:"get";}i:1;a:2:{s:4:"text";s:10:"sisea.post";s:5:"value";s:4:"post";}}s:5:"value";s:3:"get";s:7:"lexicon";s:16:"sisea:properties";s:4:"area";s:0:"";}s:13:"toPlaceholder";a:7:{s:4:"name";s:13:"toPlaceholder";s:4:"desc";s:24:"sisea.toplaceholder_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:16:"sisea:properties";s:4:"area";s:0:"";}}'

-----

/**
 * SimpleSearch
 *
 * Copyright 2010-11 by Shaun McCormick <shaun+sisea@modx.com>
 *
 * This file is part of SimpleSearch, a simple search component for MODx
 * Revolution. It is loosely based off of AjaxSearch for MODx Evolution by
 * coroico/kylej, minus the ajax.
 *
 * SimpleSearch is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * SimpleSearch is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * SimpleSearch; if not, write to the Free Software Foundation, Inc., 59 Temple Place,
 * Suite 330, Boston, MA 02111-1307 USA
 *
 * @package simplesearch
 */
/**
 * Show the search form
 *
 * @var modX $modx
 * @var array $scriptProperties
 * @package simplesearch
 */
require_once $modx->getOption('sisea.core_path',null,$modx->getOption('core_path').'components/simplesearch/').'model/simplesearch/simplesearch.class.php';
$search = new SimpleSearch($modx,$scriptProperties);

/* setup default options */
$scriptProperties = array_merge(array(
  'tpl' => 'SearchForm',
  'method' => 'get',
  'searchIndex' => 'search',
  'toPlaceholder' => false,
  'landing' => $modx->resource->get('id'),
), $scriptProperties);

if (empty($scriptProperties['landing'])) {
  $scriptProperties['landing'] = $modx->resource->get('id');
}

/* if get value already exists, set it as default */
$searchValue = isset($_REQUEST[$scriptProperties['searchIndex']]) ? $_REQUEST[$scriptProperties['searchIndex']] : '';
$searchValues = explode(' ', $searchValue);
array_map(array($modx, 'sanitizeString'), $searchValues);
$searchValue = implode(' ', $searchValues);
$placeholders = array(
    'method' => $scriptProperties['method'],
    'landing' => $scriptProperties['landing'],
    'searchValue' => strip_tags(str_replace(array('[',']','"',"'"),array('&#91;','&#93;','&quot;','&apos;'),$searchValue)),
    'searchIndex' => $scriptProperties['searchIndex'],
);

$output = $search->getChunk($scriptProperties['tpl'],$placeholders);
return $search->output($output,$scriptProperties['toPlaceholder']);