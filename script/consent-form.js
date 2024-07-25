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
    const formContainer = document.getElementById('form-container');
    const successContainer = document.getElementById('success-container');

    // For canvas
    const desiredWidth = 750;
    const desiredHeight = 300; 

    canvas.style.width = desiredWidth + "px";
    canvas.style.height = desiredHeight + "px";

    const dpr = window.devicePixelRatio || 1;
    canvas.width = desiredWidth * dpr;
    canvas.height = desiredHeight * dpr;

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
        yesInput.required = true;
        yesInput.class = 'item';
        yesLabel.prepend(yesInput);

        const noLabel = document.createElement('label');
        noLabel.textContent = 'No';
        const noInput = document.createElement('input');
        noInput.type = 'radio';
        noInput.name = `question${index}`;
        noInput.value = 'no';
        noInput.required = true;
        noInput.class = 'item';
        noLabel.prepend(noInput);

        radioGroup.appendChild(yesLabel);
        radioGroup.appendChild(noLabel);
        formRow.appendChild(label);
        formRow.appendChild(radioGroup);
        questionsContainer.appendChild(formRow);
    });

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
                    // form.reset()
                    // ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // formContainer.style.display = 'none';
                    // successContainer.style.display = 'block';
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

    function checkInputs() {
        let isValid = true;
        let firstInvalidField = null;

        const requiredInputs = document.querySelectorAll('#consultationForm input[required], #consultationForm textarea[required], #consultationForm input[type="email"], #consultationForm input[type="date"], #consultationForm input[type="tel"]');
        
        requiredInputs.forEach(input => {
            if ((input.type === "checkbox" || input.type === "radio") && !input.checked) {
                isValid = false;
                firstInvalidField = firstInvalidField || input;
                return;
            }
            if (input.value.trim() === '') {
                isValid = false;
                firstInvalidField = firstInvalidField || input;
            }
        });

        if (firstInvalidField) {
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            window.scrollBy(0, -50);
            firstInvalidField.focus();
        }

        return isValid;
    }

    function checkEmail() {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const errorTxtEmail = document.querySelector(".error-text.email")

        if (!email.value.match(emailRegex)) {
            email.classList.add("error");
            email.parentElement.classList.add("error");

            if (email.value != "") {
                errorTxtEmail.innerText = "Enter a valid email address";
            }
            else {
                errorTxtEmail.innerText = "Email address cannot be blank";
            }
        }
        else {
            email.classList.remove("error");
            email.parentElement.classList.remove("error");
        }
    }

    // Signature drawing
    let drawing = false;
    ctx.scale(dpr, dpr);

    function startDrawing(event) {
        drawing = true;
        draw(event);
    }
    
    function endDrawing() {
        drawing = false;
        ctx.beginPath();
    }
    
    function draw(event) {
        if (!drawing) return;
    
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
    
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;    // scale x
        const scaleY = canvas.height / rect.height;  // scale y
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
    
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseout", endDrawing);
    
    clearBtn.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        form.reset();
    });


    formEmail.addEventListener("submit", (e) => {
        e.preventDefault();
        // checkInputs();

        // if (checkInputs()) {
        //     sendEmail();
        // }

        sendEmail().then(response => {
            if (response.success) {
                form.reset()
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
        
    });

});