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

    // Read .env file for environment variables
    $envFile = __DIR__ . '/../.env';
    $env = [];
    if (file_exists($envFile)) {
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            if (strpos($line, '=') !== false) {
                list($key, $val) = explode('=', $line, 2);
                $env[trim($key)] = trim($val);
            }
        }
    }
    
    $emailUser = $env['EMAIL_USER'] ?? '';
    $emailPass = $env['EMAIL_PASS'] ?? '';

    // Server settings configured for Gmail SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $emailUser;
    $mail->Password   = $emailPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // secure: true
    $mail->Port       = 465;

    // Sender & Recipient
    $mail->setFrom($emailUser, 'Contact Test');
    $mail->addAddress($emailUser, 'Contact Test');

    // Email content
    $mail->isHTML(false);
    $mail->Subject = "New Contact Form Submission";
    $mail->Body    = "Name: $name\nEmail: $email\nMessage: $message";

    $mail->send();

    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Message sent successfully!"]);

} catch (Exception $e) {
    error_log("Email sending failed: {$mail->ErrorInfo}");
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Could not send message. Please try again later."]);
}
?>
