<?php
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}

require_auth();

// Check file exists
if (empty($_FILES['image'])) {
    json_error('No image file provided');
}

$file    = $_FILES['image'];
$maxSize = 5 * 1024 * 1024; // 5MB

if ($file['error'] !== UPLOAD_ERR_OK) {
    json_error('File upload error: ' . $file['error']);
}

if ($file['size'] > $maxSize) {
    json_error('File too large. Maximum size is 5MB.');
}

$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
$finfo        = new finfo(FILEINFO_MIME_TYPE);
$mimeType     = $finfo->file($file['tmp_name']);

if (!in_array($mimeType, $allowedTypes)) {
    json_error('Invalid file type. Only JPG, PNG, WebP, GIF are allowed.');
}

// Generate safe filename
$ext      = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid('img_', true) . '.' . strtolower($ext);

// Resolve upload directory relative to this file's location
// When deployed: /public_html/acewealth/demo/4/api/upload.php
// Uploads go to: /public_html/acewealth/demo/4/uploads/
$uploadDir = __DIR__ . '/../uploads/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$uploadPath = $uploadDir . $filename;

if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
    json_error('Failed to save the file. Check uploads/ folder permissions (should be 755).');
}

// Return the public URL path (relative to site root)
// Assumes deployment in root
json_ok([
    'success' => true,
    'url'     => '/uploads/' . $filename,
    'filename' => $filename,
]);
