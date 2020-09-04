$(function () {

    // ! Counter (used for Social Proof)

    //TO DO
    // Add an extra main class for each group to allow multiple counter groups

    /* Usage example
        <div class="counter" dataTargetNum = "7323">0</div>
        <div class="counter" dataTargetNum = "500" dataTargetSpeed = "1000">0</div>
        <div class="counter" dataTargetNum = "743">0</div>
    
       (dataTargetSpeed is optional)

       Config
       Please set a class to watch and a default duration
    */

    let counterClass = '.counter'; 
    let countDuration = 3000; //default value

    //init if it becomes visible by scrolling
    $(window).on('scroll', function () {
        if (getVisibilityStatus() == true) counter_init();
    });

    //init if it's visible by page loading
    if (getVisibilityStatus() == true) counter_init();

    function getVisibilityStatus() {
        var elValFromTop = Math.ceil($(counterClass).offset().top),
            windowHeight = $(window).height(),
            windowScrollValFromTop = $(this).scrollTop();
        // if the sum of the window height and scroll distance from the top is greater than the target element's distance from the top, 
        //it should be in view and the event should fire, otherwise reverse any previously applied methods
        if ((windowHeight + windowScrollValFromTop) > elValFromTop) {
            return true;
        }
        return false;
    }

    function counter_init() {
        let num, speed;

        $(counterClass).each(function () {
            num = $(this).attr('dataTargetNum');
            speed = $(this).attr('dataTargetSpeed');
            if(speed > 0){
                countDuration = speed;
            }
            $(this).addClass(num); //add a class to recognize each counter
            doCount(num);
        });
    }

    function doCount(num) {
        let className = counterClass + '.' + num; 
        $(className).animate({
            num
        }, {
            duration: countDuration,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            },
            complete: doCount
        });
    }


})