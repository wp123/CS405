<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title><?php echo $title; ?></title>
		<link rel="stylesheet" href="files/css/style.css" type="text/css" />
	</head>

	<body onunload="">
<?php
require_once ("../files/database/db_connect.php");
?>
<div id="wrapper">
		<header>
			<h1><?php echo $title; ?></h1>
<?php
require_once ("files/php/navigation.php");
?>
		</header>
