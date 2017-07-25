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

        // Initiate Semantic UI components
        $('.ui.accordion').accordion();
        $('.ui.dropdown').dropdown();
        $('.with.tooltip').popup();
        $('.with.tooltip.onclick')
            .popup({
                on: 'click'
            })
        ;
        $('.ui.tabular.menu .item').tab();
        $('.ui.sortable.table').tablesort();

        $('.ui.checkbox:not(.other):not(.collapsible):not(.slave)').checkbox();
        $('.ui.radio.checkbox:not(.other):not(.collapsible):not(.slave)').checkbox();

        $('.ui.dimmable')
            .dimmer({
                on: 'hover'
            })
        ;
        $('.ui.embed').embed();
        $('.ui.rating').rating('disable');

        // Make submenu scroll down with content area
        $('#submenu.sticky')
            .sticky({
                context: '#main',
                offset: 70
            })
        ;

        // Add inverted classes to elements inside inverted segments
        $('.inverted.stripe.segment .button:not(.primary):not(.secondary)').addClass('inverted');
        $('.inverted.stripe.segment.primary-color .button.primary').addClass('inverted');
        $('.inverted.stripe.segment.secondary-color .button.secondary').addClass('inverted');
        $('.inverted.stripe.segment .header').addClass('inverted');
        $('.inverted.stripe.segment .lead').addClass('inverted');

        // Remove inverted classes again if needed
        // @todo: this is so fugly..
        $('.inverted.stripe.segment .cards .header').removeClass('inverted');
        $('.inverted.stripe.segment .cards .button').removeClass('inverted');
        $('.inverted.stripe.segment.primary-color .cards .button').removeClass('primary').addClass('secondary');
        $('.inverted.stripe.segment .form .segment .header').removeClass('inverted');

        // Add boxed class to elements inside inverted segments that need to retain their original styling
        $('.inverted.stripe.segment .cards .header a').addClass('boxed');
        $('.inverted.stripe.segment .form .segments a').addClass('boxed');
        $('.inverted.stripe.segment .leaflet-container a').addClass('boxed');

        // Hide elements with class .hidden
        $('.hidden.element').hide();
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
//$(function() {
//    // scroll handler
//    var scrollToAnchor = function( id ) {
//        // grab the element to scroll to based on the name
//        var elem = $("a[name='"+ id +"']");
//        // if that didn't work, look for an element with our ID
//        if ( typeof( elem.offset() ) === "undefined" ) {
//            elem = $("#"+id);
//        }
//        // if the destination element exists
//        if ( typeof( elem.offset() ) !== "undefined" ) {
//            // do the scroll
//            $('html, body').animate({
//                scrollTop: elem.offset().top
//            }, 600 );
//        }
//    };
//
//    // bind to click event
//    $("a.button").click(function( event ) {
//        // only do this if it's an anchor link
//        if ( $(this).attr("href").match(/^#/) ) {
//            // prevent default propagation
//            event.preventDefault();
//            // scroll to the location
//            var href = $(this).attr('href').replace('#', '');
//            scrollToAnchor( href );
//            // if we have pushState
//            if ( history.pushState ) {
//                history.pushState( null, null, '#'+href );
//            }
//            // fallback to prevent jitter
//            return false;
//        }
//    });
//});

// Toggle function to show/hide divs with buttons
$('.visibility.toggle').click(function() {

    // Get data attributes from input
    var target = '#' + $(this).data('target');
    //var visibility = $(this).data('targetState');

    // Add hidden or visible class to target element
    //$(target).addClass(visibility);

    // Show target if it's hidden, otherwise hide it again
    if($(target).hasClass('hidden')) {
        $(target)
            .removeClass('hidden')
            .show(100)
        ;

        // Provide feedback through button
        $(this)
            // Change button styling to indicate that target is visible now
            .removeClass('disabled')
            // Inform user that the button will hide the target in this state
            .attr('data-content',$(this).data('content').replace(/Show|View|Display/,'Hide'))
        ;
    } else {
        $(target)
            .addClass('hidden')
            .hide(100)
        ;

        // Reset button styling and text
        $(this)
            .addClass('disabled')
            .attr('data-content',$(this).data('content').replace('Hide','Show'))
        ;
    }
});

// Close button in off-canvas menu
$('#off-canvas .close.button').click(function() {
    $('#off-canvas').sidebar('hide');
});

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
                        .addClass('cards')
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
                        .removeClass('cards')
                        .addClass('ui grid')
                        .slick('unslick')
                    ;
                })
            ;
        }
    },{
        // On detail pages, make the first container fluid on smaller screens
        // so the stripe segments will snap to the edges
        context: ['mobile', 'tablet'],
        match: function () {
            $('body.detail #main > .ui.container')
                .removeClass('grid')
                .addClass('fluid')
            ;
        },
        unmatch: function () {
            // We're leaving mobile
            $('body.detail #main > .ui.container')
                .removeClass('fluid')
                .addClass('grid')
            ;
        }
    }
];
// Go!
MQ.init(queries);