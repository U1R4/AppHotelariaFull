<?php
require_once __DIR__ . "/../models/ReserveModel.php";
require_once __DIR__ . "ValidateController.php";

class ReserveController{
    public static function create($conn, $data){

        $data['inicio'] = ValidateController::timeInsert($data['inicio'], 14);
        $data['fim'] = ValidateController::timeInsert($data['fim'], 12);

        $result = ReserveModel::create($conn, $data);
        
        if($result){
            return jsonResponse(['message'=> 'criado']);
        }else{
        return jsonResponse(['message'=> 'Deu merda'], 400);
        }
    }
    
    public static function searchByRequest($conn, $pedido_id) {
        $result = ReserveModel::searchByRequest($conn, $pedido_id);
        return jsonResponse($result); 
    }   
}
?>