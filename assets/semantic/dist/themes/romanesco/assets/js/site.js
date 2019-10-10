$(function() {
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
    $('.ui.dropdown:not(.simple)').dropdown();
    $('.with.tooltip').popup();
    $('.with.tooltip.onclick')
        .popup({
            on: 'click'
        })
    ;
    $('.ui.tabular.menu .item').tab();
    $('.ui.tabbed.menu .item').tab();

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
            offset: $("#menu.sticky").height() || 36
        })
    ;

    // Make first item in ToC active
    $('#submenu.toc :first-child').addClass('active');

    // Hide elements with class .hidden
    $('.hidden.element').hide();
});

// Sticky navbar behaviour
$(function() {
    var $header = $("#menu");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $header.addClass("tightened");
        } else {
            $header.removeClass("tightened");
        }
    });
});

// Dropdown navigation
$(function() {
    // Don't do anything if there's no dropdown menu
    if (!$('#menu-dropdown').length) {
        return;
    }

    var $nav = $('#menu-dropdown');
    var $navClone = $nav.clone(true);

    function createPopup() {
        var $this = $(this);
        var $target = $this.find('> .content');
        var $items = $target.children();
        var groups = $items.length;
        var maxColumns = 5;

        if (groups < maxColumns) {
            var numbers = ['zero','one','two','three','four','five','six'];
            var columns = numbers[groups];
        } else {
            var columns = 'five';
        }

        // Dropdown is only intended for no-js situations
        $this.removeClass('dropdown');

        // Turn list into large popup menu
        $target.wrapAll('<div class="ui flowing basic popup"><div class="ui ' + columns + ' column internally celled grid"></div></div>');
        $target.find('.column.item').removeClass('item');
        $target.find('.title').addClass('ui tiny header');
        $target.find('.dropdown.icon').remove();
        $target.find('.menu').removeClass('menu').addClass('ui link list');

        // Split list in order to properly add required rows
        for (var i=0; i < groups -maxColumns; i+=maxColumns) {
            $items.slice(i, i+maxColumns).appendTo($('<ul class="row menu">').insertBefore($target));
        }

        // Attach SUI popup event
        $this.find('> .title').popup({
            on: 'hover',
            inline: true,
            hoverable: true,
            exclusive: true,
            position: 'bottom center',
            lastResort: 'bottom right',
            duration: 0,
            delay: {
                show: 0,
                hide: 500
            }
        });
    }

    // Apply popup to eligible items
    $nav.find('.three.level.dropdown')
        .each(createPopup)
    ;
    $nav.find('.two.level.dropdown')
        .removeClass('simple')
        .dropdown({
            on: 'hover',
            duration: 0,
            delay: {
                show: 0,
                hide: 300
            }
        })
    ;

    // Set active class with JS, to avoid flash of dropdown menu on load
    $nav.find('.active')
        .parent()
        .addClass('current') // Use different classname, otherwise dropdown even won't fire
    ;

    // Switch between accordion and dropdown on mobile / desktop
    MQ.addQuery({
        context: ['mobile','tablet'],
        match: function() {
            // Make sure the accordion group containing the active item is open by default
            $navClone
                .find('.active')
                .each(function(){
                    //$(this).parent().prev().addClass('active'); // needed below (line 180)
                    $(this).parents('.item').addClass('active');
                    $(this).parents('.content').addClass('active');
                })
            ;

            // Build up accordion menu
            $('#off-canvas')
                .accordion({
                    exclusive: true,
                    closeNested : true,
                    selector: {
                        trigger: '.title > .icon'
                    }
                })
                .append('<ul id="menu-accordion"></ul>')
                .find('ul')
                .append(
                    $navClone
                        .clone()
                        .find('> .item')
                        .removeClass('dropdown')
                )
                .find('.content')
                .removeClass('menu')
            ;

            // Separate link and icon, so dropdown icon becomes clickable
            $('#off-canvas .title')
                .wrap('<div class="title"></div>')
                .removeClass('title')
                .find('.icon')
                .each(function(){
                    $(this).insertAfter($(this).parent());
                    $(this).wrap('<button class="ui tiny icon button"></button>')
                })
            ;

            // Add active class to link parent, to ensure correct accordion behaviour
            $('#off-canvas a.active')
                .parent()
                .addClass('active')
            ;

            // Empty desktop navigation to avoid double links in HTML
            $('#menu-dropdown').empty();
        },
        unmatch: function() {
            $nav = $navClone.clone();

            // Fill empty container with cloned navigation
            $('#menu-dropdown').replaceWith($nav);

            // Reapply popup to eligible items (couldn't figure out how to clone with events intact)
            $nav.find('.three.level.dropdown')
                .each(createPopup)
            ;
            $nav.find('.two.level.dropdown')
                .removeClass('simple')
                .dropdown({
                    on: 'hover',
                    duration: 0,
                    delay: {
                        show: 0,
                        hide: 300
                    }
                })
            ;

            // Axe mobile nav again
            $('#off-canvas').empty();
        }
    });
});

// Smooth anchor scrolling
// https://css-tricks.com/smooth-scrolling-accessibility/
$(function() {
    var offset = $("#menu.sticky").height() || 27;

    $('a[href*="#"]:not([href="#"])')
        .click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);

                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - offset
                    }, 1000);
                    target.focus(); // Setting focus
                    if (target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        target.focus(); // Setting focus
                    }
                    return false;
                }
            }
        })
    ;

    // Highlight anchors in ToC menu
    $('#submenu a[href*="#"]')
        .each(function() {
            var target = $(this.hash);
            var link = $(this);

            target.visibility({
                once: false,
                offset: offset + 10,
                onPassing: function() {
                    link.siblings().removeClass('active');
                    link.addClass('active');
                },
                onTopPassedReverse: function() {
                    link.prev().addClass('active');
                    link.removeClass('active');
                }
            });
        })
    ;
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
        context: 'mobile',
        match: function() {
            $(document)
                .ready(function() {
                    // Turn Gallery grid into a slider on mobile
                    if (typeof $('html').slick === "function") {
                        // safe to use the function
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
                    }
                })
            ;

            // Turn Tabs into an accordion on mobile
            $('.reducible.tab.segment')
                .each(function() {
                    var target = $('.menu .item[data-tab="' + $(this).data('tab') + '"]');

                    // Move content below the heading
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

            // Change position of segment pointer on mobile
            $('.testimonial .column > .left.pointing.segment')
                .removeClass('left')
                .addClass('down')
            ;
        },
        unmatch: function() {
            // We're leaving mobile
            $(document)
                .ready(function() {
                    if (typeof $('html').slick === "function") {
                        // safe to use the function
                        $('.slider-combo')
                            .removeClass('cards')
                            .addClass('ui grid')
                            .slick('unslick')
                        ;
                    }
                })
            ;

            // Revert tabs back to normal
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

            // Restore position of segment pointer
            $('.testimonial .column > .down.pointing.segment')
                .removeClass('down')
                .addClass('left')
            ;
        }
    },{
        context: ['mobile', 'tablet'],
        match: function () {
            // On detail pages, make the first container fluid on smaller screens
            // so the stripe segments will snap to the edges
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
                .addClass('grid')
            ;
        }
    },{
        context: ['computer','large','widescreen'],
        match: function() {
            $(document)
                .ready(function() {
                    $('#home')
                        .removeClass('pushable')
                    ;
                })
            ;

            // Add content wrapper for attaching classes for full-screen backgrounds
            $('#home .pusher')
                .addClass('content-wrapper')
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
    }
];
// Fire in the hole!
MQ.init(queries);
