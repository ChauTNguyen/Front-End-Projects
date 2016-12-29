$(document).ready(function() {
    // Scrolling logic.
    var scrollSpeed = 1000;

    $('#scroll-arrow').click(function() {
        $('html, body').animate({ scrollTop: $('#main-nav').offset().top }, scrollSpeed);
    });

    $('.top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, scrollSpeed)
    });

    // Some regex stuffs I found online to take care of
    // smooth scrolling for all the regular links.
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 40
                }, 500);
                return false;
            }
        }
    });

    var lastScrollPos = 0;
    var posOfNav = $('#main-nav').offset().top;
    $(window).scroll(function() {
        var currentScrollPos = $(this).scrollTop();
        if (currentScrollPos >= posOfNav) {
            if (currentScrollPos > lastScrollPos) {
                $('body').addClass('hide-nav');
            } else {
                $('body').removeClass('hide-nav');
                $('#main-nav').addClass('fix-top');
            }
        } else {
            // bandaid fix
            $('#main-nav').removeClass('fix-top');
        }
        lastScrollPos = currentScrollPos;
    });

});