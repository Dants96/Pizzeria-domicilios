<?php
    if( isset($_POST['correo']) && isset($_POST['password'])){
        require 'conexionBD.php';
        $consulta = $conexion->prepare("SELECT ID, usr_passwd  FROM usuarios WHERE usr_email = ?");
        $consulta->bind_param("s", $_POST['correo']); 
        if(!$consulta->execute()){
            echo (json_encode(array('error' => true, 'msg' => 'Error!   al conectar con la base de datos.')));
        }else{
            $usuarios = $consulta->get_result();
            if($usuarios->num_rows == 1){
                $datos = $usuarios->fetch_assoc();
                if(password_verify($_POST['password'], $datos['usr_passwd'])){
                    $consulta = $conexion->prepare("SELECT usr_nombre, usr_apellido, usr_telefono, usr_email, usr_fecha FROM usuarios WHERE ID = ?");
                    $consulta->bind_param("s", $datos['ID']);
                    if(!$consulta->execute()){
                        echo (json_encode(array('error' => true, 'msg' => 'Error!   al conectar con la base de datos.')));
                    }else{
                        $usuario = $consulta->get_result();
                        $usuario = $usuario->fetch_assoc();
                        require 'init_session.php';
                        initSession($datos['ID'], $usuario['usr_nombre'], $usuario['usr_apellido'], $usuario['usr_telefono'], $usuario['usr_email'], $usuario['usr_fecha']);
                        echo(json_encode(array('error' => false, 'msg' => '')));
                    }
                }else{
                    echo(json_encode(array('error' => true, 'msg' => 'Error!   Usuario o contraseña incorrectos.')));
                }
            }else{
            echo(json_encode(array('error' => true, 'msg' => 'Error!   El usuario no se encuentra registrado.')));}
        }  
        $conexion->close();    
    }else{
        echo (json_encode(array('error' => true, 'msg' => 'Error!   no hay informacion')));
    }

?>