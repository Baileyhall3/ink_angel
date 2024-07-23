document.addEventListener("DOMContentLoaded", function () {

    const artistGrid = document.getElementById("artistGrid");

    const images = [
        { file: 'gayle.png', text: 'Gayle Brown', pageLink: 'https://www.instagram.com/gayle_poppynflo/', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@gayle_poppynflo' },
        { file: 'kyle.jpg', text: 'Kyle Moore', pageLink: 'https://www.instagram.com/gayle_poppynflo/', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@kyle_moore_tattoo' },
        { file: 'kyle_selfie.png', text: 'Kyle Selfie', pageLink: 'https://www.instagram.com/gayle_poppynflo/', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@kyle_moore_tattoo' },
        { file: 'kyle.jpg', text: 'Kyle Dudley', pageLink: 'https://www.instagram.com/gayle_poppynflo/', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@kyle_moore_tattoo' },
        { file: 'kyle.jpg', text: 'Kyle Scheenbly', pageLink: 'https://www.instagram.com/gayle_poppynflo/', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@kyle_moore_tattoo' },

    ];

    images.forEach(image => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");

        const textElement = document.createElement("p");
        textElement.classList.add("image-text");
        textElement.textContent = image.text;

        const imgElement = document.createElement("img");
        imgElement.src = 'assets/' + image.file;
        imgElement.classList.add("image");

        const instagramIcon = document.createElement("i");
        instagramIcon.classList.add("fa", "fa-instagram");
        instagramIcon.style.fontSize = "18px";
        instagramIcon.style.color = "white";

        const instagramLink = document.createElement("a");
        instagramLink.href = image.instaLink;
        instagramLink.target = "_blank";
        instagramLink.textContent = image.instaHandle;

        instagramLink.appendChild(instagramIcon);
        imgContainer.appendChild(textElement);
        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(instagramLink);
        artistGrid.appendChild(imgContainer);
    })

});