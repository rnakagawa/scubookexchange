<?php
  require "db_config.php";

  $check = GET['info'];
  //$ver = $check['verification'];

  if(filter_var($check['email'], FILTER_VALIDATE_EMAIL))
		$email=$check['email'];
	else{
		echo 'Invalid email';
	}
  if (strlen($check['verification']) == 5) {
    $ver = $check['verification'];
  }
  else {
    echo "Invalid verification code";
  }

	$query='SELECT * FROM books WHERE vCode = "'.$ver.'" AND email = "'.$email.'"';
	$result=mysqli_query($conn, $query);
	if($result == null){
		echo 'false';
	}
  else {
    //$row=$result->fetch_assoc();
    $stmt = $conn->prepare("DELETE FROM books WHERE vCode = ? AND email = ?");
    $stmt->bind_param('ss', $ver, $email);
    $stmt->execute();
    $stmt->close();
		//mysqli_query($conn, $stmt);
    echo 'success';
  }
	$conn->close();
?>
