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
	<div class="info-container">
		<div class="info">
			<img src=""></img>
			<div class="bookInfo">
				<p class="title">Title
				</p>
				<p class="author">Bill Bob, Bobby Bill
				</p>
				<p class="ed">3
				</p>
				<p class="isbn">0123456789
				</p>
			</div>
		</div>
	</div>
	<div class="container pop sellers">
		<div class="seller ">
			<p class="header">
				PRICE
			</p>
			<p class="header">
				CONDITION
			</p>
			<p class="header">
				CONTACT SELLER
			</p>
		</div>
		<div class ="seller">
			<p class="price">
				$50
			</p>
			<p class="condition">
				good
			</p>
			<p>
				<button class="buy">Contact Seller</button>
			</p>
		</div>
		<div class ="seller">
			<p class="price">
				$50
			</p>
			<p class="condition">
				good
			</p>
			<p>
				<button class="buy">Contact Seller</button>
			</p>
		</div>
		<div class ="seller">
			<p class="price">
				$50
			</p>
			<p class="condition">
				good
			</p>
			<p>
				<button class="buy">Contact Seller</button>
			</p>
		</div>
	</div>

</body>
</html>
<script>
//	$isbn = $_GET['isbn'];
	$isbn = "0123456789";
	$(document).ready(function(){
			$.ajax({
			type: "GET",
			url: "getSellers.php",
			data: { 'isbn': $isbn.toString() }
		}).success(function(response){
			readSellers(response);
		});
	});
	function readSellers(response){
		// $.each(response, function(key, value){

		// })
		console.log(response);
	}
</script>
