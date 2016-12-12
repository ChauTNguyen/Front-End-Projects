$(document).ready(function() {
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

    $('#wrapper').hide().fadeIn(1000);

    $('.toggle-nav').click(function() {
        $('body').toggleClass('show-compact-nav');
        return false;
    });

    $('.remove-nav').click(function() {
        $('body').removeClass('show-compact-nav');
        return false;
    })

    $('#wrapper').click(function() {
        if ($('body').hasClass('show-compact-nav')) {
            $('body').removeClass('show-compact-nav');
            return false;
        }
    });
});