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

// Smooth anchor scrolling
$(function() {
    // scroll handler
    var scrollToAnchor = function( id ) {
        // grab the element to scroll to based on the name
        var elem = $("a[name='"+ id +"']");
        // if that didn't work, look for an element with our ID
        if ( typeof( elem.offset() ) === "undefined" ) {
            elem = $("#"+id);
        }
        // if the destination element exists
        if ( typeof( elem.offset() ) !== "undefined" ) {
            // do the scroll
            $('html, body').animate({
                scrollTop: elem.offset().top
            }, 600 );
        }
    };

    // bind to click event
    $("a.button").click(function( event ) {
        // only do this if it's an anchor link
        if ( $(this).attr("href").match(/^#/) ) {
            // prevent default propagation
            event.preventDefault();
            // scroll to the location
            var href = $(this).attr('href').replace('#', '');
            scrollToAnchor( href );
            // if we have pushState
            if ( history.pushState ) {
                history.pushState( null, null, '#'+href );
            }
            // fallback to prevent jitter
            return false;
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
$('.ui.dimmable')
    .dimmer({
        on: 'hover'
    })
;
$('.ui.checkbox').checkbox();
$('.ui.radio.checkbox').checkbox();
$('.ui.tabular.menu .item').tab();
$('.ui.dropdown').dropdown();
$('.ui.sortable.table').tablesort();

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
// Available breakpoints: mobile, tablet, computer, large, widescreen
var queries = [
    {
        // Change position of segment pointer on mobile
        context: 'mobile',
        match: function() {
            $('.testimonial .column > .left.pointing.segment')
                .removeClass('left')
                .addClass('down')
            ;
        },
        unmatch: function() {
            // We're leaving mobile
            $('.testimonial .column > .down.pointing.segment')
                .removeClass('down')
                .addClass('left')
            ;
        }
    },{
        // Add content wrapper for attaching classes for full-screen backgrounds
        context: ['computer','large','widescreen'],
        match: function() {
            $('#home .pusher')
                .addClass('content-wrapper')
            ;
            $(document)
                .ready(function() {
                    $('#home')
                        .removeClass('pushable')
                    ;
                })
            ;
        },
        unmatch: function() {
            // We're leaving computer
            $('#home .pusher')
                .removeClass('content-wrapper')
            ;
            $('#home')
                .addClass('pushable')
            ;
        }
    },{
        // Turn Gallery grid into a slider on mobile
        context: 'mobile',
        match: function() {
            $(document)
                .ready(function() {
                    $('.slider-combo')
                        .removeClass('ui grid')
                        .slick({
                            infinite: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                        })
                    ;
                })
            ;
        },
        unmatch: function() {
            // We're leaving mobile
            $(document)
                .ready(function() {
                    $('.slider-combo')
                        .addClass('ui grid')
                        .slick('unslick')
                    ;
                })
            ;
        }
    }

];
// Go!
MQ.init(queries);