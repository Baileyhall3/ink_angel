document.addEventListener('DOMContentLoaded', function () {
        
    const canvas = document.getElementById("signatureCanvas");
    const ctx = canvas.getContext("2d");
    const clearBtn = document.getElementById("clearCanvas");
    const formEmail = document.querySelector("form");
    const form = document.getElementById("consultationForm");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const phone = document.getElementById("phone");
    const dob = document.getElementById("dob");
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

        let bodyMessage  = `Consultation Form Details
                            <br><br>
                            Full Name: ${fullName.value} <br>
                            Email: ${email.value} <br>
                            Address: ${address.value} <br>
                            Phone Number: ${phone.value} <br>
                            Date Of Birth: ${dob.value}<br>
                            Acknowledgement: ${ack.checked ? 'Yes' : 'No'}<br>
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
            Subject : `Consultation Form Submitted for ${fullName.value}`,
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

    const rect = canvas.getBoundingClientRect();
    const displayWidth = rect.width;
    const displayHeight = rect.height;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    let drawing = false;
    let hasDrawn = false;
    ctx.scale(dpr, dpr);

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
        event.preventDefault();
        if (!drawing) return;
    
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
    
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
    
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener('touchstart', startDrawing);

    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        draw(mouseEvent);
      }, false);

    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mouseout", endDrawing);

    canvas.addEventListener('touchend', endDrawing);
    
    clearBtn.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        form.reset();
        hasDrawn = false;
    });

    function createErrorMessage(inputElement) {
        let errorSpan = inputElement.parentNode.querySelector('.error-message');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-message');
            errorSpan.innerText = 'This field is required.';
            inputElement.parentNode.appendChild(errorSpan);
        }
    }

    requiredFields.forEach(input => {
        createErrorMessage(input);

        // Remove error message and styling when user inputs data
        input.addEventListener('input', () => {
            if (input.type === 'checkbox') {
                if (input.checked) {
                    input.classList.remove('error');
                    input.parentNode.querySelector('.error-message').style.display = 'none';
                }
            } else if (input.value.trim()) {
                input.classList.remove('error');
                input.parentNode.querySelector('.error-message').style.display = 'none';
            }
        });
    });

    formEmail.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let formIsValid = true;

        requiredFields.forEach(input => {
            const errorSpan = input.parentNode.querySelector('.error-message');

            if ((input.type === 'checkbox' && !input.checked) || (input.type !== 'checkbox' && !input.value.trim())) {
                input.classList.add('error');
                errorSpan.style.display = 'block';
                formIsValid = false;
            } else {
                input.classList.remove('error');
                errorSpan.style.display = 'none';
            }
        });

        let allQuestionsAnswered = true;
        questions.forEach((question, index) => {
            const yesInput = document.querySelector(`input[name="question${index}"][value="yes"]`);
            const noInput = document.querySelector(`input[name="question${index}"][value="no"]`);
            if (!yesInput.checked && !noInput.checked) {
                allQuestionsAnswered = false;
                return; // Break out of the loop if any question is unanswered
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
        }
    });

});