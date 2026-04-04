<?php
// ─── SMTP Configuration ───────────────────────────────────────────────────────
// Credentials loaded from secure_config OUTSIDE public_html (not web-accessible).
// Server path:  /home4/wmdtest/secure_config/mail_config.php
// Local path:   php-api/secure_config/mail_config.php (dev fallback)

$secure_mail = '/home4/wmdtest/secure_config/mail_config.php';
$local_mail  = __DIR__ . '/secure_config/mail_config.php';

if (file_exists($secure_mail)) {
    require_once $secure_mail;
} elseif (file_exists($local_mail)) {
    require_once $local_mail;
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Mail configuration not found.']);
    exit;
}

define('SMTP_HOST',       $smtp_host);
define('SMTP_PORT',       $smtp_port);
define('SMTP_ENCRYPTION', $smtp_encryption);
define('SMTP_USERNAME',   $smtp_username);
define('SMTP_PASSWORD',   $smtp_password);

define('MAIL_FROM_NAME',  $mail_from_name);
define('MAIL_FROM_EMAIL', $mail_from_email);
define('MAIL_TO_EMAIL',   $mail_to_email);
define('MAIL_TO_NAME',    $mail_to_name);
