$(document).ready(function(){
    $.ajax({
        url: 'php/autenticar.php',
        type: 'GET',
    })
    .done(function (autenticado) {
        if (!autenticado) {
            location.href = "/Proyectofinal/login_usuario.html";
            setTimeout(function(){
                $('.info').slideDown("slow");
            }, 1000);
            setTimeout(function(){
                $('.info').slideUp("slow");
            }, 3000); 
        }
    })
    .fail(function(){
        console.log("error al autenticar pagina");
    })
});