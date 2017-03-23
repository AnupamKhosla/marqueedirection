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

                var $forwardTimer, $backwardTimer; //Timer ids to be used for up/down or left/down scrolling 

                $pause = function() {
                    clearInterval($forwardTimer);
                    clearInterval($backwardTimer);
                };

                console.log($settings.speed);

                if ((($settings.direction == "vertical") && ($(that).height() <= $(that).find(".marquee-content").outerHeight(true))) || (($settings.direction == "horizontal") && ($(that).width() <= $(that).find(".marquee-content").outerWidth(true)))) {

                    $(that).find(".marquee-content").clone().appendTo($(that).find(".marquee-wrapper"));


                    if (($settings.direction == "vertical")) {

                        $forward = function(event, settings) {
                            $pause();
                            $forwardTimer = setInterval(function() {
                                $(that).scrollTop($(that).scrollTop() - 1);
                                if ($(that).scrollTop() <= 1) {
                                    $(that).scrollTop($(that).prop('scrollHeight') / 2);
                                }
                            }, (1 / (!!settings ? settings.speed : $settings.speed)) * 1000);
                        };

                        $backward = function(event, settings) {

                            $pause();
                            $backwardTimer = setInterval(function() {

                                $(that).scrollTop($(that).scrollTop() + 1);
                                if ($(that).scrollTop() >= $(that).prop('scrollHeight') / 2) {
                                    $(that).scrollTop(0);
                                }
                            }, (1 / (!!settings ? settings.speed : $settings.speed)) * 1000);
                        }


                    } else if (($settings.direction == "horizontal")) {

                        //$(that).find(".marquee-wrapper").width( 2*$(that).find(".marquee-content").outerWidth() );


                        $forward = function(settings) {
                            $pause();
                            $forwardTimer = setInterval(function() {
                                $(that).scrollLeft($(that).scrollLeft() + 1);
                                if ($(that).scrollLeft() >= $(that).prop('scrollWidth') / 2) {
                                    $(that).scrollLeft(0);
                                }
                            }, (1 / (!!settings ? settings.speed : $settings.speed)) * 1000);
                        };

                        $backward = function(settings) {
                            $pause();
                            $backwardTimer = setInterval(function() {
                                $(that).scrollLeft($(that).scrollLeft() - 1);
                                if ($(that).scrollLeft() <= 1) {
                                    $(that).scrollLeft($(that).prop('scrollWidth') / 2);
                                }
                            }, (1 / (!!settings ? settings.speed : $settings.speed)) * 1000);
                        }
                    }

                    $(that).on("pause", $pause);
                    $(that).on("forward", $forward);
                    $(that).on("backward", $backward);
                }
            });

            return this;
        }
    });