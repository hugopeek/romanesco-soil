id: 101
name: setPatternType
category: f_hub
properties: 'a:0:{}'

-----

switch($input) {
    case stripos($input,'electrons') !== false:
        $type = "Electron";
        $type_s = "E";
        break;
    case stripos($input,'atoms') !== false:
        $type = "Atom";
        $type_s = "A";
        break;
    case stripos($input,'molecules') !== false:
        $type = "Molecule";
        $type_s = "M";
        break;
    case stripos($input,'organisms') !== false:
        $type = "Organism";
        $type_s = "O";
        break;
    case stripos($input,'templates') !== false:
        $type = "Template";
        $type_s = "T";
        break;
    case stripos($input,'pages') !== false:
        $type = "Page";
        $type_s = "P";
        break;
    case stripos($input,'formulas') !== false:
        $type = "Formula";
        $type_s = "F";
        break;
    case stripos($input,'computation') !== false:
        $type = "Computation";
        $type_s = "C";
        break;
    case stripos($input,'boson') !== false:
        $type = "Boson";
        $type_s = "B";
        break;
    default:
        $type = "undefined";
        $type_s = "U";
        break;
}

//$modx->toPlaceholder('type', $type);
//$modx->toPlaceholder('type_s', $type_s);

return $type_s;