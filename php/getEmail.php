<?php
	$sellerId = $_POST['sellerId'];
	$dbhost="dbserver.engr.scu.edu:3306";
	$dbuser="lwong";
	$dbpass="mysqldb";
	$dbname="sdb_lwong";
	


	$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname) or die('Error connecting to db');
	$query='SELECT email FROM books WHERE vCode= "'.$sellerId.'"';
	$result=mysqli_query($conn, $query);
	if($result==null){echo("error");}
	else{
		$data=$result->fetch_assoc();
		echo($data['email']);
		$result->free();
		$conn->close();
	}
?>