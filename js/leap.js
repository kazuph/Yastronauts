var animation_flg = false;
var hide_flg = false;
var menu_count = 0;
var menu_th = 10;

var myLeapBaseX = 0;
var myLeapBaseY = 0;
var count = 0;
var prevZ = 0;
var baseY = 0;

var selected = 4;
var prev_selected = 4;
var base_selected = 4;
var th = 70;
select_num = 8;

function change_color(selected, prev_selected) {
  var new_id = "select_" + selected;
  var red = document.getElementById(new_id);
  red.style.backgroundColor = "fuchsia";
  red.style.color = "red";
  red.style.borderColor = "red";
  var old_id = "select_" + prev_selected;
  var blue = document.getElementById(old_id);
  blue.style.backgroundColor = "black";
  blue.style.color = "blue";
  blue.style.borderColor = "blue";
}

function toRed() {
  var id = "select_" + base_selected;
  var red = document.getElementById(id);
  red.style.backgroundColor = "fuchsia";
  red.style.color = "red";
  red.style.borderColor = "red";
}
function toBlue() {
  var id = "select_" + base_selected;
  var blue = document.getElementById(id);
  blue.style.backgroundColor = "black";
  blue.style.color = "blue";
  blue.style.borderColor = "blue";
}
function setAnimationFlg() {
  animation_flg = false;
  setMenuOpacity(0.5);
  hide_flg = true;
  setTimeout('hideMenu()', 3000);
}
function hideMenu() {
  if (hide_flg) {
    setMenuOpacity(0);
  }
}

function tenmetsu() {
  var bright_cnt = 5;
  for (var i=0; i<bright_cnt; ++i) {
    setTimeout('toBlue()', i*200); 
    setTimeout('toRed()', i*200+100); 
  }
  setTimeout('setAnimationFlg()', bright_cnt * 200);
}

function setMenuOpacity(op) {
  document.getElementById("selector_wrapper").style.opacity = op;
}

function baseSelectChange() {
  baseY = 0;
  if ( selected != base_selected ) {
    base_selected = selected;
  }
}

function selectFixed() {
  animation_flg = true;
  baseSelectChange();
  tenmetsu();
}

// mode definition
var MENU = 1;
var ROTATE = 2;
var ACCEL = 3;

var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame){
  count += 1;
  count %= 10;
  if (count != 1) return;
  var mode = 0;

  if (frame.gestures.length > 0) {
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];
      switch (gesture.type) {
      case "swipe":
        if (baseY != 0) {
          var x_direction = gesture.direction[0];
          var y_direction = gesture.direction[1];
          var z_direction = gesture.direction[2];
          if (y_direction > z_direction) {
            if (y_direction > x_direction) {
              mode = 1;
              break;
            }
          } else {
            // select action
            selectFixed();
          }
        }
        break;
      }
    }
  }
  if (mode == 0) {
    if (frame.fingers[4]) mode = ACCEL;
    else if (frame.fingers[2]) mode = ROTATE;
    else if (frame.fingers[0]) mode = MENU;
  }
  switch (mode) {
  case 3:
    if (prevZ = 0) {
      prevZ = frame.fingers[0].tipPosition[2];
    } else {
      var curDist = universe.getCurrentZoomDistance();
      var z = frame.fingers[0].tipPosition[2];
      var nextDist = curDist - (prevZ - z) * 50;
      if (nextDist > universe.getMaxZoomDistance()) {
        nextDist = universe.getMaxZoomDistance();
      } else if (nextDist < universe.getMinZoomDistance()) {
        nextDist = universe.getMinZoomDistance();
      }
      universe.setCurrentZoomDistance(nextDist);
      prevZ = z;
      console.log(nextDist);
    }
    menu_count -= 1;
    if (menu_count < 0) menu_count = 0;
    break;
  case 2:
    var x = frame.fingers[0].tipPosition[0];
    var y = frame.fingers[0].tipPosition[1];
    if (myLeapBaseX == 0 && myLeapBaseY == 0) {
      myLeapBaseX = x;
      myLeapBaseY = y;
    } else {
      var dist = universe.getCurrentZoomDistance();
      var zoomDamp = dist / (35000);
      universe.addRotationToCamera((x - myLeapBaseX) * 0.005 * zoomDamp, (y - myLeapBaseY) * 0.003 * zoomDamp);
    }
    //console.log("(" + x + "," + y + ")");
    menu_count -= 1;
    if (menu_count < 0) menu_count = 0;
    break;
  case 1:
    if (!animation_flg) {
      var y = frame.fingers[0].tipPosition[1];
      if (baseY == 0) {
        if ( menu_count > menu_th ) {
          hide_flg = false;
          toRed();
          baseY = y;
          prev_selected = base_selected;
          setMenuOpacity(1);
        } else {
          menu_count += 1;
        }
      } else {
        var select_dist = Math.round((baseY - y) / th);
        selected = base_selected + select_dist;
        if (selected < 0) selected = 0;
        else if (selected >= select_num) selected = select_num-1;

        if (selected != prev_selected) {
          change_color(selected, prev_selected);
          prev_selected = selected;
        }
      }
    }
    break;
  default:
    myLeapBaseX = 0;
    myLeapBaseY = 0;
    prevZ = 0;
    count = 0;
    menu_count = 0;
    if ( baseY != 0 ) {
      setMenuOpacity(0.5);
      baseSelectChange();
      hide_flg = true;
      setTimeout('hideMenu()', 3000);
    }
  }
});
