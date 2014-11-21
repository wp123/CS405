/* 
Validates inputs when the submit button is pressed
If the data is valid it submits the values of the inputs
to the submitData function.
*/
var submitButtonPressed = function(e) {
    var successMessage = document.getElementById("successMessage"),
        product         = document.getElementById("productToRemove"),
        loadingImage   = document.getElementById("loadingImage");
    successMessage.hidden = true;
    var productID = product.options[product.selectedIndex].value;
	console.log(productID);
    submitData(productID);
    loadingImage.hidden = false;
}

/*
Checks for errors, and sends the parameters if there are none
*/

var submitData = function(idValue) {

	var changeListener = function () {
        if (client.readyState === 4) {
            document.getElementById("loadingImage").hidden = true;
            switch (client.status) {
                case 200:
                    var phpResponse = this.responseText;
                    var status = phpResponse.split("|")[0];
                    if (status == "Success") {
                        removeProduct();
                    } else {
                        alert(status);
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
    var parameters = "id=" + idValue;
    var client = new XMLHttpRequest();
    client.open("POST", "files/php/submit/removeProduct.php", true);
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = changeListener;
    client.send(parameters); 
}

var removeProduct = function(e) {
    var changeListener = function () {
        if (client.readyState === 4) {
            switch (client.status) {
                case 200:
                    var phpResponse = this.responseText;
                    document.getElementById("content").innerHTML = phpResponse;
                    document.getElementById("successMessage").hidden = false;
                    addJavascript("files/js/removeProduct.js");
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
    client.open("GET", "files/php/pages/removeProduct.php", true);
    client.onreadystatechange = changeListener;
    client.send();
}

document.getElementById("submit").addEventListener("click", submitButtonPressed, false);