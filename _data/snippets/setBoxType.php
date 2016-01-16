id: 73
name: setBoxType
description: 'Output the necessary class names for overview items, based on their template.'
category: f_framework
properties: 'a:0:{}'

-----

$input = $modx->getOption('input', $scriptProperties, '');
$prefix = $modx->getOption('prefix', $scriptProperties, '');

switch($input) {
    case stripos($input,'linkcard') !== false:
        $box_type = "centered link cards";
        $row_type = "link";
        $column_type = "card";
        break;
    case stripos($input,'card') !== false:
        $box_type = "centered cards";
        $row_type = "";
        $column_type = "card";
        break;
    case stripos($input,'segment') !== false:
        $box_type = "segments";
        $row_type = "segment";
        $column_type = "segment";
        break;
    case stripos($input,'compact') !== false:
        $box_type = "middle aligned list";
        $row_type = "";
        $column_type = "item";
        break;
    case stripos($input,'icontop') !== false:
        $box_type = "centered grid";
        $row_type = "";
        $column_type = "center aligned column";
        break;
    case stripos($input,'logo') !== false:
        $box_type = "centered middle aligned grid";
        $row_type = "";
        $column_type = "center aligned column logo";
        break;
    case stripos($input,'assessorbasic') !== false:
        $box_type = "centered cards";
        $row_type = "";
        $column_type = "basic card";
        break;
    case stripos($input,'assessor') !== false:
        $box_type = "centered cards";
        $row_type = "";
        $column_type = "card";
        break;
    default:
        $box_type = "centered grid";
        $row_type = "";
        $column_type = "column";
        break;
}

$modx->toPlaceholder('box_type', $box_type, $prefix);
$modx->toPlaceholder('row_type', $row_type, $prefix);
$modx->toPlaceholder('column_type', $column_type, $prefix);
$modx->toPlaceholder('prefix', $prefix);