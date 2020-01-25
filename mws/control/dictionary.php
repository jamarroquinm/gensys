<?php

require_once "../db.php";
require_once "../security.php";


$ses = getCharValueOf('IhQYw45L6i');
$ope = getCharValueOf('operation');
$code = getCharValueOf('trJu43_1jcr');

$data = array();
$session = validateASession( $ses );

if( $session["ok"] ) {

    $json = strip_tags(file_get_contents('php://input'));
    $input = json_decode($json);

    // $userId = $session['userId'];
    // $companyId = $session['companyId'];

    if( $ope == 'read' ) {

        $data = readData($companyId);

    }
    else if( $ope == 'cbo' ) {

        $data = readDataCombo($companyId);

    }
    else if ( $ope == 'create' ) {
        
        $go = ( ( array_key_exists( 'firstName', $input ) ? true : false ) and
            ( array_key_exists( 'lastName', $input ) ? true : false ) and
            ( array_key_exists( 'email', $input ) ? true : false ) and
            ( array_key_exists( 'mobile', $input ) ? true : false ) and
            ( array_key_exists( 'phone', $input ) ? true : false ) and
            ( array_key_exists( 'rol', $input ) ? true : false ) and
            ( array_key_exists( 'password', $input ) ? true : false ) );
            
        if( $go ) {
            $data = createRecord($companyId, $userId, $input);

            if( !$data ){
                setError(3002, 'Impossible to perform');
            }
        }
        else {
            setError(3001, 'Impossible to perform');
        }
    }
    else if ( $ope == 'update' ) {

        $go = ( ( array_key_exists( 'id', $input ) ? true : false ) and
            ( array_key_exists( 'firstName', $input ) ? true : false ) and
            ( array_key_exists( 'lastName', $input ) ? true : false ) and
            ( array_key_exists( 'email', $input ) ? true : false ) and
            ( array_key_exists( 'mobile', $input ) ? true : false ) and
            ( array_key_exists( 'phone', $input ) ? true : false ) and
            ( array_key_exists( 'rol', $input ) ? true : false ) );

        if( $go ) {
            $data = updateRecord($companyId, $userId, $input);

            if( !$data ){
                setError(3002, 'Impossible to perform');
            }
        }
        else {
            setError(3001, 'Impossible to perform');
        }
    }
    else if ( $ope == 'delete' ) {

        $go = array_key_exists( 'id', $input );

        if( $go ) {
            $data = deleteRecord($companyId, $userId, $input);

            if( !$data ){
                setError(3002, 'Impossible to perform');
            }
        }
        else {
            setError(3001, 'Impossible to perform');
        }
    }
    else if ( $ope == 'setstatus' ) {
        
        $go = array_key_exists( 'id', $input );

        if( $go ) {
            $data = setStatus($companyId, $userId, $input);

            if( !$data ){
                setError(3002, 'Impossible to perform');
            }
        }
        else {
            setError(3001, 'Impossible to perform');
        }
    }
    else if ( $ope == 'val' ) {

        $id = getIntValueOf('id');
        $lanId = getCharValueOf('lanid');

        if( !$id ) $id = 0;

        if( $id >= 0 and $lanId ) {
            $data = validateLanId($id, $lanId, $companyId);

            if( !$data ){
                setError(3002, 'Impossible to perform');
            }
        }
        else {
            setError(3001, 'Impossible to perform');
        }
    }
    else if ( $ope == 'valema' ) {

        $id = getIntValueOf('id');
        $email = getCharValueOf('email');

        if( !$id ) $id = 0;

        if( $id >= 0 and $email ) {
            $data = validateEmail($id, $email, $companyId);

            if( !$data ){
                setError(3002, 'Impossible to perform');
            }
        }
        else {
            setError(3001, 'Impossible to perform');
        }
    }
    else {
        setError(3000, 'Impossible to perform');
    }
}
else {
    setError(2001, 'Invalid session');
}



//*******************************************************************************
// T E R M I N A R

$results['data'] = $data;
print json_encode($results, JSON_NUMERIC_CHECK);




//*******************************************************************************
// F U N C I O N E S

function readData($companyId) {

    $sql = "Select
                id,
                lanId,
                firstName,
                lastName,
                email,
                mobile,
                phone,
                rol,
                active
            From
                user
            Where
                companyId = ? and active = 1 and deleted = 0
            Order by
                lastName, firstName";
    $args = array($companyId);
    $records = read($sql, $args);

    setError(0);
    return $records;
}

function readDataCombo($companyId) {

    $sql = "Select
                id,
                concat( lastName, ', ', firstName ) as 'name'
            From
                `user`
            Where
                companyId = ? and active = 1 and deleted = 0
            Order by
                lastName, firstName";
    $args = array($companyId);
    $records = read($sql, $args);

    setError(0);
    return $records;
}


function createRecord($companyId, $userId, $input) {

    $sql = "Select count(id) as count from user where email = ? and deleted = 0";
    $args = array($input->email);
    $email = get($sql, $args);

    if( $email['count'] == 0 ) {

        $rol = ( $input->rol == 'a' ? 'a' : 'u' );

        $sql = "Insert into user
                    (companyId, lanId, firstName, lastName, email, mobile, phone, rol, `password`, _user_updated )
                Values
                    (?,?,?,?,?, ?,?,?,sha2(?,224),?)";

        $args = array(
            $companyId,
            $input->lanId,
            $input->firstName,
            $input->lastName,
            $input->email,
            $input->mobile,
            $input->phone,
            $rol,
            $input->password,
            $userId
        );
        $user['id'] = execute($sql, $args);
        $user['rol'] = $rol;
    }
    else {
        $user = false;
    }
    
    setError(0);
    return $user;

}

function updateRecord($companyId, $userId, $input) {

    $sql = "Select count(id) as count from user where email = ? and id != ? and deleted = 0";
    $args = array($input->email, $input->id);
    $email = get($sql, $args);

    if( $email['count'] == 0) {

        $rol = ( $input->rol == 'a' ? 'a' : 'u' );

        $sql = "Update user set
                    lanId = ?, firstName = ?, lastName = ?, email = ?, mobile = ?, phone = ?, rol = ?, _user_updated = ?
                Where
                    id = ? and companyId= ?";

        $args = array(
            $input->lanId,
            $input->firstName,
            $input->lastName,
            $input->email,
            $input->mobile,
            $input->phone,
            $rol,
            $userId,
            $input->id,
            $companyId
        );
        execute($sql, $args);

        if( $input->password ) {
            $sql = "Update user set
                        password = sha2(?,224)
                    Where
                        id = ? and companyId= ?";
            $args = array($input->password,$input->id, $companyId);
        }

        $coordinator = true;
    }
    else {
        $coordinator = false;
    }
    
    setError(0);
    return $coordinator;
}

function deleteRecord($companyId, $userId, $input) {

    $sql = "Update user set deleted = 1, active = 0, _user_updated = ? Where id = ? and companyId= ?";
    $args = array(
        $userId,
        $input->id,
        $companyId
    );
    execute($sql, $args);
    
    setError(0);
    return true;
}

function setStatus($companyId, $userId, $input) {

    $sql = "Select active from user where id = ? and companyId = ? and deleted = 0";
    $args = array( $input->id, $companyId);
    $user = get($sql, $args);

    if( $user ) {
    
        $estatus = ( $user['active'] ? 0 : 1 );

        $sql = "Update user set active = ?, _user_updated = ? Where id = ? and companyId= ?";
        $args = array(
            $estatus,
            $userId,
            $input->id,
            $companyId
        );
        execute($sql, $args);

        $sql = "Select id, active from user where id = ? and companyId = ?";
        $args = array($input->id, $companyId);
        $user = get($sql, $args);
    
    }
    else {
        $user = true;
    }

    setError(0);
    return $user;
}

function validateLanId($id, $lanId, $companyId) {

    $resolut = false;

    $sql = "Select 
                Count(id) as found
            From 
                user
            Where 
                companyId = ? and lanId = ? and id != ?";
    $args = array($companyId, $lanId, $id);
    $lanIds = get($sql, $args);

    if($lanIds['found'] > 0) {
        $resolut = array( 'valid' => false );
    }
    else {
        $resolut = array( 'valid' => true );
    }

    setError(0);
    return $resolut;
}

function validateEmail($id, $email, $companyId) {

    $resolut = false;

    $sql = "Select 
                Count(id) as found
            From 
                user
            Where 
                companyId = ? and email = ? and id != ?";
    $args = array($companyId, $email, $id);
    $lanIds = get($sql, $args);

    if($lanIds['found'] > 0) {
        $resolut = array( 'valid' => false );
    }
    else {
        $resolut = array( 'valid' => true );
    }

    setError(0);
    return $resolut;
}