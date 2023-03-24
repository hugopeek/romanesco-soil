// Show/Hide containers
// -----------------------------------

// These triggers rely on Semantic UI callbacks for checkboxes. For more info:
// http://semantic-ui.com/modules/checkbox.html#/usage

// Hide targets that are designated as collapsed
$('[data-state="collapsed"]')
    .each(function() {
        var $target = $(this).data('target');

        $('#' + $target).addClass('hidden');
    })
;

// Check inputs that are designated as expanded
$('[data-state="expanded"]')
    .each(function() {
        $(this)
            .prop('checked',true)
            .parent().addClass('checked')
        ;
    })
;

// Show targets as soon as their checkbox / radio button is checked
$('.ui.checkbox.collapsible')
    .checkbox()
    .checkbox({

        // Use the functions, Luke
        onChecked: function() {
            var
                $listGroup      = $(this).closest('.radio.fields'),
                $radioButtons   = $listGroup.find('.checkbox:not(.collapsible)'),
                $target         = $(this).data('target')
            ;

            // Get data attribute from input field and show target
            $('#' + $target).removeClass('hidden');

            // NB: This is for Other fields show/hide only!
            // If it's a list of radio buttons, callbacks won't work when you change the selection.
            // Instead, add a trigger to all the sibling radio buttons to hide the Other field again.
            if ($radioButtons) {
                $radioButtons.checkbox({
                    onChecked: function() {
                        $('#' + $target).addClass('hidden');
                    }
                });
            }
        },

        // Checkboxes respond to the onUnchecked callback, so use that to hide the Other field again.
        onUnchecked: function() {
            var $target = $(this).data('target');

            $('#' + $target).addClass('hidden');
        },

        // Find currently checked radio button and hide its target just before it is unchecked.
        // This is a workaround for the onUnchecked callback not working on radios.
        // See this issue for details https://github.com/Semantic-Org/Semantic-UI/issues/4407
        beforeChecked: function() {
            $(this).closest('.radio.fields').find('input:checked').each(function () {
                $('#' + $(this).data('target')).addClass('hidden');
            });
        }
    })
;

// Apply 'other' option to dropdowns. If it's a dropdown where you can select
// multiple options, the other options can be appended in the select field
// itself. Otherwise, the 'something else' option is available in the dropdown,
// and a text input will appear under the selector.
$('.ui.dropdown:not(.multiple).with.other')
    .dropdown({
        fullTextSearch: true,

        onChange: function(value, text, $option) {
            let id = $(this).attr('id');
            let target = '#' + id + '-other';

            if ($option.is(':last-child')) {
                $(target).removeClass('hidden');
            } else {
                $(target).addClass('hidden')
            }
        }
    })
;
$('.ui.multiple.dropdown.with.other')
    .dropdown({
        fullTextSearch: true,
        allowAdditions: true
    })
;


// Set checkboxes or radios with links
// -----------------------------------

// Control checkbox/radio selections through different link elements.
// Note that with this particular solution, the checkbox must be inside the link.

//@todo: example please...

// Find the master switch and set selection on click
$('.ui.with.checkboxes.inside .master')
    .on('click', function() {
        $(this)
            .find('.slave')
            .checkbox(
                $(this).data('method')
            )
        ;
    })
;

// Set appropriate classes based on a selection
$('.ui.with.checkboxes.inside .slave')
    .checkbox({
        onChecked: function(){
            $(this).closest('.master').addClass('checked');
        },
        onUnchecked: function () {
            $(this).closest('.master').removeClass('checked');
        }
    })
;

// Radio buttons need a little workaround
// See this issue: https://github.com/Semantic-Org/Semantic-UI/issues/4407
// Or this fiddle: http://jsfiddle.net/v6qmf3fo/6/
$('.ui.with.checkboxes.inside .radio.slave')
    .checkbox({
        onChecked: function(){
            $(this).closest('.master').addClass('checked');
        },
        beforeChecked: function(){
            $(this).closest('.checkboxes.inside').find('.master').removeClass('checked');
        }
    })
;


// Calendar inputs
// -----------------------------------

// Only initializes fields without a custom class.
// This allows you to override the settings below if needed.

$('.ui.calendar.date.time:not(.custom)').calendar({
    selectAdjacentDays: true
});

$('.ui.calendar.date.only:not(.custom)').calendar({
    type: 'date',
    selectAdjacentDays: true
});

$('.ui.calendar.time.only:not(.custom)').calendar({
    type: 'time',
    ampm: false
});

$('.ui.calendar.month.year:not(.custom)').calendar({
    type: 'month'
});

$('.date.range.fields:not(.custom)').each(function() {
    $(this).find('.ui.calendar.date.range.start').calendar({
        type: 'date',
        selectAdjacentDays: true,
        endCalendar: $(this).find('.date.range.end')
    });
    $(this).find('.ui.calendar.date.range.end').calendar({
        type: 'date',
        selectAdjacentDays: true,
        startCalendar: $(this).find('.date.range.start')
    });
});


// Recaptcha
// -----------------------------------

// Polyfill for closest() and matches() for IE9+
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector
    ;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (Element.prototype.matches.call(el, s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}