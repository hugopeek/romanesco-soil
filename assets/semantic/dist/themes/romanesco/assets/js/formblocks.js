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
                //$radioCollapse  = $listGroup.find('.checkbox.collapsible:not(.checked)'),
                $target         = $(this).data('target')
                //$state          = $(this).data('state')
            ;

            // Get data attribute from input field and show target
            $('#' + $target).removeClass('hidden');

            // If it's a list of radio buttons, callbacks won't work when you change the selection.
            // Instead, add a trigger to all the sibling radio buttons to hide the Other field again.
            if ($radioButtons) {
                $radioButtons.checkbox({
                    onChecked: function() {
                        $('#' + $target).addClass('hidden');
                    }
                });
            }

            // If it's a group of collapsible radio buttons, only 1 target can be visible at any time.
            //if ($radioCollapse) {
            //    //$('#' + $target).removeClass('hidden');
            //
            //    console.log($radioCollapse);
            //
            //    $radioCollapse.checkbox({
            //        onChecked: function() {
            //            //$radioCollapse.addClass('hidden');
            //            $('#' + $target).removeClass('hidden');
            //        }
            //        //onUnchecked: function() {
            //        //    console.log('doeg');
            //        //    $('#' + $target).addClass('hidden');
            //        //}
            //    });
            //}
        },

        // Checkboxes respond to the onUnchecked callback, so use that to hide the Other field again.
        onUnchecked: function() {
            var $target = $(this).data('target');

            $('#' + $target).addClass('hidden');
        }
    })
;


// Set checkboxes or radios with links
// -----------------------------------

// Control checkbox/radio selections through different link elements.
// Note that with this particular solution, the checkbox must be inside the link.

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
