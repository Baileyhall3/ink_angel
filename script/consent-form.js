document.addEventListener('DOMContentLoaded', function () {
        
    // const canvas = document.getElementById("signatureCanvas");
    // const ctx = canvas.getContext("2d");
    const clearBtn = document.getElementById("clearCanvas");
    const formEmail = document.querySelector("form");
    const form = document.getElementById("consultationForm");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const phone = document.getElementById("phone");
    const dob = document.getElementById("dob");
    const artist = document.getElementById("artistSelect");
    const ack = document.getElementById("ack");
    const signatureInput = document.getElementById("signatureInput");
    const signatureError = document.getElementById('signatureError');
    const formContainer = document.getElementById('form-container');
    const successContainer = document.getElementById('success-container');

    const requiredFields = document.querySelectorAll('.form-group .item, .radio-group .ackItem');

    // Radio questions
    const questions = [
        "Heart disease / condition",
        "Eczema",
        "Impetigo",
        "Seizure, e.g. epilepsy",
        "Allergic reactions, e.g. anaesthetic, adhesive plasters, jewellery metals",
        "Any other allergy or nervous complaint",
        "Hepatitis A, B, C",
        "Diabetes",
        "Psoriasis",
        "Cellulitis",
        "HIV infection",
        "Any other blood or skin condition"
      ];
  
    questions.forEach((question, index) => {
        const formRow = document.createElement('div');
        formRow.classList.add('form-row');

        const label = document.createElement('label');
        label.textContent = question;
        label.setAttribute('for', `question${index}`);

        const radioGroup = document.createElement('div');
        radioGroup.classList.add('radio-group');

        const yesLabel = document.createElement('label');
        yesLabel.textContent = 'Yes';
        const yesInput = document.createElement('input');
        yesInput.type = 'radio';
        yesInput.name = `question${index}`;
        yesInput.value = 'yes';
        // yesInput.className = 'item';
        yesLabel.prepend(yesInput);

        const noLabel = document.createElement('label');
        noLabel.textContent = 'No';
        const noInput = document.createElement('input');
        noInput.type = 'radio';
        noInput.name = `question${index}`;
        noInput.value = 'no';
        // noInput.className = 'item';
        noLabel.prepend(noInput);

        radioGroup.appendChild(yesLabel);
        radioGroup.appendChild(noLabel);
        formRow.appendChild(label);
        formRow.appendChild(radioGroup);
        questionsContainer.appendChild(formRow);
    });

    const questionsError = document.createElement('span');
    questionsError.classList.add('error-message');
    questionsError.innerText = 'One or more items unchecked.';
    questionsError.style.display = 'none';
    questionsContainer.appendChild(questionsError);

    function sendEmail() {

        let bodyMessage  = `Consent Form Details
                            <br><br>
                            Full Name: ${fullName.value} <br>
                            Email: ${email.value} <br>
                            Address: ${address.value} <br>
                            Phone Number: ${phone.value} <br>
                            Date Of Birth: ${dob.value}<br>
                            Artist: ${artist.value}<br>
                            Acknowledgement: ${ack.checked ? 'Yes' : 'No'}<br><br>
                            <strong>Medical Questions:</strong><br>`

        questions.forEach((question, index) => {
            const answer = document.querySelector(`input[name="question${index}"]:checked`).value;
            bodyMessage += `${question}: ${answer} <br>`;
        });
                            
        const dataURL = canvas.toDataURL("image/png");
        const base64Signature = dataURL.split(',')[1];

        Email.send({
            SecureToken: "1e5ad655-c276-46c2-8216-ef11746f18ff", 
            To : 'baileyhall271001@gmail.com',
            From : "baileyhall271001@gmail.com",
            Subject : `Consent Form Submitted for ${fullName.value}`,
            Body : bodyMessage,
            Attachments : [
                {
                    name : "signature.png",
                    data: base64Signature
                }]

        }).then(
            message => {
                if (message == "OK") {
                }
                else {
                    alert(message);
                }
            }
          
        );

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        });

    }

    // Signature drawing
    const dpr = window.devicePixelRatio || 1;

    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
    }

    // Initial canvas setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let drawing = false;
    let hasDrawn = false;

    function startDrawing(event) {
        event.preventDefault();
        drawing = true;
        hasDrawn = true;
        draw(event);
    }

    function endDrawing() {
        drawing = false;
        ctx.beginPath();
    }

    function draw(event) {
        if (!drawing) return;

        event.preventDefault();
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / (rect.width * dpr);
        const scaleY = canvas.height / (rect.height * dpr);

        let x, y;
        if (event.touches) {
            // Touch event
            const touch = event.touches[0];
            x = (touch.clientX - rect.left) * scaleX;
            y = (touch.clientY - rect.top) * scaleY;
        } else {
            // Mouse event
            x = (event.clientX - rect.left) * scaleX;
            y = (event.clientY - rect.top) * scaleY;
        }

        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // Event listeners for canvas
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mouseout", endDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', endDrawing);

    
    clearBtn.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        form.reset();
        hasDrawn = false;
    });

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
    
    function isOver18(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
    
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1 >= 18;
        }
        return age >= 18;
    }

    requiredFields.forEach(input => {
        // Remove error message and styling when user inputs data
        input.addEventListener('input', () => {
            if (input.type === 'checkbox') {
                if (input.checked) {
                    removeErrorMessage(input);
                }
            } else if (input.value.trim()) {
                removeErrorMessage(input);
            }
        });
    });
    
    formEmail.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let formIsValid = true;
        let firstInvalidInput = null;

    
        requiredFields.forEach(input => {
            const value = input.value.trim();
            let errorMessage = '';
    
            if (input.type === 'checkbox' && !input.checked) {
                errorMessage = 'This field is required.';
                if (!firstInvalidInput) {
                    firstInvalidInput = input;
                }
            } else if (input.type !== 'checkbox' && !value) {
                errorMessage = 'This field is required.';
                if (!firstInvalidInput) {
                    firstInvalidInput = input;
                }
            } else if (input.type === 'email' && !isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address.';
                if (!firstInvalidInput) {
                    firstInvalidInput = input;
                }
            } else if (input.type === 'tel' && !isValidPhoneNumber(value)) {
                errorMessage = 'Phone number must be no more than 13 characters.';
                if (!firstInvalidInput) {
                    firstInvalidInput = input;
                }
            } else if (input.type === 'date' && !isOver18(value)) {
                errorMessage = 'You must be over 18 years old.';
                if (!firstInvalidInput) {
                    firstInvalidInput = input;
                }
            }
    
            if (errorMessage) {
                input.classList.add('error');
                createErrorMessage(input, errorMessage);
                formIsValid = false;
            } else {
                removeErrorMessage(input);
            }
        });
    
        let allQuestionsAnswered = true;
        questions.forEach((question, index) => {
            const yesInput = document.querySelector(`input[name="question${index}"][value="yes"]`);
            const noInput = document.querySelector(`input[name="question${index}"][value="no"]`);
            if (!yesInput.checked && !noInput.checked) {
                allQuestionsAnswered = false;
                return;
            }
        });
    
        if (!allQuestionsAnswered) {
            questionsError.style.display = 'block';
            formIsValid = false;
        } else {
            questionsError.style.display = 'none';
        }
    
        if (!hasDrawn) {
            signatureError.style.display = 'block';
            formIsValid = false;
        } else {
            signatureError.style.display = 'none';
        }
    
        if (formIsValid) {
            sendEmail().then(response => {
                if (response.success) {
                    formEmail.reset();
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    formContainer.style.display = 'none';
                    successContainer.style.display = 'block';
                } else {
                    alert('There was an error submitting your form. Please try again.');
                }
            }).catch(error => {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your form. Please try again.');
            });
        } else if (firstInvalidInput) {
            firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstInvalidInput.focus();
        }
    });

});