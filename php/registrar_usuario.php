<?php
if(isset($_POST['nombre']) && isset($_POST['apellido']) && isset($_POST['fecha']) && isset($_POST['telefono']) && isset($_POST['correo']) && isset($_POST['password'])){
    
    function validateData(){
        //a qui pondria validaciones ... si tubienra alguna
        return true;
    }

    function getPassWord(){
        //$cose = ['cost' => 12,]; //probar despues como nuevo argumento para aunmentar el coste del encrypt
        return password_hash($_POST['password'], PASSWORD_DEFAULT);
    }


    function registrarData(){
        require 'conexionBD.php';
        $sql = "INSERT INTO usuarios(usr_nombre, usr_apellido, usr_telefono, usr_email, usr_fecha, usr_passwd) VALUES(?, ?, ?, ?, ?, ?)";
        $sentencia = $conexion->prepare($sql);
        $passwd = getPassWord();
        $sentencia->bind_param("ssssss", $_POST['nombre'], $_POST['apellido'], $_POST['telefono'], $_POST['correo'], $_POST['fecha'], $passwd);
        if(!$sentencia->execute()){
            echo json_encode(array('error' => true, 'msg' => 'ERROR! No se pudo guardar los datos.'.$conexion->error));        
            exit();
        }

        $conexion->close();
        echo json_encode(array('error' => false, 'msg' => ''));
    }
    
    if(validateData()){
        registrarData();
    }else{
        echo json_encode(array('error' => true, 'msg' => 'ERROR! Datos incorrectos'));
    }
    
}
else{
    echo json_encode(array('error' => true, 'msg' => 'ERROR! Los datos no llegaron al servidor.'));
}

?>