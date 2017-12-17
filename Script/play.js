$(document).ready(function() {
    $(".instrument_choose_text").on({
        mouseenter: function() {
            $(this).slideDown()
        },
        mouseleave: function() {
            $(this).slideUp()
        }
    });
});