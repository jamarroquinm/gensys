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
            $data = addSubOption($optionId, $name, $key, $description);
        }
        else {
            setError(3001, 'Impossible to execute');
        }
    }
    else if( $ope == 'setsub' ) {

        $suboptionId = getIntValueOf('suboptionid');
        $key = getCharValueOf('ke');
        $name = getCharValueOf('na');
        $description = getCharValueOf('de');
        $type = getCharValueOf('ty');
        $xtype = getCharValueOf('xt');
        $titleform = getCharValueOf('tf');
        $table = getCharValueOf('tb');
        $related = getCharValueOf('rl');
        $icon = getCharValueOf('ic');
        $tip = getCharValueOf('ti');
        $notes = getCharValueOf('no'); 
        
        if( $suboptionId ) {
            $data = setSubOptionData($suboptionId, $key, $name, $description, $type, $xtype, $titleform, $table, $related, $icon, $tip, $notes);
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
                type,
                titleform,
                `table`,
                related
            From
                `suboption`
            Where
                id = ?";
    $args = array($id);
    $suboption = get($sql, $args, true);

    setError(0);
    return $suboption;

}

function setSubOptionData($suboptionId, $key, $name, $description, $type, $xtype, $titleform, $table, $related, $icon, $tip, $notes) {

    $sql = "Update `suboption` set
                `key` = ?,
                `name` = ?,
                `description` = ?,
                `type` = ?,
                `xtype` = ?,
                `titleform` = ?,
                `table` = ?,
                `related` = ?,
                `icon` = ?,
                `tip` = ?,
                `notes` = ?
            Where
                `id` = ?";

    $args = array($key,
        $name,
        $description,
        $type,
        $xtype,
        $titleform, 
        $table, 
        $related, 
        $icon,
        $tip,
        $notes,
        $suboptionId
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