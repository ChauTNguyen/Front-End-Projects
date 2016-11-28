$(document).ready(function() {
    // toggle nav logic
    $('.toggle-nav').click(function() {
        $('body').toggleClass('show-nav');
        return false;
    });

    $('.remove-nav').click(function() {
        $('body').removeClass('show-nav');
    });

    // All scroll logic
    var scrollSpeed = 1000;
    // scroll to top
    $('#nav-coffee').click(function() {
        $('html,body').animate({ scrollTop: 0 }, scrollSpeed / 2);
    });

    // scroll viewport logic
    $('#landing').click(_scroll);
    $(".btn-scroll").each(function() {
        $(this).click(_scroll);
    });

    function _scroll() {
        var current = $(this).closest("section");
        var p = current.position();
        $('html, body').animate({
            scrollTop: p.top + current.height()
        }, scrollSpeed);
    }
});