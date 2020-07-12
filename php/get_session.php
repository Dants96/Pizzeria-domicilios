<?php
    session_start();
    if(isset($_SESSION['usuario'])){
        $_SESSION['usuario']['req'] ++;
        echo(json_encode(array ('nombre' => $_SESSION['usuario']['nombre'],
                                'apellido' => $_SESSION['usuario']['apellido'],
                                'telefono' => $_SESSION['usuario']['telefono'],
                                'email' => $_SESSION['usuario']['email'],
                                'fecha' => $_SESSION['usuario']['fecha'],
                                'req' => $_SESSION['usuario']['req']
        )));
    }else{
        echo(false);
    }
?>