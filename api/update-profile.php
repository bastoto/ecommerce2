<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        exit();
    }

    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input || empty($input['user_id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'user_id is required']);
        exit();
    }

    $usersFile = __DIR__ . '/../data/users.json';
    $users = json_decode(file_get_contents($usersFile), true) ?: [];

    $userIndex = null;
    foreach ($users as $index => $user) {
        if ($user['id'] === $input['user_id']) {
            $userIndex = $index;
            break;
        }
    }

    if ($userIndex === null) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'User not found']);
        exit();
    }

    if (isset($input['name'])) {
        $users[$userIndex]['name'] = trim($input['name']);
    }
    if (isset($input['email'])) {
        $users[$userIndex]['email'] = trim($input['email']);
    }
    if (isset($input['phone'])) {
        $users[$userIndex]['phone'] = trim($input['phone']);
    }
    if (isset($input['address'])) {
        $users[$userIndex]['address'] = trim($input['address']);
    }

    file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT), LOCK_EX);

    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $users[$userIndex]['id'],
            'name' => $users[$userIndex]['name'],
            'email' => $users[$userIndex]['email'],
            'phone' => $users[$userIndex]['phone'],
            'address' => $users[$userIndex]['address']
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}
