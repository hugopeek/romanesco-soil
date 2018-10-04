$(document)
    .ready(function() {

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
        $('.ui.tabbed.menu .item').tab();
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
// https://css-tricks.com/smooth-scrolling-accessibility/
$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                target.focus(); // Setting focus
                if (target.is(":focus")){ // Checking if the target was focused
                    return false;
                } else {
                    target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                    target.focus(); // Setting focus
                }
                return false;
            }
        }
    });
});

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

// Submit login form
$("#form-login .submit").click(function() {
    $("#form-login").submit();
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
        // Turn Tabs into an accordion on mobile
        context: 'mobile',
        match: function() {
            $(document)
                .ready(function() {
                    // Move content below the heading
                    $('.reducible.tab.segment')
                        .each(function() {
                            var target = $('.menu .item[data-tab="' + $(this).data('tab') + '"]');

                            $(target).after(this);
                        })
                        .removeClass('tab segment')
                        .addClass('reduced content')
                    ;

                    // If pointing segments are used, temporarily disable them
                    $('.reducible.tabbed.menu > .pointing.segment')
                        .removeClass('segment')
                        .addClass('dormant-segment')
                    ;

                    // Remove tabular classes
                    $('.reducible.tabular.menu > .item, .reducible.tabbed.menu > .item')
                        .removeClass('item')
                        .addClass('reduced title')
                        .tab({
                            deactivate: 'all'
                        })
                    ;
                    $('.reducible.tabular.menu, .reducible.tabbed.menu')
                        .removeClass('tabular menu')
                        .addClass('fluid styled accordion')
                        .accordion()
                    ;
                })
            ;
        },
        unmatch: function() {
            // We're leaving mobile
            $(document)
                .ready(function() {

                    // Revert all classes back to normal
                    $('.reducible.accordion')
                        .removeClass('fluid styled accordion')

                        // Depending on their menu type, attach either tabbed or tabular
                        .each(function() {
                            if ($(this).hasClass('tabbed')) {
                                $(this).addClass('menu');
                            } else {
                                $(this).addClass('tabular menu');
                            }
                        })
                    ;
                    $('.reduced.title')
                        .removeClass('reduced title')
                        .addClass('item')
                    ;
                    $('.dormant-segment')
                        .removeClass('dormant-segment')
                        .addClass('segment')
                    ;
                    $('.reduced.content')
                        .removeClass('reduced content')
                        .addClass('tab segment')

                        // Move content back to original position
                        .each(function() {
                            if (($(this).data('menu-position') === 'right') || ($(this).data('menu-position') === 'left')) {
                                $(this).closest('.grid').find('.stretched.column').append($(this));
                                $(this).closest('.grid').find('.menu').addClass('fluid');
                            } else {
                                $(this).closest('.menu').after($(this));
                            }
                        })
                    ;

                    // Attach JS again
                    $('.ui.reducible.tabular.menu .item').tab();
                    $('.ui.reducible.tabbed.menu .item').tab();
                })
            ;
        }
    },{
        // On detail pages, make the first container fluid on smaller screens
        // so the stripe segments will snap to the edges
        context: ['mobile', 'tablet'],
        match: function () {
            $('body.detail #main > .ui.container')
                .addClass('fluid')
            ;
            $('body.detail #main > .ui.grid.container')
                .removeClass('grid')
            ;
        },
        unmatch: function () {
            // We're leaving mobile
            $('body.detail #main > .ui.container')
                .removeClass('fluid')
            ;
            $('body.detail #main > .ui.grid.container')
                .addClass('grid')
            ;
        }
    }
];
// Go!
MQ.init(queries);