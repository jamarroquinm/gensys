<?php

require_once "../db.php";
require_once "../security.php";

$ses = getCharValueOf('IhQYw45L6i');
$ope = getCharValueOf('operation');

$data = array();
$session = validateASession( $ses );

if( $session["ok"]) {

    if( $ope == 'getopt' ) {

        $optionId = getIntValueOf('optionid');

        if( $optionId ) {
            $data = getOptionData($optionId);
        }
        else {
            setError(3001, 'Impossible to execute');
        }
    }
    else if( $ope == 'addopt' ) {
        
        $menuId = getIntValueOf('iid');
        $key = getCharValueOf('key');
        $name = getCharValueOf('name');
        $description = getCharValueOf('description');

        if( $menuId and $key and $name) {
            $data = addOption($menuId, $name, $key, $description);
        }
        else {
            setError(3001, 'Impossible to execute');
        }
    }
    else if( $ope == 'setopt' ) {

        $optionId = false;
        $key = false;
        $name = false;
        $description = false;
        $icon = false;
        $tip = false;
        $xtype = false;
        $notes = false;

        if( isset($_REQUEST['optionid']) ) $optionId = $_REQUEST['optionid']; 
        if( isset($_REQUEST['ke']) ) $key = $_REQUEST['ke']; 
        if( isset($_REQUEST['na']) ) $name = $_REQUEST['na']; 
        if( isset($_REQUEST['de']) ) $description = $_REQUEST['de']; 
        if( isset($_REQUEST['xt']) ) $xtype = $_REQUEST['xt']; 
        if( isset($_REQUEST['ic']) ) $icon = $_REQUEST['ic']; 
        if( isset($_REQUEST['ti']) ) $tip = $_REQUEST['ti']; 
        if( isset($_REQUEST['no']) ) $notes = $_REQUEST['no']; 
        
        if( $optionId ) {
            $data = setOptionData($optionId, $key, $name, $description, $xtype, $icon, $tip, $notes);
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


function getOptionData($id) {

    $sql = "Select
                `key`,
                name,
                description,
                xtype,
                icon,
                tip,
                notes
            From
                `option`
            Where
                id = ?";
    $args = array($id);
    $option = get($sql, $args, true);

    setError(0);
    return $option;

}

function setOptionData($optionId, $key, $name, $description, $xtype, $icon, $tip, $notes) {

    $sql = "Update `option` set
                `key` = ?,
                `name` = ?,
                `description` = ?,
                `xtype` = ?,
                `icon` = ?,
                `tip` = ?,
                `notes` = ?
            Where
                `id` = ?";

    $args = array($key,
        $name,
        $description,
        $xtype,
        $icon,
        $tip,
        $notes,
        $optionId
    );
    
    execute($sql, $args, true);
    setError(0);

    return true;
}

function addOption($menuId, $name, $key, $description) {
    
    $sql = "Insert into `option` (menuId, `key`, name, description) values (?,?,?,?)";
    $args = array($menuId, $key, $name, $description);
    $id = execute($sql, $args);

    $sql = "Select
                concat('o-', right( concat('00000', id), 5 ) ) as id,
                id as internalId,
                `key`,
                name,
                description,
                name as text,
                'x-fas fa-minus' as iconCls
            From
                `option`
            Where
                id = ?";
    $args = array($id);
    $option = get($sql, $args);;

    setError(0);

    return $option;
}