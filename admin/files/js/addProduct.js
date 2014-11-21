/*
Uploading images
*/

function startUpload() {
    document.getElementById('uploadProcess').style.visibility = 'visible';
    return true;
}

function stopUpload(success) {
    var result = '';
      if (success == 1) {
         document.getElementById('result').innerHTML =
           '<span class="msg">The file was uploaded successfully!<\/span><br/><br/>';
      }
      else {
         document.getElementById('result').innerHTML = '<span class="emsg">There was an error during file upload!<\/span><br/><br/>';
      }
      document.getElementById('uploadProcess').style.visibility = 'hidden';
      return true;   
}

/* 
Validates inputs when the submit button is pressed
If the data is valid it submits the values of the inputs
to the submitData function.
*/

var submitButtonPressed = function(e) {
	var successMessage = document.getElementById("successMessage"),
      name           = document.getElementById("product_name"),
      nameError      = document.getElementById("nameValidation"),
      description    = document.getElementById("description"),
      category       = document.getElementById("categorySelect"),
      quantity       = document.getElementById("quantity"),
      price          = document.getElementById("price"),
	  discount 		 = document.getElementById("discount"),
      image          = document.getElementById("myfile"),
      loadingImage   = document.getElementById("loadingImage");
	  
	var categoryIDValue = category.options[category.selectedIndex].value
	successMessage.hidden = true;
	nameError.hidden = true;
	nameError.innerHTML = "The name is Required";
	loadingImage.hidden = false;

	console.log(categoryIDValue)
	
	var valid = true;

  	if (name.value == "") {
  		valid = false;
  		nameError.hidden = false;
  	}
	
	/*if (NaN(categoryIDValue)) {
		valid = false;
		document.getElementById('nameValidation').innerHTML = "The category ID was not a number";
		document.getElementById('nameValidation').hidden = false;	
	}*/
	
    if (description.value == "") {
      valid = false;
      document.getElementById('nameValidation').innerHTML = "You must enter a description";
      document.getElementById('nameValidation').hidden = false;
    }

    if (quantity.value < 0) {
        valid = false;
        document.getElementById('nameValidation').innerHTML = "The quantity in stock must be greater than 0";
        document.getElementById('nameValidation').hidden = false;
    }

    if (quantity.value == "") {
        valid = false;
        document.getElementById('nameValidation').innerHTML = "You must enter an available quantity";
        document.getElementById('nameValidation').hidden = false;
    }

    if (isNaN(quantity.value)) {
        valid = false;
        document.getElementById('nameValidation').innerHTML = "Quantity must be a number";
        document.getElementById('nameValidation').hidden = false;
    }

    if (price.value == "") {
        valid = false;
        document.getElementById('nameValidation').innerHTML = "You must enter a valid price";
        document.getElementById('nameValidation').hidden = false;
    }

    if (isNaN(price.value)) {
        valid = false;
        document.getElementById('nameValidation').innerHTML = "Price is not a valid number";
        document.getElementById('nameValidation').hidden = false;
    }

	//TODO need to validate data for the discount fields
	//Needs to be a percentage discount, between 0 and 1
	/*if (isNAN(discount.value)){
		valid = false;
		document.getElementById('nameValidation').innerHTML = "Discount is not a number.";
		document.getElementById('nameValidation').hidden = false;	
	}
    
	//after it checks if it's a number
	if (discount.value > 1.0 || discount.value < 0.0) {
		valid=false;
		document.getElementById('nameValidation').innerHTML = "Discount value must be a % between 0 and 1.";
		document.getElementById('nameValidation').hidden = false;	
	}*/
	
	if (valid) {
    	nameValue = name.value.replace("'","''");//Cleans up apostrophes for the SQL query
    	descriptionValue = description.value.replace("'","''");
        quantityValue = quantity.value;
        priceValue = price.value;
		discountValue = discount.value;
        console.log(image.value);
        imageValue = image.value.replace("C:\\fakepath\\", ""); //CHANGE THIS IF NEEDED
        console.log(imageValue);
        submitData(nameValue, descriptionValue, categoryIDValue, quantityValue, priceValue, imageValue, discountValue);
	} else {
		loadingImage.hidden = true;
	}
}

/*
Checks for errors, reports failures, else posts the parameters to the php file to be used there
It then clears the values of the input fields to make inputting the next item easier
*/

var submitData = function(name, description, category_id, quantity, price, image, discount) {
	console.log("Made it to submitData");
	var changeListener = function () {
        if (client.readyState === 4) {
        		document.getElementById("loadingImage").hidden = true;
            switch (client.status) {
                case 200:
                	var phpResponse = this.responseText;
                	var status = phpResponse.split("|")[0];
                	if (status == "Success") {
                		successMessage.hidden = false;            		
        				document.getElementById("product_name").value = "";
        				document.getElementById("description").value = "";
						document.getElementById("categorySelect").value = "";
						document.getElementById("quantity").value = "";
						document.getElementById("price").value = "";
						document.getElementById("discount").value = "";
                	} else if (status == "Error") {
                		var errorReason = phpResponse.split("|")[1];
                		if (errorReason == "Duplicate Product name") {
                			document.getElementById("nameValidation").innerHTML = "An item exists with that name.";
                			document.getElementById("nameValidation").hidden = false;
                		}
                	} else {
                		alert(phpResponse);
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
    var parameters = "name=" + name + "&" +
                     "description=" + description + "&" +
                     "category_id=" + category_id + "&" +
                     "quantity=" + quantity + "&" +
                     "price=" + price + "&" +
					 "discount=" + discount + "&" +
                     "image=" + image;
    var client = new XMLHttpRequest();
    client.open("POST", "files/php/submit/addProduct.php", true);
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = changeListener;
    client.send(parameters);
}

document.getElementById("submit").addEventListener("click", submitButtonPressed, false);