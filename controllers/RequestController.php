<?php
require_once __DIR__ . "/../models/RequestModel.php";

class RequestController{
    public static function create($conn, $data){
        $result = RequestModel::create($conn, $data);
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
}
?>