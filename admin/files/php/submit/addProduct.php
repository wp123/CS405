<?php
require_once ("../../../../files/database/db_connect.php");

$product_name = $_POST['name'];
$description = $_POST['description'];
$quantity = $_POST['quantity'];
$category_id = $_POST['category_id'];
$price = $_POST['price'];
$image = $_POST['image'];
$discount = $_POST['discount'];

//Sets the image to a default image if one is not uploaded
if ($image == "") {
	$image = "default.jpg";
}

//Query to make sure that the name doesn't already exist in the database
$checkForDuplicateName = "SELECT product_name FROM product WHERE product_name='$product_name';";
$checkForDuplicateTable = mysqli_query($link, $checkForDuplicateName) or die ("checkForDuplicateName in\nfiles/php/submit/addProduct.php\n\r".mysqli_error($link));
$checkForDuplicateNameRowCount = mysqli_num_rows($checkForDuplicateTable);
if ($checkForDuplicateNameRowCount != 0) {
	echo "Error|Duplicate name";
	return;
}



//Auto increments product_id, the last discount value is always 0 by default. Manager has to put it on sale later
$addNewProduct = "INSERT INTO product VALUES (DEFAULT, '$product_name', '$description', '$quantity', '$category_id', '$price', '$image', '$discount');";
mysqli_query($link, $addNewProduct) or die("addNewProduct in\nfiles/php/submit/add.php\n\r".mysqli_error($link));

echo "Success";
?>