<?php
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}

$body = get_json_body();
$username = trim($body['username'] ?? '');
$password = trim($body['password'] ?? '');

if (!$username || !$password) {
    json_error('Username and password are required');
}

$db   = get_db();
$stmt = $db->prepare('SELECT * FROM admin_users WHERE username = ? LIMIT 1');
$stmt->execute([$username]);
$admin = $stmt->fetch();

if (!$admin) {
    json_error('Invalid credentials', 401);
}

// Support both plain text (dev) and bcrypt (production)
$valid = false;
if (str_starts_with($admin['password'], '$2y$')) {
    $valid = password_verify($password, $admin['password']);
} else {
    // Plain text comparison for initial setup — change to bcrypt in production
    $valid = ($password === $admin['password']);
}

if (!$valid) {
    json_error('Invalid credentials', 401);
}

// Return a stateless token (sha256 of username + secret)
json_ok([
    'success' => true,
    'token'   => generate_token($username),
    'message' => 'Login successful',
]);
