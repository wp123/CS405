function createRequestObject() {
			var request;
			var browser = navigator.appName;
			if(browser == "Microsoft Internet Explorer"){
				request = new ActiveXObject("Microsoft.XMLHTTP");
			} else {
				request = new XMLHttpRequest();
			}
			return request;
		}

var http = createRequestObject();

function searching() {
	var url = "files/php/pages/search.php";
	var s = document.getElementById('search').value;
	var params = "&s="+s;
	http.open("POST", url, true);

	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status != 200) {
			document.getElementById('searchResults').innerHTML='<li>Loading...</li>';
			}
		if(http.readyState == 4 && http.status == 200) {
		document.getElementById('searchResults').innerHTML = http.responseText;
				}
			}
		http.send(params);
	}

