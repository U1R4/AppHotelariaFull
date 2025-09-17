<?php
    require_once __DIR__ . "/../models/AddonsModel.php";

    class AddonsController{
        public static function create($conn, $data){
            $result = AddonsModel::create($conn, $data);
            if($result){
                return jsonResponse(['message'=> 'criado']);
            }else{
            return jsonResponse(['message'=> 'Deu merda'], 400);
            }
        }
        
        public static function listAll($conn) {
            $roomList = AddonsModel::getAll($conn);
            return jsonResponse($roomList);
        }

        public static function getById($conn, $id) {
            $result = AddonsModel::getById($conn, $id);
            return jsonResponse($result);
        }

        public static function delete($conn, $id){
            $result = AddonsModel::delete($conn, $id);
            if($result){
                return jsonResponse(['message'=> 'deletado']);
            }else{
            return jsonResponse(['message'=> ''], 400);
            }
        }

        public static function update($conn, $id, $data){
            $result = AddonsModel::update($conn, $id, $data);
            if($result){
                return jsonResponse(['message'=> 'atualizado']);
            }else{
                return jsonResponse(['message'=> 'Deu merda'], 400);
            }
        }
}
?>