<?php
require_once __DIR__ ."/controllers/AuthController.php";
require_once __DIR__ ."/controllers/PassController.php";
require_once __DIR__ ."/helpers/token_jwt.php";


$data = [
    'email' => 'ggg@ggg.ggg',
    'password' => '123'
];

AuthController::login($conn,$data);
echo validateToken($token);
//$hash = PassController::generateHash($data['password']);
//echo $hash;
//echo '<br>';
//echo PassController::validateHash($data['password'], $hash);
?>
