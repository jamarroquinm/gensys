<?php

require_once "../db.php";
require_once "../security.php";

$ses = getCharValueOf('IhQYw45L6i');
$ope = getCharValueOf('operation');

$data = array();
$session = validateASession( $ses );

if( $session["ok"]) {

    if( $ope == 'getmen' ) {

        $menuId = false;

        if( isset($_REQUEST['menuid']) ) $menuId = $_REQUEST['menuid'];

        if( $menuId ) {
            $data = getMenuData($menuId);
        }
        else {
            setError(3001, 'Impossible to execute');
        }
    }
    else if( $ope == 'setmen' ) {

        $menuId = false;
        $key = false;
        $name = false;
        $description = false;
        $icon = false;
        $tip = false;
        $notes = false;

        if( isset($_REQUEST['menuid']) ) $menuId = $_REQUEST['menuid']; 
        if( isset($_REQUEST['ke']) ) $key = $_REQUEST['ke']; 
        if( isset($_REQUEST['na']) ) $name = $_REQUEST['na']; 
        if( isset($_REQUEST['de']) ) $description = $_REQUEST['de']; 
        if( isset($_REQUEST['ic']) ) $icon = $_REQUEST['ic']; 
        if( isset($_REQUEST['ti']) ) $tip = $_REQUEST['ti']; 
        if( isset($_REQUEST['no']) ) $notes = $_REQUEST['no']; 
        
        if( $menuId ) {
            $data = setMenuData($menuId, $key, $name, $description, $icon, $tip, $notes);
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


function getMenuData($id) {

    $sql = "Select
                `key`,
                name,
                description,
                icon,
                tip,
                notes
            From
                menu
            Where
                id = ?";
    $args = array($id);
    $menu = get($sql, $args, true);

    setError(0);
    return $menu;

}


function setMenuData($menuId, $key, $name, $description, $icon, $tip, $notes) {

    $sql = "Update menu set
                `key` = ?,
                `name` = ?,
                `description` = ?,
                `icon` = ?,
                `tip` = ?,
                `notes` = ?
            Where
                `id` = ?";

    $args = array($key,
        $name,
        $description,
        $icon,
        $tip,
        $notes,
        $menuId
    );
    
    execute($sql, $args, true);
    setError(0);

    return true;
}