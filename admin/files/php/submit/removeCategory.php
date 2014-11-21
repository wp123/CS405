<?php
require_once ("../../../../files/database/db_connect.php");

$category_name = $_POST['category'];

$removeCategoryQuery = "DELETE FROM category WHERE category_name='$category_name';";
mysqli_query($link, $removeCategoryQuery) or die("removeCategoryQuery in \nfiles/php/submit/removeCategory.php\n\r".mysqli_error($link));

echo "Success|\n\r";
$getCategoryQuery = "SELECT * FROM category;";
$getCategoryTable = mysqli_query($link, $getCategoryQuery) or die("getCategoryQuery in\nfiles/php/pages/removeCategory.php\r\n".mysqli_error($link));
while ($getCategoryRow = mysqli_fetch_assoc($getCategoryTable)) {
	foreach ($getCategoryRow as $key => $value) {
		$$key = $value;
	}
	echo "<option value=\"$category_name\">$category_name</option>\r\n";
}
?>