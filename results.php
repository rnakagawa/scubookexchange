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
		<form class="form-inline" role="form">
			<div class="input-group">
				<input type="text" class="form-control " placeholder="Search" name="srch-term" id="srch-term">
				<div class="input-group-btn">
					<button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
				</div>
			</div>
		</form>
	</div>
	<div id="results" class="container results" style="height: 65%; background-color: red;">
		<div class="item">
			<img src="" style="heigth: 100px; width: 100px;"></img>
			<div class="bookInfo">
				<p id="title" name="title">
					COEN 12
				</p>
				<p id="author" name="author">
					Bill Bob
				</p>
				<p id="ed" name="ed">
					13
				</p>
				<p id="isbn" name="isbn">
					0123456789
				</p>
			</div>
		</div>
	</div>

</body>
</html>
