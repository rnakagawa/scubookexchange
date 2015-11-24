<?php

if(!isset($_POST['submit']))
{
	echo "error, you need to submit the form!";
}

$isbn = $_POST['isbnInput'];
$email = $_POST['email'] . "@scu.edu";
$price = $_POST['price'];
$title = $_POST['title'];
$author = $_POST['author'];
$author2 = $_POST['author2'];
$edition = $_POST['edition'];
$condition = $_POST['condition'];
$verificationCode = $_POST['verificationCode'];

if(empty($isbn)||empty($email)||empty($price))
{
	echo "<p style=\"color: red;\">*",'You have forgot one or more of the required fields';,"</p>\n\n";
	exit;
}

if(empty($verificationCode))
{
	echo "<p style=\"color: red;\">*",'You did not enter a verification code';,"</p>\n\n";
	exit;
}

if(empty($title)&&empty($author)&&empty($edition))	//this is just to tell which form called this php
{
	$form = 1; // if form = 1 that means that "This came from the submit form"
}

	$dbhost="dbserver.engr.scu.edu:3306";
	$dbuser="lwong";
	$dbpass="mysqldb";
	$dbname="sdb_lwong";
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname) or die('Error connecting to db');
	$db_found = mysql_select_db($dbname, $dbhost);

if ($db_found && $form) 
{
	$SQL = "INSERT INTO $temp(isbn, email, price, condition) VALUES ($isbn, $email, $price, $condition)";
	$result = mysql_query($SQL);
	mysql_close($conn);
	echo "your data has been entered";
}

else if ($db_found && !$form)
{
	$SQL = "INSERT INTO $dbname(isbn, email, price, title, author1, edition, condition) VALUES ($isbn, $email, $price, $condition, $title, $author, $author2, $edition, $condition)";
	$result = mysql_query($SQL);
	mysql_close($conn);
	echo "your data has been entered";
}

else 
{
	print "Database NOT Found ";
	mysql_close($conn);
}
?>