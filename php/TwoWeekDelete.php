<?php
	require "db_config.php";

	$query = 'DELETE FROM books WHERE postDate < DATE_SUB(NOW(), INTERVAL 14 DAY)';
	$result=mysqli_query($conn, $query);
	if($result==null){echo("error");}
	$conn->close();
?>