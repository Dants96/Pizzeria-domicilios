function validarPassword() {
    if ($('#password').val() != $('#password-re').val()) {
        $(".alerta").html("<span>Las contraseñas deben coincidir<span>");
        $(".alerta").slideDown("slow");
        return false;
    } else {
        return true;
    }
}

function validarFecha() {
    var date = new Date($('#fecha').val());
    var date_cur = new Date()
    if (date.getFullYear() >= (date_cur.getFullYear() - 12)) {
        $(".alerta").html("<span>Fecha Incorrecta, aun no naces o eres muy joven.<span>");
        $(".alerta").slideDown("slow");
        return false;
    } else {
        return true;
    }
}

function validarData() {
    var validados = [validarFecha(), validarPassword()];
    var valido = true;
    $("#submit").val("Validando...");
    $("#submit").attr("disabled", true);
    validados.forEach(element => {
        valido = valido && element;
    });
    if (!valido) {
        setTimeout(function () {
            $(".alerta").slideUp("slow");
            $("#submit").val("Registrar");
            $("#submit").attr("disabled", false);
        }, 8000);
    }
    return valido;
}


$(document).on('submit', '#formulario', function (event) {
    event.preventDefault();
    if (validarData()) {
        $.ajax({
                url: 'php/registrar_usuario.php',
                type: 'POST',
                data: $(this).serialize(),
                beforeSend: function () {
                    $("#submit").val("Validando...");
                    $("#submit").attr("disabled", true);
                },
                processData: false
            })
            .done(function (res) {
                console.log("done! ajax registro de usuario");
                alert(res);
                var respuesta = JSON.parse(res);
                if (!respuesta.error) {
                    $('#contenido').html("<div class=\"alert alert-success\" role=\"alert\"><h4 class='alert-heading'>Registro Exitoso! </h4><p>Usuario fue creado y registrado, Bienvenido" + $('#nombre').val() + " " + $('#apellido').val() + ".</p></div>");
                    $("#submit").val("Registrar");
                } else {
                    $(".alerta").html("<span>" + respuesta.msg + "<span>");
                    $(".alerta").slideDown("slow");
                    setTimeout(function () {
                        $(".alerta").slideUp("slow");
                        $("#submit").val("Registrar");
                        $("#submit").attr("disabled", false);
                    }, 8000);
                }
            })
            .fail(function () {
                console.log("error ajax registro de usuario");
            })
            .always(function () {
                console.log("complete ajax registro de usuario");
            })

    }
});