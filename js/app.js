var universe = new UNIVERSE.Universe(new Date(), 30, document.getElementById("universe"));

var earthExtensions = new UNIVERSE.EarthExtensions(universe, false);

// earthExtensions.addEarth("img/world3000.jpg", "img/earth_lights_lrg-dim.png");
earthExtensions.addEarth("img/sun_1024.jpg", "img/sun_1024.jpg");

// earthExtensions.addMoon("img/moon_1024.jpg");

earthExtensions.addPlanet("img/mercury_1024.jpg", {
    name: 'mercury',
    distance: 580,
    radius: 380,
    speed: 0.00098
});
earthExtensions.addPlanet("img/venus_1024.jpg", {
    name: 'venus',
    distance: 1080,
    radius: 950,
    speed: 0.00103
});

earthExtensions.addPlanet("img/world3000.jpg", {
    name: 'realearth',
    distance: 1500,
    radius: 1000,
    speed: 0.001
});

earthExtensions.addPlanet("img/mars_1024.jpg", {
    name: 'mars',
    distance: 2280,
    radius: 530,
    speed: 0.00099
});

earthExtensions.addPlanet("img/jupiter_1024.jpg", {
    name: 'jupiter',
    distance: 7800,
    radius: 11200,
    speed: 0.00108
});

earthExtensions.addPlanet("img/saturn_1024.jpg", {
    name: 'saturn',
    distance: 14300,
    radius: 9400,
    speed: 0.00104
});

earthExtensions.addPlanet("img/uranus_1024.jpg", {
    name: 'uranus',
    distance: 28800,
    radius: 4000,
    speed: 0.00099
});

earthExtensions.addPlanet("img/neptune_1024.jpg", {
    name: 'neptune',
    distance: 45000,
    radius: 3900,
    speed: 0.00101
});

earthExtensions.addPlanet("img/pluto_1024.jpg", {
    name: 'pluto',
    distance: 59000,
    radius: 1800,  // x10 size :)
    speed: 0.001
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

var starList = [
    'earth',
    'mercury',
    'venus',
    'realearth',
    'mars',
    'jupiter',
    'saturn',
    'uranus',
    'neptune',
    'pluto'
];

var selectedStarNum = 3; // 初期値は地球
universe.core.setDestination(starList[selectedStarNum]);


// 出発
function go() {
    universe.core.camera.position = universe.core.getObjectPosition('realearth');
    universe.core.toggleGoStar();
    $('#planet_info').hide();
}

// 次の星
function nextStar() {
    selectedStarNum = (selectedStarNum + 1) % starList.length;
    universe.core.setDestination(starList[selectedStarNum]);
    $('#planet_info').hide();
}

// 前の星
function prevStar() {
    selectedStarNum--;
    if (selectedStarNum < 0) {
        selectedStarNum += starList.length;
    }
    universe.core.setDestination(starList[selectedStarNum]);
    $('#planet_info').hide();
}

$(document).on('select:done', function() {
    new Audio('sound/picopicon.ogg').play();  // 効果音: 魔王魂
    $('#planet_info').fadeIn('fast').find('.text').text({
        earth: 'SUN',
        mercury: 'MERCURY',
        venus: 'VENUS',
        realearth: 'EARTH',
        mars: 'MARS',
        jupiter: 'JUPITER',
        saturn: 'SATURN',
        uranus: 'URANUS',
        neptune: 'NEPTUNE',
        pluto: 'PLUTO'
    }[starList[selectedStarNum]]);
});

function speedUp() { universe.core.camera.velocity = 0.05; }
function speedDown() { universe.core.camera.velocity = 0.005; }

var starList = [
    'earth',
    'mercury',
    'venus',
    'realearth',
    'mars',
    'jupiter',
    'saturn',
    'uranus',
    'neptune',
    'pluto'
];

console.log(universe.core.getObjectPosition(starList[0]));
console.log(universe.core.getObjectPosition(starList[9]));
