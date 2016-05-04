$(document).ready(function(){
    $('.slider')

        // Initiate sliders
        .slick({
            adaptiveHeight: true,
            infinite: true,
            slidesToShow: 1,
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
});