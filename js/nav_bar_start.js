$(document).ready(function () {
    $.ajax({
            url: 'php/get_session.php',
            type: 'GET',
        })
        .done(function (autenticado) {
            if (autenticado) {
                $('#salir').html('<a id="salir_a" class="nav-link navbar-brand" href="#">Salir</a>');
                $('#salir_a').on('click', function () {
                    $.ajax({
                            url: 'php/dest_session.php',
                            type: 'GET',
                        })
                        .done(function (res) {
                            alert("sesion cerrada");
                            location.reload();
                        })
                        .fail(function () {
                            console.log("error al serrar session");
                        })
                });
            } else {
                $('#vr_regu').html('<a class="nav-link navbar-brand" href="registro_usuario.html">Registrarse</a>');
                $('#vr_logu').html('<a class="nav-link navbar-brand" href="login_usuario.html">Entrar</a>');
            }
        })
        .fail(function () {
            console.log("error nav auth");
            //local.reload();
        })
        .always(function () {
            console.log("nav auth complete");
        })
});