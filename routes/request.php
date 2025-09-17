<?php
require_once __DIR__ . "/../controllers/RequestController.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $id =  $segments[2] ?? null;
    
    if(isset($id)){
        RequestController::getById($conn, $id);
    }else{
        RequestController::listAll($conn);
    }


}elseif ($_SERVER['REQUEST_METHOD'] === "POST"){  
    $data = json_decode(file_get_contents('php://input'), true);
    
    if(isset($data)){
        RequestController::create($conn, $data);
    }else{
        jsonResponse(['message'=>"Atributos invalidos"], 400);
    }
    

}
else{
    jsonResponse([
    "status"=> "error",
    "message"=> "metodo nao premitiodo"
    ], 405);
}
?>