<?php
	require "db_config.php";

	$code = $_GET['code'];


	$query='SELECT * FROM temp WHERE vCode = "'.$code.'"';
	$result=mysqli_query($conn, $query);
	if($result == null){
		echo('false');
	}
	else{
		$row=$result->fetch_assoc();
		$stmt = 'DELETE FROM temp WHERE vCode = "'.$code.'"';
		mysqli_query($conn, $stmt);
		if(array_key_exists('author2', $row)){
			if($query = $conn->prepare('INSERT INTO books VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')){
				$query->bind_param("ssssssssss", $row['isbn'], $row['title'], $row['author1'], $row['author2'], $row['edition'], $row['email'], $row['condtn'], $row['vCode'], $row['postDate'], $row['price']);
				$query->execute();
			}
			else
				echo 'Error preparing statement with 2 authors';
		}
		else
		{
			if($query = $conn->prepare('INSERT INTO books (isbn, title, author1, edition, email, condtn, vCode, postDate, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')){
				$query->bind_param("sssssssss", $row['isbn'], $row['title'], $row['author1'], $row['edition'], $row['email'], $row['condtn'], $row['vCode'], $row['postDate'], $row['price']);
				$query->execute();
			}
			else
				echo 'Error preparing statement with one author';	
		}
	}
	echo 'success';
	$conn->close();
?>