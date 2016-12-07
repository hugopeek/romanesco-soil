id: 102
name: jsonToHTML
description: 'Turn JSON object into an HTML table.'
category: f_json
properties: 'a:0:{}'

-----

// Original script by Tran Duc Thang
// @todo: write documentation and use chunks for the HTML templating

$jsonText = $modx->getOption('json', $scriptProperties);

if (!class_exists('jsonToHTML')) {
    class jsonToHTML {
        public static function jsonToDebug($jsonText = '')
        {
            $arr = json_decode($jsonText, true);
            $html = '';
            if ($arr && is_array($arr)) {
                $html .= self::_arrayToHtmlTableRecursive($arr);
            }
            return $html;
        }

        private static function _arrayToHtmlTableRecursive($arr) {
            $str = '<table class="ui compact very basic table"><tbody>';
            foreach ($arr as $key => $val) {
                $str .= "<tr>";
                $str .= "<td><strong>$key</strong></td>";
                $str .= "<td>";
                if (is_array($val)) {
                    if (!empty($val)) {
                        $str .= self::_arrayToHtmlTableRecursive($val);
                    }
                } else {
                    $str .= "$val";
                }
                $str .= "</td></tr>";
            }
            $str .= "</tbody></table>";

            return $str;
        }
    }
}

return jsonToHTML::jsonToDebug($jsonText);