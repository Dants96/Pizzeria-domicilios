$(document).on('submit', '#formulario', function (event) {
    event.preventDefault();
        $.ajax({
            url: 'php/acceder_usuario.php',
            type: 'POST',
            data: $(this).serialize(),
            beforeSend: function () {
                $("#submit").val("Validando...");
            },
            processData: false
        })
            .done(function (res) {
                console.log("done! ajax registro de usuario");
                var respuesta = JSON.parse(res);
                if (!respuesta.error) {
                    
                } else {
                    $(".alerta").html("<span>" + respuesta.msg + "<span>");
                    $(".alerta").slideDown("slow");
                    setTimeout(function () {
                        $(".alerta").slideUp("slow");
                        $("#submit").val("Registrar");
                    }, 3000);
                }
            })
            .fail(function () {
                console.log("error ajax registro de usuario");
            })
            .always(function () {
                console.log("complete ajax registro de usuario");
            })
});

$("#irReg").on("click", function () {
    location.href = "/Proyectofinal/registro_usuario.html";
});