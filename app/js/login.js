(function() {

// Get elements

var txtEmail = document.getElementById("txtEmail");
var txtPassword = document.getElementById("txtPassword");
var btnLogIn = document.getElementById("btnLogin");
var btnSignUp = document.getElementById("btnSignUp");
var btnLogOut = document.getElementById("btnLogout");

// Add login event
btnLogIn.addEventListener("click",e => {
	// Get email and pass
	var email = txtEmail.value;
	var pass = txtPassword.value;
	var auth = firebase.auth();
	// Sign in
	var promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));
});

// Add signup event
btnSignUp.addEventListener("click",e =>{
	// Get email and pass
	var email = txtEmail.value;
	var pass = txtPassword.value;
	var auth = firebase.auth();
	// Create user
	var promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));
});

btnLogOut.addEventListener("click",e =>{
	firebase.auth().signOut();
});

// Add realtime listener

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser) {
		console.log(firebaseUser);
		btnLogOut.classList.remove("hide");
	} else {
		console.log("Not logged in")
		btnLogOut.classList.add("hide");
	}
});




}());

$(function() {
	$(".btn").click(function() {
	$(".form-signin").toggleClass("form-signin-left");
    $(".form-signup").toggleClass("form-signup-left");
    $(".frame").toggleClass("frame-long");
    $(".signup-inactive").toggleClass("signup-active");
    $(".signin-active").toggleClass("signin-inactive");
    $(".forgot").toggleClass("forgot-left");   
    $(this).removeClass("idle").addClass("active");
	});
});