/*
Uploading images
*/

function startUpload(){
    document.getElementById('uploadProcess').style.visibility = 'visible';
    return true;
}

function stopUpload(success){
      var result = '';
      if (success == 1){
         document.getElementById('result').innerHTML =
           '<span class="msg">The file was uploaded successfully!<\/span><br/><br/>';
      }
      else {
         document.getElementById('result').innerHTML = 
           '<span class="emsg">There was an error during file upload!<\/span><br/><br/>';
      }
      document.getElementById('uploadProcess').style.visibility = 'hidden';
      return true;   
}

/*
Handles what happens when you select a product
*/

var chooseProductSubmitButtonPressed = function(e) {
    var product     = document.getElementById("productToUpdate");
    var loadingImage   = document.getElementById("loadingImage");
    var productidValue = product.options[product.selectedIndex].value;
    submitSelectedProductData(productidValue);
    loadingImage.hidden = false;

}

/*
Sends the product to the php to load the values
*/

var submitSelectedProductData = function(product_id) {
    var changeListener = function () {
        if (client.readyState === 4) {
            document.getElementById("loadingImage").hidden = true;
            switch (client.status) {
                case 200:
                    var phpResponse = this.responseText;
                    document.getElementById("content").innerHTML = phpResponse;
                    document.getElementById("makeChangesSubmit").addEventListener("click", makeChangesSubmitButtonPressed, false);
                    break;
                case 0:
                    alert("Query Completed, but code 0 returned.");
                    break;
                default:
                    alert("Failed - Unknown Reason");
                    break;
            }
        }
    };
    var parameters = "selectedProduct=" + product_id;
    var client = new XMLHttpRequest();
    client.open("POST", "files/php/pages/updateProduct.php", true);
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = changeListener;
    client.send(parameters);
}

/*
Validates the values once the submit button is pressed
*/

var makeChangesSubmitButtonPressed = function(e) {
    var productID   = document.getElementById("product_id"),
        initialName = document.getElementById("initialName"),
        name        = document.getElementById("product_name"),
        nameError   = document.getElementById("nameValidation"),
        description = document.getElementById("description"),
        quantity       = document.getElementById('quantity'),
        price       = document.getElementById('price'),
		discount	= document.getElementById('discount'),
        image          = document.getElementById("myfile"),
        loadingImage    = document.getElementById("loadingImage");
    nameError.hidden = true;
    nameError.innerHTML = "The product name is required";
    loadingImage.hidden = false;
	
    var valid = true;
	
    if (name.value == "") {
        valid = false;
        nameError.hidden = false;
    }

     if (description.value == "") {
      valid = false;
      document.getElementById('nameValidation').innerHTML = "You must enter a description";
      document.getElementById('nameValidation').hidden = false;
    }

    if (quantity.value < 0) {
        valid = false;
        document.getElementById('nameValidation').innerHTML = "The quantity must be greater than 0";
        document.getElementById('nameValidation').hidden = false;
    }

    if (quantity.value == "") {
        valid = false;
        document.getElementById('nameValidation').innerHTML = "You must enter a quantity value";
        document.getElementById('nameValidation').hidden = false;
    }

    if (isNaN(quantity.value)) {
        valid = false;
        document.getElementById('nameValidation').innerHTML = "Quantity is not a number";
        document.getElementById('nameValidation').hidden = false;
    }

    if (price.value == "") {
        valid = false;
        document.getElementById('nameValidation').innerHTML = "You must enter a price";
        document.getElementById('nameValidation').hidden = false;
    }

    if (isNaN(price.value)) {
        valid = false;
        document.getElementById('nameValidation').innerHTML = "Price is not a number";
        document.getElementById('nameValidation').hidden = false;
    }

    if (valid) {
        productIDValue = product_id.value;
        initialNameValue = initialName.value;
        nameValue = name.value.replace("'","''");
        descriptionValue = description.value.replace("'","''");
        quantityValue = quantity.value;
        priceValue = price.value;
		discountValue = discount.value;
        console.log(image.value);
        imageValue = image.value.replace("C:\\fakepath\\", ""); //CHANGE THIS IF NEEDED
        console.log(imageValue);
        submitChangesData(productIDValue, initialNameValue, nameValue, descriptionValue, quantityValue, priceValue, discountValue, imageValue);
    } else {
        loadingImage.hidden = true;
    }
}

/*
Checks for errors, and sends the parameters to the php if there are none
*/

var submitChangesData = function(product_id, initialName, name, description, quantity, price, discount, image) {
	var changeListener = function () {
        if (client.readyState === 4) {
            switch (client.status) {
                case 200:
                    var phpResponse = this.responseText;
                    var status = phpResponse.split("|")[0];
                    if (status == "Success") {
                        updateProduct();
                    } else {
                        document.getElementById("loadingImage").hidden = true;
                        if (status == "Error") {
                            var errorReason = phpResponse.split("|")[1];
                            if (errorReason == "Duplicate name") {
                                document.getElementById("nameValidation").innerHTML = "A product exists with that name already."
                                document.getElementById("nameValidation").hidden = false;
                            }
                        } else {
                            alert(phpResponse);
                        }
                    }
                    break;
                case 0:
                    alert("Query Completed, but code 0 returned.");
                    break;
                default:
                    alert("Failed - Unknown Reason");
                    break;
            }
        }
    };
    var parameters = "product_id=" + product_id + "&" +
                     "initialName=" + initialName + "&"+
                     "name=" + name + "&" +
                     "description=" + description + "&" +
                     "quantity=" + quantity + "&" +
                     "price=" + price + "&" +
					 "discount=" + discount + "&" +
                     "image=" + image;

    var client = new XMLHttpRequest();
    client.open("POST", "files/php/submit/updateProduct.php", true);
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = changeListener;
    client.send(parameters);
}

var updateProduct = function() {
    var changeListener = function () {
        if (client.readyState === 4) {
            switch (client.status) {
                case 200:
                    var phpResponse = this.responseText;
                    document.getElementById("content").innerHTML = phpResponse;
                    document.getElementById("successMessage").hidden = false;
                    addJavascript("files/js/updateProduct.js");
                    break;
                case 0:
                    alert("Query Completed, but code 0 returned.");
                    break;
                default:
                    alert("Failed - Unknown Reason");
                    break;
            }
        }
    };
    var client = new XMLHttpRequest();
    client.open("GET", "files/php/pages/updateProduct.php", true);
    client.onreadystatechange = changeListener;
    client.send();
}

document.getElementById("chooseProductSubmit").addEventListener("click", chooseProductSubmitButtonPressed, false);