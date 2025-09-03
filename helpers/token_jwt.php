<?php
require_once __DIR__ . "/jwt/jwt_include.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function createToken($user){
    $payload = [
        "iss" => "appHotelariaFull",
        "iat" => time(),
        "exp" => time() + (60 * 60),
        "sub" => $user
    ];
    return JWT::encode($payload, SECRET_KEY, "SH256");
}

function validateToken($token){
    try{
        $key = new Key(SECRET_KEY, "SH256");
        $decode = JWT::decode($token, $key);
        return $decode->sub;

    }catch(Exception $error){
        return 'se fudeu nao foi';
    }
}
?>