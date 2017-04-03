$(document).ready(function(){
    // COLLISION ALERT!!
    // There's a checkbox type that also uses the slider class, see issue #77 on Github.
    $('.slider:not(.checkbox)')

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

        // Initiate slider with minimal controls
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

    // Initiate lightbox with integrated Slick slider.
    // This functionality relies on this script: https://github.com/mreq/slick-lightbox
    $('.with.lightbox:not(.with.caption)')

        // Initiate default lightbox
        .slickLightbox()
    ;

    $('.with.lightbox.with.caption')

        // Show caption in lightbox too for items that have one
        .slickLightbox({
            caption: 'caption'
        })
    ;
});