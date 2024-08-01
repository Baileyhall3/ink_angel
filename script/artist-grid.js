document.addEventListener("DOMContentLoaded", function () {

    const artistGrid = document.getElementById("artistGrid");

    const images = [
        { file: 'gayle.png', text: 'Gayle Brown', pageLink: 'gayle.html', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@gayle_poppynflo' },
        { file: 'kyle.jpg', text: 'Kyle Moore', pageLink: 'kyle.html', instaLink: 'https://www.instagram.com/kyle_moore_tattoo/', instaHandle: '@kyle_moore_tattoo' },
        { file: 'kyle_selfie.png', text: 'Sinead Parkin', pageLink: 'sinead.html', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@kyle_moore_tattoo' },
        { file: 'kyle.jpg', text: 'Chloe Tammie', pageLink: 'chloe.html', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@kyle_moore_tattoo' },
        { file: 'kyle.jpg', text: 'Laura Baxter', pageLink: 'laura.html', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@kyle_moore_tattoo' },
        { file: 'kyle.jpg', text: 'Luke Clouston', pageLink: 'luke.html', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@kyle_moore_tattoo' },
    ];

    images.forEach(image => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container-ease");

        const imgContainerLink = document.createElement("div");
        imgContainer.classList.add("image-container-link");

        const textElement = document.createElement("h3");
        textElement.classList.add("image-text");
        textElement.style.fontWeight = "normal";
        textElement.textContent = image.text;

        const imgElement = document.createElement("img");
        imgElement.src = 'assets/' + image.file;
        imgElement.classList.add("image");

        const iconContainer = document.createElement("div");

        const instagramIcon = document.createElement("i");
        instagramIcon.classList.add("fa", "fa-instagram");
        instagramIcon.style.fontSize = "24px";
        instagramIcon.style.color = "white";
        instagramIcon.style.marginRight = "8px";

        const facebookIcon = document.createElement("i");
        facebookIcon.classList.add("fa", "fa-facebook");
        facebookIcon.style.fontSize = "24px";
        facebookIcon.style.color = "white";
        facebookIcon.style.marginRight = "8px";

        const instagramLink = document.createElement("a");
        instagramLink.href = image.instaLink;
        instagramLink.target = "_blank";
        instagramLink.classList.add("instagram-link");

        // instagramLink.appendChild(instagramIcon); 
        instagramLink.append(image.instaHandle); 

        imgContainerLink.addEventListener('click', (event) => {
            window.location.href = image.pageLink;
        });

        instagramIcon.addEventListener('click', (event) => {
            window.location.href = image.instaLink;
        });

        facebookIcon.addEventListener('click', (event) => {
            window.location.href = image.instaLink;
        });

        imgContainer.appendChild(imgContainerLink);
        imgContainer.appendChild(iconContainer);
        iconContainer.appendChild(instagramIcon)
        iconContainer.appendChild(facebookIcon)
        imgContainerLink.appendChild(textElement);
        imgContainerLink.appendChild(imgElement);
        // imgContainer.appendChild(instagramIcon);
        // imgContainer.appendChild(facebookIcon)
        artistGrid.appendChild(imgContainer);
    });


});
