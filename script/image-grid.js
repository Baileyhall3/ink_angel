document.addEventListener("DOMContentLoaded", function () {
// Image grid script
    const imageGrid = document.getElementById("imageGrid");

    // const imageFiles = ['001.jpg',
    //                             '002.jpg',
    //                             '003.jpg',
    //                             '004.jpg',
    //                             '005.jpg',
    //                             '006.jpg',
    //                             '007.jpg',
    //                             '008.jpg',
    //                             '009.jpg'];

    const images = [
        { file: '001.jpg', text: 'By Gayle', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '002.jpg', text: 'By Gayle', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '003.jpg', text: 'By Gayle', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '004.jpg', text: 'By Gayle', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '005.jpg', text: 'By Gayle', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '006.jpg', text: 'By Gayle', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '007.jpg', text: 'By Gayle', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '008.jpg', text: 'By Gayle', link: 'https://www.instagram.com/gayle_poppynflo/' },
        { file: '009.jpg', text: 'By Gayle', link: 'https://www.instagram.com/gayle_poppynflo/' },

    ];

    const shuffledImages = shuffleArray(images);

    shuffledImages.forEach(image => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");

        const imgElement = document.createElement("img");
        imgElement.src = '../images/' + image.file;
        imgElement.classList.add("image");

        const overlay = document.createElement("div");
        overlay.classList.add("image-overlay");

        const overlayText = document.createElement("p");
        overlayText.classList.add("overlay-text");

        const textNode = document.createTextNode(image.text);
        overlayText.appendChild(textNode);

        const linkElement = document.createElement("a");
        linkElement.href = image.link;
        linkElement.target = "_blank"; // Open link in a new tab
        linkElement.textContent = "See More";

        overlayText.appendChild(linkElement);
        overlay.appendChild(overlayText);
        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(overlay);
        imageGrid.appendChild(imgContainer);
    });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
