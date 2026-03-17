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

    if (!$input || empty($input['email']) || empty($input['password'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        exit();
    }

    $email = trim($input['email']);
    $password = $input['password'];

    $usersFile = __DIR__ . '/../data/users.json';
    $users = json_decode(file_get_contents($usersFile), true) ?: [];

    $foundUser = null;
    foreach ($users as $user) {
        if (strtolower($user['email']) === strtolower($email)) {
            $foundUser = $user;
            break;
        }
    }

    if (!$foundUser || !password_verify($password, $foundUser['password'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
        exit();
    }

    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $foundUser['id'],
            'name' => $foundUser['name'],
            'email' => $foundUser['email'],
            'address' => $foundUser['address'],
            'phone' => $foundUser['phone']
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}
