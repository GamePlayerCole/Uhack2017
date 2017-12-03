<!DOCTYPE html>
<html>
<head>
	<title>Hungry Hub</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script type="text/javascript" src="createDirectionsLink.js"></script>
	<script src="clientSide.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body class="background">
<div class="holder">

	<div class="container-fluid margin white-text">
		<div class="row text-center">
			<div class="col-lg-12">
				<h1>Hungry Hub</h1>
				<p>Click the button below to find a random restaurant suggestion near you!</p>
			</div>
		</div>
	</div>
		
	<div class="container-fluid">
		<div class="row margin">
			<div class="hub col-lg-6 col-lg-offset-3 text-center">
				<div class="restaurant text-color">
					<img class="margin" id="pic"/>
					<a class="margin" id="name"></a>
					<div class="margin" id="address"></div>
					<div class="margin" id="phone-number"></div>
					<a class="margin" id="gmaps-link"></a>
				</div>
				<div>
					<button class="btn btn-default buttons background" id="new">Gimme A Restaurant!</button>
				</div>
				
			</div>
		</div>
	</div>

</div>

</body>
</html>