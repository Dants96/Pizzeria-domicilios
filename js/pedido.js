function showSuccessBaner(telefono, direccion, barrio){
    $.ajax({
        url: 'php/autenticar.php',
        type: 'GET',
    })
    .done(function(res){
        if(res){
            let respuesta = JSON.parse(res);
            $('#contenido_carrito_pedido').css("display", "none");
            $('#contenido_carrito_pedido').html("");            
            $('#contenido_carrito_pedido').html('<div id="contenido_carrito_pedido" class="content text-center text-white" style="width: 90%; margin: 0 auto; margin-top: 2%;">'
            +'<div class="banner-jumbo jumbotron text-left text-white" style="margin-top: 4%;">'
                +'<div class="col-md-auto fade-load2" style="display: block; ">'
                    +'<h1 class="display-4 text-center text-success">Pedido realizado exitosamente.</h1>'
                    +'<p class="lead">Pedido enviado a nombre de <b>'+ respuesta.nombre+' '+respuesta.apellido +'</b>, contacto <b>'+ telefono +'</b></p>'
                    +'<p class="lead">Direccion de envuio: <b>'+ barrio +', '+ direccion +'</b>.</p>'
                    +'<p class="lead"><a href="menu_view.html">Puedes ver tus pedidos aqui.</a></p>'
                    +'<hr class="my-4">'
                    +'<h2 class="display-5">Si tu pedido no llega antes de los 30 min recibes un 20% de descuento.</h2>'
                    +'<p class="lead"><a href="#">Aplican condiciones y restricciones.</a></p>'
                +'</div>'
                +'<div class="banner-social text-center fade-load3">'
                    +'<a href="#"><span class="fa fa-instagram"></span></a>'
                   +'<a href="#"><span class="fa fa-facebook-square"></span></a>'
                    +'<a href="#"><span class="fa fa-twitter-square"></span></a>'
                +'</div></div></div>');
            $('#contenido_carrito_pedido').fadeIn();
        }
        
    })
    .fail(function(){
    console.log("error ajax cargar baneer succes");
    })
    .always(function(){
    console.log("error ajax cargar banner succes");
    })    




    
    
}


function mostrarCarrito(){
    $.ajax({
        url: 'php/getCarrito.php',
        type: 'POST',
    })
    .done(function(res){
        let respuesta = JSON.parse(res);
        let carrito = document.getElementById("carrito_list");
        carrito.innerHTML = "";
        if(!respuesta.error){
            //$(".alerta-carrito").css("display: none;");
            $('#btn-pedir').attr('disabled', false);
            $('#btn-borrar').attr('disabled', false);
            
            
            let total_pedido = 0;
            for(var index in respuesta){
                if(String(index) != 'error'){
                    carrito.innerHTML += '<div class="row adj-row"><div class="col-6 ">' + respuesta[index].pizza_nombre + '</div><div class="col">$' + formatDin(respuesta[index].precio) + '</div><div class="col">' + respuesta[index].tamano + ' </div></div>';
                    total_pedido += parseInt(respuesta[index].precio);
                }
            }
            $('#total_pedido').html('<div class="row adj-row"><div class="col-6"></div><div class="col align-self-end">Total:</div><div class="col align-self-end ">$' + formatDin(total_pedido) + '</div></div>');
        }else{

            $('#btn-borrar').attr('disabled', true);
            $('#alerta-carrito').html('<span>Aun no hay pizzas en tu carrito, dirígete al menu.</span><a href="menu_view.html"><button style="margin: 15px" class="btn btn-primary">Menú</button></a>');
            $('#alerta-carrito').fadeIn();
            //$(".alerta-carrito").html("<span>" + respuesta.msg + "</span>")
            //$(".alerta-carrito").fandeIn();
        }
        
    })
    .fail(function(){
    console.log("error ajax traer al carrito");
    })
    .always(function(){
    console.log("error ajax traer al carrito");
    })
}


$(document).on('submit', '#formulario', function (event) {
    event.preventDefault();
    $.ajax({
        url: 'php/hacerPedido.php',
        type: 'POST',
        data: $(this).serialize(),
        processData: false
    })
    .done(function (res) {
        var respuesta = JSON.parse(res);
        if (!respuesta.error) {
            showSuccessBaner($('#telefono').val(), $('#direccion').val(), $('#barrio').val());
        } else {
            $('.alerta').html("<span>" + respuesta.msg + "<span>");
        }
    })
    .fail(function () {
        console.log("error ajax pedido de usuario");
    })
    .always(function () {
        console.log("complete ajax pedido de usuario");
    })
});


$('#btn-borrar').click(function (){
    $.ajax({
        url: 'php/delCarrito.php',
        type: 'GET',
    })
    .done(function(res){
        let respuesta = JSON.parse(res);
        if(!respuesta.error){
            mostrarCarrito();
        }else{
            $('.alerta').html(respuesta.msg);
            $('.alerta').slideDown('slow');
            setInterval(function(){
                $('.alerta').slideUp('slow');
            })
        }
    })
    .fail(function(){
    console.log("error ajax btn elminar  carrito");
    })
    .always(function(){
    console.log("error ajax agregar btn elminar  carrito");
    })
})

function formatDin(din){
    return  new Intl.NumberFormat('es-CO', { maximumSignificantDigits: 3 }).format(din);
}


$(document).ready(function(){
    mostrarCarrito();
    $.ajax({
        url: 'php/autenticar.php',
        type: 'GET',
    })
    .done(function(res){
        if(res){
            let respuesta = JSON.parse(res);
            $('#telefono').val(respuesta.telefono)
        }else{
            $('#btn-sub').html('<a href="login_usuario.html"><div style="text-decoration:none, color:white;" class="btn pull-right btn-primary">Iniciar Sesión</div></a>');
        }
        
    })
    .fail(function(){
    console.log("error ajax cargar telefono");
    })
    .always(function(){
    console.log("error ajax cargar telefono");
    })    

})