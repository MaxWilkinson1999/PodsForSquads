document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Redirect to HomeScreen.html
        window.location.href = "HomeScreen.html";
    });
});