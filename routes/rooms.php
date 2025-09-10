<?php
require_once __DIR__ . "/../controllers/RoomController.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $id =  $segments[2] ?? null;
    
    if(isset($id)){
        RoomController::getById($conn, $id);
    }else{
        RoomController::listAll($conn);
    }
}

elseif ($_SERVER['REQUEST_METHOD'] === "DELETE"){
    $id =  $segments[2] ?? null;
    
    if(isset($id)){
        RoomController::delete($conn, $id);
    }else{
        jsonResponse(['message'=>"ID necessario"], 400);
    }
}

else{
    jsonResponse([
    "status"=> "error",
    "message"=> "metodo nao premitiodo"
    ], 405);
}
?>