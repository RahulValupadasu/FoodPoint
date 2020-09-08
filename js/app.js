var cards = '';
var cartItems = [];
var value = 0;
var listOfItems = [{
		itemId: 1,
		name: "Chicken Biryani",
		cost: 14,
		quantitySelected: 0,
		imgName: "ChickenBiryani"
	},
	{
		itemId: 2,
		name: "Chicken Tandoori",
		cost: 1,
		quantitySelected: 0,
		imgName: "ChickenTandoori"
	},
	{
		itemId: 3,
		name: "Chicken Chilly",
		cost: 12,
		quantitySelected: 0,
		imgName: "ChickenChilly"
	},
	{
		itemId: 4,
		name: "Mutton Biryani",
		cost: 14,
		quantitySelected: 0,
		imgName: "MuttonBiryani"
	},
	{
		itemId: 5,
		name: "Mutton Tandoori",
		cost: 1,
		quantitySelected: 0,
		imgName: "MuttonTandoori"
	},
	{
		itemId: 6,
		name: "Mutton chilly",
		cost: 12,
		quantitySelected: 0,
		imgName: "MuttonChilly"
	},
	{
		itemId: 7,
		name: "Fish Biryani",
		cost: 14,
		quantitySelected: 0,
		imgName: "FishBiryani"
	},
	{
		itemId: 8,
		name: "Fish Tandoori",
		cost: 1,
		quantitySelected: 0,
		imgName: "FishTandoori"
	},
	{
		itemId: 9,
		name: "Fish Chilly",
		cost: 12,
		quantitySelected: 0,
		imgName: "FishChilly"
	},
	{
		itemId: 10,
		name: "Prawn Biryani",
		cost: 14,
		quantitySelected: 0,
		imgName: "PrawnBiryani"
	},
	{
		itemId: 11,
		name: "Prawn Tandoori",
		cost: 1,
		quantitySelected: 0,
		imgName: "PrawnTandoori"
	},
	{
		itemId: 12,
		name: "Prawn Chilly",
		cost: 12,
		quantitySelected: 0,
		imgName: "PrawnChilly"
	},
	{
		itemId: 13,
		name: "Burger",
		cost: 16,
		quantitySelected: 0,
		imgName: "Burger"
	},
	{
		itemId: 14,
		name: "Pizza",
		cost: 12,
		quantitySelected: 0,
		imgName: "Pizza"
	}
];

var $ = function (id) {
	return document.getElementById(id);
}

var changeButtonsAccLogStat = function() {
	var flag = checkLoginStatus();
	if (flag) {
		var temp = JSON.parse(localStorage.getItem("logInUser"));
		document.getElementById("u_name").innerHTML = "Welcome, " + temp.fullName;
		document.getElementById("logout").style.display = "block";
		document.getElementById("login").style.display = "none";
		document.getElementById("signup").style.display = "none";
	} else {
		document.getElementById("u_name").innerHTML = '';
		document.getElementById("logout").style.display = "none";
		document.getElementById("login").style.display = "block";
		document.getElementById("signup").style.display = "block";
	}
}

var loginUser=function() {
	if (JSON.parse(localStorage.getItem("userData")) && JSON.parse(localStorage.getItem("userData")).length > 0) {
		var flag = true;
		var temp = JSON.parse(localStorage.getItem("userData"));
		for (var i = 0; i < temp.length; i++) {
			if (temp[i].email == document.getElementById("uemail").value) {
				if (temp[i].psw == document.getElementById("psw").value) {
					flag = false;
					document.getElementById('id01').style.display = "none";
					document.getElementById("u_name").innerHTML = temp[i].fullName;
					localStorage.setItem("logInUser", JSON.stringify(temp[i]));
					changeButtonsAccLogStat();
				} else {
					flag = false;
					$("psw_error").innerHTML = "Password is incorrect";
				}
			}
		}
		if (flag) {
			$("psw_error").innerHTML = "Please signup, email does not exist";
		}
	}
}


var loginUserValidation = function () {
	var uemail = $("uemail").value;
	var psw = $("psw").value;
	var isValid = true;
	if (uemail == "") {
		$("uemail_error").innerHTML = "Email is required.";
		isValid = false;
	} else {
		if (validateEmail(uemail)) {
			$("uemail_error").innerHTML = "";
		} else {
			$("uemail_error").innerHTML = "Email is invalid.";
			isValid = false;
		}
	}

	if (psw == "") {
		$("psw_error").innerHTML = "Password is required.";
		isValid = false;
	} else {
		if (checkPasswordLength(psw)) {
			$("psw_error").innerHTML = "";
		} else {
			$("psw_error").innerHTML = "Password should be minimum six characters";
			isValid = false;
		}
	}
	if (isValid) {
		//		$("loginInSuccess").innerHTML = "Login successful";
		loginUser();
	} else {
		//        $("loginInSuccess").innerHTML = "";
	}
}

var signUpUser=function() {
	if (JSON.parse(localStorage.getItem("userData")) && JSON.parse(localStorage.getItem("userData")).length > 0) {
		var flag = true;
		var temp = JSON.parse(localStorage.getItem("userData"));
		for (var i = 0; i < temp.length; i++) {
			if (temp[i].email == document.getElementById("email").value) {
				flag = false;
				$("signUpSuccess").innerHTML = 'Email alreay exists';
			}
		}

		if (flag) {
			if (document.getElementById("signUpPsw").value == document.getElementById("signUpPswConfirm").value) {
				temp.push({
					fullName: document.getElementById("fullName").value,
					email: document.getElementById("email").value,
					psw: document.getElementById("signUpPsw").value
				});
				localStorage.setItem("userData", JSON.stringify(temp))
				$("signUpSuccess").innerHTML = 'Sign up successful, ' + '<a href="#" onclick="openLoginModal()">Login</a>' + ' to continue';
				//document.getElementById('id02').style.display = "none";
			} else {
//				alert("Repeat password does not match");
			}
		}
	} else {
		if (document.getElementById("signUpPsw").value == document.getElementById("signUpPswConfirm").value) {
			localStorage.setItem("userData", JSON.stringify([]))
			var temp = JSON.parse(localStorage.getItem("userData"));
			temp.push({
				fullName: document.getElementById("fullName").value,
				email: document.getElementById("email").value,
				psw: document.getElementById("signUpPsw").value
			});
			localStorage.setItem("userData", JSON.stringify(temp))
			//alert("Successfully registered");
			$("signUpSuccess").innerHTML = "Sign up successful";
			//document.getElementById('id02').style.display = "none";
			changeButtonsAccLogStat();
		} else {
//			alert("Repeat password does not match");
		}
	}
}

var signUpUserValidation = function () {
	var fullName = $("fullName").value;
	var email = $("email").value;
	var signUpPsw = $("signUpPsw").value;
	var signUpPswConfirm = $("signUpPswConfirm").value;
	var isValid = true;
	if (fullName == "") {
		$("fullName_error").innerHTML = "Name is required.";
		isValid = false;
	} else {
		$("fullName_error").innerHTML = "";
	}

	if (email == "") {
		$("email_error").innerHTML = "Email is required.";
		isValid = false;
	} else {
		if (validateEmail(email)) {
			$("email_error").innerHTML = "";
		} else {
			$("email_error").innerHTML = "Email is invalid.";
			isValid = false;
		}
	}

	if (signUpPsw == "") {
		$("signUpPsw_error").innerHTML = "Password is required.";
		isValid = false;
	} else {
		$("signUpPsw_error").innerHTML = "";
	}

	if (signUpPswConfirm == "") {
		$("signUpPswConfirm_error").innerHTML = "Confirm password is required.";
		isValid = false;
	} else if (signUpPswConfirm !== signUpPsw) {
		$("signUpPswConfirm_error").innerHTML = "Password and confirm password should be same.";
		isValid = false;
	} else {
		if (checkPasswordLength(signUpPsw)) {
			$("signUpPswConfirm_error").innerHTML = "";
		} else {
			$("signUpPswConfirm_error").innerHTML = "Password should be minimum six characters";
			isValid = false;
		}
	}
	if (isValid) {
		signUpUser();
	} else {
		//        $("signUpSuccess").innerHTML = "";
	}
}

var openLoginModal = function () {
	$('id02').style.display = 'none';
	$('id01').style.display = 'block';
	$("uemail_error").innerHTML = "";
	$("psw_error").innerHTML = "";
	$("uemail").value = "";
	$("psw").value = "";
	$("loginInSuccess").innerHTML = "";
}


var openSignUpModal = function () {
	$('id01').style.display = 'none';
	$('id02').style.display = 'block';
	$("fullName_error").innerHTML = "";
	$("email_error").innerHTML = "";
	$("signUpPsw_error").innerHTML = "";
	$("signUpPswConfirm_error").innerHTML = "";
	$("fullName").value = "";
	$("email").value = "";
	$("signUpPsw").value = "";
	$("signUpPswConfirm").value = "";
	$("signUpSuccess").innerHTML = "";
}

var validateEmail = function (email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

var checkPasswordLength = function (password) {
	if (password.length > 5) {
		return true;
	} else {
		return false;
	}
}

var initialLoadOfItems = function() {
	for (x in listOfItems) {


		cards = cards + '<div class="card-individual" id="' + listOfItems[x].itemId + '_card">' +
			'<div class="card-styling">' +
			'<img src="./images/Food_imgs/' + listOfItems[x].imgName + '.jpg" alt="not found" style="width:100%">' +
			'<h4 class="card-item-name"><b>' + listOfItems[x].name + '</b></h4>' +
			'<div style="display:flex;justify-content:center">' +
			'<button class="minus-button" onclick="removeFromCart(listOfItems[' + x + '])">-</button>' +
			'<button class="individual-count" id="' + listOfItems[x].itemId + '"></button>' +
			'<button class="plus-button" onclick="addToCart(listOfItems[' + x + '])">+</button>' +
			'</div>' +
			'</div>' +
			'</div>'
	}
	if (document.getElementById("items")) {
		document.getElementById("items").innerHTML = cards;
	}
	document.getElementById("lblCartCount").innerHTML = getValue();
}

var updateAllIndividualItems=function() {
	if (document.getElementById("items")) {
		if (localStorage.getItem("cartItems")) {
			var flag = 0;
			var cartItems = JSON.parse(localStorage.getItem("cartItems"));
			for (var i = 0; i < listOfItems.length; i++) {
				for (var j = 0; j < cartItems.length; j++) {
					if (listOfItems[i].itemId == cartItems[j].itemId) {
						document.getElementById(listOfItems[i].itemId).innerHTML = cartItems[j].quantitySelected;
						flag++;
					}
				}
				if (flag == 0) {
					document.getElementById(listOfItems[i].itemId).innerHTML = 0;
				} else {
					flag = 0;
				}
			}
			document.getElementById("lblCartCount").innerHTML = getValue();
		} else {
			document.getElementById("lblCartCount").innerHTML = 0;
			for (var i = 0; i < listOfItems.length; i++) {
				document.getElementById(listOfItems[i].itemId).innerHTML = 0;

			}
		}
	}
}

var getValue = function() {
	var sum = 0;
	var temp = JSON.parse(localStorage.getItem("cartItems"));
	if (temp) {
		for (var i = 0; i < temp.length; i++) {
			sum = sum + temp[i].quantitySelected;
		}
	}
	return sum;
}

var addToCart = function(item) {
	if (!localStorage.getItem("cartItems")) {
		item.quantitySelected++;
		cartItems.push(item)
		document.getElementById(item.itemId).innerHTML = item.quantitySelected;
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
		document.getElementById("lblCartCount").innerHTML = getValue();
	} else {
		var newItem = true;
		var temp = JSON.parse(localStorage.getItem("cartItems"));
		for (var i = 0; i < temp.length; i++) {
			if (temp[i].itemId == item.itemId) {
				temp[i].quantitySelected++;
				var itmId = item.itemId
				document.getElementById(itmId).innerHTML = temp[i].quantitySelected;
				newItem = false;
				break;
			}
		}
		if (newItem) {
			item.quantitySelected++;
			document.getElementById(item.itemId).innerHTML = item.quantitySelected;
			temp.push(item)
		}
		localStorage.setItem("cartItems", JSON.stringify(temp));
		document.getElementById("lblCartCount").innerHTML = getValue();
	}
}

var removeFromCart = function(item) {
	if (JSON.parse(localStorage.getItem("cartItems")).length > 0) {
		var temp = JSON.parse(localStorage.getItem("cartItems"));
		for (var i = 0; i < temp.length; i++) {
			if (temp[i].itemId == item.itemId && temp[i].quantitySelected > 0) {
				temp[i].quantitySelected--;
				document.getElementById(temp[i].itemId).innerHTML = temp[i].quantitySelected;
				localStorage.setItem("cartItems", JSON.stringify(temp));
				break;
			}
		}
		document.getElementById("lblCartCount").innerHTML = getValue();
	}
}

var checkLoginStatus = function() {
	if (JSON.parse(localStorage.getItem("logInUser"))) {
		return true;
	}
	return false;
}

initialLoadOfItems();

updateAllIndividualItems();

changeButtonsAccLogStat();

var logoutUser = function() {
	localStorage.removeItem("logInUser");
	changeButtonsAccLogStat();
}

// Get the modal
var modalOne = document.getElementById('id01');

var modalTwo = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modalOne) {
		modalOne.style.display = "none";
	}
	if (event.target == modalTwo) {
		modalTwo.style.display = "none";
	}
}

var searchFunction = function () {
	var input, filter, a, i, txtValue;
	var counter = 0;
	input = document.getElementById('myInput').value;
	filter = input.toUpperCase();
	for (i = 0; i < listOfItems.length; i++) {
		txtValue = listOfItems[i].name;
		//    txtValue = a.textContent || a.innerText; 
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			id = listOfItems[i].itemId + "_card";
			document.getElementById(id).style.display = "";
		} else {
			id = listOfItems[i].itemId + "_card";
			document.getElementById(id).style.display = "none";
			counter++;
		}
	}
	if (counter == listOfItems.length) {
		document.getElementById("no_matches").style.display = "block";
	} else {
		document.getElementById("no_matches").style.display = "none";
	}
}

var openCartPage = function () {
	var temp = JSON.parse(localStorage.getItem("logInUser"));
	if (temp) {
		if (getValue() > 0) {
			location.href = "../pages/paymentPage.html";
		}
	} else {
		modalOne.style.display = "block";
	}
}
var homePage = function () {
	location.href = "../index.html";
}
for (var i = 0; i < listOfItems; i++) {
	if (listOfItems[i].name == cartItems[j].itemId) {
		document.getElementById(listOfItems[i].itemId).innerHTML = cartItems[j].quantitySelected;
		flag++;
	}
}

var checkoutitems = JSON.parse(localStorage.getItem("cartItems"))

var displayinCheckout = function() {
	if (document.getElementById("order_table") != null) {
		for (x in checkoutitems) {
			//to display items whoes quantity is greater than zero
			if (checkoutitems[x].quantitySelected > 0) {
				var table = document.getElementById("order_table");
				var row = table.insertRow(1);
				row.id = `item${x}`;
				document.getElementById(`item${x}`).className = "table_row";
				var itemname = row.insertCell(0);
				var quantity = row.insertCell(1)
				var itemprice = row.insertCell(2);
				itemname.innerHTML = checkoutitems[x].name;
				quantity.innerHTML = `<span id=qnty${x}>${checkoutitems[x].quantitySelected}</span>`;
				itemprice.innerHTML = "$" + checkoutitems[x].cost * checkoutitems[x].quantitySelected;
				itemprice.id = `itemprice${x}`;
			}
		}
	}

}
displayinCheckout();

var addQuantity = function(x) {
	checkoutitems[x].quantitySelected = checkoutitems[x].quantitySelected + 1;
	document.getElementById(`qnty${x}`).innerHTML = checkoutitems[x].quantitySelected;
	document.getElementById(`itemprice${x}`).innerHTML = checkoutitems[x].cost * checkoutitems[x].quantitySelected;
	//update local storage
	var updatelocalstorage = JSON.parse(localStorage.getItem("cartItems"));
	updatelocalstorage[x].quantitySelected = checkoutitems[x].quantitySelected;
	localStorage.setItem("cartItems", JSON.stringify(updatelocalstorage));
}

var removeQuantity = function(x) {
	if (checkoutitems[x].quantitySelected >= 1) {
		checkoutitems[x].quantitySelected = checkoutitems[x].quantitySelected - 1;
		document.getElementById(`qnty${x}`).innerHTML = checkoutitems[x].quantitySelected;
		document.getElementById(`itemprice${x}`).innerHTML = checkoutitems[x].cost * checkoutitems[x].quantitySelected;
		if (checkoutitems[x].quantitySelected == 0) {
			var delrow = document.getElementById(`item${x}`);
			delrow.parentNode.removeChild(delrow);
		}
	}
	//update local storage
	var updatelocalstorage = JSON.parse(localStorage.getItem("cartItems"));
	updatelocalstorage[x].quantitySelected = checkoutitems[x].quantitySelected;
	localStorage.setItem("cartItems", JSON.stringify(updatelocalstorage));
}

var total = function() {
	var cartitemsfortotal = JSON.parse(localStorage.getItem("cartItems"));
	var subtotal = 0;
	for (x in cartitemsfortotal) {
		subtotal = subtotal + cartitemsfortotal[x].quantitySelected * cartitemsfortotal[x].cost;
	}
	var tax = 0.13 * subtotal;

	var total = (subtotal + tax).toFixed(2);
    if(document.getElementById("subtotalvalue") && document.getElementById("totalvalue") && document.getElementById("taxvalue")){
       document.getElementById("subtotalvalue").innerHTML = "$" + subtotal;
        document.getElementById("taxvalue").innerHTML = "$" + tax;
        document.getElementById("totalvalue").innerHTML = "$" + total;
       }	
}

total();


var orderSucess = function(){
    var temp = JSON.parse(localStorage.getItem("logInUser"));
    if(temp){
           if(paymentPageValidation()){
               document.getElementById("sucess-msg").innerHTML="Your order has been sucessfully placed!!"
           }
       } else{
                modalOne.style.display = "block";
           } 
    if(paymentPageValidation()){
       document.getElementById("pay-val-msg").style.display = "none";
       }
    
}

var paymentPageValidation = function(){
    var valid = true;
    if((document.getElementById("card_h").value=="")||(document.getElementById("card").value=="")||(document.getElementById("cvc").value=="")||(document.getElementById("exp").value=="")) {
        valid = false;
        document.getElementById("pay-val-msg").innerHTML ="Please enter valid inputs";
        
    }
    return valid;
}

if(document.getElementById("addressHolder")){
    document.getElementById("addressHolder").style.display = "none";   
}

var saveAddress = function(){
    var $ = function(id){
    return document.getElementById(id);
}
    var valid = true;
    
    if($("ustreet").value==""){
    $("ustreet_error").innerHTML="This is a required field";
    valid = false;
}else{
    $("ustreet_error").innerHTML="";

}

if($("ucity").value==""){
    $("ucity_error").innerHTML="This is a required field";
    valid=false;
}
else{
    $("ucity_error").innerHTML="";
}
    
    if($("upostal").value==""){
    $("upostal_error").innerHTML="This is a required field";
    valid=false;
}
else{
    $("upostal_error").innerHTML="";
}
   
if(valid){
   document.getElementById('add_pop').style.display="none";
    document.getElementById('add_value1').innerHTML=$("ustreet").value;
    document.getElementById('add_value2').innerHTML=$("ucity").value;
    document.getElementById('add_value3').innerHTML=$("upostal").value;
    document.getElementById("addressHolder").style.display = "block";
   }  
}

var full_address_window = function(){
    document.getElementById('add_pop').style.display = 'block';
	document.getElementById('ustreet').innerHTML="";
    document.getElementById('ucity').innerHTML="";
    document.getElementById('upostal').innerHTML="";
}
 

var addr = function(){
    var add_1 = document.getElementById("ustreet").nodeValue;
    var add_2 = document.getElementById("ucity").nodeValue;
    var add_3 = document.getElementById("upostal").nodeValue;
    document.getElementById("add_value1").innerHTML=add_1;
    document.getElementById("add_value2").innerHTML=add_2;
    document.getElementById("add_value3").innerHTML=add_3;
}