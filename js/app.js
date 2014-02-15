var universe = new UNIVERSE.Universe(new Date(), 30, document.getElementById("universe"));

var earthExtensions = new UNIVERSE.EarthExtensions(universe, false);

// earthExtensions.addEarth("img/world3000.jpg", "img/earth_lights_lrg-dim.png");
earthExtensions.addEarth("img/moon_1024.jpg");

// earthExtensions.addMoon("img/moon_1024.jpg");

earthExtensions.addPlanet("img/mercury_1024.jpg", {
    name: 'mercury',
    distance: 580,
    radius: 380
});

earthExtensions.addPlanet("img/moon_1024.jpg", {
    name: 'venus',
    distance: 1080,
    radius: 950
});

earthExtensions.addPlanet("img/world3000.jpg", {
    name: 'realearth',
    distance: 1500,
    radius: 1000
});

earthExtensions.addPlanet("img/mars_1024.jpg", {
    name: 'mars',
    distance: 2280,
    radius: 530
});

earthExtensions.addPlanet("img/jupiter_1024.jpg", {
    name: 'jupiter',
    distance: 7800,
    radius: 11200
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
