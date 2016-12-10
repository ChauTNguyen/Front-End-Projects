var body = document.querySelector('body');

// Scrolling logic.
var scrollSpeed = 1000;

document.getElementById('scroll-arrow').onclick = function() {
    scrollIt(document.getElementById('main-nav'), scrollSpeed / 1.5);
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