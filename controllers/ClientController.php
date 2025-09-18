<?php
    require_once __DIR__ . "/../models/ClientModel.php";
    require_once "PassController.php";
    require_once __DIR__ . "/../helpers/token_jwt.php";

class ClientController{
    public static function create($conn, $data){
        $data['senha'] = PassController::generateHash($data['senha']);
        
        $result = ClientModel::create($conn, $data);
        if($result){
            return jsonResponse(['message'=> 'criado']);
        }else{
        return jsonResponse(['message'=> 'Deu merda'], 400);
        }
    }
    
    public static function listAll($conn) {
        $clientList = ClientModel::getAll($conn);
        return jsonResponse($clientList);
    }

    public static function getById($conn, $id) {
        $result = ClientModel::getById($conn, $id);
        return jsonResponse($result);
    }

    public static function delete($conn, $id){
        $result = ClientModel::delete($conn, $id);
        if($result){
            return jsonResponse(['message'=> 'deletado']);
        }else{
        return jsonResponse(['message'=> ''], 400);
        }
    }
    
    public static function update($conn, $id, $data){
        $result = ClientModel::update($conn, $id, $data);
        if($result){
            return jsonResponse(['message'=> 'atualizado']);
        }else{
            return jsonResponse(['message'=> 'Deu merda'], 400);
        }
    }

    public static function loginClient($conn, $data) {
    
        $data['email'] = trim($data['email']);
        $data['password'] = trim($data['password']);

        if (empty($data['email']) || empty($data['password'])) {
            return jsonResponse([
                "status" => "erro",
                "message" => "Preencha todos os campos!"
            ], 401);
        }

        $client = ClientModel::ClientValidation($conn, $data['email'], $data['password']);
        if ($client) {
            $token = createToken($client);
            return jsonResponse([ "token" => $token ]);
        } else {
            return jsonResponse([
                "status" => "erro",
                "message" => "Credenciais inválidas!"
            ], 401);
        }
    }
}
?>