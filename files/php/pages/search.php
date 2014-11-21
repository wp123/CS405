<?php
require_once ("../../database/db_connect.php");

$s = $_REQUEST["s"];
$output = "";
$s = str_replace(" ", "%", $s);
$s = str_replace("'", "''", $s);
//Searches the database for anything containing the string of characters $s
$query = "SELECT * FROM Product WHERE product_name LIKE '%" . $s . "%'";
$squery = mysqli_query($link, $query);
//Displays the results in a list as long as the query doesn't have 0 results, or the string is empty
if (mysqli_num_rows($squery) != 0 && $s != ""){
	while($row = mysqli_fetch_array($squery)){
		$displayName = $row['product_name'];
		$pid = $row['product_id'];
		$output .= '<li>' ."<a href='index.php?pid=$pid'>".$row["product_name"]."</a>" . '</li>';
	}
}

echo $output;
?> 