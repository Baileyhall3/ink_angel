document.addEventListener("DOMContentLoaded", function () {
    fetch("navbar.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("navbar-placeholder").innerHTML = html;

            var lastScrollTop = 0;
            window.addEventListener("scroll", function () {
                var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                var navbar = document.querySelector(".nav");

                // Check the scroll direction and hide/show the navbar accordingly
                if (currentScrollTop > lastScrollTop) {
                    navbar.classList.add("hidden");
                } else {
                    navbar.classList.remove("hidden");
                }

                lastScrollTop = currentScrollTop;
            });

            var currentPath = window.location.pathname;

            var homeLink = document.getElementById("home-link");
            var aboutLink = document.getElementById("about-link");
            var artistsLink = document.getElementById("artists-link");
            var contactLink = document.getElementById("contact-link");

            // Determine which link should be active based on the current page
            if (currentPath.includes("index.html")) {
                homeLink.classList.add("active");
            } else if (currentPath.includes("about.html")) {
                aboutLink.classList.add("active");
            } else if (currentPath.includes("artists.html")) {
                artistsLink.classList.add("active");
            } else if (currentPath.includes("contact.html")) {
                contactLink.classList.add("active");
            } else if (currentPath.includes("kyle.html")) {
                artistsLink.classList.add("active");
            } else if (currentPath.includes("gayle.html")) {
                artistsLink.classList.add("active");
            } 

            var hamburger = document.getElementById("hamburger");
            var navMenu = document.getElementById("nav-menu");

            hamburger.addEventListener("click", function () {
                navMenu.classList.toggle("show");
            });

        })
        .catch(error => console.error('Error loading navbar:', error));
    
});
