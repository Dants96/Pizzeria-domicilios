<?php
    session_start();
    if(isset($_SESSION['carrito'])){
        unset($_SESSION['carrito']);
        echo(json_encode(array('error' => false)));
    }else{
        echo(json_encode(array('error' => true, 'msg' => 'ERROR! no se pudo borrar carrito')));
    }

?>