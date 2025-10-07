<?php
require_once __DIR__ . "/../controllers/RoomController.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $id =  $segments[2] ?? null;
    
    if(isset($id)){
        RoomController::getById($conn, $id);
    }else{
        RoomController::listAll($conn);
    }

}elseif ($_SERVER['REQUEST_METHOD'] === "DELETE"){
    $data = json_decode(file_get_contents('php://input'), true);
    $id =  $data['id'];
    
    if(isset($id)){
        RoomController::delete($conn, $id);
    }else{
        jsonResponse(['message'=>"ID necessario"], 400);
    }

}elseif ($_SERVER['REQUEST_METHOD'] === "POST"){  
    $data = json_decode(file_get_contents('php://input'), true);

    if(isset($data['inicio']) && isset($data['fim'])){
        $result = RoomController::searchAvailable($conn, $data);
        jsonResponse($result);
    }elseif($data){
        RoomController::create($conn, $data);
    }else{
        jsonResponse(['message'=>"Atributos invalidos"], 400);
    }
    

}elseif ($_SERVER['REQUEST_METHOD'] === "PUT"){  
    $data = json_decode(file_get_contents('php://input'), true);
    $id =  $data['id'] ?? null;
    
    if(isset($data) && isset($id)){
        RoomController::update($conn, $id, $data);
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