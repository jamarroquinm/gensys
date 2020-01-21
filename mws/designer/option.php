<?php

require_once "../db.php";
require_once "../security.php";

$ses = getCharValueOf('IhQYw45L6i');
$ope = getCharValueOf('operation');

$data = array();
$session = validateASession( $ses );

if( $session["ok"]) {

    if( $ope == 'getopt' ) {

        $optionId = false;

        if( isset($_REQUEST['optionid']) ) $optionId = $_REQUEST['optionid'];

        if( $optionId ) {
            $data = getoptionData($optionId);
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


function getoptionData($id) {

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


function setoptionData($optionId, $key, $name, $description, $xtype, $icon, $tip, $notes) {

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