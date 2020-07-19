<?php
    session_start();
    if(isset($_POST['direccion']) && isset($_POST['barrio']) && isset($_POST['telefono']) && isset($_SESSION['carrito']) && isset($_SESSION['usuario'])){

        function getDateTimeNow(){
            return date("Y-m-d H:i:s"); 
        }

        function getTotalNow(){
            $total = 0;
            foreach($_SESSION['carrito'] as $pizza){
                $total += $pizza['precio'];
            }
            return $total;
        }


        function guardarPedido(){
            require 'conexionBD.php';
            $consulta = $conexion->prepare("INSERT INTO pedidos(pdd_fecha,usuario_id, pdd_contacto, pdd_total) values(?, ?, ?, ?)"); 
            $consulta->bind_param("sisi", getDateTimeNow(), $_SESSION['usuario']['ID'], $_POST['telefono'], getTotalNow());
            if(!$consulta->execute()){
                return array('val' => false, 'msg' => 'No se pudo procesar pedido en base de datos');        
            }else{
                $id_ls = mysqli_insert_id($conexion);
                $conexion->close();
                return array('val' => true, 'id_pedido' => $id_ls);
            }
        }
        
        $pedidoG = guardarPedido();
        if($pedidoG['val']){
            
            require 'conexionBD.php';
            foreach($_SESSION['carrito'] as $clave => $pizza){
                $consulta = $conexion->prepare("INSERT INTO detalles(pedido_id, producto_id, producto_tamano) VALUES(?,?,?)");
                $consulta ->bind_param("iis",$pedidoG['id_pedido'] , $pizza['ID'], $pizza['tamano']);                
                if(!$consulta->execute()){
                    echo json_encode(array('error' => true, 'msg' => 'ERROR! No se pudo guardar los datos de su pedido, intente mas tarde'));        
                }
            }
            $conexion->close();
            unset($_SESSION['carrito']);
            echo(json_encode(array('error' => false, 'msg' => 'Pedido realizado, puede revisar el estado de este en la barra de navegación.')));        


        }else{
            echo json_encode(array('error' => true, 'msg' => $pedidoG['msg']));        
        }

    }else{
        echo json_encode(array('error' => true, 'msg' => 'no se enviarion parametros'));
    }

?>
