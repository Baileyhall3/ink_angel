<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    // $message = htmlspecialchars(trim($_POST['message']));

    // Define the recipient email address
    $to = "baileyhall271001@gmail.com";

    // Define the subject
    $subject = "New Consultation Form Submission";

    // Create the email body
    $body = "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    // Set the email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for your message. We will get back to you shortly.";
    } else {
        echo "There was a problem sending your message. Please try again.";
    }
} else {
    // Redirect to the form page if accessed directly
    // header("Location: form_page.html");
    exit();
}
?>