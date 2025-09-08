<?php
    require_once __DIR__ . "/../models/RoomModel.php";

    class QuartosController{
        public static function create($conn, $data){
            $result = QuartosModel::create($conn, $data);
            if($result){
                return jsonResponse(['message'=> 'Quarto criado']);
            }else{
            return jsonResponse(['message'=> 'Deu merda'], 400);
            }
        }
        
        public static function getAll($conn) {
            $roomList = QuartosModel::getAll($conn);
            return jsonResponse($roomList);
        }

        public static function getById($conn, $id) {
            $result = QuartosModel::getById($conn, $id);
            return jsonResponse($result);
        }

        public static function delete($conn, $id){
            $result = QuartosModel::delete($conn, $id);
            if($result){
                return jsonResponse(['message'=> 'Quarto deletado']);
            }else{
            return jsonResponse(['message'=> 'Deu merda'], 400);
            }
        }

        public static function update($conn, $id, $data){
            $result = QuartosModel::update($conn, $id, $data);
            if($result){
                return jsonResponse(['message'=> 'Quarto atualizado']);
            }else{
                return jsonResponse(['message'=> 'Deu merda'], 400);
            }
        }
}
?>