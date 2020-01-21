<?php

require_once "../db.php";
require_once "../security.php";

$accesskey = getCharValueOf('trJu43_1jcr');

$data = array();

$data['success'] = false;
$data['error'] = 0;
$data['errorMessage'] = 0;

$sql = "Select
            a.name,
            a.description,
            a.background,
            m.apiFolder,
            a.contentSubfolder,
            if( isnull(a.loginScript), m.loginScript, a.loginScript ) loginScript,
            m.unlockScript,
            m.changeScript
        From
            access as a
        Join
            module as m on m.id = a.moduleId
        Where
            a.access = ? and a.active = 1";

$args = array($accesskey);
$access = get($sql, $args, true);

if( $access ) {

    $data['success'] = true;

    $data['data']['company'] = $access['name'];
    $data['data']['description'] = $access['description'];

    $data['data']['subpath'] = $access['contentSubfolder'] ;
    $data['data']['background'] = $access['background'];
    $data['data']['module'] = $access['apiFolder'];
    $data['data']['login'] = $access['loginScript'];
    $data['data']['unlock'] = $access['unlockScript'];
    $data['data']['password'] = $access['changeScript'];
}
else {
    $data['error'] = 5000;
    $data['errorMessage'] = 'No access';
}


print json_encode($data, JSON_NUMERIC_CHECK);

?>