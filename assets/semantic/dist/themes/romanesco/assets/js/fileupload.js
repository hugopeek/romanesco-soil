// Detect when upload field is being created
// Uses this plugin: https://github.com/uzairfarooq/arrive
$(".file-uploader-buttons").arrive(".qq-uploader", function() {

    // Add Semantic UI classes to elements inside upload field
    $('.qq-upload-button, .qq-clear-button').wrapAll('<div class="ui buttons"></div>');
    $('.qq-upload-drop-area').addClass('ui basic secondary very padded segment').css('display', '');
    $('.qq-upload-button').addClass('ui primary right labeled icon button').append('<i class="upload icon"></i>');
    $('.qq-clear-button').addClass('ui right labeled icon button').append('<i class="remove icon"></i>');
    $('.qq-upload-list').addClass('ui list');

    // Stop listening for changes after class names are set
    // @todo: Is this working?
    $(document).unbindArrive(".qq-uploader");
});

$(".file-uploader-items").arrive(".file-wrap", function() {

    // Create grid around uploaded items
    $('.file-uploader-items').addClass('ui relaxed divided unstackable items');
    $(this).addClass('item');
    $(this).find('.thumb').addClass('ui tiny image');
    $(this).find('.title').addClass('content').prepend('<i class="file outline icon"></i>');
    $(this).find('.delete-button').wrapAll('<div></div>').addClass('ui tiny red right floated icon button').append('<i class="remove icon"></i>');
});

// Also set classes when loading document, to prevent styling being lost after a refresh
$(document).ready(function() {
    $('.file-uploader-items').addClass('ui relaxed divided unstackable items');
    $('.file-wrap').addClass('item');
    $('.file-wrap .thumb').addClass('ui tiny image');
    $('.file-wrap .title').addClass('content').prepend('<i class="file outline icon"></i>');
    $('.file-wrap .delete-button').wrapAll('<div></div>').addClass('ui tiny red right floated icon button').append('<i class="remove icon"></i>');
});
