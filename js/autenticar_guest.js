$(document).ready(function(){
    $.ajax({
        url: 'php/autenticar.php',
        type: 'GET',
    })
    .done(function (autenticado) {
        if (autenticado) {
            location.href = "/Proyectofinal/index.html";            
        }
    })
    .fail(function(){
        console.log("error al autenticar pagina");
    })
});