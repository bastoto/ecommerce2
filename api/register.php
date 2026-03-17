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

    if (!$input || empty($input['name']) || empty($input['email']) || empty($input['password'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'All fields (name, email, password) are required']);
        exit();
    }

    $name = trim($input['name']);
    $email = trim($input['email']);
    $password = $input['password'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit();
    }

    $usersFile = __DIR__ . '/../data/users.json';
    $users = json_decode(file_get_contents($usersFile), true) ?: [];

    foreach ($users as $user) {
        if (strtolower($user['email']) === strtolower($email)) {
            http_response_code(409);
            echo json_encode(['success' => false, 'message' => 'Email already exists']);
            exit();
        }
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $newUser = [
        'id' => uniqid(),
        'name' => $name,
        'email' => $email,
        'password' => $hashedPassword,
        'address' => '',
        'phone' => '',
        'created_at' => date('Y-m-d H:i:s')
    ];

    $users[] = $newUser;
    file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT), LOCK_EX);

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $newUser['id'],
            'name' => $newUser['name'],
            'email' => $newUser['email']
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}
