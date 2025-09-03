<?php
require_once __DIR__ ."/controllers/AuthController.php";
require_once __DIR__ ."/controllers/PassController.php";
require_once __DIR__ ."/helpers/token_jwt.php";


$data = [
    'email' => 'ggg@ggg.ggg',
    'password' => '123'
];


//AuthController::login($conn,$data);
//$tokenNaovalido = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcHBIb3RlbGFyaWFGdWxsIiwiaWF0IjoxNzU2OTI3NjkzLCJleHAiOjE3NTY5MzEyOTMsInN1YiI6eyJpZCI6NCwiZW1haWwiOiJnZ2dAZ2dnLmdnZyIsIm5vbWUiOiJnZ2ciLCJjYXJnbyI6ImdnZyJ9fQ.RdIuqlK0QzITNN2oxMMrnnZdym4Dm6lS_u3O_rL8S3E";
$token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcHBIb3RlbGFyaWFGdWxsIiwiaWF0IjoxNzU2OTMwMjMzLCJleHAiOjE3NTY5MzM4MzMsInN1YiI6eyJpZCI6NCwiZW1haWwiOiJnZ2dAZ2dnLmdnZyIsIm5vbWUiOiJnZ2ciLCJjYXJnbyI6ImdnZyJ9fQ.e56_nHM2O65MlEZCRE1FCRe0rXS9B9A86mVGGZYPVBc';
echo var_dump(validateToken($token));

//$hash = PassController::generateHash($data['password']);
//echo $hash;
//echo '<br>';
//echo PassController::validateHash($data['password'], $hash);
?>
