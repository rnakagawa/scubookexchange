<?php
	class seller{
		public $sellerId="";
		public $bookIsbn="";
		public $title="";	
		public $email="";
		public $condition="";
		public $price="";
	}
	$sellers = [];
	$i = 0;
	$dbhost="dbserver.engr.scu.edu:3306";
	$dbuser="lwong";
	$dbpass="mysqldb";
	$dbname="sdb_lwong";
	$isbn = $_GET['isbn'];
	


	$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname) or die('Error connecting to db');
	$query='SELECT * FROM books WHERE isbn='.$isbn;
	$result=mysqli_query($conn, $query);
	if($result==null){echo("error");}
	else{
		while($row=$result->fetch_assoc()){
			$sellers[$i] = new seller();
			$sellers[$i]->sellerId=$row['vCode'];
			$sellers[$i]->bookIsbn = $row['isbn'];
			$sellers[$i]->title=$row['title'];
			$sellers[$i]->edition=$row['edition'];
			$sellers[$i]->email = $row['email'];
			$sellers[$i]->condition = $row['condtn'];
			$sellers[$i]->price=$row['price'];
			$i++;	
		}
	echo(json_encode($sellers));
	$result->free();
	$conn->close();
	}
?>

