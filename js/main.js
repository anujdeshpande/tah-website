$(document).ready(function() {
  if (!navigator.userAgent.match(/Mobi/)) {
    var i = 0;
    var frame_sections = [0, 1950, 8550, 12400, 18900, 29200, 30650, 31600];
    var frame_durations_fwd = [3000, 5000, 5000, 8000, 14000, 3000, 2000];
    var frame_durations_bkw = [1000, 1000, 1000, 1000, 1000, 1000, 1000];
    var current_frame = frame_sections[i];
    // console.log(current_frame);

    setTimeout(function(){
      if (i == 0) {
        if ($("#tah-device-landing").css("opacity") == 1) {
          $(".appstore-links").css("display", "none");
        } else {
          $(".appstore-links").css("display", "inline");
        }
      } else {
        $(".appstore-links").css("display", "inline");
      }
    }, 300);
    

    function call_next_frame() {
      var next_frame;
      if (i == frame_sections.length - 1) {
        next_frame = frame_sections[i];
        return next_frame;
      } else { 
        next_frame = frame_sections[++i];
        return next_frame;
      }
    }

    function call_prev_frame() {
      var prev_frame;
      if (i == 0) {
        prev_frame = frame_sections[i];
        return prev_frame;
      } else { 
        prev_frame = frame_sections[--i];
        return prev_frame;
      }
    }

    $("html, body").bind({"mousewheel DOMMouseScroll onmousewheel touchmove scroll": 
      function(e) {
        if (e.target.id == 'el') return;
        e.preventDefault();
        e.stopPropagation();

        //Determine Direction
        if (e.originalEvent.wheelDelta && e.originalEvent.wheelDelta >= 0) {
          // Up
          if (!$("*").is(":animated")) {
            $("html, body").stop().scrollTo(call_prev_frame(), { duration: frame_durations_bkw[i], easing : "swing" });
            console.log('i is ' + i);
            if (i != 0) {
              $(".appstore-links").css("display", "inline");
            } else {
              setTimeout(function(){
                $(".appstore-links").css("display", "none");
              }, 1000);
            }
          } else {
            // Up Scroll Stopped
            return;
          }

        } else if (e.originalEvent.detail && e.originalEvent.detail <= 0) {
          //Up
          if (!$("*").is(":animated")) {
            $("html, body").stop().scrollTo(call_prev_frame(), { duration: frame_durations_bkw[i], easing : "swing" });
            console.log('i is ' + i);
            if (i != 0) {
              $(".appstore-links").css("display", "inline");
            } else {
              setTimeout(function(){
                $(".appstore-links").css("display", "none");
              }, 1000);
            }
          } else {
            // Up Scroll Stopped 2
            return;
          }

        } else {
          //Down
          if (!$("*").is(":animated")) {
            $("html, body").stop().scrollTo(call_next_frame(), { duration: frame_durations_fwd[i-1], easing : "swing" });
            if (i != 0) {
              $(".appstore-links").css("display", "inline");
            } else {
              $(".appstore-links").css("display", "none");
            }
          } else {
            // Down Scroll Stopped
            return;
          }
        }
      }
    });

    $(document).keydown(function(e) {
      switch(e.which) {
          case 37: // left
          case 38: // up
                  if (!$("*").is(":animated")) {
                    $("html, body").stop().scrollTo(call_prev_frame(), { duration: frame_durations_bkw[i], easing : "swing" });
                    if (i != 0) {
                      $(".appstore-links").css("display", "inline");
                    } else {
                      setTimeout(function(){
                        $(".appstore-links").css("display", "none");
                      }, 1000);
                    }
                  } else {
                    return;
                  }
          break;

          case 39: // right
          case 40: // down
                  if (!$("*").is(":animated")) {
                    $("html, body").stop().scrollTo(call_next_frame(), { duration: frame_durations_fwd[i-1], easing : "swing" });
                    if (i != 0) {
                      $(".appstore-links").css("display", "inline");
                    } else {
                      $(".appstore-links").css("display", "none");
                    }
                  } else {
                    return;
                  }
          break;

          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    });
  }

  $('#nav-mobile').html($('#nav-main').html());
  $('#nav-trigger span').click(function(){
    if ($('nav#nav-mobile ul').hasClass('expanded')) {
      $('nav#nav-mobile ul.expanded').removeClass('expanded').slideUp(250);
      $('#logo').animate({top: '13%'}, 250);
      $('.cta-buy').animate({top: '13%'}, 250);
      $(this).removeClass('open');
    } else {
      $('nav#nav-mobile ul').addClass('expanded').slideDown(250);
      $('#logo').animate({top: '43%'}, 250);
      $('.cta-buy').animate({top: '43%'}, 250);
      $(this).addClass('open');
    }
  });
});