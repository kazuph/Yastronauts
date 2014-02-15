var universe = new UNIVERSE.Universe(new Date(), 30, document.getElementById("universe"));

var earthExtensions = new UNIVERSE.EarthExtensions(universe, false);

earthExtensions.addEarth("img/world3000.jpg", "img/earth_lights_lrg-dim.png");

earthExtensions.addMoon("img/moon_1024.jpg");

earthExtensions.addPlanet("img/moon_1024.jpg", {
    name: 'test',
    distance: 1000,
    radius: 8000
});

earthExtensions.addPlanet("img/world3000.jpg", {
    name: 'mars',
    distance: 3000,
    radius: 4000
});

earthExtensions.addPlanet("img/world3000.jpg", {
    name: 'hoge',
    distance: 5000,
    radius: 4000
});

earthExtensions.addSun();

var initialPosition = new UNIVERSE.ECICoordinates(
        -14213.99162,
        -39987.86471,
        -1115.314875,
    2.865601523,
        -1.007157587,
        -0.410247122
);

var date = new Date();
var epoch = new Date(date);

universe.addJsonGeometryModel("dsp", "models/DSP.json", function() {
    var spaceObject = new UNIVERSE.SpaceObject(
        "space_object_id",
        "space_object_name",
        "dsp",
        function(time, updateState) {
            time = new Date(universe.getCurrentUniverseTime());
            var elapsedTime = time - epoch;
            dt = 100;
            var location = OrbitPropagator.propagateOrbit(initialPosition, elapsedTime/1000, dt, epoch);
            //console.log(JSON.stringify(location));
            return location;
        },
        true,
        true,
        [],
        initialPosition,
        universe,
        earthExtensions
    );
    spaceObject.showVehicle = true;

    earthExtensions.addSpaceObject(spaceObject, function() {earthExtensions.showAllOrbitLines(true)});
});


universe.play(date, 500, undefined);

document.getElementById("universe").getElementsByTagName("canvas")[0].style.position = "";

console.log(universe.getCore().getCameraPosition());
console.log(CoordinateConversionTools.getMoonPositionECIAtCurrentTime(epoch));
moonPosition = CoordinateConversionTools.getMoonPositionECIAtCurrentTime(epoch);

function moveCamera(){
    console.log("moveCamera");
    universe.getCore().moveCameraTo(moonPosition);
}
