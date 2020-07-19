<?php
    function initSession($id, $nombre, $apellido, $telefono, $email, $fecha){
        session_start();
        $_SESSION['usuario'] = array('ID' => $id, 'nombre' => $nombre, 'apellido' => $apellido, 'telefono' => $telefono, 'email' => $email, 'fecha' => $fecha, 'req' => 0);
    }
?>
