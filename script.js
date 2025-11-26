const toggleDark = document.getElementById("darkToggle");

const html = document.documentElement;

toggleDark.addEventListener("click", () => {
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

if (localStorage.getItem("theme") === "dark") {
    html.classList.add("dark");
}
console.log(document.documentElement.classList.add("dark")
);
