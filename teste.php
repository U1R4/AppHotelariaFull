<?php
require_once __DIR__ ."/controllers/AuthController.php";
require_once __DIR__ ."/controllers/PassController.php";
require_once __DIR__ ."/controllers/RoomController.php";
require_once __DIR__ ."/helpers/token_jwt.php";


$data = [
    "id" => 2,
    "nome" => "ggg",
    "numero" => 505,
    "qnt_cama_casal" => 2,
    "qnt_cama_solteiro" =>2,
    "preco" => 200.65,
    "disponivel" => 1
];

RoomController::listAll($conn);

?>
