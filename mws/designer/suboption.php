<?php

require_once "../db.php";
require_once "../security.php";

$ses = getCharValueOf('IhQYw45L6i');
$ope = getCharValueOf('operation');

$data = array();
$session = validateASession( $ses );

if( $session["ok"]) {

    if( $ope == 'getsub' ) {

        $suboptionid = getIntValueOf('suboptionid');

        if( $suboptionid ) {
            $data = getSubOptionData($suboptionid);
        }
        else {
            setError(3001, 'Impossible to execute');
        }
    }
    else if( $ope == 'addsub' ) {
        
        $optionId = getIntValueOf('iid');
        $key = getCharValueOf('key');
        $name = getCharValueOf('name');
        $description = getCharValueOf('description');

        if( $optionId and $key and $name) {
            $data = addOption($optionId, $name, $key, $description);
        }
        else {
            setError(3001, 'Impossible to execute');
        }
    }
    else if( $ope == 'setsub' ) {

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
            $data = setoptionData($optionId, $key, $name, $description, $xtype, $icon, $tip, $notes);
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


function getSubOptionData($id) {

    $sql = "Select
                id,
                tableId,
                type,
                `key`,
                name,
                description,
                xtype,
                icon,
                tip,
                notes,
                xtype,
                titleform,
                dataform,
                store
            From
                `suboption`
            Where
                id = ?";
    $args = array($id);
    $suboption = get($sql, $args, true);

    setError(0);
    return $suboption;

}

function setoptionData($optionId, $key, $name, $description, $xtype, $icon, $tip, $notes) {

    $sql = "Update `suboption` set
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

function addSubOption($optionId, $name, $key, $description) {
    
    $sql = "Insert into `suboption` (optionId, `key`, name, description) values (?,?,?,?)";
    $args = array($optionId, $key, $name, $description);
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
                `suboption`
            Where
                id = ?";
    $args = array($id);
    $option = get($sql, $args);;

    setError(0);

    return $option;
}