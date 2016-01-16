id: 14
name: If
description: 'Simple if (conditional) snippet'
properties: 'a:6:{s:7:"subject";a:7:{s:4:"name";s:7:"subject";s:4:"desc";s:24:"The data being affected.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}s:8:"operator";a:7:{s:4:"name";s:8:"operator";s:4:"desc";s:24:"The type of conditional.";s:4:"type";s:4:"list";s:7:"options";a:10:{i:0;a:2:{s:5:"value";s:2:"EQ";s:4:"text";s:2:"EQ";}i:1;a:2:{s:5:"value";s:3:"NEQ";s:4:"text";s:3:"NEQ";}i:2;a:2:{s:5:"value";s:2:"LT";s:4:"text";s:2:"LT";}i:3;a:2:{s:5:"value";s:2:"GT";s:4:"text";s:2:"GT";}i:4;a:2:{s:5:"value";s:3:"LTE";s:4:"text";s:3:"LTE";}i:5;a:2:{s:5:"value";s:2:"GT";s:4:"text";s:3:"GTE";}i:6;a:2:{s:5:"value";s:5:"EMPTY";s:4:"text";s:5:"EMPTY";}i:7;a:2:{s:5:"value";s:8:"NOTEMPTY";s:4:"text";s:8:"NOTEMPTY";}i:8;a:2:{s:5:"value";s:6:"ISNULL";s:4:"text";s:6:"ISNULL";}i:9;a:2:{s:5:"value";s:7:"inarray";s:4:"text";s:7:"INARRAY";}}s:5:"value";s:2:"EQ";s:7:"lexicon";N;s:4:"area";s:0:"";}s:7:"operand";a:7:{s:4:"name";s:7:"operand";s:4:"desc";s:62:"When comparing to the subject, this is the data to compare to.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}s:4:"then";a:7:{s:4:"name";s:4:"then";s:4:"desc";s:43:"If conditional was successful, output this.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}s:4:"else";a:7:{s:4:"name";s:4:"else";s:4:"desc";s:45:"If conditional was unsuccessful, output this.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}s:5:"debug";a:7:{s:4:"name";s:5:"debug";s:4:"desc";s:92:"Will output the parameters passed in, as well as the end output. Leave off when not testing.";s:4:"type";s:13:"combo-boolean";s:7:"options";s:0:"";s:5:"value";b:0;s:7:"lexicon";N;s:4:"area";s:0:"";}}'

-----

/**
 * If
 *
 * Copyright 2009-2010 by Jason Coward <jason@modx.com> and Shaun McCormick
 * <shaun@modx.com>
 *
 * If is free software; you can redistribute it and/or modify it under the terms
 * of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * If is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * If; if not, write to the Free Software Foundation, Inc., 59 Temple Place,
 * Suite 330, Boston, MA 02111-1307 USA
 *
 * @package if
 */
/**
 * Simple if (conditional) snippet
 *
 * @package if
 */
if (!empty($debug)) {
    print_r($scriptProperties);
    if (!empty($die)) die();
}
$modx->parser->processElementTags('',$subject,true,true);

$output = '';
$operator = !empty($operator) ? $operator : '';
$operand = !isset($operand) ? '' : $operand;
if (isset($subject)) {
    if (!empty($operator)) {
        $operator = strtolower($operator);
        switch ($operator) {
            case '!=':
            case 'neq':
            case 'not':
            case 'isnot':
            case 'isnt':
            case 'unequal':
            case 'notequal':
                $output = (($subject != $operand) ? $then : (isset($else) ? $else : ''));
                break;
            case '<':
            case 'lt':
            case 'less':
            case 'lessthan':
                $output = (($subject < $operand) ? $then : (isset($else) ? $else : ''));
                break;
            case '>':
            case 'gt':
            case 'greater':
            case 'greaterthan':
                $output = (($subject > $operand) ? $then : (isset($else) ? $else : ''));
                break;
            case '<=':
            case 'lte':
            case 'lessthanequals':
            case 'lessthanorequalto':
                $output = (($subject <= $operand) ? $then : (isset($else) ? $else : ''));
                break;
            case '>=':
            case 'gte':
            case 'greaterthanequals':
            case 'greaterthanequalto':
                $output = (($subject >= $operand) ? $then : (isset($else) ? $else : ''));
                break;
            case 'isempty':
            case 'empty':
                $output = empty($subject) ? $then : (isset($else) ? $else : '');
                break;
            case '!empty':
            case 'notempty':
            case 'isnotempty':
                $output = !empty($subject) && $subject != '' ? $then : (isset($else) ? $else : '');
                break;
            case 'isnull':
            case 'null':
                $output = $subject == null || strtolower($subject) == 'null' ? $then : (isset($else) ? $else : '');
                break;
            case 'inarray':
            case 'in_array':
            case 'ia':
                $operand = explode(',',$operand);
                $output = in_array($subject,$operand) ? $then : (isset($else) ? $else : '');
                break;
            case '==':
            case '=':
            case 'eq':
            case 'is':
            case 'equal':
            case 'equals':
            case 'equalto':
            default:
                $output = (($subject == $operand) ? $then : (isset($else) ? $else : ''));
                break;
        }
    }
}
if (!empty($debug)) { var_dump($output); }
unset($subject);
return $output;