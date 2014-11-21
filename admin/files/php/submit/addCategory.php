<?php
require_once ("../../../../files/database/db_connect.php");

$category_name = $_POST['name'];

//Checks for duplicate categories
$checkForDuplicateName = "SELECT category_name FROM category WHERE category_name='$category_name';";
$checkForDuplicateTable = mysqli_query($link, $checkForDuplicateName) or die ("checkForDuplicateName in\nfiles/php/submit/addCategory.php\n\r".mysqli_error($link));
$checkForDuplicateNameRowCount = mysqli_num_rows($checkForDuplicateTable);
if ($checkForDuplicateNameRowCount != 0) {
    echo "Error|Duplicate name";
    return;
}

$addCategory = "INSERT INTO category (category_name) VALUES ('$category_name');";
  
mysqli_query($link, $addCategory) or die("addCategory in\nfiles/php/submit/addCategory.php\n\r".mysqli_error($link));

echo "Success|\n\r";
?> 