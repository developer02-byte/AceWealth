<?php
// ─── Database Configuration ───────────────────────────────────────────────────
// Credentials loaded from secure_config OUTSIDE public_html (not web-accessible).
// Server path:  /home4/wmdtest/secure_config/db_config.php
// Local path:   php-api/secure_config/db_config.php (dev fallback)

$secure_config = '/home4/wmdtest/secure_config/db_config.php';
$local_config  = __DIR__ . '/secure_config/db_config.php';

if (file_exists($secure_config)) {
    require_once $secure_config;
} elseif (file_exists($local_config)) {
    require_once $local_config;
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Database configuration not found.']);
    exit;
}

define('DB_HOST',    $db_host);
define('DB_NAME',    $db_name);
define('DB_USER',    $db_username);
define('DB_PASS',    $db_password);
define('DB_CHARSET', 'utf8mb4');

// ─── Auth Token Secret ────────────────────────────────────────────────────────
// Change this to any long random string — never expose it publicly
define('AUTH_SECRET', $auth_secret ?? 'ACE_WEALTH_SECRET_KEY_2025_CHANGE_ME');

// ─── CORS Headers ─────────────────────────────────────────────────────────────
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Admin-Token');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ─── Database Connection ──────────────────────────────────────────────────────
function get_db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
            exit();
        }
    }
    return $pdo;
}

// ─── Auth Helpers ─────────────────────────────────────────────────────────────
function generate_token(string $username): string {
    return hash('sha256', $username . AUTH_SECRET);
}

function verify_token(): bool {
    $token = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';
    if (empty($token)) return false;
    // Token is valid if it matches any admin's token
    $db = get_db();
    $stmt = $db->query('SELECT username FROM admin_users LIMIT 10');
    foreach ($stmt->fetchAll() as $row) {
        if (hash_equals(generate_token($row['username']), $token)) {
            return true;
        }
    }
    return false;
}

function require_auth(): void {
    if (!verify_token()) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized. Please log in.']);
        exit();
    }
}

// ─── JSON Body Parser ─────────────────────────────────────────────────────────
function get_json_body(): array {
    $raw = file_get_contents('php://input');
    if (empty($raw)) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

// ─── Response Helpers ──────────────────────────────────────────────────────────
function json_ok($data): void {
    echo json_encode($data);
    exit();
}

function json_error(string $message, int $code = 400): void {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit();
}
