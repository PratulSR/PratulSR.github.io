(function ($) {
    "use strict";

    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    
    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 2000,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Payment methods show hide
    $('.checkout .payment-method .custom-control-input').change(function () {
        if ($(this).prop('checked')) {
            var checkbox_id = $(this).attr('id');
            $('.checkout .payment-method .payment-content').slideUp();
            $('#' + checkbox_id + '-show').slideDown();
        }
    });
    
})(jQuery);

