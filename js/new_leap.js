var SWIPE_TH = 7;
var CIRCLE_TH = 15;
var Z_SWIPE_TH = 8;
var SWIPE_MAX = 10;
var CIRCLE_MAX = 20;
var Z_SWIPE_MAX = 8;
var flg = false;
var disable = false;

var swipe_left_cnt = 0;
var swipe_right_cnt = 0;
var swipe_forward_cnt = 0;
var circle_cnt = 0;

function reset_state() {
  swipe_left_cnt = 0;
  swipe_right_cnt = 0;
  swipe_forward_cnt = 0;
  circle_cnt = 0;
}
function ticket() {
  if (!disable) {
    var right = Math.floor(($(window).width() - $("#ticket").width()) / 2);  
    var leftover = Math.floor(right * 2 + 410);  
    $('#ticket').animate({
        right: right},300)
      .delay(1000).animate({
        right: leftover},300);
    disable = true;
  }
}
function circle_fnc() {
  reset_state();
  flg = true;
  console.log("circle");
  //ticket();
}
function swipe_forward_fnc() {
  reset_state();
  flg = true;
  console.log("swipe_forward");
  ticket();
}
function swipe_right_fnc() {
  reset_state();
  flg = true;
  console.log("swipe_right");
}
function swipe_left_fnc() {
  reset_state();
  flg = true;
  console.log("swipe_left");
}

var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame) {
  var gestureString = "";
  var circle_flg = false;
  var swipe = 0;
  var swipe_z = 0;
  if (frame.gestures.length > 0) {
    if (flg) return;
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];
      gestureString = "Gesture ID: " + gesture.id + ", "
                    + "type: " + gesture.type + ", "
                    + "state: " + gesture.state + ", "
                    + "duration: " + gesture.duration + " &micro;s, ";
      switch (gesture.type) {
        case "circle":
          if (circle_cnt >= CIRCLE_MAX) {
            circle_fnc();
          } else if ((gesture.state == "stop") && (circle_cnt >= CIRCLE_TH)) {
            circle_fnc();
          } else {
            circle_flg = true;
          }
          break;
        case "swipe":
          dir_x = gesture.direction[0];
          dir_y = gesture.direction[1];
          dir_z = gesture.direction[2];
          if (Math.abs(dir_x) > Math.abs(dir_y) && Math.abs(dir_x) > Math.abs(dir_z)) {
            if (dir_x < 0) { // move to left
              if (swipe_left_cnt > SWIPE_MAX) {
                swipe_left_fnc();
              } else if ((gesture.state == "stop") && (swipe_left_cnt > SWIPE_TH)) {
                swipe_left_fnc();
              } else {
                if (Math.abs(dir_x) > Math.abs(swipe)) {
                  swipe = dir_x;
                }
              }
            } else {
              if (swipe_right_cnt > SWIPE_MAX) {
                swipe_right_fnc();
              } else if ((gesture.state == "stop") && (swipe_right_cnt > SWIPE_TH)) {
                swipe_right_fnc();
              } else {
                if (Math.abs(dir_x) > Math.abs(swipe)) {
                  swipe = dir_x;
                }
              }
            }
          } else if (Math.abs(dir_z) > Math.abs(dir_y) && Math.abs(dir_z) > Math.abs(dir_x)) {
            if (swipe_forward_cnt > Z_SWIPE_MAX) {
              swipe_forward_fnc();
            } else if ((gesture.state == "stop") && (swipe_forward_cnt > Z_SWIPE_TH)) {
              swipe_forward_fnc();
            } else {
              if (Math.abs(swipe_z) < Math.abs(dir_z)) {
                swipe_z = dir_z;
              }
            }
          }
          break;
        default:
      }

      if (circle_flg) {
        circle_cnt+=1;
      } else {
        circle_cnt -= 1;
        if (circle_cnt < 0) circle_cnt = 0;
      }
      if (Math.abs(swipe_z) > Math.abs(swipe)) {
        swipe_forward_cnt += 1;
        swipe_left_cnt -= 1;
        if (swipe_left_cnt < 0) swipe_left_cnt = 0;
        swipe_right_cnt -= 1;
        if (swipe_right_cnt < 0) swipe_right_cnt = 0;
      } else {
        if (swipe > 0) {
          swipe_right_cnt += 1;
          swipe_left_cnt -= 1;
          if (swipe_left_cnt < 0) swipe_left_cnt = 0;
          swipe_forward_cnt -= 1;
          if (swipe_forward_cnt < 0) swipe_forward_cnt = 0;
        } else if (swipe < 0) {
          swipe_left_cnt += 1;
          swipe_right_cnt -= 1;
          if (swipe_right_cnt < 0) swipe_right_cnt = 0;
          swipe_forward_cnt -= 1;
          if (swipe_forward_cnt < 0) swipe_forward_cnt = 0;
        }
      }
    }
  } else {
    swipe_left_cnt -= 1;
    if (swipe_left_cnt < 0) swipe_left_cnt = 0;
    swipe_right_cnt -= 1;
    if (swipe_right_cnt < 0) swipe_right_cnt = 0;
    swipe_forward_cnt -= 1;
    if (swipe_forward_cnt < 0) swipe_forward_cnt = 0;
    circle_cnt -= 1;
    if (circle_cnt < 0) circle_cnt = 0;
    flg = false;
  }
});
