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
    
    $inicio = new DateTime($data['inicio']);
    $fim = new DateTime($data['fim']);
    
    $inicio->setTime(14, 0, 0);
    $fim->setTime(12, 0, 0);
       
    $data['inicio'] = $inicio->format('Y-m-d H:i:s');
    $data['fim'] = $fim->format('Y-m-d H:i:s');

    $dates = [$data['inicio'], $data['fim']];

    if(isset($dates)){
        RoomController::searchAvailable($conn, $data);
        // jsonResponse(['message'=>$dates], 400);
    }elseif($data){
        RoomController::create($conn, $data);
    }else{
        jsonResponse(['message'=>"Atributos invalidos"], 400);
    }
    

}elseif ($_SERVER['REQUEST_METHOD'] === "PUT"){  
    $id =  $data['id'];
    $data = json_decode(file_get_contents('php://input'), true);
    
    if(isset($data)){
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