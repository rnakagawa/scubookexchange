<?php

	require "db_config.php";
	

	//Book and Seller Info passed from foundOrNot() in main.js
	$details=$_POST['info'];
	$title = filter_var($details['title'], FILTER_SANITIZE_STRING);
	$authorOne=filter_var($details['authorOne'], FILTER_SANITIZE_STRING);

	if(array_key_exists('authorTwo', $details)){
		$authorTwo=filter_var($details['authorTwo'], FILTER_SANITIZE_STRING);
	}

	$edition=filter_var($details['edition'], FILTER_SANITIZE_NUMBER_INT);
	$condition=filter_var($details['condition'], FILTER_SANITIZE_STRING);
	$code=$details['id'];
	$postDate=$details['postDate'];
	$postDate = (string) date('Y-m-d', $postDate/1000);


	//validate key inputs
	if(filter_var($details['price'], FILTER_VALIDATE_INT)){
		$price = $details['price'];
	}
	else{
		echo ('Invalid price');
		return;
	}

	if(filter_var($details['isbn'], FILTER_VALIDATE_FLOAT)){
		$isbn=(string) $details['isbn'];
	}
	else{
		echo ('Invalid isbn');
		return;
	}
	if(filter_var($details['email'], FILTER_VALIDATE_EMAIL))
		$email=$details['email'];
	else{
		echo ('Invalid email');
		return;
	}

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
	echo 'success';
	$conn->close();


?>
