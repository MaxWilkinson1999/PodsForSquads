document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get username and password from the form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    // Store the username and password in local storage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    
    // Redirect to the login page
   window.location.href = "LoginInScreen.html"
});