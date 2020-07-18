<?php
    session_start();
    if(isset($_SESSION['carrito'])){
        $pizzas = $_SESSION['carrito'];
        $pizzas_out = array('error' => false);
        foreach ($pizzas as $clave => $pizza) {
            $pizzas_out[$clave] = array('id-carrito' => $clave, 'pizza_nombre' => $pizza['nombre'], 'precio' => $pizza['precio'], 'tamano' => $pizza['tamano']);
        }
        echo(json_encode($pizzas_out));
    }else{
        echo(json_encode(array('error' => true, 'msg' => 'No hay pizzas agregadas aun!')));
    }
?>