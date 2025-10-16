<?php
require_once __DIR__ . "/../models/RequestModel.php";
require_once __DIR__ . "/ValidateController.php";

class RequestController{
    public static function create($conn, $data){
        $result = RequestModel::create($conn, $data);
        
        ValidateController::validateData($data);
        if($result){
            return jsonResponse(['message'=> 'criado']);
        }else{
        return jsonResponse(['message'=> 'Deu merda'], 400);
        }
    }
    
    public static function listAll($conn) {
        $requestList = RequestModel::getAll($conn);
        return jsonResponse($requestList);
    }

    public static function getById($conn, $id) {
        $result = RequestModel::getById($conn, $id);
        return jsonResponse($result);
    }

    public static function delete($conn, $id){
        $result = RequestModel::delete($conn, $id);
        if($result){
            return jsonResponse(['message'=> 'deletado']);
        }else{
        return jsonResponse(['message'=> ''], 400);
        }
    }

    public static function update($conn, $id, $data){
        $result = RequestModel::update($conn, $id, $data);
        if($result){
            return jsonResponse(['message'=> 'atualizado']);
        }else{
            return jsonResponse(['message'=> 'Deu merda'], 400);
        }
    }

    public static function createOrder($conn, $data){
    $data['usuario_id'] = isset($data['usuario_id']) ? $data['usuario_id']: 4;

    ValidateController::validateData($data,['cliente_id','pagamento','quartos']);       
    
    foreach($data['quartos'] as $index => $quartos){
        ValidateController::validateData($quartos,['id', 'inicio', 'fim']);
        ValidateController::timeInsert($quartos['inicio'], 12);
        ValidateController::timeInsert($quartos['fim'], 14);
    }
    if (count($data['quartos']) == 0) {
        return jsonResponse(["message"=>"nao tem quartos no pedido"],400);
    }

    try {
        $result = RequestModel::createOrder($conn,$data);
        return jsonResponse($result);

    } catch (RuntimeException $erro) {
        return jsonResponse(['message' => $erro->getMessage()], 400);
    }
}
    
}
?>