<?php
require_once __DIR__ . '/db.php';

$db     = get_db();
$method = $_SERVER['REQUEST_METHOD'];

// ─── GET → list all reviews ───────────────────────────────────────────────────
if ($method === 'GET') {
    $stmt = $db->query('SELECT * FROM reviews ORDER BY created_at ASC');
    json_ok($stmt->fetchAll());
}

// ─── POST → create review ─────────────────────────────────────────────────────
if ($method === 'POST') {
    require_auth();
    $body = get_json_body();

    $name    = trim($body['name']    ?? '');
    $role    = trim($body['role']    ?? 'Verified Client');
    $content = trim($body['content'] ?? '');
    $rating  = (int) ($body['rating'] ?? 5);

    if (!$name || !$content) json_error('name and content are required');
    if ($rating < 1 || $rating > 5) json_error('rating must be between 1 and 5');

    $stmt = $db->prepare(
        'INSERT INTO reviews (name, role, content, rating, created_at) VALUES (?, ?, ?, ?, NOW())'
    );
    $stmt->execute([$name, $role, $content, $rating]);
    $newId = $db->lastInsertId();

    $stmt = $db->prepare('SELECT * FROM reviews WHERE id = ?');
    $stmt->execute([$newId]);
    json_ok($stmt->fetch());
}

// ─── PUT → update review ──────────────────────────────────────────────────────
if ($method === 'PUT') {
    require_auth();
    $id   = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    $body = get_json_body();

    if (!$id) json_error('Review id is required in query string (?id=...)');

    $fields = [];
    $values = [];

    foreach (['name', 'role', 'content', 'rating'] as $col) {
        if (array_key_exists($col, $body)) {
            $fields[] = "$col = ?";
            $values[] = $body[$col];
        }
    }

    if (empty($fields)) json_error('No fields to update');

    $values[] = $id;
    $sql  = 'UPDATE reviews SET ' . implode(', ', $fields) . ' WHERE id = ?';
    $stmt = $db->prepare($sql);
    $stmt->execute($values);

    $stmt = $db->prepare('SELECT * FROM reviews WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) json_error('Review not found', 404);
    json_ok($row);
}

// ─── DELETE → remove review ───────────────────────────────────────────────────
if ($method === 'DELETE') {
    require_auth();
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    if (!$id) json_error('Review id is required in query string (?id=...)');

    $stmt = $db->prepare('DELETE FROM reviews WHERE id = ?');
    $stmt->execute([$id]);
    json_ok(['success' => true]);
}

json_error('Method not allowed', 405);
