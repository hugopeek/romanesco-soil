$(document).ready(function(){
    $('.slider')

        // Initiate default slider
        .slick({
            //adaptiveHeight: true,
            infinite: true,
            //slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true
        })

        // Add class to parent of slider
        .parent().addClass('slider-wrapper')

        // Change background color for each slide
        // @Todo: needs more work. Data-attributes maybe, with color classes for each slide..
        //.on('afterChange', function(event,slick,currentSlide){
        //    $(this).addClass('orange')
        //})
    ;
    $('.slider-minimal')

        // Initiate default slider
        .slick({
            adaptiveHeight: true,
            arrows: false,
            dots: true
        })
    ;
    $('.slider-synced')

        // Initiate slider that functions as preview window for the synced navigation slider
        .slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-synced-nav'
        })
    ;
    $('.slider-synced-nav')

        // Initiate slider that functions as navigation for the synced preview window
        .slick({
            slidesToScroll: 1,
            asNavFor: '.slider-synced',
            focusOnSelect: true
        })
    ;
    $('.lightbox')

        // Initiate lightbox with integrated Slick slider
        // Using this script: https://github.com/mreq/slick-lightbox
        .slickLightbox()
    ;
});