document.addEventListener("DOMContentLoaded", function () {

    const artistGrid = document.getElementById("artistGrid");

    const images = [
        { file: 'gayle.png', text: 'Gayle Brown', pageLink: 'gayle.html', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@gayle_poppynflo' },
        { file: 'kyle.jpg', text: 'Kyle Moore', pageLink: 'kyle.html', instaLink: 'https://www.instagram.com/kyle_moore_tattoo/', instaHandle: '@kyle_moore_tattoo' },
        { file: 'kyle_selfie.png', text: 'Sinead Parkin', pageLink: 'https://www.instagram.com/gayle_poppynflo/', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@kyle_moore_tattoo' },
        { file: 'kyle.jpg', text: 'Chloe Tammie', pageLink: 'https://www.instagram.com/gayle_poppynflo/', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@kyle_moore_tattoo' },
        { file: 'kyle.jpg', text: 'Laura Baxter', pageLink: 'https://www.instagram.com/gayle_poppynflo/', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@kyle_moore_tattoo' },
        { file: 'kyle.jpg', text: 'Luke Clouston', pageLink: 'https://www.instagram.com/gayle_poppynflo/', instaLink: 'https://www.instagram.com/gayle_poppynflo/', instaHandle: '@kyle_moore_tattoo' },
    ];

    images.forEach(image => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container-ease");

        const textElement = document.createElement("h3");
        textElement.classList.add("image-text");
        textElement.style.fontWeight = "normal";
        textElement.textContent = image.text;

        const imgElement = document.createElement("img");
        imgElement.src = 'assets/' + image.file;
        imgElement.classList.add("image");

        const instagramIcon = document.createElement("i");
        instagramIcon.classList.add("fa", "fa-instagram");
        instagramIcon.style.fontSize = "18px";
        instagramIcon.style.color = "white";
        instagramIcon.style.marginRight = "8px";

        const instagramLink = document.createElement("a");
        instagramLink.href = image.instaLink;
        instagramLink.target = "_blank";
        instagramLink.classList.add("instagram-link");

        instagramLink.appendChild(instagramIcon); 
        instagramLink.append(image.instaHandle); 

        imgContainer.addEventListener('click', (event) => {
            if (!event.target.closest('.instagram-link')) { // Only redirect if not clicking the Instagram link
                window.location.href = image.pageLink;
            }
        });

        imgContainer.appendChild(textElement);
        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(instagramLink);
        artistGrid.appendChild(imgContainer);
    });


});
