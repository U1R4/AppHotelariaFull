<?php
require_once __DIR__ . "/../models/RequestModel.php";

class RequestController{
    public static function create($conn, $data){
        $result = RequestModel::create($conn, $data);
        if($result){
            return jsonResponse(['message'=> 'Roomcriado']);
        }else{
        return jsonResponse(['message'=> 'Deu merda'], 400);
        }
    }
    
    public static function listAll($conn) {
        $roomList = RequestModel::getAll($conn);
        return jsonResponse($roomList);
    }
    public static function getById($conn, $id) {
        $result = RequestModel::getById($conn, $id);
        return jsonResponse($result);
    }
}
?>