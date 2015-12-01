<?php

	$dbhost="dbserver.engr.scu.edu:3306";
	$dbuser="lwong";
	$dbpass="mysqldb";
	$dbname="sdb_lwong";
	
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname) or die('Error connecting to db');
	$query = 'DELETE FROM books WHERE postDate < DATE_SUB(NOW(), INTERVAL 14 DAY)';
	$result=mysqli_query($conn, $query);
	if($result==null){echo("error");}
	$result->free();
	$conn->close();
?>