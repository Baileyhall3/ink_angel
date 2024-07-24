document.addEventListener('DOMContentLoaded', function () {
        
    const canvas = document.getElementById("signatureCanvas");
    const ctx = canvas.getContext("2d");
    const clearBtn = document.getElementById("clearCanvas");
    const formEmail = document.querySelector("form");

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const phone = document.getElementById("phone");
    const dob = document.getElementById("dob");
    const signatureInput = document.getElementById("signatureInput");

    function sendEmail() {

        const bodyMessage  = `Consultation Form Details
                            <br><br>
                            Full Name: ${fullName.value} <br>
                            Email: ${email.value} <br>
                            Address: ${address.value} <br>
                            Phone Number: ${phone.value} <br>
                            Date Of Birth: ${dob}`

        Email.send({
            SecureToken: "1e5ad655-c276-46c2-8216-ef11746f18ff", 
            To : 'baileyhall271001@gmail.com',
            From : "baileyhall271001@gmail.com",
            Subject : "Consultation Form Submitted",
            Body : bodyMessage,

            // Attachments : [
            //     {
            //         name : "signature",
            //         path : "https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png"
            //     }]

        }).then(
            message => {
                if (message == "OK") {
                    formEmail.reset()
                    return false
                }
                else {
                    alert(message);
                }
            }
          
        );
    }

    function checkInputs() {
        const items = document.querySelectorAll(".item");

        for (const item of items) {
            if (item.value == "") {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            };

            if (items[1].value != "") {
                checkEmail();
            };

            items[1].addEventListener("keyup", () => {
                checkEmail();
            });

            item.addEventListener("keyup", () => {
                if (item.value != "") {
                    item.classList.add("error");
                    item.parentElement.classList.add("error");
                }
                else {
                    item.classList.add("error");
                    item.parentElement.classList.add("error");
                };
            });
        };
    };

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

    let drawing = false;

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
        ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseout", endDrawing);

    clearBtn.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

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


    formEmail.addEventListener("submit", (e) => {
        e.preventDefault();

        const dataURL = canvas.toDataURL("signature/png");
        signatureInput.value = dataURL;

        // checkInputs();
        sendEmail();
    });

});