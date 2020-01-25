<?php

require_once '../db.php';
require_once '../security.php';

$usr = getCharValueOf('x12wex_KYt');
$psw = getCharValueOf('ars4TK_1jk');			
$accesskey = getCharValueOf('L0913_gcvT');

$sql = "Select 
			id, 
			concat( firstName, ' ', lastName ) as userName,
			active
		From 
			admin 
		Where 
			deleted = 0 and user = ?";
$args = array($usr);
$admin = get($sql, $args);


if( $admin ) {

	if( $admin['active'] ) {

		$sql = "Select (SHA2('$psw', 224) = password) as ok from admin where id = ?";
		$args = array($admin['id']);
		$go = get($sql, $args);	
		
		if( $go['ok'] ) {

			$sql = "Select id From asession Where userId = ?";
			$args = array($admin['id']);
			$sesion = get($sql, $args);

			if( $sesion ) {
				$results['id'] = $sesion['id'];

				$sql = "Update asession set date = now() Where id = ?";
				$args = array($sesion['id']);
				$sesion = execute($sql, $args);
			}
			else {
				$ok = false;

				do {
					$sid = randomString(20);

					$sql = "Select id From asession Where id = ?";
					$args = array($sid);
					$sesion = get($sql, $args);

					if( !$sesion ) {
						$sql = "Insert into asession (id, userId) Values (?, ?)";
						$args = array($sid, $admin['id']	);
						$sesion = execute($sql, $args);
						$ok = true;
					}

				} while (!$ok);

				$results['id'] = $sid;
			}

			$results['success'] = true;
			$results['error'] = 0;
			
			$results['userName'] = $admin['userName'];
			$results['logo'] = "logo.png";

			$results['menu'] = getMenu($accesskey , $admin['id']);

			setError(0);

		}
		else {
			//El password no coincide
			setError(1002, 'Credenciales inválidas');
		}
	}
	else {
		//Usuario inactivo
		setError(1001, 'Credenciales inválidas');
	}
}
else {
	//empresa no existe
	setError(1000, 'Credenciales inválidas');
}


print json_encode($results, JSON_NUMERIC_CHECK);






function getMenu($accesskey, $userId) { 

	//The access key
	$sql = "Select
				a.moduleId,
				m.solutionId,
				m.active as moduleStatus,
				s.active as solutionStatus
			From
				access as a
			Join
				module as m on m.id = a.moduleId
			Join
				solution as s on s.id = m.solutionId
			Where
				a.access = ? and a.active = 1 and m.deleted = 0 and s.deleted = 0";

	$args = array($accesskey);
	$access = get($sql, $args);

	//Mainmenu
	$sql = "Select 
				id, `key` as 'option', name as text, tip, icon, null as options
			From 
				menu
			where
				moduleId = ? and active = 1 and deleted = 0
			Order by
				`order`";
	$args = array($access['moduleId']);
	$menus = read($sql, $args);
	$menusIds = array_column($menus, 'id');

	//Submenu options
	$sql = "Select 
				id, `key` as 'option', name as text, tip, icon, type, xtype, null as suboptions, menuId
			From 
				`option`
			Where 
				menuId in ( Select id from menu where moduleId = ? and active = 1 and deleted = 0 ) and active = 1 and deleted = 0
			Order by
				menuId, `order`";
	$args = array($access['moduleId']);
	$options = read($sql, $args);
	$optionsIds = array_column($options, 'id');

	//Subsubmenu options
	$sql = "Select 
				id, `key` as 'option', name as text, tip, icon, type, xtype, formTitle, gridTitle, related, optionId
			From 
				suboption
			Where 
				optionId in ( 
					Select 
						id
					From 
						`option`
					Where 
						menuId in ( Select id from menu where moduleId = ? and active = 1 and deleted = 0 ) and active = 1 and deleted = 0
				) and active = 1 and deleted = 0
			Order by
				optionId, `order`";
	$args = array($access['moduleId']);
	$suboptions = read($sql, $args);


	//Submenu intergartion
	foreach( $suboptions as $suboption ) {

		$key = array_search( $suboption['optionId'], $optionsIds, true );

		if( is_numeric($key) ) {
			if( $options[$key]['suboptions'] ) array_push( $options[$key]['suboptions'], $suboption );
			else  $options[$key]['suboptions'][0] = $suboption;
		}
	}


	//Menu integration
	foreach( $options as $option ) {

		$key = array_search( $option['menuId'], $menusIds, true );

		if( is_numeric($key) ) {
			if( $menus[$key]['options'] ) array_push( $menus[$key]['options'], $option );
			else  $menus[$key]['options'][0] = $option;
		}
	}

	return $menus;
}
