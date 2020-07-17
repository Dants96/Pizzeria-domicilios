<?php
    if(isset($_POST['id']) && isset($_POST['prc'])){

            function asigTam($tam_m, $tam_g){
                $val = (int)$_POST['prc'];
                switch ($val) {
                    case $tam_g:
                        return('grande');
                        break;
                    case $tam_m:
                        return('mediano');
                    default:
                        return false;
                        break;
                }
            }

            require 'conexionBD.php';
            $consulta = $conexion->prepare("SELECT ID, pz_nombre, pz_precio_m, pz_precio_g  FROM pizzas WHERE ID = ?");
            $consulta->bind_param("i", $_POST['id']);
            if(!$consulta->execute()){
                echo (json_encode(array('error' => true, 'msg' => 'Error!   al conectar con la base de datos.')));
            }else{                
                $pizza = $consulta->get_result();                
                if($pizza->num_rows == 1){
                    $pizza = $pizza->fetch_assoc();                       
                    $tamano = asigTam($pizza['pz_precio_m'], $pizza['pz_precio_g']);
                    if(!$tamano){
                        echo json_encode(array('error' => true, 'msg' => 'Error! No se pudo agregar al carrito'));        
                    }else{
                        session_start();
                        $_SESSION['carrito'][count($_SESSION['carrito'])] = array('ID'=>$pizza['ID'], 'nombre'=>$pizza['pz_nombre'], 'precio'=>$_POST['prc'], 'tamano'=>$tamano); 
                        echo json_encode(array('error' => false, 'msg' => "Se agrego una pizza {$pizza['pz_nombre']} {$tama} al carrito."));
                    }                    
                }else{echo json_encode(array('error' => true, 'msg' => 'Error! No se pudo agregar al carrito'));}              
                
            }
            $conexion->close();
    
    }else{
        echo json_encode(array('error' => true, 'msg' => 'no se enviarion parametros'));
    }


?>