<?php
if(isset($_POST['nombre']) && isset($_POST['apellido']) && isset($_POST['fecha']) && isset($_POST['telefono']) && isset($_POST['correo']) && isset($_POST['password'])){
    
    function validarEmail(){
        require 'conexionBD.php';
        $consulta = $conexion->prepare("SELECT ID FROM usuarios WHERE usr_email like ?");
        $consulta->bind_param("s", $_POST['correo']);
        if(!$consulta->execute()){
            return(array('val' => false, 'msg' => 'No se pudo verificar email en la base de datos'));        
        }else{
            $encontrado = $consulta->get_result();
            if($encontrado->num_rows == 0){
                return(array('val' => true, 'msg' => ''));
            }else{
                return(array('val' => false, 'msg' => 'El correo ingresado ya existe'));
                
            }
        }
        $conexion->close();
    }

    function validarTelefono(){
        require 'conexionBD.php';
        $consulta = $conexion->prepare("SELECT ID FROM usuarios WHERE usr_telefono like ?");
        $consulta->bind_param("s", $_POST['telefono']);
        if(!$consulta->execute()){
            return(array('val' => false, 'msg' => 'No se pudo verificar Telefono en la base de datos'));        
        }else{
            $encontrado = $consulta->get_result();
            if($encontrado->num_rows == 0){
                return(array('val' => true, 'msg' => ''));
            }else{
                return(array('val' => false, 'msg' => 'El Telefono ingresado ya existe'));
            }
        }
        $conexion->close();
    }

    function validateData(){
        $validado = true;
        $msm_out = "ERROR! al registrar";

        $arr = validarEmail();
        if(!$arr['val']){
            $validado = false;
            $msm_out = $msm_out.", {$arr['msg']}";
        }

        $arr = validarTelefono();
        if(!$arr['val']){
            $validado = false;
            $msm_out = $msm_out.", {$arr['msg']}";
        }

        if($validado){
            return(array('error' => false, 'msg' => ""));    
        }else{
            return array('error' => true, 'msg' => $msm_out);
        }
        
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
            echo json_encode(array('error' => true, 'msg' => 'ERROR! No se pudo guardar los datos, intente de nuevo mas tarde. '));        
            exit();
        }

        $conexion->close();
        echo json_encode(array('error' => false, 'msg' => ''));
    }
    
    $validado = validateData();
    if(!$validado['error']){
        registrarData();
        require 'init_session.php';
        initSession($_POST['nombre'], $_POST['apellido'], $_POST['telefono'], $_POST['correo'] ,$_POST['fecha']);
    }else{
        echo json_encode(array('error' => true, 'msg' => $validado['msg']));
    }
    
}
else{
    echo json_encode(array('error' => true, 'msg' => 'ERROR! Los datos no llegaron al servidor.'));
}

?>