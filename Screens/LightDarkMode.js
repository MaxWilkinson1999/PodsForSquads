document.addEventListener("DOMContentLoaded", () => {
    const darkModeSwitch = document.getElementById("darkModeSwitch");
    const currentTheme = localStorage.getItem("theme") || "light";

    document.body.classList.add(currentTheme + "-mode");

    if (darkModeSwitch) {
        darkModeSwitch.checked = currentTheme === "dark";
        darkModeSwitch.addEventListener("click", () => {
            if (document.body.classList.contains("light-mode")) {
                document.body.classList.remove("light-mode");
                document.body.classList.add("dark-mode");
                localStorage.setItem("theme", "dark");
            } else {
                document.body.classList.remove("dark-mode");
                document.body.classList.add("light-mode");
                localStorage.setItem("theme", "light");
            }
        });
    } else {
        // For pages without the dark mode switch
        document.body.classList.add(currentTheme + "-mode");
    }
});
