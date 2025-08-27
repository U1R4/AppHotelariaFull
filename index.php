<?php
require_once "config/database.php";
require_once "helpers/response.php";

if ($errorDB) {
    echo "Erro no Site";
    exit;
}



$uri = Strtolower(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$method = $_SERVER['REQUEST_METHOD'];

$baseFolder = Strtolower(basename(dirname(__FILE__)));
$uri = str_replace("/$baseFolder", "", $uri);
$segment = explode("/", trim($uri, "/"));

$route = $segment[0] ?? null;
$subRoute = $segment[1] ?? null;

if ($route === ""){
    echo "pagina inicial";
    exit;
}elseif(in_array($route, ["home","about"])){
    echo $route;
    exit;
}
elseif($route === "api"){
    if(in_array($subRoute, ["login"])){
        require "routes/${subRoute}.php";
    }else{
    return jsonResponse(['message'=>'rota nao encontrada', 404]);  
    }
    exit;
}
else{
    echo "404 pagina nao encontrada";
    exit;
}
echo var_dump($segment);
?>