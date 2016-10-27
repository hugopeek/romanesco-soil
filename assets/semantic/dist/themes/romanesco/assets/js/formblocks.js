// Show/Hide containers

// Radio buttons
$('.collapse-radio').change(function() {

    // Get data attributes from input fields
    var group = $(this).data('group');
    var target = $(this).data('target');

    // Add group name to all target containers
    $("#" + target).addClass(group);

    // Show selected container, hide the rest
    if($(this).is(':checked')) {
        $('.' + group).collapse('hide');
        $('#' + target).collapse('show');
    } else {
        $('#' + target).collapse('hide');
    }
});

// Checkboxes
$('.collapse-checkbox').click(function() {

    // Get data attributes from input fields
    var group = $(this).data('group');
    var target = $(this).data('target');

    // Add group name to all target containers
    $("#" + target).addClass(group);

    // Show selected container, hide the rest
    if($(this).is(':checked')) {
        $('#' + target).collapse('show');
    } else {
        $('#' + target).collapse('hide');
    }
});

// "Other" select options
$('.radio-group.other input:radio').change(function() {

    // Get data attributes from input fields
    var target = $(this).data('target');

    // Get container ID for being able to hide other input again
    var parentID = $(this).closest('div[id]').attr('id');

    // Show/hide "Other" container
    if($(this).hasClass("collapse-other")) {
        $('#' + target).collapse('show');
    } else {
        // Target div specifically, because target is not set on other radio's
        $('#' + parentID + '-other').collapse('hide');
    }
});
$('.checkbox .collapse-other').click(function() {

    // Get data attributes from input fields
    var target = $(this).data('target');

    // Show/hide "Other" container
    if($(this).is(':checked')) {
        $('#' + target).collapse('show');
    } else {
        $('#' + target).collapse('hide');
    }
});