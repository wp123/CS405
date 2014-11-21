<?php

require_once("db_config.php");

$link = mysqli_connect($db_host, $db_user, $db_password) or die(mysqli_error($link));
mysqli_select_db($link, $db_name) or require_once("db_initialize.php");

?>