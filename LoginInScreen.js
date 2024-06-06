document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get username and password from the form
    var enteredUsername = document.getElementById("username").value;
    var enteredPassword = document.getElementById("password").value;
    
    // Retrieve username and password from local storage
    var storedUsername = localStorage.getItem("username");
    var storedPassword = localStorage.getItem("password");
    
    // Check if entered credentials match stored credentials
    if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
        // Credentials are correct, redirect to home page
        alert("Login successful!");
        window.location.href = "home.html"; // Redirect to home page
    } else {
        // Credentials are incorrect, show error message
        alert("Invalid username or password!");
    }
});