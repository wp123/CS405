 <?php
require_once ("../../../../files/database/db_connect.php");


echo "<section id=\"addCategory\">\r\n";
echo "<p>Please use the form below to add a new category.</p>\n\r";

//Feedback messages for success or errors
echo "<p id=\"successMessage\" class=\"successMessage\" hidden>The category has been submitted successfully</p>\r\n";
echo "<p id=\"nameValidation\" class=\"errorValidation\" hidden>A category name is required.</p>\r\n";

echo "<p>Category Name: <input type=\"textarea\" id=\"categoryName\"/></p>\r\n";

echo "<p><input id=\"submit\" type=\"button\" value=\"Submit\"/><img id=\"loadingImage\" src=\"files/images/loading.gif\" alt=\"loading\" hidden/></p>\r\n";  


echo "</section>\r\n";

?>