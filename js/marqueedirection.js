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

             $pause = function() {
                 $(that).stop();
             };

             if (($settings.direction == "vertical")) {

                 $forward = function(event, settings) {


                     $(that).stop();
                     if ($(that).scrollTop() >= $(that).prop('scrollHeight') / 2) {
                         $(that).scrollTop($(that).scrollTop() - $(that).prop('scrollHeight') / 2);
                     }

                     $scroll_step = $(that).prop('scrollHeight') / 2 - $(that).scrollTop();

                     $(that).animate({
                         scrollTop: $(that).prop('scrollHeight') / 2
                     }, (1 / (!!settings ? settings.speed : $settings.speed)) * $scroll_step * 1000, "linear", function() { $forward(event, settings) });

                 };

                 $backward = function(event, settings) {

                     $(that).stop();
                     if ($(that).scrollTop() <= $(that).prop('scrollHeight') / 2 - $(that).outerHeight()) {
                         $(that).scrollTop($(that).scrollTop() + $(that).prop('scrollHeight') / 2);
                     }

                     $scroll_step = $(that).outerHeight() + $(that).scrollTop() - $(that).prop('scrollHeight') / 2;

                     $(that).animate({
                         scrollTop: $(that).prop('scrollHeight') / 2 - $(that).outerHeight()
                     }, (1 / (!!settings ? settings.speed : $settings.speed)) * $scroll_step * 1000, "linear", function() { $backward(event, settings) });
                 }


             } else if (($settings.direction == "horizontal")) {

                 //$(that).find(".marquee-wrapper").width( 2*$(that).find(".marquee-content").outerWidth() );


                 $forward = function(event, settings) {


                     $(that).stop();

                     if ($(that).scrollLeft() >= ($(that).prop('scrollWidth') / 2)) {
                         $(that).scrollLeft($(that).scrollLeft() - $(that).prop('scrollWidth') / 2);
                     }

                     $scroll_step = $(that).prop('scrollWidth') / 2 - $(that).scrollLeft();

                     $(that).animate({
                         scrollLeft: $(that).prop('scrollWidth') / 2
                     }, (1 / (!!settings ? settings.speed : $settings.speed)) * $scroll_step * 1000, "linear", function() { $forward(event, settings) });

                 };

                 $backward = function(event, settings) {

                     $(that).stop();
                     if ($(that).scrollLeft() <= $(that).prop('scrollWidth') / 2 - $(that).outerHeight()) {
                         $(that).scrollLeft($(that).scrollLeft() + $(that).prop('scrollWidth') / 2);
                     }

                     $scroll_step = $(that).outerHeight() + $(that).scrollLeft() - $(that).prop('scrollWidth') / 2;

                     $(that).animate({
                         scrollLeft: $(that).prop('scrollWidth') / 2 - $(that).outerHeight()
                     }, (1 / (!!settings ? settings.speed : $settings.speed)) * $scroll_step * 1000, "linear", function() { $backward(event, settings) });

                 }
             }


             $revalidate = function() {

                 if (!((($settings.direction == "vertical") && ($(that).outerHeight() <= $(that).find(".marquee-content").outerHeight(true))) || (($settings.direction == "horizontal") && ($(that).width() <= $(that).find(".marquee-content").outerWidth(true))))) {

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

        $(this).trigger("revalidate");
         return this;
     }
 });
