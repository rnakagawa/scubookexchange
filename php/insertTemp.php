<?php
	$details=$_POST['info'];
	$title = $details['title'];
	$authorOne=$details['authorOne'];
	$authorTwo=$details['authorTwo'];
	$isbn=$details['isbn'];
	$edition=$details['edition'];
	$email=$details['email'];
	$condition=$details['condition'];
	$code=$details['id'];
	$postDate=$details['postDate'];
	$price=$details['price'];
	$postDate = date('d-m-Y', $postDate/1000);

	$dbhost="dbserver.engr.scu.edu:3306";
	$dbuser="lwong";
	$dbpass="mysqldb";
	$dbname="sdb_lwong";
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname) or die('Error connecting to db');

	if($query = $conn->prepare('INSERT INTO temp VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')){
		$query->bind_param("ssssssssss", $isbn, $title, $authorOne, $authorTwo, $edition, $email, $condition, $code, $postDate, $price);
		$query->execute();
	}
	else
		echo 'Error, statement failed';
	$conn->close();


?>