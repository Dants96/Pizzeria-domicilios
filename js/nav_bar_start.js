$(document).ready(function () {
    $.ajax({
            url: 'php/autenticar.php',
            type: 'GET',
        })
        .done(function (autenticado) {
            if (autenticado) {
                var usuario =  JSON.parse(autenticado);
                $('#vr_peru').html(' <a href="#" class="nav-link navbar-brand dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                +'<span class="fa fa-user-circle-o" style="margin-right: 4px;"></span>  Perfil</a>'
                +'<div class="dropdown-menu dropdown-menu-right">'
                +'<a class="dropdown-item active" href="#">'+ usuario.nombre +'</a>'
                +'<a class="dropdown-item" href="#">Ver Perfil</a>'
                +'<a class="dropdown-item" href="#">Ver Pedidos</a>'
                +'<div class="dropdown-divider"></div>'
                +'<a id="salir" class="dropdown-item" href="#">salir</a></div>');
                
                $('#salir').on('click', function () {
                    $.ajax({
                            url: 'php/dest_session.php',
                            type: 'GET',
                        })
                        .done(function (res) {     
                            if(res){
                                location.reload();
                            }                                               
                        })
                        .fail(function () {
                            console.log("error al cerrar session");
                        })
                });

                if(usuario.req <= 2){
                    $(".succes").html("<span>sesión iniciada, hola " + usuario.nombre + " " + usuario.apellido + ".<span>");
                    $(".succes").slideDown("slow");
                    setTimeout(function(){
                        $(".succes").slideUp("slow");
                    }, 3000);
                }
                
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