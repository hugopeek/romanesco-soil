id: 102
name: jsonToHTML
description: 'Turn JSON object into an HTML table.'
category: f_json
properties: 'a:0:{}'

-----

// Original script by Tran Duc Thang
// @todo: write documentation and use chunks for the HTML templating

$json = $modx->getOption('json', $scriptProperties, '');

if (!class_exists('jsonToHTML')) {
    class jsonToHTML {
        public static function jsonToDebug($json = '')
        {
            $arr = json_decode($json, true);
            $html = '';
            if ($arr && is_array($arr)) {
                $html .= self::_arrayToHtmlTableRecursive($arr);
            }
            return $html;
        }

        private static function _arrayToHtmlTableRecursive($arr) {
            $str = '<table class="ui compact very basic table"><tbody>';
            foreach ($arr as $key => $val) {
                // Exclude templates from result
                // @todo: make this variable
                if ($key != 'templates') {
                    $str .= "<tr class='top aligned'>";
                    $str .= "<td style='width:0;'><strong>$key</strong></td>";
                    $str .= "<td>";
                    if (is_array($val)) {
                        if (!empty($val)) {
                            $str .= self::_arrayToHtmlTableRecursive($val);
                        }
                    } else {
                        $str .= nl2br("$val");
                    }
                    $str .= "</td></tr>";
                }
            }
            $str .= "</tbody></table>";

            return $str;
        }
    }
}

return jsonToHTML::jsonToDebug($json);