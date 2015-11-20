<?php
	ini_set('display_errors','On');
	error_reporting(E_ALL);

	$dbhost="dbserver.engr.scu.edu:3306";
	$dbuser="lwong";
	$dbpass="mysqldb";
	$dbname="sdb_lwong";

	$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname) or die('Error connecting to db');
	$query = "SELECT * FROM test";
	$result=mysqli_query($conn, $query);
	$row=Mysqli_fetch_array($result, MYSQLI_ASSOC);
	
	// $result = mysql_query("show tables");
	// echo($t = mysql_fetch_array($result)[0]);
	//$query = "CREATE TABLE test (id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY)";




?>