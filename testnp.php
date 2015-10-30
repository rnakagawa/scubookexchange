<head>
	<meta charset="utf-8">
	<meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0" />
	<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<link rel="stylesheet" type="type/css" href="style.css">
</head>
<html>
	<div id="result">
	</div>

</html>


<script>
	var srchTerm, srchParam;
	$(document).ready(srchTerm = get('srch'));
	$(document).ready(srchParam = get('srchP'));
	document.write(srchTerm);
	document.write(srchParam);
	function get(name){
	   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(name[1]);
	}


</script>
