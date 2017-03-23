# marquee-toggle
jQuery marquee effect that can change direction


## marquee_overflow_animate  
Marquee effect is acheived by animating overflow property with jQuery `animate` method.  

## marquee_overflow_setInterval  
Marquee effect acheived with native setInterval by incrementing/decrementing `scrollTop`/`scrollLeft` with setInterval. data-\* plugin initialaztion also added. Since setInterval doesn't fire earlier than 10ms so the practical speed limit with this method is 1px to 10ppx per second. This could be incresed by decreasing the fram rate, i.e. increasing scrollTop/left in more than 1px steps. But jquery animate natively takes care of this. So better use marquee-animate-toggle above file.

## marquee_translate_transition -- pending
Marquee effect _to be_ acheived with transtion property over `translate` so as to use native css transition with gpu acceleration. This file doesn't work yet. Problem is with [unneccessary delay required](http://stackoverflow.com/q/42930773/3429430) -- Pending.  

- Other pending feature is trying using css3 `animations`. Currently I have not found any way to toggle animations amidst. 
- This repository is supposed to be converted into a stand alone plugin in future.

