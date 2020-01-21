<?php

require_once "../db.php";
require_once "../security.php";

$ses = getCharValueOf('IhQYw45L6i');
$ope = getCharValueOf('operation');

$data = array();
$session = validateASession( $ses );

if( $session["ok"]) {

    if( $ope == 'allsol' ) {
        $data = getAllSolutions();
    }
    else if ( $ope == 'getsol') {

        $solutionId = false;

        if( isset($_REQUEST['solutionid']) ) {
            $solutionId = getIntValueOf('solutionid');
        }

        if( $solutionId ) {
            $data = getSolutionData($solutionId);
        }
        else {
            setError(3001, 'Impossible to execute');
        }

    }
    else if ( $ope == 'getele' ) {

        $solutionId = false;
        $nodeId = false;

        if( isset($_REQUEST['solutionid']) ) {
            $solutionId = $_REQUEST['solutionid'];
        }

        if( isset($_REQUEST['node']) ) {
            $nodeId = $_REQUEST['node'];
        }

        if( $nodeId ) {
            if( $nodeId == 'root') {
                $data = getSolutionRoot($solutionId);
            }
            else {
                $data = getSolutionElements($nodeId, $solutionId);
            }
        }
        else {
            setError(3001, 'Impossible to execute');
        }
    }
    else if ( $ope == 'setsol') {

        $solutionId = false;

        $key = null;
        $name = null;
        $description = null;
        $solutionNotes = null;
        $multitenant = 0;
        $multilingual = 0;

        if( isset($_REQUEST['solutionid']) ) {
            $solutionId = $_REQUEST['solutionid'];
        }

        if( isset($_REQUEST['ke']) ) {
            $key = $_REQUEST['ke'];
        }
        
        if( isset($_REQUEST['na']) ) {
            $name = $_REQUEST['na'];
        }
        
        if( isset($_REQUEST['de']) ) {
            $description = $_REQUEST['de'];
        }
        
        if( isset($_REQUEST['sn']) ) {
            $solutionNotes = $_REQUEST['sn'];
        }

        if( isset($_REQUEST['ml']) ) {
            $tmp = $_REQUEST['ml'];
            $multitenant = ($tmp == 'true' ? 1 : 0);
        }
                
        if( isset($_REQUEST['mt']) ) {
            $tmp = $_REQUEST['mt'];
            $multilingual = ($tmp == 'true' ? 1 : 0);
        }

        if( $solutionId ) {
            setSolutionData( $solutionId, $key, $name, $description, $solutionNotes, $multitenant, $multilingual );
        }
        else {
            setError(3001, 'Impossible to execute');
        }
    }
    else if ( $ope == 'setmodnts') {

        $solutionId = false;
        $modulesNotes = null;

        if( isset($_REQUEST['solutionid']) ) {
            $solutionId = $_REQUEST['solutionid'];
        }
        
        if( isset($_REQUEST['mn']) ) {
            $modulesNotes = $_REQUEST['mn'];
        }

        if( $solutionId ) {
            setSolutionModuleNotes( $solutionId, $modulesNotes );
        }
        else {
            setError(3001, 'Impossible to execute');
        }
    }
    else if ( $ope == 'setodbnts') {

        $solutionId = false;
        $operationalDbPrefix = null;
        $operationalDbNotes = null;

        if( isset($_REQUEST['solutionid']) ) {
            $solutionId = $_REQUEST['solutionid'];
        }
        
        if( isset($_REQUEST['pr']) ) {
            $operationalDbPrefix = $_REQUEST['pr'];
        }
                
        if( isset($_REQUEST['dn']) ) {
            $operationalDbNotes = $_REQUEST['dn'];
        }

        if( $solutionId ) {
            setSolutionOperaDataBaseInfo( $solutionId, $operationalDbNotes, $operationalDbPrefix );
        }
        else {
            setError(3001, 'Impossible to execute');
        }
    }
    else if ( $ope == 'setcdbnts') {

        $solutionId = false;
        $centralDbName = null;
        $centralDbNotes = null;

        if( isset($_REQUEST['solutionid']) ) {
            $solutionId = $_REQUEST['solutionid'];
        }
        
        if( isset($_REQUEST['pr']) ) {
            $centralDbName = $_REQUEST['pr'];
        }
                
        if( isset($_REQUEST['dn']) ) {
            $centralDbNotes = $_REQUEST['dn'];
        }

        if( $solutionId ) {
            setSolutionCentralDataBaseInfo( $solutionId, $centralDbNotes, $centralDbName );
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


function getAllSolutions() {

    $sql = "Select 
                id,
                name,
                description
            From
                solution
            Where
                active = ? and deleted = ?
            Order by
                name";
    $args = array(1, 0);
    $solutions = read($sql, $args, true);

    setError(0);
    return $solutions;
}

function getSolutionRoot($id) {
    
    $sections[0]['id'] = 'M';
    $sections[0]['text'] = 'Modules';

    $sections[1]['id'] = 'O';
    $sections[1]['text'] = 'Operational Database';

    $sections[2]['id'] = 'C';
    $sections[2]['text'] = 'Central Database';

    setError(0);

    return $sections;
}

function getSolutionData($id) {

    $sql = "Select
                `key`,
                name,
                description,
                multitenant, 
                multilingual,
                solutionNotes,
                modulesNotes,
                operationalDbPrefix, 
                operationalDbNotes,
                centralDbName, 
                centralDbNotes
            From
                solution
            Where
                id = ?";
    $args = array($id);
    $solution = get($sql, $args, true);

    setError(0);
    return $solution;

}

function getSolutionElements($nodeId, $solutionId) {

    $data = null;
    $element = substr($nodeId, 0, 1);

    if( $element == 'M' or $element == 'O' or $element == 'C' ) {
        $id = $solutionId;
    }
    else {
        $id = intval( substr($nodeId, 2) );
    }

    if( $element == 'M') {
        $data = getModulesOfSolution($id);
    }
    elseif( $element == 'm') {
        $data = getMenuOfModule($id);
    }
    elseif( $element == 'n' ) {
        $data = getOptionsOfMenu($id);
    }
    elseif( $element == 'o' ) {
        $data = getSuboptionsOfOption($id);
    }

    return $data;
}

function getModulesOfSolution($id){

    $sql = "Select
                concat('m-', right( concat('00000', id), 5 ) ) as id,
                `key`,
                name as text,
                description,
                if( type = 'm', 'x-fas fa-mobile-alt', 'x-fas fa-desktop' ) as iconCls
            From
                module
            Where
                solutionId = ? and active = 1 and deleted = 0
            Order by
                name";

    $args = array($id);
    $modules = read($sql, $args, true);
    
    setError(0);
    
    return $modules;
}

function getMenuOfModule($id) {

    $sql = "Select
        concat('n-', right( concat('00000', id), 5 ) ) as id,
        id as internalId,
        name,
        description,
        name as text,
        'x-fas fa-square' as iconCls
    From
        menu
    Where
        moduleId = ? and active = 1 and deleted = 0
    Order by
        `order`";

    $args = array($id);
    $menu = read($sql, $args, true);

    setError(0);

    return $menu;
}

function getOptionsOfMenu($id) {

    $sql = "Select
        concat('o-', right( concat('00000', id), 5 ) ) as id,
        id as internalId,
        name,
        description,
        name as text,
        'x-fas fa-minus' as iconCls
    From
        `option`
    Where
        menuId = ? and active = 1 and deleted = 0
    Order by
        `order`";

    $args = array($id);
    $options = read($sql, $args, true);

    setError(0);

    return $options;
}

function getSuboptionsOfOption($id) {

    $sql = "Select
        concat('s-', right( concat('00000', id), 5 ) ) as id,
        id as internalId,
        name,
        description,
        name as text,
        1 as leaf,
        'x-fas fa-ellipsis-v' as iconCls
    From
        `suboption`
    Where
        optionId = ? and active = 1 and deleted = 0
    Order by
        `order`";

    $args = array($id);
    $suboptions = read($sql, $args, true);

    setError(0);

    return $suboptions;
}



function setSolutionData( $solutionId, $key, $name, $description, $solutionNotes, $multitenant, $multilingual ){

    $sql = "Update solution set 
                `key` = ?, `name` = ?, `description` = ?, `solutionNotes` = ?, `multitenant` = ?, `multilingual` = ?
            Where
                id = ?";
    $args = array($key, $name, $description, $solutionNotes, $multitenant, $multilingual, $solutionId);
    execute($sql, $args, true);

    setError(0);
    return true;
}

function setSolutionModuleNotes( $solutionId, $modulesNotes ) {

    $sql = "Update solution set 
                `modulesNotes` = ?
            Where
                id = ?";
    $args = array($modulesNotes, $solutionId);
    execute($sql, $args, true);

    setError(0);
    return true;
}

function setSolutionOperaDataBaseInfo( $solutionId, $operationalDbNotes, $operationalDbPrefix ) {
    
    $sql = "Update solution set 
                `operationalDbPrefix` = ?, `operationalDbNotes` = ?
            Where
                id = ?";
    $args = array($operationalDbPrefix, $operationalDbNotes, $solutionId);
    execute($sql, $args, true);

    setError(0);
    return true;
}

function setSolutionCentralDataBaseInfo( $solutionId, $centralDbNotes, $centralDbName ) {
    
    $sql = "Update solution set 
                `centralDbName` = ?, `centralDbNotes` = ?
            Where
                id = ?";
    $args = array($centralDbName, $centralDbNotes, $solutionId);
    execute($sql, $args, true);

    setError(0);
    return true;
}