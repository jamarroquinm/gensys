<?php

require_once 'ini.php';

function setError($error, $mensaje = 'Error') {

    global $results, $dberror, $dberrores, $errorExtraInfo;

    if( $dberror ) {
        $results['success'] = false;
        $results['error'] = -999;
        $results['info'] = 'Error de base de datos';
        $results['dberrores'] = $dberrores;
    }
    else {
        if( $error == 0 ) {
            $results['error'] = 0;
            $results['success'] = true;
        }
        else {
            $results['error'] = $error;
            $results['success'] = false;
            $results['info'] = $mensaje . ( ($errorExtraInfo) ? $errorExtraInfo : '' );
            $errorExtraInfo = "";
        }
    }
}

function setErrorExtraInfo($info) {
    
    global $errorExtraInfo;
    $errorExtraInfo = $info;
}

function read($sql, $args) {

	global $database, $dbuser, $dbpswd, $servername, $results, $dberror, $dberrores;
	$empty = array();

	if( !$dberror ) {
		try { 
			$PDO = new PDO("mysql:charset=utf8mb4;host=$servername;dbname=$database", $dbuser, $dbpswd);
			$stmt = $PDO->prepare($sql);
				
			try { 
				if( $stmt->execute($args) ) {
					$stmt->setFetchMode(PDO::FETCH_ASSOC);
					$registros = $stmt->fetchAll();
					return $registros;
				}
				else {
					$dberror = true;
					array_push($dberrores,
						array(
							"sql" => $sql,
							"code" => $stmt->errorCode(),
							"info" => $stmt->errorInfo()
						)
					);
				}
			} 
			catch(PDOExecption $e) { 
				$dberror = true;
				array_push($dberrores,
					array(
						"sql" => $sql,
						"code" => $e->getCode(),
						"info" => $e->getMessage()
					)
				);
			}
		}
		catch( PDOExecption $e ) {
			$dberror = true;
			array_push($dberrores,
				array(
					"sql" => $sql,
					"code" => $e->getCode(),
					"info" => $e->getMessage()
				)
			);
		}
	}
	else {
		$dberror = true;
		array_push($dberrores,
			array(
				"sql" => $sql,
				"code" => -2,
				"info" => 'Error previo'
			)
		);
	}

	return $empty;
}

function get($sql, $args) {

	global $database, $dbuser, $dbpswd, $servername, $results, $dberror, $dberrores;
	
	$empty = array();

	if( !$dberror ) {
		try { 
			$PDO = new PDO("mysql:charset=utf8mb4;host=$servername;dbname=$database", $dbuser, $dbpswd);
			$stmt = $PDO->prepare($sql);
				
			try { 
				if( $stmt->execute($args) ) {
					$stmt->setFetchMode(PDO::FETCH_ASSOC);
					$registro = $stmt->fetch();
					return $registro;
				}
				else {
					$dberror = true;
					array_push($dberrores,
						array(
							"sql" => $sql,
							"code" => $stmt->errorCode(),
							"info" => $stmt->errorInfo()
						)
					);
				}
			} 
			catch(PDOExecption $e) { 
				$dberror = true;
				array_push($dberrores,
					array(
						"sql" => $sql,
						"code" => $e->getCode(),
						"info" => $e->getMessage()
					)
				);
			}
		}
		catch( PDOExecption $e ) {
			$dberror = true;
			array_push($dberrores,
				array(
					"sql" => $sql,
					"code" => $e->getCode(),
					"info" => $e->getMessage()
				)
			);
		}
	}
	else {
		$dberror = true;
		array_push($dberrores,
			array(
				"sql" => $sql,
				"code" => -2,
				"info" => 'Error previo'
			)
		);
	}

	return $empty;
}

function execute($sql, $args) {

	global $database, $dbuser, $dbpswd, $servername, $results, $dberror, $dberrores;
	
	$empty = array();

	if( !$dberror ) {
		try {

			$PDO = new PDO("mysql:charset=utf8mb4;host=$servername;dbname=$database", $dbuser, $dbpswd);
			$stmt = $PDO->prepare($sql); 

			try {

				$PDO->beginTransaction(); 
				if( $stmt->execute( $args ) ) {

					$ultimo = $PDO->lastInsertId(); 
					$PDO->commit();
					return $ultimo;
				}
				else {
					$dberror = true;
					array_push($dberrores,
						array(
							"sql" => $sql,
							"code" => $stmt->errorCode(),
							"info" => $stmt->errorInfo()
						)
					);
					$PDO->rollback();
				}
			} 
			catch(PDOExecption $e) { 
				$dberror = true;
				array_push($dberrores,
					array(
						"sql" => $sql,
						"code" => $e->getCode(),
						"info" => $e->getMessage()
					)
				);
				$PDO->rollback();
			}
		}
		catch( PDOExecption $e ) {
			$dberror = true;
			array_push($dberrores,
				array(
					"sql" => $sql,
					"code" => $e->getCode(),
					"info" => $e->getMessage()
				)
			);
			$PDO->rollback();
		}
	}
	else {
		$dberror = true;
		array_push($dberrores,
			array(
				"sql" => $sql,
				"code" => -2,
				"info" => 'Error previo'
			)
		);
	}

	return $empty;
}

function validateShortName($sql, $args, $id) {

	global $database, $dbuser, $dbpswd, $servername, $results, $dberror, $dberrores;
	
	$empty = array();

	if( !$dberror ) {
		try { 
			$PDO = new PDO("mysql:charset=utf8mb4;host=$servername;dbname=$database", $dbuser, $dbpswd);
			$stmt = $PDO->prepare($sql);
				
			try { 
				$stmt->execute($args);
				$res = $stmt->fetch();

				if( $res['cant'] == 0 ) {
					$results['valida'] = true;
				}
				else {
					if( $id > 0 ) {
						if( $res['id'] == $id ) {
							$results['valida'] = true;
						}
						else {
							$results['valida'] = false;
						}
					}
					else {
						$results['valida'] = false;
					}
				}

				return true;
			} 
			catch(PDOExecption $e) { 
				$dberror = true;
				array_push($dberrores,
					array(
						"sql" => $sql,
						"code" => $e->getCode(),
						"info" => $e->getMessage()
					)
				);
			}
		}
		catch( PDOExecption $e ) {
			$dberror = true;
			array_push($dberrores,
				array(
					"sql" => $sql,
					"code" => $e->getCode(),
					"info" => $e->getMessage()
				)
			);
		}
	}
	else {
		$dberror = true;
		array_push($dberrores,
			array(
				"sql" => $sql,
				"code" => -2,
				"info" => 'Error previo'
			)
		);
	}

	return $empty;
}
