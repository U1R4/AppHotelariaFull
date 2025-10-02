<?php
    require_once __DIR__ . "/../controllers/AuthController.php";
    require_once __DIR__ . "/../helpers/token_jwt.php";

    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        $data = json_decode(file_get_contents('php://input'), true);
        $opcao = $segments[2] ?? null;
        
        if($opcao === "client"){
            AuthController::loginClient($conn, $data);
        }elseif($opcao === "user"){
            AuthController::loginUser($conn, $data);
        }else{
            jsonResponse([
                "status"=> "error",
                "mensage"=> "Rota nao encontrada"
            ]);
        }
        
    }
    elseif ($_SERVER['REQUEST_METHOD'] === "PUT"){  
        validateTokenAPI();
        jsonResponse(["mensage"=>"Foi"],200);

    }else {
        jsonResponse([
        "status"=>"erro",
        "message"=>"Metodo não permitido"
        ], 405);
    }
?>