<?php
$create_db = "CREATE DATABASE $db_name";

$createProductsTable = "CREATE TABLE IF NOT EXISTS Product (
  product_id int NOT NULL AUTO_INCREMENT,
  product_name varchar(50) NOT NULL,
  description varchar(255),
  quantity int NOT NULL,
  category_id int DEFAULT NULL,
  price float DEFAULT NULL,
  image varchar(50) DEFAULT 'default.jpg',
  discount float DEFAULT NULL,
  PRIMARY KEY (product_id)
) " ;
//ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1

$createCategoryTable = "CREATE TABLE IF NOT EXISTS Category (
  category_id int NOT NULL AUTO_INCREMENT,
  category_name varchar(30) NOT NULL,
  PRIMARY KEY (category_id)
) ";


//User type will be "C" for customer, "E" for employee, and "M" for manager
$createUserTable = "CREATE TABLE IF NOT EXISTS Users (
	user_id int NOT NULL AUTO_INCREMENT,
	email varchar(50) NOT NULL,
	password varchar(10) NOT NULL,
	name_first varchar(25) NOT NULL,
	name_last varchar(25) NOT NULL,
	user_type char(1) NOT NULL, 
	street_no int NOT NULL,
	street_name varchar(50) NOT NULL,
	apt_no int,
	city varchar(30) NOT NULL,
	state varchar(2) NOT NULL,
	zip int(5) NOT NULL,
	PRIMARY KEY (user_id)
)";


//order status 0=pending, 1=shipped
$createOrderTable = "CREATE TABLE IF NOT EXISTS Orders (
	order_id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	product_id int NOT NULL,
	order_status int(1) NOT NULL,
	order_date date NOT NULL,
	ship_date date,
	PRIMARY KEY order_id,
	FOREIGN KEY user_id REFERENCES Users(user_id),
	FOREIGN KEY product_id REFERENCES Product(product_id)
)";

mysqli_query($link, $create_db) or die(mysqli_error($link));
mysqli_select_db($link, $db_name);
mysqli_query($link, $createProductsTable) or die(mysqli_error($link));
mysqli_query($link, $createCategoryTable) or die(mysqli_error($link));

?>