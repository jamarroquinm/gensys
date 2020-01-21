<?php


$ini = parse_ini_file("dbase.ini", true);

$date = date_create();

$month = date_format($date, "m");
$year = date_format($date, "Y");

$database = $ini['database']['database'];
$dbuser = $ini['database']['user'];
$dbpswd = $ini['database']['password'];
$servername = $ini['database']['servername'];

//$emailCredentials = $ini['email'];

$results = array();

$results['error'] = -1;
$results['success'] = false;

$dberror = false;
$dberrores = [];
$errorExtraInfo = "";
