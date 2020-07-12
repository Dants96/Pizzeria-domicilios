<?php
    function initSession($nombre, $apellido, $telefono, $email, $fecha){
        session_start();
        $_SESSION['usuario'] = array('nombre' => $nombre, 'apellido' => $apellido, 'telefono' => $telefono, 'email' => $email, 'fecha' => $fecha, 'req' => 0);
    }
?>
