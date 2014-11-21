<?php
require_once ("../../../../files/database/db_connect.php");

echo "<section id=\"removeProduct\">\r\n";
//Feedback messages for errors and success
echo "<p id=\"successMessage\" class=\"successMessage\" hidden>The product has been removed successfully</p>\r\n";
echo "<p class=\"noBottomMargin\">Please select the product you wish to remove.</p>\n\r";
echo "<select id=\"productToRemove\">\r\n";

//Query for populating a dropdown list for choosing an item to remove
$getProductQuery = "SELECT product_id, product_name FROM product;";
$getProductTable = mysqli_query($link, $getProductQuery) or die("getProductQuery in\nfiles/php/pages/removeProduct.php\r\n".mysqli_error($link));
while ($getProductRow = mysqli_fetch_assoc($getProductTable)) {
	foreach ($getProductRow as $key => $value) {
		$$key = $value;
	}
	echo "<option value=\"$product_id\">$product_name</option>\r\n";
}
echo "</select>\r\n";
echo "<input id=\"submit\" type=\"button\" value=\"Submit\" /><img id=\"loadingImage\" src=\"files/images/loading.gif\" alt=\"loading\" hidden/></p>";
echo "</section>\r\n";
?>