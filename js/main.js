// main.js
$(document).ready(function() {

  var i = 0;
  var frame_sections = [0, 1950, 8550, 12400, 18900, 30200, 32700];
  var frame_durations = [3000, 5000, 5000, 8000, 16000, 3000];
  var current_frame = frame_sections[i];
  // console.log(current_frame);

  function call_next_frame() {
    var next_frame;
    if (i == frame_sections.length - 1) {
      next_frame = frame_sections[i];
      // console.log('Next frame is ' + next_frame);
      return next_frame;
    } else { 
      next_frame = frame_sections[++i];
      // console.log('Next frame is ' + next_frame);
      return next_frame;
    }
  }

  function call_prev_frame() {
    var prev_frame;
    if (i == 0) {
      prev_frame = frame_sections[i];
      // console.log('Prev frame is ' + prev_frame);
      return prev_frame;
    } else { 
      prev_frame = frame_sections[--i];
      // console.log('Prev frame is ' + prev_frame);
      return prev_frame;
    }
  }

  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left //up
      case 38:  if (!$('*').is(':animated')) {
                  $('body').stop().scrollTo(call_prev_frame(), { duration: frame_durations[i], easing : 'swing' });
                  // console.log(' Up i = ' + i + ' ' + frame_durations[i]);
                } else {
                  // console.log ('Up Scroll Stopped');
                  return;
                }
                break;

      case 39: //right //down
      case 40:  if (!$('*').is(':animated')) {
                  $('body').stop().scrollTo(call_next_frame(), { duration: frame_durations[i-1], easing : 'swing' });
                  // console.log('Down i = ' + (i-1) + ' ' + frame_durations[i -1]);
                } else {
                  // console.log ('Down Scroll Stopped');
                  return;
                }
                break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  // $("html, body").bind({'mousewheel DOMMouseScroll onmousewheel touchmove scroll': 
  //   function(e) {
  //     if (e.target.id == 'el') return;
  //     e.preventDefault();
  //     e.stopPropagation();

  //     //Determine Direction
  //     if (e.originalEvent.wheelDelta && e.originalEvent.wheelDelta >= 0) {
  //       //Up
  //       if (!$('*').is(':animated')) {
  //         $('body').stop().scrollTo(call_prev_frame(), { duration: frame_durations[i], easing : 'swing' });
  //         // console.log(' Up i = ' + i + ' ' + frame_durations[i]);
  //       } else {
  //         // console.log ('Up Scroll Stopped');
  //         return;
  //       }

  //     } else if (e.originalEvent.detail && e.originalEvent.detail <= 0) {
  //       //Up
  //       if (!$('*').is(':animated')) {
  //         $('body').stop().scrollTo(call_prev_frame(), { duration: frame_durations[i], easing : 'swing' });
  //         // console.log(' Up i = ' + i + ' ' + frame_durations[i]);
  //       } else {
  //         // console.log ('Up Scroll Stopped 2');
  //         return;
  //       }

  //     } else {
  //       //Down
  //       if (!$('*').is(':animated')) {
  //         $('body').stop().scrollTo(call_next_frame(), { duration: frame_durations[i-1], easing : 'swing' });
  //         // console.log('Down i = ' + (i-1) + ' ' + frame_durations[i -1]);
  //       } else {
  //         // console.log ('Down Scroll Stopped');
  //         return;
  //       }
  //     }
  //   }
  // });
});
