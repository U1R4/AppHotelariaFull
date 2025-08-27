<?php
    require_once "../config/database.php";
    $title = "HOME";
    require_once '../controllers/AuthController.php';

    $data = [
        "email"=>"ggg@ggg.ggg",
        "password"=>"123"
    ];

    AuthController::login($conn, $data);
?>

<h1>Home</h1>

<?php
    require_once 'utils/footer.php';
?>