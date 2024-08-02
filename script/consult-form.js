document.addEventListener('DOMContentLoaded', function () {
    const formEmail = document.querySelector("form");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const artistSelect = document.getElementById('artistSelect');
    const description = document.getElementById("message"); // Corrected the element reference
    const formContainer = document.getElementById('consult-form-container');
    const successContainer = document.getElementById('success-container');
    const requiredFields = document.querySelectorAll('.form-group-consult .item');
    const fileInput = document.getElementById('fileInput');

    function sendEmail(base64File) {
        let bodyMessage  = `Consultation Form Details
                            <br><br>
                            Full Name: ${fullName.value} <br>
                            Email: ${email.value} <br>
                            Phone Number: ${phone.value} <br>
                            Artist: ${artistSelect.value} <br>
                            Description: ${description.value}<br>`;

        let attachments = [];
        if (base64File) {
            attachments.push({
                name: fileInput.files[0].name,
                data: base64File
            });
        }

        Email.send({
            // UserName: "inkangelstudioinfo@gmail.com",
            // Password: "4418CEA578712947F9A046F980FBD2262EDC",
            SecureToken: "8389e714-9252-4f98-9503-8912c6534dd9", 
            To: 'inkangelstudioinfo@gmail.com',
            From: "inkangelstudioinfo@gmail.com",
            Subject: `Consultation Form Submitted for ${fullName.value}`,
            Body: bodyMessage,
            Attachments: attachments
        }).then(
            message => {
                if (message == "OK") {
                    formEmail.reset();
                    formContainer.style.display = 'none';
                    successContainer.style.display = 'block';
                } else {
                    alert(message);
                }
            }
        );
    }

    function createErrorMessage(inputElement, message) {
        let errorSpan = inputElement.parentNode.querySelector('.error-message');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-message');
            inputElement.parentNode.appendChild(errorSpan);
        }
        errorSpan.innerText = message;
        errorSpan.style.display = 'block';
    }

    function removeErrorMessage(inputElement) {
        inputElement.classList.remove('error');
        const errorSpan = inputElement.parentNode.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.style.display = 'none';
        }
    }

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function isValidPhoneNumber(phone) {
        return phone.length <= 13;
    }

    requiredFields.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                removeErrorMessage(input);
            }
        });
    });

    formEmail.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let formIsValid = true;

        requiredFields.forEach(input => {
            const value = input.value.trim();
            let errorMessage = '';

            if (!value) {
                errorMessage = 'This field is required.';
            } else if (input.type === 'email' && !isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address.';
            } else if (input.type === 'tel' && !isValidPhoneNumber(value)) {
                errorMessage = 'Phone number must be no more than 13 characters.';
            }

            if (errorMessage) {
                input.classList.add('error');
                createErrorMessage(input, errorMessage);
                formIsValid = false;
            } else {
                removeErrorMessage(input);
            }
        });

        if (formIsValid) {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64File = e.target.result.split('base64,')[1];
                    sendEmail(base64File);
                };
                reader.readAsDataURL(file);
            } else {
                sendEmail(null); // No file to upload
            }
        }
    });
});