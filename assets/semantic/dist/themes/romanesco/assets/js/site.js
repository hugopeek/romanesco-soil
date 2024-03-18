// Semantic UI behaviour
$(function() {
    // Create sidebar and attach to menu open
    $('#off-canvas')
        .sidebar('attach events', '.toc.item')
    ;

    // Initiate Semantic UI components
    $('.ui.accordion').accordion({
        animateChildren: false
    });

    let $dropdown = $('.ui.dropdown:not(.simple):not(.multiple):not(.with.other)');
    if ($dropdown.length) {
        $dropdown.dropdown({
            fullTextSearch: true
        });
    }

    let $tooltip = $('.with.tooltip');
    if ($tooltip.length) {
        $tooltip.popup();
    }

    let $tooltipOnClick = $('.with.tooltip.onclick');
    if ($tooltipOnClick.length) {
        $tooltipOnClick.popup({
            on: 'click',
            onShow: function () {
                lazyLoadInstance.update();
            }
        });
    }

    let $tabbedMenu = $('.ui.tabbed.menu:not(#submenu) .item');
    let $tabularMenu = $('.ui.tabular.menu:not(#submenu) .item');
    if ($tabbedMenu.length) {
        $tabbedMenu.tab();
    }
    if ($tabularMenu.length) {
        $tabularMenu.tab();
    }

    let $checkbox = $('.ui.checkbox:not(.other):not(.collapsible):not(.slave)');
    let $radio = $('.ui.radio.checkbox:not(.other):not(.collapsible):not(.slave)');
    if ($checkbox.length) {
        $checkbox.checkbox();
    }
    if ($radio.length) {
        $radio.checkbox();
    }

    let $dimmer = $('.ui.dimmable');
    if ($dimmer.length) {
        $dimmer.dimmer({
            on: 'hover'
        });
    }

    let $embed = $('.ui.video.embed:not(.consent)');
    if ($embed.length) {
        $embed.embed();
    }

    let $rating = $('.ui.rating');
    if ($rating.length) {
        $rating.rating('disable');
    }
});

// Sticky navbar behaviour
$(function() {
    var $menu = $("#menu.sticky");
    var $header = $("#header.sticky");
    var mastheadHeight = $("#masthead").height() || 0;
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= mastheadHeight + 50) {
            $menu.addClass("tightened");
            $header.addClass("beam-me-up");
        } else {
            $menu.removeClass("tightened");
            $header.removeClass("beam-me-up");
        }
    });
});

// Dropdown navigation
$(function() {
    var $navDropdown = $('#menu-dropdown');

    // Don't do anything if there's no dropdown menu
    if (!$navDropdown.length) {
        return;
    }

    // Clone navigation
    var $navAccordion = document.querySelector('#menu-dropdown').cloneNode( true );
        $navAccordion.setAttribute( 'id', 'menu-accordion' );

    // Create 3-level mega dropdown
    function createPopup() {
        var $this = $(this);
        var $target = $this.find('> .content');
        var $items = $target.children();
        var groups = $items.length;
        var maxColumns = 5;

        var numbers = ['zero','one','two','three','four','five','six'];
        var columns = 'five';
        var divider = 'internally celled';
        if (groups <= maxColumns) {
            columns = numbers[groups];
            divider = 'divided';
        }

        // Dropdown class is only intended for no-js situations
        $this.removeClass('dropdown');

        // Close any open dropdowns, to prevent overlap during delay
        $this.hover(function() {
            $('.two.level.item').dropdown('hide');
        });

        // Turn list into large popup menu
        $target.wrapAll('<div class="ui flowing basic popup"><div class="ui ' + columns + ' column ' + divider + ' grid"></div></div>');
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

    // Create desktop menu
    function createDropdown(navContainer) {

        // 3-level submenu
        navContainer
            .find('.three.level.item')
            .each(createPopup)
        ;
        // 2-level submenu
        navContainer
            .find('.two.level.item')
            //.removeClass('simple')
            .hover(function() {
                //$(this).popup('hide all');
            })
        // .dropdown({
        //     on: 'hover',
        //     duration: 0,
        //     delay: {
        //         show: 0,
        //         hide: 300
        //     }
        // })
        ;

        // Set active class with JS, to avoid flash of dropdown menu on load
        navContainer
            .find('.active')
            .parent()
            .addClass('current') // Use different classname, otherwise dropdown event won't fire
        ;
    }

    // Create mobile accordion
    function createAccordion(navContainer) {

        // Make sure the accordion group containing the active item is open by default
        navContainer
            .find('.active')
            .each(function(){
                $(this).parents('.item').addClass('active');
                $(this).parents('.content').addClass('active');
                $(this).siblings('.content')
                    .addClass('active')
                    .find('> .item')
                    .addClass('transition visible')
                ;
            })
        ;

        // Apply accordion menu
        $('#off-canvas')
            .accordion({
                exclusive: true,
                closeNested : true,
                animateChildren: false,
                selector: {
                    trigger: '.title > .icon'
                }
            })
        ;

        // Remove menu classes interfering with styling
        navContainer.find("#menu-accordion").removeClass('right menu');
        navContainer.find('ul .content').removeClass('menu');
        navContainer.find('.dropdown.item').removeClass('dropdown');

        // Separate link and icon, so dropdown icon becomes clickable
        $('#off-canvas a.title')
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
    }

    // By default, create desktop menu
    createDropdown($navDropdown);


    // Switch between accordion and dropdown on mobile / desktop
    MQ.addQuery({
        context: ['mobile','tablet'],
        match: function() {
            var $sidebar = $('#off-canvas');

            // Place accordion inside off-canvas sidebar
            $('#off-canvas .home').after($navAccordion);

            // Initialize
            createAccordion($sidebar);

            // Empty desktop navigation to avoid double links in HTML
            $('#menu-dropdown').detach();

        },
        unmatch: function() {

            // Refill empty container
            if ($('#menu .main.menu').length) {
                $('#menu .main.menu').prepend($navDropdown);
            } else {
                $('#menu .branding').after($navDropdown);
            }

            // Initialize again to make sure 3-level dropdown is working
            createDropdown($navDropdown);

            // Axe mobile nav
            $('#menu-accordion').detach();
        }
    });
});

// Vertical navigation
$(function() {
    var $navAccordion = $('#menu-vertical #menu-accordion');

    // Don't do anything if there's no dropdown menu
    if (!$navAccordion.length) {
        return;
    }

    // Activate accordion in vertical menu
    $('#menu-vertical')
        .accordion({
            exclusive: true,
            closeNested : true,
            animateChildren: false,
            selector: {
                trigger: '.title > .icon'
            },
            onOpening: function() {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            },
            onClose: function() {
                $(this).parent().removeClass('active');
            }
        })
    ;

    // Send accordion to off-canvas on mobile
    MQ.addQuery({
        context: ['mobile'],
        match: function() {
            $navAccordion.insertAfter('#off-canvas .home');
        },
        unmatch: function() {
            $navAccordion.insertAfter('#menu-vertical .branding');
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
});

// Toggle function to show/hide divs with buttons
$('.visibility.toggle').click(function() {

    // Get data attributes from input
    var target = $(this).data('target');
    var popupContent = $(this).data('content');

    // Show target if it's hidden, otherwise hide it again
    if($(target).hasClass('hidden')) {
        $(target)
            .removeClass('hidden')
        ;

        // Provide feedback through button
        $(this)
            .removeClass('muted')
            .find('.icon')
            .addClass('minus')
            .removeClass('plus')
        ;

        // Provide feedback through tooltip
        if (popupContent) {
            popupContent.replace(/Show|View|Display/,'Hide');
        }
    }
    else {
        $(target)
            .addClass('hidden')
        ;

        // Reset button styling and text
        $(this)
            .addClass('muted')
            .find('.icon')
            .removeClass('minus')
            .addClass('plus')
        ;

        // Reset tooltip content
        if (popupContent) {
            popupContent.replace('Hide','Show');
        }
    }
});

// Close button in off-canvas menu
$('#off-canvas .close.button').click(function() {
    $('#off-canvas').sidebar('hide');
});

// Submit search form
$("#form-search i.link").click(function() {
    $("#form-search").submit();
});

// Submit login form
$("#form-login .submit").click(function() {
    $("#form-login").submit();
});

// Make simple dropdowns work on touch
//https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element/3028037#3028037
if(window.matchMedia("(pointer: coarse)").matches) {
    $('.ui.simple.dropdown').on('click', function() {
        $(this).addClass('active');
    });
    $(document).click(function(event) {
        var $target = $(event.target);
        if(!$target.closest('.ui.simple.dropdown.active').length &&
            $('.ui.simple.dropdown > .menu').is(":visible")) {
            $('.ui.simple.dropdown').removeClass('active');
        }
    });
}

// Lazy load images
// https://github.com/verlok/lazyload
var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
});

// Responsive tables
function tableToCard(id) {
    id = id || '';

    $(id + '.ui.overview.table').addClass('dormant');

    // Show table headings inline
    $(id + '.ui.overview.table thead').hide();
    $(id + '.ui.overview.table td:not(.inline)').each(function() {
        $(this).wrapInner('<span class="data"></span>');
        $(this).prepend('<span class="title">' + $(this).attr('data-title') + '</span>');
        $(this).addClass('inline');
    });

    // Display table rows as cards
    $(id + '.ui.overview.table tbody > tr').addClass('ui card');
}

// Turn Tabs into an accordion on mobile
function tabToAccordion() {
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
    // .tab({
    //     deactivate: 'all'
    // })
    ;
    $('.reducible.tabular.menu, .reducible.tabbed.menu')
        .removeClass('tabular menu')
        .addClass('fluid styled accordion')
        .accordion({
            animateChildren: false
        })
    ;

    // Change position of segment pointer on mobile
    $('.testimonial .column > .left.pointing.segment')
        .removeClass('left')
        .addClass('down')
    ;
}

// Re-initialize some JS behaviour when refreshing pdoPage with AJAX
$(document).on('pdopage_load', function(e, config, response) {
    //console.log(config.wrapper);

    // Ratings
    let $rating = $('.ui.rating');
    if ($rating.length) {
        $rating.rating('disable');
    }

    // Lazy loading images
    lazyLoadInstance.update();

    // Responsive queries
    if (MQ.getContext() === 'mobile') {
        tableToCard(config.wrapper);
    }
});

/**
 * Apply specific js through media queries. The media queries are matched with
 * Semantic UI breakpoints by onMediaQuery.js.
 *
 * Available breakpoints: mobile, tablet, computer, large, widescreen.
 *
 * Keep in mind that match queries are executed on page load, unmatch queries
 * are not.
 */
var queries = [
    {
        context: ['mobile'],
        match: function() {
            tabToAccordion();
            tableToCard();

            // Stack floated images
            $('.ui.stackable.floated.image')
                .removeClass('floated')
                .addClass('centered dormant-floated')
            ;

            // Make some buttons more compact
            $('.publication .back.button .icon').addClass('fitted');

            // Sticky header in vertical templates
            $('#header.sticky')
                .sticky({
                    context: '.pusher'
                })
            ;

            // Move ToC items to dropdown
            $('[id*="menu"].toc .item').appendTo('#dropdown-toc.mobile .menu');
        },
        unmatch: function() {
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
            //$('.ui.reducible.tabular.menu .item').tab();
            //$('.ui.reducible.tabbed.menu .item').tab();

            // Restore position of segment pointer
            $('.testimonial .column > .down.pointing.segment')
                .removeClass('down')
                .addClass('left')
            ;

            // Restore responsive tables
            $('table.ui.overview.table thead').show();
            $('table.ui.overview.table td span.data span').unwrap();
            $('table.ui.overview.table td')
                .removeClass('inline')
                .find('span.title')
                .remove()
            ;
            $('table.ui.overview.table tbody > tr').removeClass('ui card');
            $('table.ui.overview.dormant.table').removeClass('dormant');

            // Restore overview segments
            $('.ui.overview.dormant-segments').addClass('segments').removeClass('dormant-segments');

            // Restore images
            $('.ui.stackable.dormant-floated.image')
                .removeClass('centered dormant-floated')
                .addClass('floated')
            ;

            // Restore buttons
            $('.publication .back.button .fitted.icon').removeClass('fitted');
        }
    },
    {
        context: ['mobile', 'tablet'],
        match: function () {
            // On detail pages, make the first container fluid on smaller screens
            // so the stripe segments will snap to the edges
            $('body.detail #main > .ui.container')
                .addClass('fluid')
            ;
            $('body.detail #main > .ui.grid.container')
                .addClass('dormant-grid')
                .removeClass('grid')
            ;

            // Move ToC items to dropdown (
            $('[id*="menu"].toc .item').appendTo('#dropdown-toc.tablet .menu');
        },
        unmatch: function () {
            $('body.detail #main > .ui.container')
                .removeClass('fluid')
            ;
            $('body.detail #main > .ui.dormant-grid.container')
                .addClass('grid')
                .removeClass('dormant-grid')
            ;

            // Return ToC items to original container
            $('#dropdown-toc .menu .item').appendTo('[id*="menu"].toc');
        }
    },
    {
        context: ['computer','large','widescreen'],
        match: function () {
            $('#submenu.sticky, #sidebar-cta.sticky')
                .sticky({
                    context: '#main',
                    offset: $("#menu.sticky").height() || 36,
                    silent: true
                })
            ;

            // Highlight anchors in ToC menu
            $('#submenu a[href*="#"]')
                .each(function() {
                    var offset = $("#menu.sticky").height() || 27;
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

            // Make first item in ToC active
            $('#submenu.toc :first-child').addClass('active');
        }
    }
];

// Fire in the hole!
MQ.init(queries);
