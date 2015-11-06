<?php
	class seller{
		public $bookIsbn="";	
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
		//while($row=mysqli_fetch_array($result, MYSQLI_ASSOC)){
		while($row=$result->fetch_assoc()){
			$sellers[$i] = new seller();
			$sellers[$i]->bookIsbn = $row['isbn'];
			$sellers[$i]->email = $row['email'];
			$sellers[$i]->condition = $row['condition'];
			$sellers[$i]->price=$row['price'];
			$i++;	
		}
	echo(json_encode($sellers));
	$result->free();
	$conn->close();
	}
?>

