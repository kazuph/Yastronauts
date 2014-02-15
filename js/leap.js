var myLeapBaseX = 0;
var myLeapBaseY = 0;
var count = 0;
var prevZ = 0;
Leap.loop(function(frame){
  count += 1;
  count %= 10;
  if (count != 1) return;
  if (frame.fingers[2]) {
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
      //console.log(nextDist);
    }
  } else if (frame.fingers[0]) {
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
  } else {
    myLeapBaseX = 0;
    myLeapBaseY = 0;
    count = 0;
  }
});
