<?php
require_once __DIR__ ."/controllers/AuthController.php";
require_once __DIR__ ."/controllers/PassController.php";
require_once __DIR__ ."/controllers/RoomController.php";
require_once __DIR__ ."/controllers/ClientController.php";
require_once __DIR__ ."/helpers/token_jwt.php";


$data = [
    "inicio" => "2025-10-10",
    "fim" => "2026-10-10"
];

// RoomController::searchAvailable($conn ,$data);
echo "pagina teste";
?>
