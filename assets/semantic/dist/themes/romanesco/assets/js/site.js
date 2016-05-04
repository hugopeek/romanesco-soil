$(document)
    .ready(function() {

        // Fix main to page on passing
        //$('#menu').visibility({
        //    type: 'fixed'
        //});

        // Fix submenu to page on passing
        //$('#submenu').visibility({
        //    type: 'fixed'
        //});

        // Fix menu when passed
        $('.masthead')
            .visibility({
                once: false,
                onBottomPassed: function() {
                    $('.fixed.menu');
                },
                onBottomPassedReverse: function() {
                    $('.fixed.menu');
                }
            })
        ;

        // Create sidebar and attach to menu open
        $('#off-canvas')
            .sidebar('attach events', '.toc.item')
        ;
    })
;

// Sticky navbar behaviour
$(function() {
    //caches a jQuery object containing the header element
    var header = $("#menu");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            header.addClass("tightened");
        } else {
            header.removeClass("tightened");
        }
    });
});

// Close button in off-canvas menu
$('#off-canvas .close.button').click(function() {
    $('#off-canvas').sidebar('hide');
});

// Initiate Semantic UI components
$('.ui.accordion').accordion();
$('.ui.embed').embed();
$('.ui.rating').rating('disable');
$('.ui.dimmable.image')
    .dimmer({
        on: 'hover'
    })
;
$('.ui.checkbox').checkbox();
$('.ui.radio.checkbox').checkbox();
$('.ui.tabular.menu .item').tab();
$('select.dropdown').dropdown();


// Add inverted classes to elements inside inverted segments
$('.inverted.stripe.segment .button:not(.primary):not(.secondary)').addClass('inverted');
$('.inverted.stripe.segment.primary-color .button.primary').addClass('inverted');
$('.inverted.stripe.segment.secondary-color .button.secondary').addClass('inverted');
$('.inverted.stripe.segment .header').addClass('inverted');
$('.inverted.stripe.segment .cards .header').removeClass('inverted');

// Remove text class from footer container in blog
$('#footer > .stripe.segment > .container').removeClass('text');

// Submit search form
$("#search-field i.link").click(function() {
    $("#search-field").submit();
});


// Apply specific js through media queries
// The media queries are matched with Semantic UI breakpoints by onMediaQuery.js
var queries = [
    {
        context: 'mobile',
        match: function() {
            $('.testimonial .column > .left.pointing.segment')
                .removeClass('left')
                .addClass('down')
            ;
        },
        unmatch: function() {
            // We're leaving mobile.
            $('.testimonial .column > .down.pointing.segment')
                .removeClass('down')
                .addClass('left')
            ;
        }
    }
];
// Go!
MQ.init(queries);