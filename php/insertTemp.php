<?php
	$details=$_POST['info'];
	$title = $details['title'];
	$authorOne=$details['authorOne'];
	if(array_key_exists('authorTwo', $details)){
		$authorTwo=$details['authorTwo'];
	}
	$isbn=(string) $details['isbn'];
	$edition=$details['edition'];
	$email=$details['email'];
	$condition=$details['condition'];
	$code=$details['id'];
	$postDate=$details['postDate'];
	$price=$details['price'];
	$postDate = (string) date('Y-m-d', $postDate/1000);
	$dbhost="dbserver.engr.scu.edu:3306";
	$dbuser="lwong";
	$dbpass="mysqldb";
	$dbname="sdb_lwong";

	$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname) or die('Error connecting to db');
	if(array_key_exists('authorTwo', $details)){
		if($query = $conn->prepare('INSERT INTO temp VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')){
			$query->bind_param("ssssssssss", $isbn, $title, $authorOne, $authorTwo, $edition, $email, $condition, $code, $postDate, $price);
			$query->execute();
		}
		else
			echo 'Error, statement 1 failed';
	}
	else
	{
		if($query = $conn->prepare('INSERT INTO temp (isbn, title, author1, edition, email, condtn, vCode, postDate, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')){
			$query->bind_param("sssssssss", $isbn, $title, $authorOne, $edition, $email, $condition, $code, $postDate, $price);
			$query->execute();
		}
		else
			echo 'Error, statement 2 failed';	
	}
	$conn->close();


?>