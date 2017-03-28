# marquee-direction
jQuery marquee effect that can change direction

## Options  
 - **speed** Value 1 = 1px scroll per second. It must be positive.
 - **direction** `vertical` or `horizontal`  
 
## Events  
 - **forward**  Starts scrolling down for vertical and scrolling rightwards for horizontal.  
 - **backward** Starts scrolling up for vertical and leftwards for horizontal.  
 - **pause** Stops and scrolling   
 - **revalidate** Recaclculate if text overflows or not and apply/remove marquee as needed. 
 
 
 ## Example:  
 
 html markup:  
 
    <div class="marquee marquee-vertical" data-speed="100" data-direction="vertical">
        <div class="marquee-wrapper">
            <div class="marquee-content">
                Some long text...
            </div>
        </div>
    </div>
    
    <div class="marquee marquee-horizontal " data-speed="50" data-direction="horizontal">       
        <div class="marquee-wrapper">
            <div class="marquee-content">
               Some long text here...
            </div>            
        </div>
    </div>

css:  

    .marquee-vertical {
        height: 200px;
        overflow: auto;
    }
    
    .marquee-content {
        margin: 0;
        padding: 30px;
    }
    
    .marquee {
        overflow: auto;
       	padding: 0;
        margin: 15px 0;
    }

    .marquee-horizontal {
    	white-space: nowrap;
    }
    
    .marquee-horizontal .marquee-content,
    .marquee-horizontal .marquee-wrapper {
        display: inline-block;
    }

js:  

    $(".marquee").marquee(); //initialization  

    $(".marquee").marquee({
      speed: 100,  
      direction: horizontal
    }); //initialization with custom speed and direction

    $(".marquee").trigger("forward"); // triggers forward event  

    $(".marquee").eq(0).trigger("forward", {speed: 50}); // Custom speed  

    $(".marquee").trigger("revalidate"); //E.g. if on window.resize text doesn't overflow you might want to disable marquee 

## Note  

`.marquee` and `.marquee-wrapper` must have **no padding**. Any padding can be applied to either `.marquee-content` or you may wrap `.marquee` in another container.

## data-\* API  

The plugin supports data-\* attributes. If both data-\* and `settings` are passed in javscript initialization then data-\* values will override the later.





## Pending

### toggle  
Toggle event like forward and backward would be useful

### marquee_overflow_setInterval  
Marquee effect acheived with native setInterval by incrementing/decrementing `scrollTop`/`scrollLeft` with setInterval. data-\* plugin initialaztion also added. Since setInterval doesn't fire earlier than 10ms so the practical speed limit with this method is 1px to 10ppx per second. This could be incresed by decreasing the fram rate, i.e. increasing scrollTop/left in more than 1px steps. But jquery animate natively takes care of this. So better use marquee-animate-toggle above file.


### marquee_translate_transition 
Marquee effect _to be_ acheived with transtion property over `translate` so as to use native css transition with gpu acceleration. This file doesn't work yet. Problem is with [unneccessary delay required](http://stackoverflow.com/q/42930773/3429430) -- Pending.  

The problem is solved now. And the next version of the plugin will support css3 transitions. :-)

- Other pending feature is trying using css3 `animations`. Currently I have not found any way to toggle animations amidst. 

