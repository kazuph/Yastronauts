var attachMethod = function(obj,name,method) {
  var wrap = function(a,f) {
    return function() { return f.apply(a,arguments); }
  };
  if (obj[name]) throw "conflict:"+name;
  obj[name] = wrap(obj,method);
  return obj;
}

function myKeyDown(event) {
  console.log(universe.getCurrentZoomDistance());
  var dist;
  switch (event.keyCode) {
  case 65:
    universe.pause();
    break;
  case 66:
    universe.play();
    break;
  case 67:
    console.log(universe.getCurrentZoomDistance());
    break;
  case 68:
    dist = universe.getCurrentZoomDistance() - 1000;
    if (dist > universe.getMinZoomDistance()) {
      universe.setCurrentZoomDistance(dist);
    }
    break;
  case 69:
    dist = universe.getCurrentZoomDistance() + 1000;
    if (dist < universe.getMaxZoomDistance()) {
      dist = universe.setCurrentZoomDistance(dist);
    }
    break;
  case 70:
    universe.addRotationToCamera(100,200);
    break;
  }
}

//attachMethod(UNIVERSE.Core3D,'resetpos',myKeyDown);

document.onkeydown = myKeyDown;
