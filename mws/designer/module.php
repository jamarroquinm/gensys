<?php

require_once "../db.php";
require_once "../security.php";

$ses = getCharValueOf('IhQYw45L6i');
$ope = getCharValueOf('operation');

$data = array();
$session = validateASession( $ses );

if( $session["ok"]) {

    if( $ope == 'getmod' ) {

        $moduleId = false;

        if( isset($_REQUEST['moduleid']) ) $moduleId = $_REQUEST['moduleid'];

        if( $moduleId ) {
            $data = getModuleData($moduleId);
        }
        else {
            setError(3001, 'Impossible to execute');
        }
    }
    else if( $ope == 'setmod' ) {

        $modeuleid = false;
        $key = false;
        $name = false;
        $description = false;
        $type = false;
        $apiFolder = false;
        $contentFolder = false;
        $loginScript = false;
        $unlockScript = false;
        $changeScript = false;
        $notes = false;

        if( isset($_REQUEST['modeuleid']) ) $moduleId = $_REQUEST['modeuleid']; 
        if( isset($_REQUEST['ke']) ) $key = $_REQUEST['ke']; 
        if( isset($_REQUEST['na']) ) $name = $_REQUEST['na']; 
        if( isset($_REQUEST['de']) ) $description = $_REQUEST['de']; 
        if( isset($_REQUEST['ty']) ) $type = $_REQUEST['ty']; 
        if( isset($_REQUEST['af']) ) $apiFolder = $_REQUEST['af']; 
        if( isset($_REQUEST['cf']) ) $contentFolder = $_REQUEST['cf']; 
        if( isset($_REQUEST['ls']) ) $loginScript = $_REQUEST['ls']; 
        if( isset($_REQUEST['us']) ) $unlockScript = $_REQUEST['us']; 
        if( isset($_REQUEST['cs']) ) $changeScript = $_REQUEST['cs']; 
        if( isset($_REQUEST['no']) ) $notes = $_REQUEST['no']; 
        
        if( $moduleId ) {
            $data = setModuleData($moduleId, $key, $name, $description, $type, $apiFolder, $contentFolder, $loginScript,$unlockScript, $changeScript, $notes);
        }
        else {
            setError(3001, 'Impossible to execute');
        }
    }
    else if( $ope == 'addmod' ) {
        
        $sid = getIntValueOf('sid');
        $key = getCharValueOf('key');
        $type = getCharValueOf('type');
        $name = getCharValueOf('name');
        $description = getCharValueOf('description');

        if( $sid and $key and $name) {
            $data = addModule($sid, $key, $name, $description, $type);
        }
        else {
            setError(3001, 'Impossible to execute');
        }
    }
    else {
        setError(3000, 'Impossible to proceed');
    }
}
else {
    setError(2001, 'Invalid');
}


//*******************************************************************************
// T E R M I N A R


$results['data'] = $data;

print json_encode($results, JSON_NUMERIC_CHECK);






//*******************************************************************************
// F U N C I O N E S


function getModuleData($id) {

    $sql = "Select
                `key`,
                name,
                description,
                type, 
                apiFolder,
                contentFolder,
                loginScript,
                unlockScript, 
                changeScript,
                notes
            From
                module
            Where
                id = ?";
    $args = array($id);
    $module = get($sql, $args, true);

    setError(0);
    return $module;

}

function setModuleData($moduleId, $key, $name, $description, $type, $apiFolder, $contentFolder, $loginScript, $unlockScript, $changeScript, $notes) {

    $sql = "Update module set
                `key` = ?,
                `name` = ?,
                `description` = ?,
                `type` = ?,
                `apiFolder` = ?,
                `contentFolder` = ?,
                `loginScript` = ?,
                `unlockScript` = ?,
                `changeScript` = ?,
                `notes` = ?
            Where
                `id` = ?";

    $args = array($key,
        $name,
        $description,
        $type,
        $apiFolder,
        $contentFolder,
        $loginScript,
        $unlockScript,
        $changeScript,
        $notes,
        $moduleId
    );
    
    execute($sql, $args, true);

    $sql = "Select
                if( type = 'm', 'x-fas fa-mobile-alt', 'x-fas fa-desktop' ) as iconCls
            From
                module
            Where
                id = ?";
    $args = array($moduleId);
    $module = get($sql, $args, true);

    setError(0);

    return $module;
}

function addModule($solutionId, $key, $name, $description, $type) {

    $sql = "Insert into module (languageId, solutionId, `key`, name, description, type) values (?,?,?,?,?,?)";
    $args = array( 'es', $solutionId, $key, $name, $description, $type);
    $id = execute($sql, $args);

    $sql = "Select
                concat('m-', right( concat('00000', id), 5 ) ) as id,
                `key`,
                name as text,
                description,
                if( type = 'm', 'x-fas fa-mobile-alt', 'x-fas fa-desktop' ) as iconCls
            From
                module
            Where
                id = ?";

    $args = array($id);
    $module = get($sql, $args);

    setError(0);

    return $module;
}