<?php
require_once ("../../../../files/database/db_connect.php");

$product_id   = $_POST['product_id'];
$initialName  = $_POST['initialName'];
$product_name = $_POST['name'];
$description  = $_POST['description'];
$quantity     = $_POST['quantity'];
$price        = $_POST['price'];
$image        = $_POST['image'];
$discount	  = $_POST['discount'];

//Checks if an item with that name exists if the name differs from the initial name
if ($initialName != $product_name) {
	$checkForDuplicateNameQuery = "SELECT product_name FROM product WHERE product_name='$product_name';";
	$checkForDuplicateNameTable = mysqli_query($link, $checkForDuplicateNameQuery) or die ("checkForDuplicateNameQuery in\nfiles/php/submit/updateProduct.php\n\r".mysqli_error($link));
	$checkForDuplicateNameRowCount = mysqli_num_rows($link, $checkForDuplicateNameTable);
	if ($checkForDuplicateNameRowCount != 0) {
		echo "Error|Duplicate name";
		return;
	}
}

//Sets the image to the current image used if a new image is not uploaded
if ($image == "") {
	$imageQuery = "SELECT image FROM product WHERE product_name='$initialName';";
	$imageQueryResult = mysqli_query($link, $imageQuery);
	$image = mysqli_fetch_row($imageQueryResult);
	$image = $image[0];
}

//Submits the data to the database
$addNewTaskQuery = "UPDATE product SET product_name='$product_name', description='$description', quantity='$quantity', price='$price', image='$image', discount='$discount' WHERE product_id=$product_id;";
mysqli_query($link, $addNewTaskQuery) or die("addNewTaskQuery in\nfiles/php/submit/updateProduct.php\n\r".mysqli_error($link));

echo "Success";

?>