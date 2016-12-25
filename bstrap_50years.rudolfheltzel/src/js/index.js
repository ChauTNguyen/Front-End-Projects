$(document).ready(function() {
    $(window).on('beforeunload', function() {
        // Hiding my menu bug on refresh.
        $(window).scrollTop(0);
        $('body').hide();
    });

    $('body').fadeIn(1000);

    // Some regex stuffs I foudn online to take care of
    // smooth scrolling for all the regular links.
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').delay(300).animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });

    $('.toggle-nav').click(function() {
        $('body').toggleClass('show-compact-nav');
        return false;
    });

    $('.remove-nav').click(function() {
        $('body').removeClass('show-compact-nav');
        return false;
    });

    $('#wrapper').click(function() {
        $('body').removeClass('show-compact-nav');
        return false;
    });

    var hoverableImages = [$('.rudolf'), $('.artist-1'), $('.artist-2')];

    $.each(hoverableImages, function() {
        $(this).hover(
            function() {
                $(this).parent().toggleClass('move-caption');
            },
            function() {
                $(this).parent().removeClass('move-caption');
            }
        );
    });

    // Scrolling logic to hide the navbars, but also
    // to change the height of the long navbar if
    // the user scrolls down from the starting position.
    var lastScrollPos = 0;
    $(window).scroll(function() {
        var currentScrollPos = $(this).scrollTop();
        if (currentScrollPos === 0) {
            $('.md-navbar').removeClass('md-navbar-remove-height');
        } else {
            $('.md-navbar').addClass('md-navbar-remove-height');
        }
        if (currentScrollPos > lastScrollPos) {
            $('body').addClass('hide-nav');
        } else {
            $('body').removeClass('hide-nav');
        }
        lastScrollPos = currentScrollPos;
    });
});