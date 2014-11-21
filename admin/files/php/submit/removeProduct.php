<?php
require_once ("../../../../files/database/db_connect.php");

$prod_id = $_POST['id'];

$removeProductQuery = "DELETE FROM product WHERE product_id='$prod_id';";
mysqli_query($link, $removeProductQuery) or die("removeProductQuery in \nfiles/php/submit/removeProduct.php\n\r".mysqli_error($link));

echo "Success|\n\r";
$getProductQuery = "SELECT product_id, product_name FROM product;";
$getProductTable = mysqli_query($link, $getProductQuery) or die("getproductsQuery in\nfiles/php/pages/removeProduct.php\r\n".mysqli_error($link));
while ($getProductRow = mysqli_fetch_assoc($getProductTable)) {
	foreach ($getProductRow as $key => $value) {
		$$key = $value;
	}
	echo "<option value=\"$product_id\">$product_name</option>\r\n";
}
?>