id: 71
name: resourceMediaPath
description: 'Standalone version of a MIGX snippet that can generate subfolders in media sources.'
category: f_resources
snippet: "/**\n * @name resourceMediaPath\n * @description Dynamically calculates the upload path for a given resource\n *\n * This Snippet is meant to dynamically calculate your baseBath attribute\n * for custom Media Sources.  This is useful if you wish to shepard uploaded\n * images to a folder dedicated to a given resource.  E.g. page 123 would\n * have its own images that page 456 could not reference.\n *\n * USAGE:\n * [[resourceMediaPath? &pathTpl=`assets/businesses/{id}/` &createFolder=`1`]]\n * [[resourceMediaPath? &pathTpl=`assets/test/{breadcrumb}`]]\n * [[resourceMediaPath? &pathTpl=`assets/test/{breadcrumb}` &breadcrumbdepth=`2`]]\n *\n * PARAMETERS\n * &pathTpl string formatting string specifying the file path.\n *\t\tRelative to MODX base_path\n *\t\tAvailable placeholders: {id}, {pagetitle}, {parent}\n * &docid (optional) integer page id\n * &createFolder (optional) boolean whether or not to create\n */\n$pathTpl = $modx->getOption('pathTpl', $scriptProperties, '');\n$docid = $modx->getOption('docid', $scriptProperties, '');\n$createfolder = $modx->getOption('createFolder', $scriptProperties, false);\n$path = '';\n$createpath = false;\n\nif (empty($pathTpl)) {\n    $modx->log(MODX_LOG_LEVEL_ERROR, '[resourceMediaPath]: pathTpl not specified.');\n    return;\n}\n\nif (empty($docid) && $modx->getPlaceholder('docid')) {\n    // placeholder was set by some script\n    // warning: the parser may not render placeholders, e.g. &docid=`[[*parent]]` may fail\n    $docid = $modx->getPlaceholder('docid');\n}\nif (empty($docid)) {\n\n    //on frontend\n    if (is_object($modx->resource)) {\n        $docid = $modx->resource->get('id');\n    }\n    //on backend\n    else {\n        $createpath = $createfolder;\n        // We do this to read the &id param from an Ajax request\n        $parsedUrl = parse_url($_SERVER['HTTP_REFERER']);\n        parse_str($parsedUrl['query'], $parsedQuery);\n\n        if (isset($parsedQuery['amp;id'])) {\n            $docid = (int)$parsedQuery['amp;id'];\n        } elseif (isset($parsedQuery['id'])) {\n            $docid = (int)$parsedQuery['id'];\n        }\n    }\n}\n\nif (empty($docid)) {\n    $modx->log(MODX_LOG_LEVEL_ERROR, '[resourceMediaPath]: docid could not be determined.');\n    return;\n}\n\nif ($resource = $modx->getObject('modResource', $docid)) {\n    $path = $pathTpl;\n    $ultimateParent = '';\n    if (strstr($path, '{breadcrumb}') || strstr($path, '{ultimateparent}')) {\n        $parentids = $modx->getParentIds($docid);\n        $breadcrumbdepth = $modx->getOption('breadcrumbdepth', $scriptProperties, count($parentids));\n        $breadcrumbdepth = $breadcrumbdepth > count($parentids) ? count($parentids) : $breadcrumbdepth;\n        if (count($parentids) > 1) {\n            $parentids = array_reverse($parentids);\n            $parentids[] = $docid;\n            $ultimateParent = $parentids[1];\n        } else {\n            $ultimateParent = $docid;\n            $parentids = array();\n            $parentids[] = $docid;\n        }\n    }\n\n    if (strstr($path, '{breadcrumb}')) {\n        $breadcrumbpath = '';\n        for ($i = 1; $i <= $breadcrumbdepth; $i++) {\n            $breadcrumbpath .= $parentids[$i] . '/';\n        }\n        $path = str_replace('{breadcrumb}', $breadcrumbpath, $path);\n\n    } else {\n        $path = str_replace('{id}', $docid, $path);\n        $path = str_replace('{pagetitle}', $resource->get('pagetitle'), $path);\n        $path = str_replace('{alias}', $resource->get('alias'), $path);\n        $path = str_replace('{parent}', $resource->get('parent'), $path);\n        $path = str_replace('{ultimateparent}', $ultimateParent, $path);\n        if ($template = $resource->getOne('Template')) {\n            $path = str_replace('{templatename}', $template->get('templatename'), $path);\n        }\n        if ($user = $modx->user) {\n            $path = str_replace('{username}', $modx->user->get('username'), $path);\n        }\n    }\n\n    $fullpath = $modx->getOption('base_path') . $path;\n\n    if ($createpath && !file_exists($fullpath)) {\n\n        $permissions = octdec('0' . (int)($modx->getOption('new_folder_permissions', null, '755', true)));\n        if (!@mkdir($fullpath, $permissions, true)) {\n            $modx->log(MODX_LOG_LEVEL_ERROR, sprintf('[resourceMediaPath]: could not create directory %s).', $fullpath));\n        }\n        else{\n            chmod($fullpath, $permissions);\n        }\n    }\n\n    return $path;\n} else {\n    $modx->log(MODX_LOG_LEVEL_ERROR, sprintf('[resourceMediaPath]: resource not found (page id %s).', $docid));\n    return;\n}"
properties: 'a:0:{}'
content: "/**\n * @name resourceMediaPath\n * @description Dynamically calculates the upload path for a given resource\n *\n * This Snippet is meant to dynamically calculate your baseBath attribute\n * for custom Media Sources.  This is useful if you wish to shepard uploaded\n * images to a folder dedicated to a given resource.  E.g. page 123 would\n * have its own images that page 456 could not reference.\n *\n * USAGE:\n * [[resourceMediaPath? &pathTpl=`assets/businesses/{id}/` &createFolder=`1`]]\n * [[resourceMediaPath? &pathTpl=`assets/test/{breadcrumb}`]]\n * [[resourceMediaPath? &pathTpl=`assets/test/{breadcrumb}` &breadcrumbdepth=`2`]]\n *\n * PARAMETERS\n * &pathTpl string formatting string specifying the file path.\n *\t\tRelative to MODX base_path\n *\t\tAvailable placeholders: {id}, {pagetitle}, {parent}\n * &docid (optional) integer page id\n * &createFolder (optional) boolean whether or not to create\n */\n$pathTpl = $modx->getOption('pathTpl', $scriptProperties, '');\n$docid = $modx->getOption('docid', $scriptProperties, '');\n$createfolder = $modx->getOption('createFolder', $scriptProperties, false);\n$path = '';\n$createpath = false;\n\nif (empty($pathTpl)) {\n    $modx->log(MODX_LOG_LEVEL_ERROR, '[resourceMediaPath]: pathTpl not specified.');\n    return;\n}\n\nif (empty($docid) && $modx->getPlaceholder('docid')) {\n    // placeholder was set by some script\n    // warning: the parser may not render placeholders, e.g. &docid=`[[*parent]]` may fail\n    $docid = $modx->getPlaceholder('docid');\n}\nif (empty($docid)) {\n\n    //on frontend\n    if (is_object($modx->resource)) {\n        $docid = $modx->resource->get('id');\n    }\n    //on backend\n    else {\n        $createpath = $createfolder;\n        // We do this to read the &id param from an Ajax request\n        $parsedUrl = parse_url($_SERVER['HTTP_REFERER']);\n        parse_str($parsedUrl['query'], $parsedQuery);\n\n        if (isset($parsedQuery['amp;id'])) {\n            $docid = (int)$parsedQuery['amp;id'];\n        } elseif (isset($parsedQuery['id'])) {\n            $docid = (int)$parsedQuery['id'];\n        }\n    }\n}\n\nif (empty($docid)) {\n    $modx->log(MODX_LOG_LEVEL_ERROR, '[resourceMediaPath]: docid could not be determined.');\n    return;\n}\n\nif ($resource = $modx->getObject('modResource', $docid)) {\n    $path = $pathTpl;\n    $ultimateParent = '';\n    if (strstr($path, '{breadcrumb}') || strstr($path, '{ultimateparent}')) {\n        $parentids = $modx->getParentIds($docid);\n        $breadcrumbdepth = $modx->getOption('breadcrumbdepth', $scriptProperties, count($parentids));\n        $breadcrumbdepth = $breadcrumbdepth > count($parentids) ? count($parentids) : $breadcrumbdepth;\n        if (count($parentids) > 1) {\n            $parentids = array_reverse($parentids);\n            $parentids[] = $docid;\n            $ultimateParent = $parentids[1];\n        } else {\n            $ultimateParent = $docid;\n            $parentids = array();\n            $parentids[] = $docid;\n        }\n    }\n\n    if (strstr($path, '{breadcrumb}')) {\n        $breadcrumbpath = '';\n        for ($i = 1; $i <= $breadcrumbdepth; $i++) {\n            $breadcrumbpath .= $parentids[$i] . '/';\n        }\n        $path = str_replace('{breadcrumb}', $breadcrumbpath, $path);\n\n    } else {\n        $path = str_replace('{id}', $docid, $path);\n        $path = str_replace('{pagetitle}', $resource->get('pagetitle'), $path);\n        $path = str_replace('{alias}', $resource->get('alias'), $path);\n        $path = str_replace('{parent}', $resource->get('parent'), $path);\n        $path = str_replace('{ultimateparent}', $ultimateParent, $path);\n        if ($template = $resource->getOne('Template')) {\n            $path = str_replace('{templatename}', $template->get('templatename'), $path);\n        }\n        if ($user = $modx->user) {\n            $path = str_replace('{username}', $modx->user->get('username'), $path);\n        }\n    }\n\n    $fullpath = $modx->getOption('base_path') . $path;\n\n    if ($createpath && !file_exists($fullpath)) {\n\n        $permissions = octdec('0' . (int)($modx->getOption('new_folder_permissions', null, '755', true)));\n        if (!@mkdir($fullpath, $permissions, true)) {\n            $modx->log(MODX_LOG_LEVEL_ERROR, sprintf('[resourceMediaPath]: could not create directory %s).', $fullpath));\n        }\n        else{\n            chmod($fullpath, $permissions);\n        }\n    }\n\n    return $path;\n} else {\n    $modx->log(MODX_LOG_LEVEL_ERROR, sprintf('[resourceMediaPath]: resource not found (page id %s).', $docid));\n    return;\n}"

-----

/**
 * @name resourceMediaPath
 * @description Dynamically calculates the upload path for a given resource
 *
 * This Snippet is meant to dynamically calculate your baseBath attribute
 * for custom Media Sources.  This is useful if you wish to shepard uploaded
 * images to a folder dedicated to a given resource.  E.g. page 123 would
 * have its own images that page 456 could not reference.
 *
 * USAGE:
 * [[resourceMediaPath? &pathTpl=`assets/businesses/{id}/` &createFolder=`1`]]
 * [[resourceMediaPath? &pathTpl=`assets/test/{breadcrumb}`]]
 * [[resourceMediaPath? &pathTpl=`assets/test/{breadcrumb}` &breadcrumbdepth=`2`]]
 *
 * PARAMETERS
 * &pathTpl string formatting string specifying the file path.
 *		Relative to MODX base_path
 *		Available placeholders: {id}, {pagetitle}, {parent}
 * &docid (optional) integer page id
 * &createFolder (optional) boolean whether or not to create
 */
$pathTpl = $modx->getOption('pathTpl', $scriptProperties, '');
$docid = $modx->getOption('docid', $scriptProperties, '');
$createfolder = $modx->getOption('createFolder', $scriptProperties, false);
$tvname = $modx->getOption('tvname', $scriptProperties, '');

$path = '';
$createpath = false;

if (empty($pathTpl)) {
    $modx->log(MODX_LOG_LEVEL_ERROR, '[resourceMediaPath]: pathTpl not specified.');
    return;
}

if (empty($docid) && $modx->getPlaceholder('mediasource_docid')) {
    // placeholder was set by some script
    // warning: the parser may not render placeholders, e.g. &docid=`[[*parent]]` may fail
    $docid = $modx->getPlaceholder('mediasource_docid');
}

if (empty($docid) && $modx->getPlaceholder('docid')) {
    // placeholder was set by some script
    // warning: the parser may not render placeholders, e.g. &docid=`[[*parent]]` may fail
    $docid = $modx->getPlaceholder('docid');
}
if (empty($docid)) {

    //on frontend
    if (is_object($modx->resource)) {
        $docid = $modx->resource->get('id');
    }
    //on backend
    else {
        $createpath = $createfolder;
        // We do this to read the &id param from an Ajax request
        $parsedUrl = parse_url($_SERVER['HTTP_REFERER']);
        parse_str($parsedUrl['query'], $parsedQuery);

        if (isset($parsedQuery['amp;id'])) {
            $docid = (int)$parsedQuery['amp;id'];
        } elseif (isset($parsedQuery['id'])) {
            $docid = (int)$parsedQuery['id'];
        }
    }
}

if (empty($docid)) {
    $modx->log(MODX_LOG_LEVEL_ERROR, '[resourceMediaPath]: docid could not be determined.');
    return;
}

if ($resource = $modx->getObject('modResource', $docid)) {
    $path = $pathTpl;
    $ultimateParent = '';
    if (strstr($path, '{breadcrumb}') || strstr($path, '{ultimateparent}')) {
        $parentids = $modx->getParentIds($docid);
        $breadcrumbdepth = $modx->getOption('breadcrumbdepth', $scriptProperties, count($parentids));
        $breadcrumbdepth = $breadcrumbdepth > count($parentids) ? count($parentids) : $breadcrumbdepth;
        if (count($parentids) > 1) {
            $parentids = array_reverse($parentids);
            $parentids[] = $docid;
            $ultimateParent = $parentids[1];
        } else {
            $ultimateParent = $docid;
            $parentids = array();
            $parentids[] = $docid;
        }
    }

    if (strstr($path, '{breadcrumb}')) {
        $breadcrumbpath = '';
        for ($i = 1; $i <= $breadcrumbdepth; $i++) {
            $breadcrumbpath .= $parentids[$i] . '/';
        }
        $path = str_replace('{breadcrumb}', $breadcrumbpath, $path);
    }

    if (!empty($tvname)){
        $path = str_replace('{tv_value}', $resource->getTVValue($tvname), $path);
    }
    $path = str_replace('{id}', $docid, $path);
    $path = str_replace('{pagetitle}', $resource->get('pagetitle'), $path);
    $path = str_replace('{alias}', $resource->get('alias'), $path);
    $path = str_replace('{parent}', $resource->get('parent'), $path);
    $path = str_replace('{context_key}', $resource->get('context_key'), $path);
    $path = str_replace('{ultimateparent}', $ultimateParent, $path);
    if ($template = $resource->getOne('Template')) {
        $path = str_replace('{templatename}', $template->get('templatename'), $path);
    }
    if ($user = $modx->user) {
        $path = str_replace('{username}', $modx->user->get('username'), $path);
    }

    $fullpath = $modx->getOption('base_path') . $path;

    if ($createpath && !file_exists($fullpath)) {

        $permissions = octdec('0' . (int)($modx->getOption('new_folder_permissions', null, '755', true)));
        if (!@mkdir($fullpath, $permissions, true)) {
            $modx->log(MODX_LOG_LEVEL_ERROR, sprintf('[resourceMediaPath]: could not create directory %s).', $fullpath));
        } else {
            chmod($fullpath, $permissions);
        }
    }

    return $path;
} else {
    $modx->log(MODX_LOG_LEVEL_ERROR, sprintf('[resourceMediaPath]: resource not found (page id %s).', $docid));
    return;
}