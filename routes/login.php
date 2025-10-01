<?php
    require_once __DIR__ . "/../controllers/AuthController.php";

    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        $data = json_decode(file_get_contents('php://input'), true);
        $opcao = $segments[3] ?? null;
        
        if($opcao === "client"){
            AuthController::loginClient($conn, $data);
        }elseif($opcao === "user"){
            AuthController::loginUser($conn, $data);
        }else{
            jsonReponse([
                "status"=> "error",
                "mensage"=> "Rota nao encontrada"
            ]);
        }
        
    } else {
        jsonResponse([
        "status"=>"erro",
        "message"=>"Metodo não permitido"
        ], 405);
    }
?>