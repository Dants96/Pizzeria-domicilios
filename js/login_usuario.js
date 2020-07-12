$(document).on('submit', '#formulario', function (event) {
    event.preventDefault();
        $.ajax({
            url: 'php/acceder_usuario.php',
            type: 'POST',
            data: $(this).serialize(),
            beforeSend: function () {
                $("#submit").html("<span class=\"fa fa-spinner fa-spin\"></span> Validando");
                $("#submit").attr("disabled", true);
            },
            processData: false
        })
            .done(function (res) {
                console.log("done! ajax registro de usuario");
                var respuesta = JSON.parse(res);
                if (!respuesta.error) {
                    location.href = "/Proyectofinal/index.html"
                } else {
                    $(".alerta").html("<span>" + respuesta.msg + "<span>");
                    $(".alerta").slideDown("slow");
                    setTimeout(function(){
                        $("#submit").html("Ingresar");
                        $("#submit").attr("disabled", false);
                    }, 1000);
                    setTimeout(function () {
                        $(".alerta").slideUp("slow");
                        
                    }, 6000);
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