(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a, .btn-scroll").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
    });
    
})(jQuery);
// Función para mostrar el modal (formulario flotante)
function mostrarModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block'; // Muestra el modal
}

// Función para cerrar el modal (si se hace clic fuera del formulario)
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target == modal) {
        modal.style.display = 'none'; // Cierra el modal si se hace clic fuera de él
    }
}

// Función para mostrar el formulario de login
function mostrarLogin() {
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('registroTab').classList.remove('active');
    document.querySelector('.tab-btn.active').classList.remove('active');
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
}

// Función para mostrar el formulario de registro
function mostrarRegistro() {
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('registroTab').classList.add('active');
    document.querySelector('.tab-btn.active').classList.remove('active');
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
}

// Función para validar el formulario de Login
function validarLogin(event) {
    event.preventDefault(); // Previene el envío del formulario

    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;
    const errorMessage = document.getElementById('error-message');

    // Limpiar mensajes de error anteriores
    errorMessage.textContent = '';

    // Validar campos
    if (usuario === '' || contrasena === '') {
        errorMessage.textContent = 'Por favor, completa todos los campos.';
        return false;
    }

    // Simulación de validación de usuario y contraseña
    if (usuario !== 'admin' || contrasena !== '1234') {
        errorMessage.textContent = 'Usuario o contraseña incorrectos.';
        return false;
    }

    // Si todo está correcto, mostrar mensaje de éxito
    alert('Bienvenido, ' + usuario + '!');
    document.getElementById('formLogin').reset(); // Limpiar el formulario
    document.getElementById('loginModal').style.display = 'none'; // Cerrar el modal
    return true;
}

// Función para validar el formulario de Registro
function validarRegistro(event) {
    event.preventDefault(); // Previene el envío del formulario

    const usuario = document.getElementById('usuarioRegistro').value;
    const contrasena = document.getElementById('contrasenaRegistro').value;
    const confirmarContrasena = document.getElementById('confirmarContrasena').value;
    const errorMessage = document.getElementById('error-message');

    // Limpiar mensajes de error anteriores
    errorMessage.textContent = '';

    // Validar campos
    if (usuario === '' || contrasena === '' || confirmarContrasena === '') {
        errorMessage.textContent = 'Por favor, completa todos los campos.';
        return false;
    }

    // Verificar que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
        errorMessage.textContent = 'Las contraseñas no coinciden.';
        return false;
    }

    // Simulación de registro exitoso
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    document.getElementById('formRegistro').reset(); // Limpiar el formulario
    mostrarLogin(); // Cambiar a la vista de login
    return true;
}
document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('email');
    const confirmationMessage = document.getElementById('confirmationMessage');

    emailForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario tradicional

        // Obtén el valor del correo electrónico
        const email = emailInput.value;

        if (validateEmail(email)) {
            // Almacena el correo en el localStorage (si solo quieres guardar localmente)
            localStorage.setItem('userEmail', email);

            // Muestra el mensaje de confirmación
            confirmationMessage.style.display = 'block';

            // Puedes hacer una llamada a un backend para almacenar el correo y enviar actualizaciones
            // Por ejemplo, enviar el correo a un servidor usando fetch
            sendEmailToBackend(email);
        } else {
            alert('Por favor, ingresa un correo electrónico válido.');
        }
    });

    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    function sendEmailToBackend(email) {
        // Esto simula enviar el correo electrónico al backend para su almacenamiento
        fetch('https://mi-servidor.com/api/registrar-correo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Correo enviado correctamente:', data);
        })
        .catch(error => {
            console.error('Error al enviar el correo:', error);
        });
    }
});

