<?php
require_once __DIR__ . "/../models/ReserveModel.php";

class ReserveController{
    public static function create($conn, $data){

        $inicio = new DateTime($data['inicio']);
        $fim = new DateTime($data['fim']);
        
        $inicio->setTime(14, 0, 0);
        $fim->setTime(12, 0, 0);
           
        $data['inicio'] = $inicio->format('Y-m-d H:i:s');
        $data['fim'] = $fim->format('Y-m-d H:i:s');

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