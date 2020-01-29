// DEPRECATED. Slick is no longer used to power te slider.

$(document).ready(function(){
    // COLLISION ALERT!!
    // There's a checkbox type that also uses the slider class, see issue #77 on Github.
    // And in addition: there's also a Fomantic UI component now named Slider.

    // Default slider
    $('.slider-basic')
        .slick({
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

    // Slider with minimal controls
    // @todo Is this used anywhere still?
    $('.slider-minimal')
        .slick({
            adaptiveHeight: true,
            arrows: false,
            dots: true
        })
    ;

    // Slider that functions as preview window for the synced navigation slider
    $('.slider-synced')
        .slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-synced-nav'
        })
    ;

    // Slider that functions as navigation for the synced preview window
    $('.slider-synced-nav')
        .slick({
            slidesToScroll: 1,
            asNavFor: '.slider-synced',
            focusOnSelect: true
        })
    ;

    // Slider that turns Overview items into slides
    $('.slider-overview').each(function() {
        var data = $(this).attr('data-slick');

        $(this)
            .find('.overview')
            .removeClass('grid')
            .attr('data-slick', data)
            .slick({
                arrows: true,
                dots: false,
                slidesToShow: 4,
                slidesToScroll: 1,

                responsive: [
                    {
                        breakpoint: 1300,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },{
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            swipeToSlide: true,
                            touchThreshold: 13,
                            speed: 200,
                            arrows: false,
                            dots: true
                        }
                    }
                ]
            })
            .find('.slick-track')
            .addClass('ui cards')
            .find('.slick-slide.column').each(function() {
                $(this)
                    .removeClass('column')
                    .addClass('card')
                    .wrapInner('<div class="content">')
                ;
            })
        ;
    });

    // Nested slider layouts
    $('.nested.slider-wrapper')
        .find('.image.content')
        .removeClass('content rounded')
    ;

    // Initiate lightbox with integrated Slick slider.
    // This functionality relies on this script: https://github.com/mreq/slick-lightbox
    $('.with.lightbox:not(.with.caption)')
        .slickLightbox()
    ;

    // Show caption in lightbox too for items that have one
    $('.with.lightbox.with.caption')
        .slickLightbox({
            caption: 'caption'
        })
    ;
});