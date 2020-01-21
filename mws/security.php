<?php

date_default_timezone_set("America/Monterrey");



function validateSession( $ses ) {

    $data = array();

    $data['ok'] = false;
    $data['userId'] = 0;
    $data['companyId'] = 0;
    $data['rol'] = false;
    $data['photosFolder'] = false;
    $data['programFolder'] = false;
    $data['apprenticesFolder'] = false;
    $data['basePath'] = false;

    $sql = "Select 
                userId, companyId, rol, photosFolder, programFolder, apprenticesFolder, basePath
            From 
            usession Where id = ?";

    $args = array($ses);
    $session = get($sql, $args);

    if( $session ) {

        $data['ok'] = true;
        $data['userId'] = $session["userId"];
        $data['companyId'] = $session["companyId"];

        $data['rol'] = $session["rol"];
        $data['photosFolder'] = $session["photosFolder"];
        $data['programFolder'] = $session["programFolder"];
        $data['apprenticesFolder'] = $session["apprenticesFolder"];
        $data['basePath'] = $session["basePath"];

        $sql = "Update usession set `date` = now() Where id = ?";
        $args = array($ses);
        execute($sql, $args);

    }
    
	return $data;
}

function validateASession( $ses ) {

    $data = array();

    $data['ok'] = false;
    $data['userId'] = 0;

    if( $ses ) {

        $sql = "Select 
                    userId
                From 
                    asession
                Where
                    id = ?";

        $args = array($ses);
        $session = get($sql, $args);

        if( $session ) {

            $data['ok'] = true;
            $data['userId'] = $session["userId"];

            $sql = "Update asession set date = now() Where id = ?";
            $args = array($ses);
            execute($sql, $args);

        }
    }

	return $data;
}


function recordOperation($ses, $operacion, $data) {

    global $tabla;

    $sql = "Select 
                userId, companyId, baseDatos
            From 
                session Where id = ?";

    $args = array($ses);
    $session = get($sql, $args, true);    

    $sql = "Insert into updates 
                (companyId, userId, baseDatos, tabla, operacion, data) 
            Values
                (?, ?, ?, ?, ?, ?)";

    $args = array(
        $session["companyId"],
        $session["userId"],
        $session["baseDatos"],
        $tabla,
        $operacion,
        $data
    );                    

    execute($sql, $args, true);   
}

function randomString($length) {
    $key = '';
    $keys = array_merge(range(0, 9), range('a', 'z'), range('A', 'Z'), array('(',')','|','!','_','[',']'));

    for ($i = 0; $i < $length; $i++) {
        $key .= $keys[array_rand($keys)];
    }

    return $key;
}

function randomCode($length) {
    $key = '';
    $keys = array_merge(range(0, 9), range('a', 'z'), range('A', 'Z') );

    for ($i = 0; $i < $length; $i++) {
        $key .= $keys[array_rand($keys)];
    }

    return $key;
}

function justNumbers($eles) {
    $lit = "";

    foreach ($eles as $ele) {

        if (is_numeric($ele)) {

            if( strlen($lit) > 0 ) {
                $lit .= ",";
            }
            
            $lit .= $ele;
        }   
    }

    return $lit;
}


function getIntValueOf($name) {

    $val = null;

    if(  isset( $_REQUEST[$name] ) ) {
        $val = filter_input(INPUT_POST, $name, FILTER_SANITIZE_NUMBER_INT);

        if( !$val ) {
            $val = filter_input(INPUT_GET, $name, FILTER_SANITIZE_NUMBER_INT);
        }
    }

    return $val;
}

function getFloatValueOf($name) {

    $val = null;

    if(  isset( $_REQUEST[$name] ) ) {
        $val = filter_input(INPUT_POST, $name, FILTER_SANITIZE_NUMBER_FLOAT);
        
        if( !$val ) {
            $val = filter_input(INPUT_GET, $name, FILTER_SANITIZE_NUMBER_FLOAT);
        }
    }

    return $val;
}

function getCharValueOf($name) {

    $val = null;

    if(  isset( $_REQUEST[$name] ) ) {
        $val = filter_input(INPUT_POST, $name, FILTER_SANITIZE_SPECIAL_CHARS);
        
        if( !$val ) {
            $val = filter_input(INPUT_GET, $name, FILTER_SANITIZE_SPECIAL_CHARS);
        }
    }

    return $val;
}

function getEmailValueOf($name) {

    $val = null;
    
    if(  isset( $_REQUEST[$name] ) ) {
        $val = filter_input(INPUT_POST, $name, FILTER_SANITIZE_EMAIL);
        
        if( !$val ) {
            $val = filter_input(INPUT_GET, $name, FILTER_SANITIZE_EMAIL);
        }
    }

    return $val;
}