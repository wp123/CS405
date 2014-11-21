<?php
require_once ("../../../../files/database/db_connect.php");

echo "<section id=\"removeCategory\">\r\n";
//Feedback messages for errors and success
echo "<p id=\"successMessage\" class=\"successMessage\" hidden>The category has been removed successfully</p>\r\n";
echo "<p class=\"noBottomMargin\">Please select the category you wish to remove.</p>\n\r";
echo "<select id=\"categoryToRemove\">\r\n";

//Query to populate the dropdown menu for selecting a category to delete
$getCategoryQuery = "SELECT * FROM category;";
$getCategoryTable = mysqli_query($link, $getCategoryQuery) or die("getCategoryQuery in\nfiles/php/pages/removeCategory.php\r\n".mysqli_error($link));
while ($getCategoryRow = mysqli_fetch_assoc($getCategoryTable)) {
	foreach ($getCategoryRow as $key => $value) {
		$$key = $value;
	}
	echo "<option value=\"$category_name\">$category_name</option>\r\n";
}
echo "</select>\r\n";
echo "<input id=\"submit\" type=\"button\" value=\"Submit\" /><img id=\"loadingImage\" src=\"files/images/loading.gif\" alt=\"loading\" hidden/></p>";
echo "</section>\r\n";
?>