$(function () {

    // ! Counter (used for Social Proof)

    /* Usage example
        <div id="counters_1">
            <div ="counter" dataTargetNum="10" dataSpeed="6000"></div>
            <div class="counter" dataTargetNum="7" dataSpeed="7000" 
            dataDirection="reverse" dataEasing="linear"></div>
            <div class="counter" dataTargetNum="80333" dataSpeed="2500">0</div>
        </div>
        <div id="counters_2">
            <div class="counter" dataTargetNum="4200" dataSpeed="1000">0</div>
            <div class="counter" dataTargetNum="4500" dataSpeed="4000">0</div>
            <div class="counter" dataTargetNum="4743">0</div>
        </div>
        <div id="counters_3">
            <div class="counter" dataTargetNum="5200" dataSpeed="1000">0</div>
            <div class="counter" dataTargetNum="5500" dataSpeed="4000">0</div>
            <div class="counter" dataTargetNum="5743">0</div>
        </div>
    
       Required attr: dataTargetNum
       Optionals attr: dataSpeed(milisecons), dataDirection(reverse), dataEasing(linear, swing)

       **CONFIG**
       Please set a the ID's to watch, a class for all counters and a default speed

       Avoid to use this script in pages where it isn't needed
    */

    // CONFIG
    let visibilityIds = ['#counters_1', '#counters_2', '#counters_3']; //must be an array, could have only one element
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

        visibilityIds.forEach(function (item, index) { //Call each class
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

    function counter_init(groupId) {
        let num, speed, direction, index = 0;
        $(counterClass).each(function () {
            num = $(this).attr('dataTargetNum');
            speed = $(this).attr('dataSpeed');
            direction = $(this).attr('dataDirection');
            easing = $(this).attr('dataEasing');
            if (speed == undefined) speed = defaultSpeed;
            $(this).addClass('c_' + index); //add a class to recognize each counter
            doCount(num, index, speed, groupId, direction, easing);
            index++;
        });
    }

    function doCount(num, index, speed, groupClass, direction, easing) {
        let className = groupClass + ' ' + counterClass + '.' + 'c_' + index;
        if(easing == undefined) easing = "swing";
        $(className).animate({
            num
        }, {
            duration: +speed,
            easing: easing,
            step: function (now) {
                if (direction == 'reverse') {
                    $(this).text(num - Math.floor(now));
                } else {
                    $(this).text(Math.floor(now));
                }
            },
            complete: doCount
        });
    }
})