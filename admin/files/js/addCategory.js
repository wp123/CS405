/* 
Validates inputs when the submit button is pressed
If the data is valid it submits the values of the inputs
to the submitData function.
*/

var submitButtonPressed = function(e) {
	var successMessage = document.getElementById("successMessage"),
        name 		   = document.getElementById("categoryName"),
        nameError      = document.getElementById("nameValidation"),
        loadingImage   = document.getElementById("loadingImage");
	successMessage.hidden = true;
	nameError.hidden = true;
	nameError.innerHTML = "A category name is required.";
	loadingImage.hidden = false;

	var valid = true;
	if (name.value == "") {
		valid = false;
		nameError.hidden = false;
	}

	if (valid) {
		nameValue = name.value;
		submitData(nameValue);
	} else {
		loadingImage.hidden = true;
	}
}

/*
Checks for errors, reports failures, else posts the parameters to the php file to be used there
*/

var submitData = function(name) {
	var changeListener = function () {
        if (client.readyState === 4) {
        		document.getElementById("loadingImage").hidden = true;
            switch (client.status) {
                case 200:
                	var phpResponse = this.responseText;
                	var status = phpResponse.split("|")[0];
                	if (status == "Success") {
                        addCategory()
                	} else if (status == "Error") {
                		var errorReason = phpResponse.split("|")[1];
                		if (errorReason == "Duplicate name") {
                			document.getElementById("nameValidation").innerHTML = "A category exists with that name."
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
    var parameters = "name=" + name;
    var client = new XMLHttpRequest();
    client.open("POST", "files/php/submit/addCategory.php", true);
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = changeListener;
    client.send(parameters);
}

/*
Reloads so you can see the new categories
*/

var addCategory = function(e) {
    var changeListener = function () {
        if (client.readyState === 4) {
            switch (client.status) {
                case 200:
                    var phpResponse = this.responseText;
                    document.getElementById("content").innerHTML = phpResponse;
                    document.getElementById("successMessage").hidden = false;
                    addJavascript("files/js/addCategory.js");
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
    client.open("GET", "files/php/pages/addCategory.php", true);
    client.onreadystatechange = changeListener;
    client.send();
}

document.getElementById("submit").addEventListener("click", submitButtonPressed, false);