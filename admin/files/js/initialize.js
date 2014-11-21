/*
Sets the colours for unhighlighted, and highlighted menu items
*/

var backgroundcolor = "#FFFFFF";
var textbackgroundcolor = "#000000";
var highlightcolor = "#716F6A";
var highlighttextcolor = "#FFFFFF";

/*
Functions to load the javascrpt for the relevant admin pages
*/

var addProduct = function(e) {
    var changeListener = function () {
        if (client.readyState === 4) {
            switch (client.status) {
                case 200:
                    var phpResponse = this.responseText;
                    document.getElementById("content").innerHTML = phpResponse;
                    addJavascript("files/js/addProduct.js");
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
    removeHighlightColor();
    e.target.style.backgroundColor = highlightcolor;
    e.target.style.color = highlighttextcolor;
    var client = new XMLHttpRequest();
    client.open("GET", "files/php/pages/addProduct.php", true);
    client.onreadystatechange = changeListener;
    client.send();
}

var removeProduct = function(e) {
    var changeListener = function () {
        if (client.readyState === 4) {
            switch (client.status) {
                case 200:
                    var phpResponse = this.responseText;
                    document.getElementById("content").innerHTML = phpResponse;
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
    removeHighlightColor();
    e.target.style.backgroundColor = highlightcolor;
    e.target.style.color = highlighttextcolor;
    var client = new XMLHttpRequest();
    client.open("GET", "files/php/pages/removeProduct.php", true);
    client.onreadystatechange = changeListener;
    client.send();
}

var updateProduct = function(e) {
    var changeListener = function () {
        if (client.readyState === 4) {
            switch (client.status) {
                case 200:
                    var phpResponse = this.responseText;
                    document.getElementById("content").innerHTML = phpResponse;
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
    removeHighlightColor();
    e.target.style.backgroundColor = highlightcolor;
    e.target.style.color = highlighttextcolor;
    var client = new XMLHttpRequest();
    client.open("GET", "files/php/pages/updateProduct.php", true);
    client.onreadystatechange = changeListener;
    client.send();
}

var addCategory = function(e) {
    var changeListener = function () {
        if (client.readyState === 4) {
            switch (client.status) {
                case 200:
                    var phpResponse = this.responseText;
                    document.getElementById("content").innerHTML = phpResponse;
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
    removeHighlightColor();
    e.target.style.backgroundColor = highlightcolor;
    e.target.style.color = highlighttextcolor;
    var client = new XMLHttpRequest();
    client.open("GET", "files/php/pages/addCategory.php", true);
    client.onreadystatechange = changeListener;
    client.send();
}

var removeCategory = function(e) {
    var changeListener = function () {
        if (client.readyState === 4) {
            switch (client.status) {
                case 200:
                    var phpResponse = this.responseText;
                    document.getElementById("content").innerHTML = phpResponse;
                    addJavascript("files/js/removeCategory.js");
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
    removeHighlightColor();
    e.target.style.backgroundColor = highlightcolor;
    e.target.style.color = highlighttextcolor;
    var client = new XMLHttpRequest();
    client.open("GET", "files/php/pages/removeCategory.php", true);
    client.onreadystatechange = changeListener;
    client.send();
}


var addJavascript = function(fileLocation) {
    var th = document.getElementsByTagName("body")[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',fileLocation);
    th.appendChild(s);
}

/*
Determines the highlight colors when you click a menu item
*/

var removeHighlightColor = function() {
    document.getElementById("addProduct").style.color           = textbackgroundcolor;
    document.getElementById("addProduct").style.backgroundColor = backgroundcolor;
    document.getElementById("removeProduct").style.color           = textbackgroundcolor;
    document.getElementById("removeProduct").style.backgroundColor = backgroundcolor;
    document.getElementById("updateProduct").style.color           = textbackgroundcolor;
    document.getElementById("updateProduct").style.backgroundColor = backgroundcolor;
    document.getElementById("addCategory").style.color           = textbackgroundcolor;
    document.getElementById("addCategory").style.backgroundColor = backgroundcolor;
    document.getElementById("removeCategory").style.color           = textbackgroundcolor;
    document.getElementById("removeCategory").style.backgroundColor = backgroundcolor;
}

document.getElementById("addProduct").addEventListener("click", addProduct, false);
document.getElementById("removeProduct").addEventListener("click", removeProduct, false);
document.getElementById("updateProduct").addEventListener("click", updateProduct, false);
document.getElementById("addCategory").addEventListener("click", addCategory, false);
document.getElementById("removeCategory").addEventListener("click", removeCategory, false);
