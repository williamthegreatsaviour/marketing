<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "memo";
$password = "";
$dbname = "base_de_atos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// SIMULACIÓN de ID de usuario (en una app real, esto vendría de una sesión)
$id_usuario = 1;

// Obtener temas vistos recientemente por el usuario (ejemplo básico: el último visto)
$sql_historial = "SELECT v.tema FROM historial_usuario hu JOIN videos v ON hu.id_video = v.id WHERE hu.id_usuario = $id_usuario ORDER BY hu.fecha_vista DESC LIMIT 1";
$result_historial = $conn->query($sql_historial);

if ($result_historial->num_rows > 0) {
    $row_historial = $result_historial->fetch_assoc();
    $tema_usuario = $row_historial['tema'];

    // Obtener videos del tema del usuario
    $sql = "SELECT * FROM videos WHERE tema = '$tema_usuario'";
    $result = $conn->query($sql);
    if ($result->num_rows == 0) {
        $sql = "SELECT * FROM videos";
        $result = $conn->query($sql);
    }
} else {
    // Si no hay historial, obtener todos los videos
    $sql = "SELECT * FROM videos";
    $result = $conn->query($sql);
}

$videos = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $videos[] = $row;
    }
}

$conn->close();

echo json_encode($videos);
?>
