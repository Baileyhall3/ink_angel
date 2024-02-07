document.addEventListener("DOMContentLoaded", function () {
    // Fetch the content of navbar.html and insert it into the placeholder
    fetch("navbar.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("navbar-placeholder").innerHTML = html;

            // Event listener for scrolling
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


            // Get the current page URL
            var currentPath = window.location.pathname;

            // Get the link elements
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
            }
        })
        .catch(error => console.error('Error loading navbar:', error));
});
