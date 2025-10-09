<?php
 
    require_once __DIR__ . "/../controllers/RequestController.php";
 
    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        $data = json_decode(file_get_contents('php://input'), true);
 
        RequestController::createOrder($conn, $data);
    } else {
        return jsonResponse(['message' => 'Metodo não Permitido'], 400);
    }
 
?>
 