<?php
 
    require_once __DIR__ . "/../controllers/ImgController.php";
 
    if ($_SERVER['REQUEST_METHOD'] === "POST") {

        $data = $_FILES['fotos'] ?? null;

        ImgController::loadImg($data);

    } else {
        return jsonResponse(['message' => 'Metodo não Permitido'], 400);
    }
 
?>
 