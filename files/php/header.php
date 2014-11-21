<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title><?php echo $title; ?></title>
		<link rel="stylesheet" href="files/css/style.css" type="text/css" /> <!-- Change this if you use your own style sheet with a different name -->
		<script type="text/javascript" src="files/js/search.js"></script>

	</head>

	<body onunload="">
<?php
require_once ("files/database/db_connect.php");
?>

<div id="wrapper">
		<header>
			<h1><a href="index.php"><?php echo $title; ?></a></h1>
<?php
require_once ("files/php/navigation.php");
?>

		<form id="searchBar" action="" method="post">
					<p>
						<label for="search">Search:</label>
						<input id="search" type="text" name="search" onkeyup="searching()" />
					</p>
					<ul id="searchResults">
					</ul>
				</form>
		</header>