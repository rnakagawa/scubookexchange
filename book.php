<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0" />
	<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<link rel="stylesheet" type="type/css" href="style.css">
</head>
<body>
	<div class="navbar navbar-default nav-bar-fixed-top navbar-custom" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#" style="color: white;">SCU Book Exchange</a>
			</div>
			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav navbar-right">
					<li><a style="color: white;" href="#">Home</a></li>
					<li><a style="color: white;" href="#">Sell</a></li>
					<li class="dropdown">
					<a href="#" style="color: white;" class="dropdown-toggle" data-toggle="dropdown">About Us<b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a style="color:white;" href="#">The Developers</a></li>
							<li><a style="color:white;" href="#">Contact</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="info">
			<div class="bookImg">
				<img style="height: 150px; width: 125px;"></img>
			</div>
			<div class="details">
				<p name="title" id="title"></p>
				<p name="author" id="author"></p>
				<p name="edition" id="edition"></p>
				<p name="isbn" id="isbn"></p>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="sellers">
		</div>
	</div>

</body>
</html>
<script>
	$isbn = $("#isbn");
	// $(document).ready(function(){
	// 	xhttp.open('GET', $isbn, true);
	// 	xhttp:.send();
	// });
	$(document).ready(function(){
		$.ajax({
			type: "GET",
			dataType: "json",
			url: "getSellers.php",
			data: $isbn
		}).success(function(response){
			console.log("success");
			readSellers(response);
		});
	});
	function readSellers(response){
		alert(response);
	}
</script>