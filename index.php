<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Modules Type</title>
<link rel="stylesheet" href="lib/vendor/bootstrap/bootstrap.min.css">
<link rel="stylesheet" href="css/app.css" />

</head>
<body>

<div id="container">
	<div>
		<label>Nome:</label><br />
		<input type="text" id="txtNome" name="txtNome" />
		<input type="hidden" id="idPessoa" name="idPessoa" />
	</div>

	<button id="btConsulta">Consultar</button>

	<div id="data-panel"></div>
</div>

<div id="modal">
	<h1>Resultados</h1>
	<div>
		<a id="closeModal">X</a>
	</div>
	<ul id="modal_ul"></ul>
</div>

<script src="lib/vendor/jquery/jquery.js"></script>
<script src="lib/vendor/bootstrap/bootstrap.min.js"></script>
<script src="lib/app/js.js" type="module"></script>
</body>
</html>