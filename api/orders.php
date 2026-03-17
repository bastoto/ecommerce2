<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$ordersFile = __DIR__ . '/../data/orders.json';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input || empty($input['user_id']) || empty($input['items']) || !isset($input['total'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'user_id, items, and total are required']);
            exit();
        }

        $orders = json_decode(file_get_contents($ordersFile), true) ?: [];

        $newOrder = [
            'id' => 'ORD-' . strtoupper(uniqid()),
            'user_id' => $input['user_id'],
            'items' => $input['items'],
            'shipping' => $input['shipping'] ?? [],
            'total' => $input['total'],
            'subtotal' => $input['subtotal'] ?? $input['total'],
            'shipping_cost' => $input['shipping_cost'] ?? 0,
            'status' => 'confirmed',
            'created_at' => date('Y-m-d H:i:s')
        ];

        $orders[] = $newOrder;
        file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT), LOCK_EX);

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'order' => $newOrder
        ]);

    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (empty($_GET['user_id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'user_id query parameter is required']);
            exit();
        }

        $userId = $_GET['user_id'];
        $orders = json_decode(file_get_contents($ordersFile), true) ?: [];

        $userOrders = array_values(array_filter($orders, function ($order) use ($userId) {
            return $order['user_id'] === $userId;
        }));

        echo json_encode([
            'success' => true,
            'orders' => $userOrders
        ]);

    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}
