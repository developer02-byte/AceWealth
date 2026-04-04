<?php
require_once __DIR__ . '/db.php';

$db     = get_db();
$method = $_SERVER['REQUEST_METHOD'];

// ─── GET → list all blogs ─────────────────────────────────────────────────────
if ($method === 'GET') {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if ($id) {
        $stmt = $db->prepare('SELECT * FROM blogs WHERE id = ?');
        $stmt->execute([$id]);
        $blog = $stmt->fetch();
        if (!$blog) json_error('Blog not found', 404);
        json_ok($blog);
    } else {
        $stmt = $db->query('SELECT * FROM blogs ORDER BY created_at DESC');
        json_ok($stmt->fetchAll());
    }
}

// ─── POST → create blog ───────────────────────────────────────────────────────
if ($method === 'POST') {
    require_auth();
    $body = get_json_body();

    $title   = trim($body['title']   ?? '');
    $excerpt = trim($body['excerpt'] ?? '');
    $content = trim($body['content'] ?? '');
    $image   = trim($body['image']   ?? '');
    $date    = trim($body['date']    ?? date('d M Y'));

    if (!$title || !$excerpt || !$content) {
        json_error('title, excerpt, and content are required');
    }

    $stmt = $db->prepare(
        'INSERT INTO blogs (title, excerpt, content, image, date, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())'
    );
    $stmt->execute([$title, $excerpt, $content, $image, $date]);
    $newId = $db->lastInsertId();

    $stmt = $db->prepare('SELECT * FROM blogs WHERE id = ?');
    $stmt->execute([$newId]);
    json_ok($stmt->fetch());
}

// ─── PUT → update blog ────────────────────────────────────────────────────────
if ($method === 'PUT') {
    require_auth();
    $id   = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    $body = get_json_body();

    if (!$id) json_error('Blog id is required in query string (?id=...)');

    $fields = [];
    $values = [];

    foreach (['title', 'excerpt', 'content', 'image', 'date'] as $col) {
        if (array_key_exists($col, $body)) {
            $fields[] = "$col = ?";
            $values[] = $body[$col];
        }
    }

    if (empty($fields)) json_error('No fields to update');

    $fields[] = 'updated_at = NOW()';
    $values[]  = $id;

    $sql  = 'UPDATE blogs SET ' . implode(', ', $fields) . ' WHERE id = ?';
    $stmt = $db->prepare($sql);
    $stmt->execute($values);

    $stmt = $db->prepare('SELECT * FROM blogs WHERE id = ?');
    $stmt->execute([$id]);
    $blog = $stmt->fetch();
    if (!$blog) json_error('Blog not found', 404);
    json_ok($blog);
}

// ─── DELETE → remove blog ────────────────────────────────────────────────────
if ($method === 'DELETE') {
    require_auth();
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    if (!$id) json_error('Blog id is required in query string (?id=...)');

    $stmt = $db->prepare('DELETE FROM blogs WHERE id = ?');
    $stmt->execute([$id]);
    json_ok(['success' => true]);
}

json_error('Method not allowed', 405);
