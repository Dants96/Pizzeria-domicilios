$(document).on('submit', '#formulario', function (event) {
    event.preventDefault();
        $.ajax({
            url: 'php/acceder_usuario.php',
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
                var respuesta = JSON.parse(res);
                if (!respuesta.error) {
                    alert("sesion iniciada");
                    location.href = "/Proyectofinal/index.html"
                } else {
                    $(".alerta").html("<span>" + respuesta.msg + "<span>");
                    $(".alerta").slideDown("slow");
                    setTimeout(function(){
                        $("#submit").val("Ingresar");
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