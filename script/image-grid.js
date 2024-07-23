document.addEventListener("DOMContentLoaded", function () {

    const imageGrid = document.getElementById("imageGrid");

    const images = [
        { file: '001.jpg', text: 'By Gayle - ', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '002.jpg', text: 'By Gayle - ', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '003.jpg', text: 'By Gayle - ', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '004.jpg', text: 'By Gayle - ', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '005.jpg', text: 'By Gayle - ', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '006.jpg', text: 'By Gayle - ', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '007.jpg', text: 'By Gayle - ', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '008.jpg', text: 'By Gayle - ', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '009.jpg', text: 'By Gayle - ', link: 'https://www.instagram.com/gayle_poppynflo/' },

    ];

    // const shuffledImages = shuffleArray(images);

    images.forEach(image => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");

        const imgElement = document.createElement("img");
        imgElement.src = 'assets/' + image.file;
        imgElement.classList.add("image");

        const overlay = document.createElement("div");
        overlay.classList.add("image-overlay");

        const overlayText = document.createElement("p");
        overlayText.classList.add("overlay-text");

        const textNode = document.createTextNode(image.text);
        overlayText.appendChild(textNode);

        const linkElement = document.createElement("a");
        linkElement.href = image.link;
        linkElement.target = "_blank";
        linkElement.textContent = "See More";

        overlayText.appendChild(linkElement);
        overlay.appendChild(overlayText);
        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(overlay);
        imageGrid.appendChild(imgContainer);
    });
    
});
