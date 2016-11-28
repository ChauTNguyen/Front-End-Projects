    var body = document.querySelector('body');

    // #main-nav toggle logic.
    document.querySelector('.toggle-nav').onclick = function() {
        body.classList.toggle('show-nav');
        return false;
    };

    var clRemoveNav = document.getElementsByClassName('remove-nav');
    var hideNav = function() {
        body.className = "";
    };
    for (var i = 0; i < clRemoveNav.length; ++i) {
        clRemoveNav[i].onclick = hideNav;
    }

    // Scrolling logic.
    var scrollSpeed = 1000;
    var sections = ['landing', 'about', 'pics', 'contact'];

    document.getElementById('nav-coffee').onclick = function() {
        scrollIt(document.getElementById(sections[0]), scrollSpeed / 2);
    };

    var idLanding = document.getElementById(sections[0]);
    idLanding.onclick = function() {
        scrollIt(document.getElementById(sections[1]), scrollSpeed);
    };

    var btnscroll = document.getElementsByClassName('btn-scroll');
    btnscroll[0].onclick = function() {
        scrollIt(document.getElementById(sections[2]), scrollSpeed);
    };
    btnscroll[1].onclick = function() {
        scrollIt(document.getElementById(sections[3]), scrollSpeed);
    };

    // Source: https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
    function scrollIt(element, duration) {
        // define timing functions
        var linear_easing = function(t) {
            return t;
        };

        // Returns document.documentElement for Chrome and Safari
        // document.body for rest of the world
        function checkBody() {
            document.documentElement.scrollTop += 1;
            var body = (document.documentElement.scrollTop !== 0) ? document.documentElement : document.body;
            document.documentElement.scrollTop -= 1;
            return body;
        }

        var body = checkBody();
        var start = body.scrollTop;
        var startTime = Date.now();

        // Height checks to prevent requestAnimationFrame from infinitely looping
        // If the function tries to scroll below the visible document area
        // it should only scroll to the bottom of the document
        var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        var destination = documentHeight - element.offsetTop < windowHeight ? documentHeight - windowHeight : element.offsetTop;

        function scroll() {
            var now = Date.now();
            var time = Math.min(1, ((now - startTime) / duration));
            var timeFunction = linear_easing(time);
            body.scrollTop = (timeFunction * (destination - start)) + start;

            if (body.scrollTop === destination) {
                return;
            }
            requestAnimationFrame(scroll);
        }
        scroll();
    }