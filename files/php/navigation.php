			<nav>
				<ul>
					 <?php
					 	//Creates the main navigation menu
					   $getCategories="SELECT * FROM Category";
					   $result=mysqli_query($link, $getCategories) or die(mysqli_error($link));
					   while($row=mysqli_fetch_array($result)){
					    $categoryId=$row['category_id'];
					    $category=$row['category_name'];
					    //Sets top level to not perform as a link
					    echo "<li>
					    	<a href=#>".$category."</a>";
					    echo "<ul>";
					  /*  $getCategoriesById="SELECT * FROM Category WHERE parent_id=$categoryId and category_id<>0";
					    $result2=mysql_query($getCategoriesById) or die(mysql_error());

					    while($row=mysql_fetch_array($result2)){
					     $subCategoryId=$row['category_id'];
					     $subCategoryName=$row['category'];
					     echo "<li><a href='index.php?cat=$subCategoryId'>".$subCategoryName."</a></li>";
					    }
					    echo "</ul>";
					    echo "</li>";*/
					  
					   }
					  ?>
				</ul>
			</nav>