<?php
// ─── SMTP Configuration ───────────────────────────────────────────────────────
// Fill in your SMTP credentials below.
// IMPORTANT: Do NOT upload this file anywhere public. Keep it server-side only.

define('SMTP_HOST',       'smtp.gmail.com');      // Gmail SMTP server
define('SMTP_PORT',       587);                    // TLS port
define('SMTP_ENCRYPTION', 'tls');                  // 'tls' or 'ssl'
define('SMTP_USERNAME',   'developer02@technodoc.in'); // Your Gmail address
define('SMTP_PASSWORD',   'hjfo hmqv rcmw ytht');    // Gmail App Password (NOT your login password)

// ─── Email Settings ───────────────────────────────────────────────────────────
define('MAIL_FROM_NAME',  'Ace Wealth Website');         // Sender name shown in inbox
define('MAIL_FROM_EMAIL', 'developer02@technodoc.in');       // Must match SMTP_USERNAME for Gmail
define('MAIL_TO_EMAIL',   'developer02@technodoc.in');       // Email where you want to RECEIVE messages
define('MAIL_TO_NAME',    'Ace Wealth');                 // Recipient display name
