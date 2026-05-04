<?php
session_start();

// ================= ALWAYS JSON =================
header("Content-Type: application/json");

// ================= SAFE ERROR HANDLING =================
ini_set('display_errors', 0);
error_reporting(0);

// ================= RESPONSE =================
function respond($status, $message) {
    echo json_encode([
        "status" => $status,
        "message" => $message
    ]);
    exit;
}

// ================= SAFE MAIL =================
function safeMail($to, $subject, $body) {

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
    $headers .= "From: Naveera <hello@getnos.io>\r\n";

    // prevent crash even if mail fails
    @mail($to, $subject, $body, $headers);
}

// ================= INPUT =================
$input = $_POST;

if (empty($input)) {
    $raw = file_get_contents("php://input");
    $input = json_decode($raw, true) ?? [];
}

// Debug file (check if needed)
file_put_contents(__DIR__ . "/debug.txt", print_r($input, true));

$action = $input['action'] ?? '';

// ================= SEND OTP =================
if ($action === "send_otp") {

    $email = trim($input['email'] ?? '');

    if (!$email) respond("error", "Email is required");

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond("error", "Invalid email");
    }

    // Generate OTP
    $otp = rand(100000, 999999);

    $_SESSION['otp'] = $otp;
    $_SESSION['otp_time'] = time();
    $_SESSION['form_data'] = $input;

    $subject = "Your OTP Code - Naveera";

    // ✅ EMAIL TEMPLATE
    $message = "
    <html>
    <body style='margin:0;padding:0;background:#f4f6f8;font-family:Arial;'>

    <table width='100%' style='padding:20px'>
    <tr><td align='center'>

    <table width='500' style='background:#fff;border-radius:10px;padding:20px'>
        
        <tr>
            <td align='center'>
                <img src='https://naveeratech.com/wp-content/uploads/2025/11/NT_Logo_light-1.svg'
                     style='max-width:140px;' />
            </td>
        </tr>

        <tr>
            <td align='center'>
                <h2>Verify Your Email</h2>
                <p>Your OTP is:</p>

                <div style='font-size:32px;font-weight:bold;color:#00A63E'>
                    {$otp}
                </div>

                <p style='font-size:12px;color:#777'>
                    Valid for 5 minutes
                </p>
            </td>
        </tr>

    </table>

    </td></tr>
    </table>

    </body>
    </html>
    ";

    safeMail($email, $subject, $message);

    respond("success", "OTP sent");
}

// ================= VERIFY OTP =================
if ($action === "verify_otp") {

    $enteredOtp = trim($input['otp'] ?? '');

    if (!isset($_SESSION['otp'])) {
        respond("error", "Session expired");
    }

    if ($enteredOtp != $_SESSION['otp']) {
        respond("error", "Invalid OTP");
    }

    if (time() - $_SESSION['otp_time'] > 300) {
        respond("error", "OTP expired");
    }

    // ================= GET FORM DATA =================
    $data = $_SESSION['form_data'] ?? [];

    $name      = htmlspecialchars($data['name'] ?? '');
    $email     = htmlspecialchars($data['email'] ?? '');
    $company   = htmlspecialchars($data['company'] ?? '');
    $challenge = htmlspecialchars($data['challenge'] ?? '');
    $details   = htmlspecialchars($data['details'] ?? '');

    // ================= SEND LEAD EMAIL =================
    $subject = "Naveera Generative AI";

    $body = "
    <html>
    <body style='font-family:Arial;background:#f4f6f8;padding:20px'>

    <div style='background:#fff;padding:20px;border-radius:10px'>

        <h2>New Lead Received</h2>

        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Company:</strong> {$company}</p>
        <p><strong>Challenge:</strong> {$challenge}</p>
        <p><strong>Details:</strong> {$details}</p>

    </div>

    </body>
    </html>
    ";

    safeMail("sriethiraj@getnos.io", $subject, $body);

    session_destroy();

    respond("success", "Form submitted successfully");
}

// ================= DEFAULT =================
respond("error", "Invalid request");