<?php
 
class ImgController{
    static $tamMax= 1024 * 1024 * 5;
    static $typefiles = [
        "image/png" => "png",
        "image/jpeg" => "jpg",
    ];

    static $path = __DIR__ . "/../uploads/";
 
    public static function normalizeImg($img){
        $files = [];
        if(is_array($img['name'])){
            foreach($img['name'] as $index => $name){
                $files[] = [
                    "name" => $img['name'][$index],
                    "type" => $img['type'][$index],
                    "tmp_name" => $img['tmp_name'][$index],
                    "error" => $img['error'][$index],
                    "size" => $img['size'][$index],
                ];
            }
        }else{
            $files[] = $img;
        }
        return $files;
    }

    public static function randomName($extension){
        $name = bin2hex(random_bytes(16));
        return $name . "." . $extension;
    } 

    public static function loadImg($img){
        $files = [];
        $erro = [];
        $saves = [];
 
        if($img) {
            $files = self::normalizeImg($img);
        }

        foreach($files as $index => $photo){
            $err = $photo['error'] ?? UPLOAD_ERR_NO_FILE;
            if($err === UPLOAD_ERR_NO_FILE){
                continue;
            
            }
            if($err !== UPLOAD_ERR_OK){
                $erro[]= "Erro no upload(foto:{$index})";
                continue;
            }

            if(($photo['size'] ?? 0) > self::$tamMax){
                $erro[] = "Excedeu o limite de (self::{$tamMax}) de 5 MB";
                continue;
            }

            $info = new \finfo(FILEINFO_MIME_TYPE);
            $mime = $info->file($photo['tmp_name']) ?: ($photo['type'] ?? "application/octet-stream");

            if(!isset(self::$typefiles[$mime])){
                $erro[] = "Tipo do arquivo não é permitido";
                continue;
            }

            $photoName = self::randomName(self::$typefiles[$mime]);
            $destPath = self::$path . $photoName;

            if(!move_uploaded_file($photo['tmp_name'], $destPath) ){
                $erro[] = "Falha ao mover o arquivo";
                continue;
            }

            $saves[] = $photoName;
        }

        jsonResponse([$files, $erro, $saves]); 

    }
}
?>