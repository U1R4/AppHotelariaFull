<?php
    require_once __DIR__ . "/../models/RoomModel.php";

    class RoomController{
        public static function create($conn, $data){
            $result = RoomModel::create($conn, $data);
            if($result){
                return jsonResponse(['message'=> 'criado']);
            }else{
            return jsonResponse(['message'=> 'Deu merda'], 400);
            }
        }
        
        public static function listAll($conn) {
            $roomList = RoomModel::getAll($conn);
            return jsonResponse($roomList);
        }

        public static function getById($conn, $id) {
            $result = RoomModel::getById($conn, $id);
            return jsonResponse($result);
        }

        public static function delete($conn, $id){
            $result = RoomModel::delete($conn, $id);
            if($result){
                return jsonResponse(['message'=> 'deletado']);
            }else{
            return jsonResponse(['message'=> ''], 400);
            }
        }

        public static function update($conn, $id, $data){
            $result = RoomModel::update($conn, $id, $data);
            if($result){
                return jsonResponse(['message'=> 'atualizado']);
            }else{
                return jsonResponse(['message'=> 'Deu merda'], 400);
            }
        }

        public static function searchAvailable($conn, $data){
            $result = RoomModel::searchAvailable($conn, $data);
            return jsonResponse($result);
        }
    }   
?>