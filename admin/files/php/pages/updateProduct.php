<?php
	require_once ("../../../../files/database/db_connect.php");

	//Query to check if there are any products in the database
	$numberOfProductsQuery = "SELECT product_id FROM product;";
	$numberOfProductsTable = mysqli_query($link, $numberOfProductsQuery) or die ("numberOfProducts in \nfiles/php/submit/updateProduct.php\n\r".mysqli_error($link));
	$numberOfProducts = mysqli_num_rows($numberOfProductsTable);
	if ($numberOfProducts == 0) {
		echo "<p>There are currently no products to update.</p>\r\n";
		echo "<p>Please use add to create some products first.</p>\r\n";
		return;
	}

	echo "<section id=\"update\">\r\n";
	echo "<p id=\"successMessage\" class=\"successMessage\" hidden>The product has been updated successfully</p>\r\n";

	if (!isset($_POST['selectedProduct'])) {
		echo "<p class=\"noBottomMargin\">Please select the product you wish to update.</p>\n\r";
		echo "<select id=\"productToUpdate\">\r\n";

		//Query to populate a dropdown list to select a product
		$getProductQuery = "SELECT product_id, product_name FROM product;";
		$getProductTable = mysqli_query($link, $getProductQuery) or die("getProductQuery in\nfiles/php/pages/updateProduct.php\r\n".mysqli_error($link));
		while ($getProductRow = mysqli_fetch_assoc($getProductTable)) {
			foreach ($getProductRow as $key => $value) {
				$$key = $value;
			}
			echo "<option value=\"$product_id\">$product_name</option>\r\n";
		}
		echo "</select>\r\n";
		echo "<input id=\"chooseProductSubmit\" type=\"button\" value=\"Submit\" /><img id=\"loadingImage\" src=\"files/images/loading.gif\" alt=\"loading\" hidden/></p>";
	} else {
		$product_id = $_POST['selectedProduct'];
		echo "<p>Please make the changes you wish to make, and then press submit.</p>\n\r";

		$getProductDetailsQuery = "SELECT product_name, description, quantity, price, discount FROM product WHERE product_id=$product_id;";
		$getProductDetailsTable = mysqli_query($link, $getProductDetailsQuery) or die("getProductDetailsQuery in\nfiles/php/pages/updateProduct.php\n\r".mysqli_error($link));
		$getProductDetailsRow = mysqli_fetch_assoc($getProductDetailsTable);
		foreach($getProductDetailsRow as $key => $value) {
			$$key = $value;
		}

		//Form to input data
		echo "<input id=\"product_id\" type=\"hidden\" value=\"$product_id\">\r\n";
		echo "<input id=\"initialName\" type=\"hidden\" value=\"$product_name\">\r\n";
		echo "<p id=\"nameValidation\" class=\"errorValidation\" hidden>The Task Name is Required</p>\r\n";
		echo "<p>Product Name: <input type=\"textarea\" id=\"product_name\" value=\"$product_name\"/></p>\r\n";
		echo "<p>Description: <input type=\"textarea\" id=\"description\" value=\"$description\"/></p>\r\n";
		//Uploading images form and iframe
		echo "<p id=\"uploadProcess\">Uploading image...<br/><img src=\"files/images/upload.gif\" /></p>
			  <p id=\"result\"></p>
			  <form action=\"files/php/submit/upload.php\" method=\"post\" enctype=\"multipart/form-data\" target=\"uploadTarget\" onsubmit=\"startUpload();\" >
			  File: <input name=\"myfile\" type=\"file\" id=\"myfile\"/>
			  <input type=\"submit\" name=\"submitBtn\" value=\"Upload\" />
			  </form>
		      <iframe id=\"uploadTarget\" name=\"uploadTarget\" src=\"#\" style=\"width:0;height:0;border:0px solid #fff;\"></iframe>  ";
		echo "<p>Quantity: <input type=\"textarea\" id=\"quantity\" value=\"$quantity\"/></p>\r\n";
		echo "<p>Price: <input type=\"textarea\" id=\"price\" value=\"$price\"/></p>\r\n";
		echo "<p>Discount: <input type=\"textarea\" id=\"discount\" value=\"$discount\"/></p>\r\n";
		echo "<p><input id=\"makeChangesSubmit\" type=\"button\" value=\"Submit\"/><img id=\"loadingImage\" src=\"files/images/loading.gif\" alt=\"loading\" hidden/></p>\r\n";
	}
	echo "</section>\r\n";
?>