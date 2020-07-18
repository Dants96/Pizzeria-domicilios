function agregarCarrito(id, val){
    let par = {"id" : id, "prc" : val};
    $.ajax({
        url: 'php/add2Carrito.php',
        type: 'POST',
        data: par,
    })
    .done(function(res){
        let respuesta = JSON.parse(res);
        if(!respuesta.error){
            mostrarCarrito();
            $('.succes').slideUp("1000");    
            $('.succes').html(respuesta.msg);
            $('.succes').slideDown("1000");
            setTimeout(function(){
                $('.succes').slideUp("1000");    
            }, 3000);
        }else{
            $('.alerta').slideUp("1000");
            $('.alerta').html(respuesta.msg);
            $('.alerta').slideDown("1000");
            setTimeout(function(){
                $('.alerta').slideUp("1000");    
            }, 3000);
        }
    })
    .fail(function(){
    console.log("error ajax agregar al carrito");
    })
    .always(function(){
    console.log("error ajax agregar al carrito");
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
            $('#btn-pedir').attr('disabled', true);
            $('#btn-borrar').attr('disabled', true);
            $('#total_pedido').html('<div class="row adj-row"><div class="col-6"></div><div class="col align-self-end"></div><div class="col align-self-end "></div></div>');
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

function getComent(id){
    alert('comentarios de id ' + id);
}

function formatDin(din){
    return  new Intl.NumberFormat('es-CO', { maximumSignificantDigits: 3 }).format(din);
}

function estrellas(num){
    num = Math.round(num);
    let stars = "";
    switch (num) {
        case 5:
            stars =  '<span class="fa fa-star checked"></span>'.repeat(5);
            break;
        case 4:
            stars =  '<span class="fa fa-star checked"></span>'.repeat(4);
            stars += '<span class="fa fa-star"></span>'.repeat(1);
            break;
        case 3:
            stars =  '<span class="fa fa-star checked"></span>'.repeat(3);
            stars += '<span class="fa fa-star"></span>'.repeat(2);
            break;
        case 2:
            stars =  '<span class="fa fa-star checked"></span>'.repeat(2);
            stars += '<span class="fa fa-star"></span>'.repeat(3);
            break;
        case 1:
            stars =  '<span class="fa fa-star checked"></span>'.repeat(1);
            stars += '<span class="fa fa-star"></span>'.repeat(4);
            break;
        case 0:
            stars = '<span class="fa fa-star"></span>'.repeat(5);
            break;
    }
    return stars;
}

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
    console.log("error ajax agregar al carrito");
    })
    .always(function(){
    console.log("error ajax agregar al carrito");
    })
})



$(document).ready(function(){
    mostrarCarrito();
    
    $.ajax({
        url: 'php/getPizzas.php',
        type: 'GET',
    })
    .done(function(res){
        // agregar cards a #menu_lista
        pizzas = JSON.parse(res);
        
        if(!pizzas.error){
            var menu = document.getElementById('menu_lista');
            for( var clave in pizzas){
                if(String(clave) != 'error'){
                    menu.innerHTML += '<div class="card card-pizza fade-load2">'
                        +'<img class="card-img-top img-fluid" src="'+ pizzas[clave][6] +'" alt="Card image cap">'                                                
                        +'<div class="card-body text-left">'
                            +'<h4 class="card-title text-center text-deco">'+ pizzas[clave][1] +'</h4>'
                            +'<hr class="my-4">'
                        +'<h6 class="card-subtitle mb-3 text-center">Calificacion:<span class="estrellas"> '+ estrellas(pizzas[clave][3]) +'</span></h6>'
                        +'<small class="card-subtitle mb-3 ">'+ pizzas[clave][2] + '<br></small>'
                        +'<a href="#" onclick="getComent('+ pizzas[clave][0] +'); return false;" class="card-link">Reseñas <span class="fa fa-comments"></span></a>'
                        +'<hr class="my-4">'
                            +'<p>Mediana: $ '+ formatDin(pizzas[clave][4]) +' <a href="#" onclick="agregarCarrito('+ pizzas[clave][0] + ',' + pizzas[clave][4] +'); return false;" class="float-right card-link text-success">Agregar <span class="fa fa-shopping-cart"></span></a>'
                            +'<p>Grande: $ '+ formatDin(pizzas[clave][5]) +' <a href="#" onclick="agregarCarrito('+ pizzas[clave][0] +',' + pizzas[clave][5] +'); return false;" class="float-right card-link text-success">Agregar <span class="fa fa-shopping-cart"></span></a>'
                        +'</div>'
                    +'</div>';
                }
            }
        }

    })
    .fail(function(){
    console.log("error al listar menu");
    })
    .always(function(){
    console.log("complete listar menu");
    })
});