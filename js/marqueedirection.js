;(function($) {
    $.fn.extend({
        marquee: function(options) {

            this.each(function() {

                var that = this; //To prevent any scoping issue with this
                that.defaultOptions = {
                    speed: 10, //10 px per second
                    direction: "vertical" // Verical scrolling marquee            
                }
                var $settings = $.extend({}, options, that.defaultOptions, {
                    speed: $(that).data("speed"),
                    direction: $(that).data("direction")
                });

                var $forward, $backward, $pause, $revalidate; // Main feature functions              

                var $scroll_step; // The remaining scroll distance. The distance for one animation
                var $half_scroll; //To store nearest integer of two_divs_scrollHeight/2 or two_divs_scrollWidth/2 
                var $speed; //Dynamic speed as per remaining amount of scroll

                $pause = function() {
                    $(that).stop();
                };

                if (($settings.direction == "vertical")) {

                    $forward = function(event, settings) {

                        $half_scroll = Math.round($(that).prop("scrollHeight") / 2);                        

                        $(that).stop();
                        if ($(that).scrollTop() >= $half_scroll) {                            
                            $(that).scrollTop($(that).scrollTop() - $half_scroll);
                        }

                        $scroll_step = $half_scroll - $(that).scrollTop();

                        if($settings.speed > 0) {
                            $speed = (!!settings ? settings.speed : $settings.speed);
                        }
                        else {
                            console.error("speed must be > 0");
                            $speed = 1;
                        }                       

                       
                        $(that).animate({
                            scrollTop: $half_scroll
                        }, (1 / $speed) * $scroll_step * 1000, "linear", function() { $forward(event, settings) });

                    };

                    $backward = function(event, settings) {

                        $half_scroll = Math.round($(that).prop("scrollHeight") / 2);

                        $(that).stop();
                        if ($(that).scrollTop() <= $half_scroll - $(that).outerHeight()) {
                            $(that).scrollTop($(that).scrollTop() + $half_scroll);
                        }

                        $scroll_step = $(that).outerHeight() + $(that).scrollTop() - $half_scroll;

                        if($settings.speed > 0) {
                            $speed = (!!settings ? settings.speed : $settings.speed);
                        }
                        else {
                            console.error("speed must be > 0");
                            $speed = 1;
                        }

                        $(that).animate({
                            scrollTop: $half_scroll - $(that).outerHeight()
                        }, (1 / $speed) * $scroll_step * 1000, "linear", function() { $backward(event, settings) });
                    }


                } else if (($settings.direction == "horizontal")) {
                 

                    $forward = function(event, settings) {

                        $half_scroll = Math.round($(that).prop("scrollWidth") / 2);
                        $(that).stop();

                        if ($(that).scrollLeft() >= ($half_scroll)) {
                            $(that).scrollLeft($(that).scrollLeft() - $half_scroll);
                        }

                        $scroll_step = $half_scroll - $(that).scrollLeft();
                          if($settings.speed > 0) {
                            $speed = (!!settings ? settings.speed : $settings.speed);
                        }
                        else {
                            console.error("speed must be > 0");
                            $speed = 1;
                        }

                        $(that).animate({
                            scrollLeft: $half_scroll
                        }, (1 / $speed) * $scroll_step * 1000, "linear", function() { $forward(event, settings) });

                    };

                    $backward = function(event, settings) {

                        $half_scroll = Math.round($(that).prop("scrollWidth") / 2);
                        $(that).stop();
                        if ($(that).scrollLeft() <= $half_scroll - $(that).outerWidth()) {
                            $(that).scrollLeft($(that).scrollLeft() + $half_scroll);
                        }

                        $scroll_step = $(that).outerWidth() + $(that).scrollLeft() - $half_scroll;
                          if($settings.speed > 0) {
                            $speed = (!!settings ? settings.speed : $settings.speed);
                        }
                        else {
                            console.error("speed must be > 0");
                            $speed = 1;
                        }

                        $(that).animate({
                            scrollLeft: $half_scroll - $(that).outerWidth()
                        }, (1 / $speed) * $scroll_step * 1000, "linear", function() { $backward(event, settings) });

                    }
                }


                $revalidate = function() {

                    if (!((($settings.direction == "vertical") && ($(that).outerHeight() <= $(that).find(".marquee-content").outerHeight())) || (($settings.direction == "horizontal") && ($(that).outerWidth() <= $(that).find(".marquee-content").outerWidth())))) {
                        $(that).trigger("pause");
                        $(that).find(".marquee-content").eq(1).remove();
                        $(that).off("pause forward backward");
                    } else {
                        if (!$(that).find(".marquee-content").eq(1).length) {
                            $(that).find(".marquee-content").clone().appendTo($(that).find(".marquee-wrapper"));
                        }


                        $(that).on("pause", $pause);
                        $(that).on("forward", $forward);
                        $(that).on("backward", $backward);

                    }
                }

                $(that).on("revalidate", $revalidate);



            });

            var scope = this; //again scoping issues

            function resize_revalidate(){
                $(window).off("resize.resize_revalidate");
                setTimeout(function(){
                    $(scope).trigger("revalidate");                    
                    $(window).on("resize.resize_revalidate", resize_revalidate);
                },100);
            }

            $(this).trigger("revalidate");

            $(window).on("resize.resize_revalidate", resize_revalidate);

            return this;
        }
    });

})(jQuery);
