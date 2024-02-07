document.addEventListener("DOMContentLoaded", function () {
    fetch("footer.html")
        .then(response => response.text())
        .then(html => {
            const footerContainer = document.createElement("div");
            footerContainer.innerHTML = html;
            document.body.appendChild(footerContainer);
        })
        .catch(error => console.error('Error loading footer:', error));
});
