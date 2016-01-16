id: 45
name: Rowboat
description: 'Displays a list of rows from any custom table.'
category: Rowboat
properties: 'a:15:{s:3:"tpl";a:6:{s:4:"name";s:3:"tpl";s:4:"desc";s:21:"prop_rowboat.tpl_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:18:"rowboat:properties";}s:5:"table";a:6:{s:4:"name";s:5:"table";s:4:"desc";s:23:"prop_rowboat.table_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:18:"rowboat:properties";}s:7:"columns";a:6:{s:4:"name";s:7:"columns";s:4:"desc";s:25:"prop_rowboat.columns_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:18:"rowboat:properties";}s:5:"where";a:6:{s:4:"name";s:5:"where";s:4:"desc";s:23:"prop_rowboat.where_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:18:"rowboat:properties";}s:6:"sortBy";a:6:{s:4:"name";s:6:"sortBy";s:4:"desc";s:24:"prop_rowboat.sortby_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:18:"rowboat:properties";}s:7:"sortDir";a:6:{s:4:"name";s:7:"sortDir";s:4:"desc";s:25:"prop_rowboat.sortdir_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:3:"ASC";s:7:"lexicon";s:18:"rowboat:properties";}s:5:"limit";a:6:{s:4:"name";s:5:"limit";s:4:"desc";s:23:"prop_rowboat.limit_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";i:10;s:7:"lexicon";s:18:"rowboat:properties";}s:6:"offset";a:6:{s:4:"name";s:6:"offset";s:4:"desc";s:24:"prop_rowboat.offset_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";i:0;s:7:"lexicon";s:18:"rowboat:properties";}s:12:"cacheResults";a:6:{s:4:"name";s:12:"cacheResults";s:4:"desc";s:30:"prop_rowboat.cacheresults_desc";s:4:"type";s:13:"combo-boolean";s:7:"options";s:0:"";s:5:"value";b:1;s:7:"lexicon";s:18:"rowboat:properties";}s:9:"cacheTime";a:6:{s:4:"name";s:9:"cacheTime";s:4:"desc";s:27:"prop_rowboat.cachetime_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";i:3600;s:7:"lexicon";s:18:"rowboat:properties";}s:15:"outputSeparator";a:6:{s:4:"name";s:15:"outputSeparator";s:4:"desc";s:33:"prop_rowboat.outputseparator_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:18:"rowboat:properties";}s:12:"returnFormat";a:6:{s:4:"name";s:12:"returnFormat";s:4:"desc";s:30:"prop_rowboat.returnformat_desc";s:4:"type";s:9:"textfield";s:7:"options";a:2:{i:0;a:2:{s:4:"text";s:19:"prop_rowboat.normal";s:5:"value";s:0:"";}i:1;a:2:{s:4:"text";s:4:"JSON";s:5:"value";s:4:"json";}}s:5:"value";s:0:"";s:7:"lexicon";s:18:"rowboat:properties";}s:17:"placeholderPrefix";a:6:{s:4:"name";s:17:"placeholderPrefix";s:4:"desc";s:35:"prop_rowboat.placeholderprefix_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:8:"rowboat.";s:7:"lexicon";s:18:"rowboat:properties";}s:13:"toPlaceholder";a:6:{s:4:"name";s:13:"toPlaceholder";s:4:"desc";s:31:"prop_rowboat.toplaceholder_desc";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:18:"rowboat:properties";}s:5:"debug";a:6:{s:4:"name";s:5:"debug";s:4:"desc";s:23:"prop_rowboat.debug_desc";s:4:"type";s:13:"combo-boolean";s:7:"options";s:0:"";s:5:"value";b:0;s:7:"lexicon";s:18:"rowboat:properties";}}'

-----

/**
 * Rowboat
 *
 * Copyright 2011 by Shaun McCormick <shaun+rowboat@modx.com>
 *
 * Rowboat is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * Rowboat is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Rowboat; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package rowboat
 */
/**
 * The base Rowboat snippet.
 *
 * @var modX $modx
 * @var Rowboat $rowboat
 * @var array $scriptProperties
 * 
 * @package rowboat
 */
$rowboat = $modx->getService('rowboat','Rowboat',$modx->getOption('rowboat.core_path',null,$modx->getOption('core_path').'components/rowboat/').'model/rowboat/',$scriptProperties);
if (!($rowboat instanceof Rowboat)) return '';

/* setup default properties */
$tpl = $modx->getOption('tpl',$scriptProperties,'');
$table = $modx->sanitizeString($modx->getOption('table',$scriptProperties,''));
if (empty($table)) return '';
$columns = $modx->getOption('columns',$scriptProperties,'');
$where = $modx->getOption('where',$scriptProperties,'');
$sortBy = $modx->getOption('sortBy',$_REQUEST,$modx->getOption('sortBy',$scriptProperties,''));
$sortBy = preg_replace("/[^A-Za-z0-9_,:\-\.\/]/",'',str_replace(array('/',"'",'"','(',')',';','>','<'),'',strip_tags($sortBy,'')));
$sortDir = $modx->getOption('sortDir',$_REQUEST,$modx->getOption('sortDir',$scriptProperties,'ASC'));
$sortDir = $modx->sanitizeString($sortDir);
$limit = $modx->getOption('limit',$_REQUEST,$modx->getOption('limit',$scriptProperties,10));
$offset = $modx->getOption('offset',$_REQUEST,$modx->getOption('offset',$scriptProperties,0));
$cacheResults = $modx->getOption('cacheResults',$scriptProperties,1);
$cacheTime = $modx->getOption('cacheTime',$scriptProperties,3600);
$outputSeparator = $modx->getOption('outputSeparator',$scriptProperties,"\n");
$placeholderPrefix = $modx->getOption('placeholderPrefix',$scriptProperties,'rowboat.');
$debug = $modx->getOption('debug',$scriptProperties,false);
$returnFormat = strtolower($modx->getOption('returnFormat',$scriptProperties,''));

$total = 0;
$results = array();

if (!empty($debug)) {
    $rowboat->loadDebugMode();
}

/* build query */
$c = $rowboat->newQuery($table);
if (empty($c)) {
    return $modx->lexicon('rowboat.no_driver',array('dbtype' => $modx->config['dbtype']));
}
if ($columns != '*') {
    $columns = $modx->fromJSON($columns);
    if (!empty($columns)) {
        $c->select($columns);
    }
}
if (!empty($where)) {
    $where = $modx->fromJSON($where);
    if (!empty($where)) {
        $c->where($where);
    }
}

if (!empty($sortBy)) {
    $sortBy = explode(',',$sortBy);
    foreach ($sortBy as $sortField) {
        $sortMix = explode(':',$sortField);
        $sortDirection = !empty($sortMix[1]) ? $sortMix[1] : $sortDir;
        $sortField = $sortMix[0];
        $c->sortby($sortField,$sortDirection);
    }
}
$cc = null;
if (intval($limit) > 0) {
    /** @var rbQuery $cc */
    $cc = clone $c;
    $c->limit($limit,$offset);
}
$sql = $c->toSql();

if (!empty($debug)) {
    $rowboat->debug->setQuery($c);
}

/* check for cache */
$cached = false;
$cacheKey = false;
if (!empty($cacheResults)) {
    $cacheKey = 'rowboat/'.base64_encode($sql);
    $cacheArray = $modx->cacheManager->get($cacheKey);
    if (!empty($cacheArray)) {
        $cached = true;
        $results = $cacheArray['results'];
        $total = $cacheArray['total'];
    }
    if (!empty($debug)) {
        $rowboat->debug->addMessage($modx->lexicon('rowboat.debug.cached_results'));
    }
}

if (!empty($rowboat->debug)) {
    $rowboat->debug->setTotal($total);
}

/* run query */
if (empty($cached)) {
    if ($c->execute()) {
        $results = $c->getResults();
        if (!empty($cc)) {
            $total = $cc->count();
        } else {
            $total = count($results);
        }
        $c->close();
        if (!empty($cacheResults) && !empty($results) && !empty($cacheKey)) {
            $cacheArray = array(
                'results' => $results,
                'offset' => $offset,
                'limit' => $limit,
                'total' => $total,
            );
            $modx->cacheManager->set($cacheKey,$cacheArray,$cacheTime);
        }
    }
}

if (!empty($rowboat->debug)) {
    $rowboat->debug->setResults($results);
}

/* iterate across results */
$output = array();
if (is_array($results)) {
    $ct = count($results);
    $idx = 0;
    foreach ($results as $row) {
        $row['_idx'] = $idx;
        $row['_alt'] = $idx % 2;
        if ($idx == 0) $row['_first'] = true;
        if ($idx == $ct-1) $row['_last'] = true;

        if (empty($returnFormat)) {
            if (!empty($tpl)) {
                $output[] = $rowboat->getChunk($tpl,$row);
            } else {
                $output[] = print_r($row,true);
            }
        } else {
            $output[] = $row;
        }
        $idx++;
    }
}

/* set placeholders */
$placeholders = array();
$placeholders['total'] = $total;
$placeholders['offset'] = $offset;
$placeholders['limit'] = $limit;
$modx->setPlaceholders($placeholders,$placeholderPrefix);

/* output */
/* if using alternate return format */
if ($returnFormat == 'json') {
    $output = $modx->toJSON($output);
} else {
    $output = implode($outputSeparator,$output);
    if (!empty($rowboat->debug)) {
        $output .= $rowboat->debug->finish();
    }
}
$toPlaceholder = $modx->getOption('toPlaceholder',$scriptProperties,false);
if (!empty($toPlaceholder)) {
    /* if using a placeholder, output nothing and set output to specified placeholder */
    $modx->setPlaceholder($toPlaceholder,$output);
    return '';
}
/* by default just return output */
return $output;