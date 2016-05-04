id: 87
name: TwitterXFormat
description: 'This snippet simply formats and links twitter feed statuses.'
category: TwitterX
properties: 'a:0:{}'

-----

/**
 * TwitterXFormat
 *
 * This snippet simply formats and links twitter feed statuses.
 *
 * TwitterX is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or (at your option) any
 * later version.
 *
 * TwitterX is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.

 * @author Stewart Orr @ Qodo Ltd <stewart@qodo.co.uk>
 * @version 1.3.7
 * @copyright Copyright 2012 by Qodo Ltd
 * With thanks to Dameon87 https://github.com/Dameon87
 */

$output = preg_replace('/(https?:\/\/[^\s"<>]+)/','<a href="$1" target="_blank" rel="nofollow">$1</a>', $input);
$output = preg_replace('/(^|[\n\s])#([^\s"\t\n\r<:]*)/is', '$1<a href="https://twitter.com/search?q=%23$2" target="_blank" rel="nofollow">#$2</a>', $output);
$output = preg_replace('/(^|[\n\s])@([^\s"\t\n\r<:]*)/is', '$1<a href="https://twitter.com/$2" target="_blank" rel="nofollow">@$2</a>', $output);
return $output;