<?php
    session_start();
    if(isset($_SESSION['usuario'])){
        $_SESSION['usuario']['req'] ++;
        echo(json_encode(array ('nombre' => $_SESSION['usuario']['nombre'], 'req' => $_SESSION['usuario']['req'])));
    }else{
        echo(false);
    }
?>