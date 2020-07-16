<?php
    require "conexionBD.php";
    $consulta = "SELECT ID, pz_nombre,  pz_descripcion, pz_calificacion, pz_precio_m, pz_precio_g, pz_foto FROM pizzas ORDER BY ID DESC";
    if($resultado = $conexion->query($consulta)){
        $consulta = array('error' => false);
        while($row = $resultado->fetch_row()){
            $consulta[$row[0]] = $row; 
        }
        echo(json_encode($consulta));
    }else{
        echo (json_encode(array('error' => true, 'msg' => 'Error!   al conectar con la base de datos.')));
    }
    
    $conexion->close();

?>
