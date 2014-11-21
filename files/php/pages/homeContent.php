<?php

//Checks to see if 'cat' is in the url, if it is, it shows all products from that category.
if(isset($_GET['cat'])) {

	$catId = $_GET['cat'];
	$categoryQuery = "SELECT * FROM Product WHERE category_id='$catId'";
	$categoryName = "SELECT * FROM Category WHERE category_id='$catId'";
	$categoryResults = mysqli_query($link, $categoryQuery);
	$i = 0;
	$cssClass = 'item';
	
    $category_name = mysqli_query($link, $categoryName);
    while($row=mysqli_fetch_array($category_name)){
	    echo "<h2>".$row['category']."</h2>";
	}

	while ($row = @ mysqli_fetch_array($categoryResults)) {
		if ($i<30) {
			$pid=$row['product_id'];
			$price = $row['price'];
			$class = $cssClass;

			print
			"<div class= '{$class}'>" .
			"<a href='index.php?pid=$pid'>".$row["product_name"]."</a>".
			"<div class= 'imageContainer'>".
			"<p class='productImage'><a href='index.php?pid=$pid'>".'<img src="admin/files/images/productImages/'.$row['image'].'" alt="'.htmlspecialchars($row['product_name']).'"  /></a></p>'.  //Change the image source here if you change the destination of where images are uploaded to.
			"</div>".
			"<p>£$price</p>".
			"</div>";
			$i++;

		}
	}

} else {

//Checks to see if 'pid' is in the url, if it is, then it uses that pid to display a product
	if (isset($_GET['pid'])) {

		$itemId = $_GET['pid'];

		$getItemQuery = "SELECT * FROM Product WHERE product_id='$itemId';";
		$getItemTable = mysqli_query($link, $getItemQuery) or die("getItemQuery in\nfiles/php/pages/homeContent.php\r\n".mysqli_error($link));
		while ($getItemRow = mysqli_fetch_assoc($getItemTable)) {
			foreach ($getItemRow as $key => $value) {
			$$key = $value;
			}
		}

		if ($quantity == 0) {
			$quantity = "Out of stock";
		}

	print

		"<div class= 'singleProduct' >" .
		"<p>$product_name</p>".
		"<img src='admin/files/images/productImages/$image'.'' alt=".htmlspecialchars($product_name)." />". //Change the image source here if you change the destination of where images are uploaded to.
		"<p>$description</p>".
		"<p>Quantity: $quantity</p>".
		"<p>\$$price</p>".
		"</div>";

	} else {
		//If the url doesn't contain pid or cat, then it displays the 30 most recently added products. You can change the number of products that are shown, by changing the value of $i<30 as marked below
		$productQuery = "SELECT * FROM Product ORDER BY product_id DESC";
		$productResults = mysqli_query($link, $productQuery);
		$i = 0;
		$cssClass = 'item';

		echo"<h2>Recently added</h2>";
		while ($row = @ mysqli_fetch_array($productResults)) {
			if ($i<30) { //Change this number to the number of products that you want to be shown on the home page.
				$pid=$row['product_id'];
				$price = $row['price'];
				$class = $cssClass;

				print
				"<div class= '{$class}'>" .
				"<a href='index.php?pid=$pid'>".$row["product_name"]."</a>".
				"<div class= 'imageContainer'>".
				"<p class='productImage'><a href='index.php?pid=$pid'>".'<img src="admin/files/images/productImages/'.$row['image'].'" alt="'.htmlspecialchars($row['product_name']).'"  /></a></p>'. //Change the image source here if you change the destination of where images are uploaded to.
				"</div>".
				"<p>\$$price</p>".
				"</div>";
				$i++;

			}
		}
	}
}

?>
<div class="clear"></div>