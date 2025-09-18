<?php
class ReserveModel{

    public static function searchByRequest($conn, $pedido_id){
        $sql = "SELECT * FROM reservas WHERE pedido_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $pedido_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function create($conn, $data) {
        $sql = "INSERT INTO reservas (pedido_id, quarto_id, adicional_id , fim, inicio) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iiiss",
            $data["pedido_id"],
            $data["quarto_id"],
            $data["adicional_id"],
            $data["fim"],
            $data["inicio"]
        );
        return $stmt->execute();
    }

}
?>