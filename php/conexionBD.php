<?php
    $conexion = new mysqli('localhost', 'root', 'root', 'finalBD');
    if ($conexion->connect_errno) {
        echo (json_encode(array('error' => true, 'msg' => 'No se pudo conectar con la base de datos'.$conexion->connect_error)));
        exit();
    }
?>