<?php
// contact.php
// Suppress PHP warnings so they don't corrupt JSON output
error_reporting(0);
ini_set('display_errors', 0);

// ─── CORS Headers ─────────────────────────────────────────────────────────────
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

// ─── Load Config ──────────────────────────────────────────────────────────────
require_once __DIR__ . '/mail_config.php';

// ─── Load PHPMailer ───────────────────────────────────────────────────────────
// PHPMailer files must be placed in: api/PHPMailer/
require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// ─── Parse & Validate Input ───────────────────────────────────────────────────
$input = json_decode(file_get_contents("php://input"), true);

$name    = trim($input['name']    ?? '');
$email   = trim($input['email']   ?? '');
$phone   = trim($input['phone']   ?? '');
$message = trim($input['message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Name, email, and message are required."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email address format."]);
    exit;
}

// ─── Basic Spam Protection ────────────────────────────────────────────────────
if (strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Message is too long."]);
    exit;
}

// ─── Send Email via PHPMailer SMTP ────────────────────────────────────────────
try {
    $mail = new PHPMailer(true);

    // Server settings
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_ENCRYPTION;
    $mail->Port       = SMTP_PORT;

    // Sender & Recipient
    $mail->setFrom(MAIL_FROM_EMAIL, MAIL_FROM_NAME);
    $mail->addAddress(MAIL_TO_EMAIL, MAIL_TO_NAME);
    $mail->addReplyTo($email, $name); // Reply goes directly to the enquirer

    // Email content
    $mail->isHTML(true);
    $mail->Subject = "New Contact Enquiry from Ace Wealth: " . htmlspecialchars($name);
    $mail->Body    = "
        <html>
        <body style='font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;'>
            <div style='background: #0B132B; padding: 24px; border-radius: 8px 8px 0 0;'>
                <h2 style='color: #FBAB1C; margin: 0;'>New Enquiry — Ace Wealth</h2>
            </div>
            <div style='background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px;'>
                <table style='width: 100%; border-collapse: collapse;'>
                    <tr><td style='padding: 8px 0; font-weight: bold; width: 120px;'>Name:</td><td>" . htmlspecialchars($name) . "</td></tr>
                    <tr><td style='padding: 8px 0; font-weight: bold;'>Email:</td><td><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></td></tr>
                    <tr><td style='padding: 8px 0; font-weight: bold;'>Phone:</td><td>" . (empty($phone) ? 'Not provided' : htmlspecialchars($phone)) . "</td></tr>
                </table>
                <hr style='border: none; border-top: 1px solid #ddd; margin: 16px 0;'>
                <p style='font-weight: bold; margin-bottom: 8px;'>Message:</p>
                <p style='line-height: 1.7; white-space: pre-wrap;'>" . htmlspecialchars($message) . "</p>
            </div>
            <p style='font-size: 11px; color: #aaa; text-align: center; margin-top: 12px;'>Sent from acewealth.co.in contact form</p>
        </body>
        </html>
    ";
    $mail->AltBody = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";

    $mail->send();

    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Message sent successfully!"]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Could not send message. Please try again later."]);
}
?>
