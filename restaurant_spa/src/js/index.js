$(document).ready(function() {
    $('body').fadeIn(1000);
    $(".fancybox").fancybox();

    $('.top').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 500);
    });

    // Some regex stuffs I found online to take care osfs
    // smooth scrolling for all the regular links.
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                console.log('target: ' + target);
                $('html, body').animate({
                    scrollTop: target.offset().top - 65 // 65 = size of md-navbar with padding
                }, 1000);
                return false;
            }
        }
    });

    /* SCROLLING LOGIC */
    var lastScrollPos = 0;
    var posOfAbout = $('#about').position().top;
    var posOfMenu = $('#menu').position().top;
    var posOfGallery = $('#gallery').position().top;
    var posOfChef = $('#chefs').position().top;
    var posOfReservations = $('#reservations').position().top;
    var navLinks = $('.md-navbar .nav-link').toArray();
    var toucheHeader = $('#touche-header').offset().top;

    console.log(toucheHeader);
    $(window).scroll(function() {
        var currentScrollPos = $(this).scrollTop();
        var navHeight = 251.97;
        var bottomOfNav = currentScrollPos + navHeight;
        var activeNav = $('.md-navbar .active-nav');

        if (activeNav) {
            activeNav.removeClass('active-nav');
            if (bottomOfNav >= posOfAbout && bottomOfNav < posOfMenu) {
                $(navLinks[0]).addClass('active-nav');
            } else if (bottomOfNav >= posOfMenu && bottomOfNav < posOfGallery) {
                $(navLinks[1]).addClass('active-nav');
            } else if (bottomOfNav >= posOfGallery && bottomOfNav < posOfChef) {
                $(navLinks[2]).addClass('active-nav');
            } else if (bottomOfNav >= posOfChef && bottomOfNav < posOfReservations) {
                $(navLinks[3]).addClass('active-nav');
            } else if (bottomOfNav >= posOfReservations) {
                $(navLinks[4]).addClass('active-nav');
            }
        }

        if (bottomOfNav >= toucheHeader + 50) {
            console.log('touching');
            $('.md-navbar').addClass('md-navbar-bg-color');
            $('.md-navbar').addClass('md-navbar-remove-height');
        } else {
            $('.md-navbar').removeClass('md-navbar-bg-color');
            $('.md-navbar').removeClass('md-navbar-remove-height');
        }

        lastScrollPos = currentScrollPos;
    });
    /* END SCROLLING LOGIC */

    /* ISOTOPE LOGIC */
    $('.gallery-container').isotope({
        filter: '*',
        animationOptions: {
            duration: 500,
            easing: 'linear',
            queue: false
        }
    });

    var isotopeItems = $('.isotope-item').toArray();

    $('.meal-category-permalink').click(function() {
        $('.active-category').removeClass('active-category');
        $(this).addClass('active-category');
        var selector = $(this).attr('data-filter');
        $('.gallery-container').isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

        /* FANCYBOX FILTERING */
        for (var i = 0; i < isotopeItems.length; ++i) {
            if ("." + isotopeItems[i].classList[2] === selector) {
                isotopeItems[i].childNodes[0].childNodes[0].attributes[1].nodeValue = "rel";
            } else {
                isotopeItems[i].childNodes[0].childNodes[0].attributes[1].nodeValue = "";
            }
        }
        /* END FANCYBOX FILTERING */
        return false;
    });
    /* END ISOTOPE LOGIC */
});