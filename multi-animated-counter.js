$(function () {

    // ! Counter (used for Social Proof)

    /* Usage example
        <div class= "counters_2">
            <div class="counter" dataTargetNum="4200" dataTargetSpeed="1000">0</div>
            <div class="counter" dataTargetNum="4500" dataTargetSpeed="4000">0</div>
            <div class="counter" dataTargetNum="4743">0</div>
        </div>

        <div class= "counters_3">
            <div class="counter" dataTargetNum="5200" dataTargetSpeed="1000">0</div>
            <div class="counter" dataTargetNum="5500" dataTargetSpeed="4000">0</div>
            <div class="counter" dataTargetNum="5743">0</div>
        </div>
    
       (dataTargetSpeed is optional)

       Config
       Please set a class to watch and a default duration

       Avoid to use this script in pages where it isn't needed
    */

    // CONFIG
    let visibilityClass = ['.counters_1', '.counters_2', '.counters_3']; //must be an array, could have only one element
    let counterClass = '.counter';
    let defaultSpeed = 3000; //default value

    // END CONFIG

    //init if it becomes visible by scrolling
    $(window).on('scroll', function () {
        getVisibilityStatus();
    });

    //init if it's visible by page loading
    getVisibilityStatus();

    function getVisibilityStatus() {
        elValFromTop = [];
        var windowHeight = $(window).height(),
            windowScrollValFromTop = $(this).scrollTop();

        visibilityClass.forEach(function (item, index) { //Call each class
            try { //avoid error if class not exist
                elValFromTop[index] = Math.ceil($(item).offset().top);
            } catch (err) {
                return;
            }
            // if the sum of the window height and scroll distance from the top is greater than the target element's distance from the top, 
            //it should be in view and the event should fire, otherwise reverse any previously applied methods
            if ((windowHeight + windowScrollValFromTop) > elValFromTop[index]) {
                counter_init(item);
            }
        });
    }

    function counter_init(groupClass) {
        let num, speed;

        $(counterClass).each(function () {
            num = $(this).attr('dataTargetNum');
            speed = $(this).attr('dataTargetSpeed');
            if (speed == undefined) speed = defaultSpeed;
            $(this).addClass(num); //add a class to recognize each counter
            doCount(num, speed, groupClass);
        });
    }

    function doCount(num, speed, groupClass) {
        let className = groupClass + ' ' + counterClass + '.' + num;
        $(className).animate({
            num
        }, {
            duration: +speed,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            },
            complete: doCount
        });
    }
})