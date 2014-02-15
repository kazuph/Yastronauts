/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

Detector = {

    canvas : !! window.CanvasRenderingContext2D,
    webgl : ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
    workers : !! window.Worker,
    fileapi : window.File && window.FileReader && window.FileList && window.Blob,

    getWebGLErrorMessage : function () {

        var domElement = document.createElement( 'div' );

        domElement.style.fontFamily = 'monospace';
        domElement.style.fontSize = '13px';
        domElement.style.textAlign = 'center';
        domElement.style.background = '#eee';
        domElement.style.color = '#000';
        domElement.style.padding = '1em';
        domElement.style.width = '475px';
        domElement.style.margin = '5em auto 0';

        if ( ! this.webgl ) {

            domElement.innerHTML = window.WebGLRenderingContext ? [
                'Sorry, your graphics card doesn\'t support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>'
            ].join( '\n' ) : [
                'Sorry, your browser doesn\'t support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a><br/>',
                'Please try with',
                '<a href="http://www.google.com/chrome">Chrome</a>, ',
                '<a href="http://www.mozilla.com/en-US/firefox/new/">Firefox 4</a> or',
                '<a href="http://nightly.webkit.org/">Webkit Nightly (Mac)</a>'
            ].join( '\n' );

        }

        return domElement;

    },

    addGetWebGLMessage : function ( parameters ) {

        var parent, id, domElement;

        parameters = parameters || {};

        parent = parameters.parent !== undefined ? parameters.parent : document.body;
        id = parameters.id !== undefined ? parameters.id : 'oldie';

        domElement = Detector.getWebGLErrorMessage();
        domElement.id = id;

        parent.appendChild( domElement );

    }
};


/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
if ( !window.requestAnimationFrame ) {

    window.requestAnimationFrame = ( function() {

        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

                window.setTimeout( callback, 1000 / 60 );

            };

    } )();

}
/*
 Input.js is MIT-licensed software
 Copyright (c) 2011 Jon Buckley
 */

(function() {
    // Holds all of the physical device to USB enumeration mappings
    var keymapBlob = {
        '45e' : { /* Microsoft */
            '28e' : { /* Xbox 360 controller */
                'Mac' : {
                    'axes' : {
                        'Left_Stick_X': 0,
                        'Left_Stick_Y': 1,
                        'Right_Stick_X': 2,
                        'Right_Stick_Y': 3,
                        'Left_Trigger_2': [4, -1, 1],
                        'Right_Trigger_2': [5, -1, 1]
                    },
                    'buttons' : {
                        'A_Button': 0,
                        'B_Button': 1,
                        'X_Button': 2,
                        'Y_Button': 3,
                        'Left_Trigger_1': 4,
                        'Right_Trigger_1': 5,
                        'Left_Stick_Button': 6,
                        'Right_Stick_Button': 7,
                        'Start_Button': 8,
                        'Back_Button': 9,
                        'Home_Button': 10,
                        'Pad_Up': 11,
                        'Pad_Down': 12,
                        'Pad_Left': 13,
                        'Pad_Right': 14
                    }
                },
                "Win": {
                    "axes": {
                        "Left_Stick_X": 0,
                        "Left_Stick_Y": 1,
                        "Right_Stick_X": 3,
                        "Right_Stick_Y": 4,
                        "Pad_Left": [5, 0, -1],
                        "Pad_Right": [5, 0, 1],
                        "Pad_Up": [6, 0, -1],
                        "Pad_Down": [6, 0, 1],
                        "Left_Trigger_2": [2, 0, 1],
                        "Right_Trigger_2": [2, 0, -1]
                    },
                    "buttons": {
                        "A_Button": 0,
                        "B_Button": 1,
                        "X_Button": 2,
                        "Y_Button": 3,
                        "Left_Trigger_1": 4,
                        "Right_Trigger_1": 5,
                        "Back_Button": 6,
                        "Start_Button": 7,
                        "Left_Stick_Button": 8,
                        "Right_Stick_Button": 9
                    }
                }
            }
        },
        "54c": { /* Sony */
            "268": { /* PS3 Controller */
                "Mac": {
                    "axes": {
                        "Left_Stick_X": 0,
                        "Left_Stick_Y": 1,
                        "Right_Stick_X": 2,
                        "Right_Stick_Y": 3
                    },
                    "buttons": {
                        "Back_Button": 0,
                        "Left_Stick_Button": 1,
                        "Right_Stick_Button": 2,
                        "Start_Button": 3,
                        "Pad_Up": 4,
                        "Pad_Down": 6,
                        "Pad_Right": 5,
                        "Pad_Left": 7,
                        "Left_Trigger_2": 8,
                        "Right_Trigger_2": 9,
                        "Left_Trigger_1": 10,
                        "Right_Trigger_1": 11,
                        "Y_Button": 12,
                        "B_Button": 13,
                        "A_Button": 14,
                        "X_Button": 15,
                        "Home_Button": 16
                    }
                }
            }
        },
        "46d": { /* Logitech */
            "c242": { /* Chillstream */
                "Win": {
                    "axes": {
                        "Left_Stick_X": 0,
                        "Left_Stick_Y": 1,
                        "Right_Stick_Y": 4,
                        "Right_Stick_X": 3,
                        "Left_Trigger_2": [2, 0, 1],
                        "Right_Trigger_2": [2, -1, 0],
                        "Pad_Left": [5, -1, 0],
                        "Pad_Right": [5, 0, 1],
                        "Pad_Up": [6, -1, 0],
                        "Pad_Down": [6, 0, 1]
                    },
                    "buttons": {
                        "A_Button": 0,
                        "X_Button": 2,
                        "B_Button": 1,
                        "Y_Button": 3,
                        "Left_Trigger_1": 4,
                        "Right_Trigger_1": 5,
                        "Back_Button": 6,
                        "Start_Button": 7,
                        "Left_Stick_Button": 8,
                        "Right_Stick_Button": 9
                    }
                }
            },
            "c216": { /* Dual Action */
                "Mac": {
                    "axes": {
                        "Left_Stick_X": 1,
                        "Left_Stick_Y": 2,
                        "Right_Stick_X": 3,
                        "Right_Stick_Y": 4,
                        "Pad_Left": [1, 0, -1],
                        "Pad_Right": [1, 0, 1],
                        "Pad_Up": [2, 0, -1],
                        "Pad_Down": [2, 0, 1]
                    },
                    "buttons": {
                        "X_Button": 0,
                        "A_Button": 1,
                        "B_Button": 2,
                        "Y_Button": 3,
                        "Left_Trigger_1": 4,
                        "Right_Trigger_1": 5,
                        "Left_Trigger_2": 6,
                        "Right_Trigger_2": 7,
                        "Back_Button": 8,
                        "Start_Button": 9,
                        "Left_Stick_Button": 10,
                        "Right_Stick_Button": 11
                    }
                }
            }
        },
        "40b": {
            "6533": { /* USB 2A4K GamePad */
                "Mac": {
                    "axes": {
                        "Pad_Left": [0, 0, -1],
                        "Pad_Right": [0, 0, 1],
                        "Pad_Up": [1, 0, -1],
                        "Pad_Down": [1, 0, 1]
                    },
                    "buttons": {
                        "A_Button": 0,
                        "B_Button": 1,
                        "X_Button": 2,
                        "Y_Button": 3
                    }
                }
            }
        },
        "Firefox": {
            "Fake Gamepad": {
                "Mac": {
                    "axes": {

                    },
                    "buttons": {
                        'A_Button' : 0,
                        'B_Button' : 1,
                        'X_Button' : 2,
                        'Y_Button' : 3,
                        'Pad_Up' : 4,
                        'Pad_Down': 5,
                        'Pad_Left': 6,
                        'Pad_Right': 7
                    }
                }
            }
        }
    };

    // Our ideal gamepad that we present to the developer
    var ImaginaryGamepad = {
        'axes' : [
            'Left_Stick_X',
            'Left_Stick_Y',
            'Right_Stick_X',
            'Right_Stick_Y'
        ],
        'buttons' : [
            'A_Button',
            'B_Button',
            'X_Button',
            'Y_Button',
            'Left_Stick_Button',
            'Right_Stick_Button',
            'Start_Button',
            'Back_Button',
            'Home_Button',
            'Pad_Up',
            'Pad_Down',
            'Pad_Left',
            'Pad_Right',
            'Left_Trigger_1',
            'Right_Trigger_1',
            'Left_Trigger_2',
            'Right_Trigger_2'
        ]
    };

    var osList = ['Win', 'Mac', 'Linux'];
    function detectOS() {
        for (var i in osList) {
            if (navigator.platform.indexOf(osList[i]) !== -1) {
                return osList[i];
            }
        }
        return 'Unknown';
    }

    function map(value, istart, istop, ostart, ostop) {
        return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    };

    // Map imaginary device action to physical device action
    function mapAxisToAxis(device, keymap, axes, prop) {
        Object.defineProperty(axes, prop, {
            enumerable: true,
            get: function() { return device.axes[keymap.axes[prop]]; }
        });
    }

    function mapAxisToButton(device, keymap, axes, prop) {
        Object.defineProperty(axes, prop, {
            enumerable: true,
            get: function() { return 0; }
        });
    }

    function mapButtonToButton(device, keymap, buttons, prop) {
        Object.defineProperty(buttons, prop, {
            enumerable: true,
            get: function() { return device.buttons[keymap.buttons[prop]]; }
        });
    }

    function mapButtonToAxis(device, keymap, buttons, prop) {
        var transform = keymap.axes[prop] instanceof Array;

        Object.defineProperty(buttons, prop, {
            enumerable: true,
            get: function() {
                if (transform) {
                    return map(device.axes[keymap.axes[prop][0]], keymap.axes[prop][1], keymap.axes[prop][2], 0, 1);
                } else {
                    return device.axes[keymap.axes[prop]];
                }
            }
        });
    }

    function mapZero(type, prop) {
        Object.defineProperty(type, prop, {
            enumerable: true,
            get: function() { return 0; }
        });
    }

    var Input = window.Input = {};
    var Device = Input.Device = function(domGamepad) {
        if (!domGamepad) {
            throw "You didn't pass a valid gamepad to the constructor";
        }

        var device = domGamepad,
            usbVendor = domGamepad.id.split('-')[0],
            usbDevice = domGamepad.id.split('-')[1],
            os = detectOS(),
            keymap = keymapBlob,
            axes = this.axes = {},
            buttons = this.buttons = {};

        if (keymap && keymap[usbVendor] && keymap[usbVendor][usbDevice] && keymap[usbVendor][usbDevice][os]) {
            keymap = keymap[usbVendor][usbDevice][os];
        } else {
            throw "A physical device layout for " + usbVendor + "-" + usbDevice + "-" + os + " isn't available";
        }

        // Wire the axes and buttons up
        for (var a in ImaginaryGamepad.axes) {
            if (keymap.axes[ImaginaryGamepad.axes[a]] !== undefined) {
                mapAxisToAxis(device, keymap, axes, ImaginaryGamepad.axes[a]);
            } else if (keymap.buttons[ImaginaryGamepad.axes[a]] !== undefined) {
                mapAxisToButton(device, keymap, axes, ImaginaryGamepad.axes[a]);
            } else {
                mapZero(axes, ImaginaryGamepad.axes[a]);
            }
        }

        for (var b in ImaginaryGamepad.buttons) {
            if (keymap.buttons[ImaginaryGamepad.buttons[b]] !== undefined) {
                mapButtonToButton(device, keymap, buttons, ImaginaryGamepad.buttons[b]);
            } else if (keymap.axes[ImaginaryGamepad.buttons[b]] !== undefined) {
                mapButtonToAxis(device, keymap, buttons, ImaginaryGamepad.buttons[b]);
            } else {
                mapZero(buttons, ImaginaryGamepad.buttons[b]);
            }
        }

        // Add some useful properties from the DOMGamepad object
        Object.defineProperty(this, "connected", {
            enumerable: true,
            get: function() { return device.connected; }
        });

        Object.defineProperty(this, "id", {
            enumerable: true,
            get: function() { return device.id; }
        });

        Object.defineProperty(this, "index", {
            enumerable: true,
            get: function() { return device.index; }
        });
    };
}());
/*jslint browser: true, undef: true, sloppy: true */
/*global THREE */

var UNIVERSE = UNIVERSE || {};

UNIVERSE.Core3D = function (container) {
    var self = this,
        camera, // Variables used to draw the 3D elements
        scene,
        projector,
        renderer,
        w,
        h,
        vector,
        animate,
        light,
        overRenderer,
        curZoomSpeed = 0, // Constants for zooming, rotation, etc.
        goStar = 0,
        mouse = {
            x : 0,
            y : 0
        },
        mouseOnDown = {
            x : 0,
            y : 0
        },
        rotation = {
            x : 0,
            y : 0
        },
        target = {
            x : Math.PI * 3 / 2,
            y : Math.PI / 6.0
        },
        targetOnDown = {
            x : 0,
            y : 0
        },
        distance = 50000, // set initial distance
        PI_HALF = Math.PI / 2,
		    drawnObjects = [],
        resizeTimeout = null,
        gamepad, // the first gamepad connected to the browser
	      GAMEPAD_ZOOM_SCALING_FACTOR = 1500,
	      GAMEPAD_ZOOM_MIN_SENSITIVITY = 0.1,
	      GAMEPAD_CAMERA_ROTATION_MIN_SCALING_FACTOR = 0.05,
	      GAMEPAD_CAMERA_ROTATION_MAX_SCALING_FACTOR = 0.5,
	      GAMEPAD_CAMERA_ROTATION_DELTA =
	          GAMEPAD_CAMERA_ROTATION_MAX_SCALING_FACTOR - GAMEPAD_CAMERA_ROTATION_MIN_SCALING_FACTOR,
	      GAMEPAD_CAMERA_MIN_SENSITIVITY = 0.25,
	      //GAMEPAD_PAN_SCALING_FACTOR = 5000;
	      intersectionListeners = [];

    self.distanceTarget = 50000;
    self.destination = 'earth';

    this.maxZoom = 500000;
    this.minZoom = 7000;

    self.setDestination = function(name) {
        self.destination = name;
    };

    function setupRenderer() {
        projector = new THREE.Projector();
        renderer = new THREE.WebGLRenderer({
            antialias : true
        });
        renderer.autoClear = false;
        renderer.setClearColorHex(0x000000, 0.0);
        renderer.setSize(w, h);

        renderer.domElement.style.position = 'absolute';

        container.appendChild(renderer.domElement);
    }

    function addEventListeners() {
        // Add event listeners for rotating, zooming, etc.
        container.addEventListener('mousedown', onMouseDown, false);
        container.addEventListener('mousewheel', onMouseWheel, false);
        container.addEventListener('DOMMouseScroll', onMouseWheelFF, false);

        document.addEventListener('keydown', onDocumentKeyDown, false);

        window.addEventListener('resize', onWindowResize, false);

        container.addEventListener('mouseover', function () {
            overRenderer = true;
        }, false);

        container.addEventListener('mouseout', function () {
            overRenderer = false;
        }, false);

        window.addEventListener("MozGamepadConnected", connectGamepad);
        window.addEventListener("MozGamepadDiconnected", disconnectGamepad);
    }

    function init() {
        w = container.offsetWidth || window.innerWidth;
        h = container.offsetHeight || window.innerHeight;

        setupRenderer();

        // Field of View (View Angle)
        // Ratio between width and height, has to match aspect of CanvasRenderer
        // Near, Far
        camera = new THREE.PerspectiveCamera(30, w / h, 1, 1000000);
        self.camera = camera;  // XXX

        camera.position.z = distance;
        vector = new THREE.Vector3();

        // Scene into which the earth and other objects are displayed
        scene = new THREE.Scene();
        self.scene = scene;

        addEventListeners();

        light = new THREE.DirectionalLight(0xffffff, 0);
        light.position.set(0, 0, 0).normalize();
        scene.add(light);
        //
        // var ambientLight = new THREE.AmbientLight( 0x000000 );
        // scene.add(ambientLight);

        animate();
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        zoom(curZoomSpeed);

        rotation.x += (target.x - rotation.x) * 0.1;
        rotation.y += (target.y - rotation.y) * 0.1;
        // rotation.z += (target.z - rotation.z) * 0.1;
        distance += (self.distanceTarget - distance) * 0.3;

        if (goStar) {
            d = distanceXYZ(camera.position, scene.position);
            console.log(d);
            // TODO: 各星の半径 + α
            if (d < 10000) {
                target.position = camera.position;
                rotation.position = camera.position;
                goStar = 0;
            }
            // 近づいていく処理
            // if (window.universe) {
            //     scene.position = universe.core.getObjectPosition(self.destination);
            // }
            camera.position.x += (scene.position.x - camera.position.x) * 0.01;
            camera.position.y += (scene.position.y - camera.position.y) * 0.01;
            camera.position.z += (scene.position.z - camera.position.z) * 0.01;
        } else {
            // 原点(0, 0, 0) からの回転を見てしまっている？
            camera.position.x = distance * Math.sin(rotation.x) * Math.cos(rotation.y);
            camera.position.y = distance * Math.sin(rotation.y);
            camera.position.z = distance * Math.cos(rotation.x) * Math.cos(rotation.y);
        }

        camera.lookAt(scene.position);

        vector.copy(camera.position);

        scaleDrawnObjects();

        renderer.clear();
        renderer.render(scene, camera);
    }

    function scaleDrawnObjects() {
	      var i,
	          objectPosition,
	          distanceFromCamera,
	          scaleFactor;
        for (i in drawnObjects) {
            if (drawnObjects[i].scale === true) {
                objectPosition = drawnObjects[i].shape.position;
                distanceFromCamera = objectPosition.distanceTo(camera.position);
                scaleFactor = distanceFromCamera / (6371 * 7);
                drawnObjects[i].shape.scale.x = drawnObjects[i].shape.scale.y = drawnObjects[i].shape.scale.z = scaleFactor;
            }
        }
    }

    // Stock Behaviors like rotating and zooming
    function onMouseDown(event) {
        event.preventDefault();

        container.addEventListener('mousemove', onMouseMove, false);
        container.addEventListener('mouseup', onMouseUp, false);
        container.addEventListener('mouseout', onMouseOut, false);

        mouseOnDown.x = -event.clientX;
        mouseOnDown.y = event.clientY;

        targetOnDown.x = target.x;
        targetOnDown.y = target.y;

        container.style.cursor = 'move';
    }

    function onMouseMove(event) {
        mouse.x = -event.clientX;
        mouse.y = event.clientY;

        var zoomDamp = distance / (35000);

        target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
        target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

        target.y = target.y > PI_HALF ? PI_HALF : target.y;
        target.y = target.y < -PI_HALF ? -PI_HALF : target.y;
    }

    function onMouseUp(event) {
        event.preventDefault();

        container.removeEventListener('mousemove', onMouseMove, false);
        container.removeEventListener('mouseup', onMouseUp, false);
        container.removeEventListener('mouseout', onMouseOut, false);
        container.style.cursor = 'auto';

		    var mouseOnUp = {
			      x: -event.clientX,
            y: event.clientY
		    };

        // If this was a click without movement look for intersecting objects
        if (mouseOnUp.x === mouseOnDown.x && mouseOnUp.y === mouseOnDown.y) {

			      var mouseCoordinates = relMouseCoords(event);
			      // var vector = new THREE.Vector3( ( mouseCoordinates.x / w ) * 2 - 1, - ( mouseCoordinates.y / h ) * 2 + 1, 0.5 );
			      // console.log("vector: " + JSON.stringify(vector));
			      // console.log("camera: " + JSON.stringify(camera.position));
			      // projector.unprojectVector( vector, camera );
			      // console.log("vector after unproject: " + JSON.stringify(vector));
			      // 								console.log("vector subself: " + JSON.stringify(vector.subSelf( camera.position ).normalize()));
			      // 								console.log("w: " + w);
			      // 								console.log("X: " + mouseCoordinates.x);

			      // var raycaster = new THREE.Raycaster( camera.position, vector.subSelf( camera.position ).normalize() );

			      var mouse2D = new THREE.Vector3( ( mouseCoordinates.x / w ) * 2 - 1, - ( mouseCoordinates.y / h ) * 2 + 1, 0.5 );
			      var raycaster = projector.pickingRay( mouse2D.clone(), camera );

			      var intersects = raycaster.intersectObjects(scene.children);

			      if ( intersects.length > 0 ) {
				        notifyIntersectionListeners(intersects);
			      }
		    }
    }

    // This: http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
	  function relMouseCoords(event) {
		    if (event.offsetX !== undefined && event.offsetY !== undefined) { 
			      return {x: event.offsetX, y: event.offsetY}; 
		    }
	      var totalOffsetX = 0;
	      var totalOffsetY = 0;
	      var canvasX = 0;
	      var canvasY = 0;
	      var currentElement = this;

	      do{
	          totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
	          totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
	      }
	      while(currentElement = currentElement.offsetParent)

	      canvasX = event.pageX - totalOffsetX;
	      canvasY = event.pageY - totalOffsetY;

	      return {x:canvasX, y:canvasY}
	  }

	  function notifyIntersectionListeners(intersects) {
		    var i,
		        j,
		        intersectedObjects = [];

		    for (j = 0; j < intersects.length; j += 1) {
			      intersectedObjects.push(getObjectForShape(intersects[j]));
		    }

		    for (i = 0; i < intersectionListeners.length; i += 1) {
			      intersectionListeners[i](intersectedObjects);
		    }
	  }

	  this.addIntersectionListener = function (callback) {
		    intersectionListeners.push(callback);
	  }

    function onMouseOut() {
        container.removeEventListener('mousemove', onMouseMove, false);
        container.removeEventListener('mouseup', onMouseUp, false);
        container.removeEventListener('mouseout', onMouseOut, false);
    }

    function onMouseWheel(event) {
        event.preventDefault();
        if (overRenderer) {
            zoom(event.wheelDeltaY * (10));
        }
        return false;
    }

    function onMouseWheelFF(event) {
        event.preventDefault();
        if (overRenderer) {
            var delta = event.detail ? event.detail * (-120) : event.wheelDelta;
            zoom(delta * (10));
        }
        return false;
    }

    function onDocumentKeyDown(event) {
        switch (event.keyCode) {
        case 38:
            zoom(3200);
            event.preventDefault();
            break;
        case 40:
            zoom(-3200);
            event.preventDefault();
            break;
        }
    }

    function onWindowResize() {
        // so right now this event was fired when the entire window was resized,
        // but the individual dom elements haven't been resized yet. We will wait
        // a bit then execute the actual resize code so we can use the updated
        // element sizes.
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            resize();
        }, 250);
    }

    function resize() {
        w = container.offsetWidth || window.innerWidth;
        h = container.offsetHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }

    function zoom(delta) {
        self.distanceTarget -= delta;
        self.distanceTarget = self.distanceTarget > self.maxZoom ? self.maxZoom : self.distanceTarget;
        self.distanceTarget = self.distanceTarget < self.minZoom ? self.minZoom : self.distanceTarget;
    }

    // Priviledged Methods
    this.draw = function (id, shape, scale) {
        if (!drawnObjects[id]) {
            if (shape) {
                scene.add(shape);
            }
            drawnObjects[id] = {
                shape : shape,
                scale : scale
            };
        }
    };

    this.showObject = function (id, isShown) {
        // if object exists in drawnObjects then add back to scene
        if (drawnObjects[id]) {
            if (isShown) {
                //TODO: Fix so that multiple calls with true don't add the same object over and over'
                scene.add(drawnObjects[id].shape);
            } else {
                scene.remove(drawnObjects[id].shape);
            }
        }
    };

    this.removeObject = function (id) {
        if (drawnObjects[id]) {
            if (drawnObjects[id].shape) {
                scene.remove(drawnObjects[id].shape);
            }
            delete drawnObjects[id];
        }
    };

    this.removeAllObjects = function () {
        var i;
        for (i in drawnObjects) {
            if (drawnObjects[i].shape) {
                scene.remove(drawnObjects[i].shape);
            }
        }
        drawnObjects = [];
    };

    this.getObjectPosition = function (id) {
        var ret;
        if (drawnObjects[id] !== undefined && drawnObjects[id].shape !== undefined) {
	          ret = drawnObjects[id].shape.position;
        }
        return ret;
    };

    this.getObjects = function () {
        return drawnObjects;
    };

	function getObjectForShape(shape) {
		var i;
		for (i in drawnObjects) {
			if (drawnObjects[i].shape && drawnObjects[i].shape.id === shape.object.id) {
				return i;
			}
		}
	}

    function distanceXYZ(posi1, posi2) {
        x = posi1.x - posi2.x;
        y = posi1.y - posi2.y;
        z = posi1.z - posi2.z;
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    }

    this.toggleGoStar = function () {
        goStar = 1 - goStar;
        console.log(goStar);
    };

    this.lookAtStar = function (position_vector) {
        // console.log("moveCamera in universe");
        // console.log(position_vector);
        // camera.position = position_vector;
        // target.position = position_vector;
        // rotation = position_vector;
        // distance = 50000;
        scene.position = position_vector;
    };

    this.moveCameraTo = function (position_vector) {
        console.log("moveCamera in universe");

        // This method converts a position into the rotation coordinate system used to move the camera
        // The target.x parameter is the rotation angle from the positive Z axis
        // target.y is the rotation angle away from the z-x plane


        var cameraVector = new THREE.Vector3(),
            zAxisVector = new THREE.Vector3(0, 0, 1), // unit vector along the z axis
            yAxisVector = new THREE.Vector3(0, 1, 0), // unit vector along the y axis
            positionY0Vector = new THREE.Vector3(),
            y, // The angle between the positive y axis and the input position vector
            x; // the angle between the input vector projected on the z-x plane and the z-axis

        // copy so we don't stomp on the original
        cameraVector.copy(position_vector);

        // sets the distance from the center of the scene the camera will end up
        distanceTarget = cameraVector.length();

        // vector that removes the y component of the target vector for purpose of calculating the angle
        // between it the input position_vector and the y-z plane
        positionY0Vector.copy(cameraVector);

        // set the y to zero and normalize to unit length
        positionY0Vector.y = 0;
        positionY0Vector.normalize();

        //normalize the position_vector to unit length
        cameraVector.normalize();

        // calculates the angle between the positive y axis and the input position vector
        // then subtract this from 90 degrees to shift it to be from the z-x plane
        y = (Math.PI / 2) - Math.acos(yAxisVector.dot(cameraVector));

        // calculate the angle between the input vector projected on the z-x plane and the z-axis
        x = Math.acos(zAxisVector.dot(positionY0Vector));

        // since the above calculation will return between 0 and 180 degrees, invert it if we're in the
        // negative x direction
        if (positionY0Vector.x < 0) {
            x = -x;
        }

        // set it to zero if NaN
        target.y = isNaN(y) ? 0 : y;
        target.x = isNaN(x) ? 0 : x;
    };

    this.getCameraPosition = function () {
        return camera.position;
    };

    this.addRotationToCameraTarget = function (xRotation, yRotation) {
        if (xRotation) {
            target.x += xRotation;
        }

        if (yRotation) {
            target.y += yRotation;
        }
    };

    this.updateLight = function (position, intensity) {
        light.position = position;
        light.intensity = intensity;
    };

    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    }());

    // called to setup a gamepad
    function connectGamepad(e) {
        // get the connected gamepad
        gamepad = new Input.Device(e.gamepad);

        var iter = Object.keys(gamepad.axes),
            i;
        for (i in iter) {
            console.log("Axis [" + iter[i] + "] connected");
        }

        window.requestAnimFrame(updateGamepadStatus);
    }

    // called when a gamepad is disconnected
    function disconnectGamepad() {
    }

    function updateGamepadStatus() {

        // right stick

        // adjust the rotation scaling factor by how close we are to the earth.
        // when we are far away from the earth, we want to rotate faster than
        // when we are closer to the earth.
        var centerPoint = new THREE.Vector3(0, 0, 0),
            distanceFromEarth = centerPoint.distanceTo(camera.position),
            adjustedRotationScalingFactor = GAMEPAD_CAMERA_ROTATION_MIN_SCALING_FACTOR +
                ((distanceFromEarth / self.maxZoom) * GAMEPAD_CAMERA_ROTATION_DELTA),
            xRot = gamepad.axes.Right_Stick_X,
            yRot = gamepad.axes.Right_Stick_Y,
            zoomInAmount,
            zoomOutAmount;

        xRot = xRot > -GAMEPAD_CAMERA_MIN_SENSITIVITY && xRot < GAMEPAD_CAMERA_MIN_SENSITIVITY ?
            0 : xRot * adjustedRotationScalingFactor * -1;

        yRot = yRot > -GAMEPAD_CAMERA_MIN_SENSITIVITY && yRot < GAMEPAD_CAMERA_MIN_SENSITIVITY ?
            0 : yRot * adjustedRotationScalingFactor;

        self.addRotationToCameraTarget(xRot, yRot);

        // TODO: left stick
        /*
         var xPan = gamepad.axes["Left_Stick_X"];
         xPan = xPan > -GAMEPAD_CAMERA_MIN_SENSITIVITY && xPan < GAMEPAD_CAMERA_MIN_SENSITIVITY
         ? 0 : xPan * GAMEPAD_PAN_SCALING_FACTOR;

         var yPan = gamepad.axes["Left_Stick_Y"];
         yPan = yPan > -GAMEPAD_CAMERA_MIN_SENSITIVITY && yPan < GAMEPAD_CAMERA_MIN_SENSITIVITY
         ? 0 : yPan * GAMEPAD_PAN_SCALING_FACTOR;

         camera.position.x += xPan;
         camera.position.y += yPan;
         //console.log("cam: " + JSON.stringify(camera.position) + " mv " + xPan + ", " + yPan);
         */

        // zoom in / out
        zoomInAmount = gamepad.buttons.Right_Trigger_2;
        if (zoomInAmount > GAMEPAD_ZOOM_MIN_SENSITIVITY) {
            zoom(zoomInAmount * GAMEPAD_ZOOM_SCALING_FACTOR);
        }

        zoomOutAmount = gamepad.buttons.Left_Trigger_2;
        if (zoomOutAmount > GAMEPAD_ZOOM_MIN_SENSITIVITY) {
            zoom(zoomOutAmount * -GAMEPAD_ZOOM_SCALING_FACTOR);
        }

        // setup the callback
        window.requestAnimFrame(updateGamepadStatus);
    }

    init();

    return this;

};/*jslint browser: true, sloppy: true */
/*global UNIVERSE */

/** 
 A graphics object to be drawn in the Universe
 @constructor
 @param {string} id - Identifier for the object to be referenced later
 @param {function} updateFunction - A function(elapsedTime) that gets called each time the Universe time changes
 @param {function} drawFunction - A function that should call Universe.draw with the object's model
 @param {string} modelName - A name for the object if different than id.  Set to the id if not defined
 @param {Object} currentLocation
 */

UNIVERSE.GraphicsObject = function (id, modelName, currentLocation, updateFunction, drawFunction) {
    this.id = id;
    this.modelName = modelName || id;
    this.currentLocation = currentLocation;
    this.update = updateFunction;
    this.draw = drawFunction;
};

UNIVERSE.GraphicsObject.prototype = {
    constructor: UNIVERSE.GraphicsObject
};/*jslint browser: true, sloppy: true */
/*global THREE */

var UNIVERSE = UNIVERSE || {};

UNIVERSE.ObjectLibrary = function () {
    var objects = [],
        numberOfElements = 0;

    // adds a mesh object to the object library
    // id -> unique id of the object
    // url -> url used to retrieve the json of the model
    // material -> material to apply to the model's geometry
    this.addGeometryObjectFromUrl = function (id, url, callback) {
        // if we have already loaded an onject with this id, return
        if (objects[id]) {
            callback();
            return;
        }

        // Have to do this to avoid a race condition and avoid requesting it every time
        objects[id] = "loading";

        // use a JSON loader to load the mesh from JSON
        var jsonLoader = new THREE.JSONLoader();
        jsonLoader.load(
            url,
            function (geometry) {
                //var mesh = new THREE.Mesh(geometry, material);

                // add the object to our list of objects
                objects[id] = geometry;
                //numberOfElements++;
                //console.log("objects after add: " + JSON.stringify(objects));
                //console.log("numberOfElements after add: " + JSON.stringify(numberOfElements))

                // execute the callback
                callback();
            }
        );

    };

    // gets an object from the library based on the given id
    this.getObjectById = function (id, callback) {
        //console.log("number of elements: " + numberOfElements);
        var object = objects[id],
            objectLib;

        if (!object) {
            throw "Tried to retrieve object [" + id + "] from object library but didn't exist";
        } else if (object === "loading") {
            objectLib = this;
            setTimeout(function () {
                objectLib.getObjectById(id, callback);
            }, 1000);
        } else {
            callback(object);
        }
    };

    this.setObject = function (id, object) {
        objects[id] = object;
    };
};/*jslint browser: true, sloppy: true */
/*global THREE */
var UNIVERSE = UNIVERSE || {};

UNIVERSE.UniverseController = function (theRefreshRate) {
    var graphicsObjects = [],

        // Timeout that runs the animation, will be cleared when paused
        refreshTimeout,

        // number of milliseconds between calls to update() (frame rate / refresh rate)
        refreshRate = theRefreshRate || 30,

        // the last time we called update() in ms since jsDate epoch
        lastUpdateMs = 0;

    function update() {
        // determine how much time has elapsed since update has last been called
        var nowMs = (new Date()).getTime(),
            elapsedTime = nowMs - lastUpdateMs,
            i;
        // save now as the last time we've updated
        lastUpdateMs = nowMs;

        // causes terrible performance... only enable if needed for debugging!
        // logger.debug("now [" + nowMs + "] elapsed ms [" + elapsedTime + "]");
        // update and draw all graphics objects
        for (i in graphicsObjects) {
            graphicsObjects[i].update(elapsedTime);
            graphicsObjects[i].draw();
        }

        // call update() again in a certain number of milliseconds
        refreshTimeout = setTimeout(function () {
            update();
        }, refreshRate);
    }

    this.updateOnce = function () {
        var i;
        for (i in graphicsObjects) {
            graphicsObjects[i].update(null);
            graphicsObjects[i].draw();
        }
    };

    // id
    // objectName
    // updateFunction
    this.addGraphicsObject = function (graphicsObject) {
        graphicsObjects[graphicsObject.id] = graphicsObject;
        //this.updateOnce();
    };

    this.removeGraphicsObject = function (id) {
        delete graphicsObjects[id];
    };

    this.play = function () {
        // set our last update time to now since this is the first update
        lastUpdateMs = (new Date()).getTime();
        update();
    };

    this.pause = function () {
        clearTimeout(refreshTimeout);
    };

    this.removeAllGraphicsObjects = function () {
        graphicsObjects = [];
    };

    this.getGraphicsObjects = function () {
        return graphicsObjects;
    };

    this.getGraphicsObjectById = function (id) {
        return graphicsObjects[id];
    };
};/**
   Universe.js Classes
   */
var UNIVERSE = UNIVERSE || {};

/**
 A simple Universe for drawing 3D modeling and simulation using WebGL
 @constructor
 @param {Date} time - The current universe time
 @param {double} refreshRate - The refresh rate for the universe in milliseconds
 @param {DOMElement} container - the container where the Universe will be drawn
 */
UNIVERSE.Universe = function (time, refreshRate, container) {
    var controller = new UNIVERSE.UniverseController(refreshRate),
        core = new UNIVERSE.Core3D(container),
        objectLibrary = new UNIVERSE.ObjectLibrary(),
        currentUniverseTime = time,  // options
        playbackSpeed = 1,
        stateChangedCallback = function () {}, //function to call when we have a new state object
        timeBetweenStateUpdatesMs = 1000, // milliseconds between updating our state object that we broadcast to any listeners
        updateStateTimeout, // timeout for updating state
        universe = this;

    // OBJECT LIBRARY DEFAULTS

    objectLibrary.setObject("default_geometry", new THREE.Geometry());
    objectLibrary.setObject("default_material", new THREE.MeshBasicMaterial());

    // PRIVATE METHODS

    /**
     fires a state changed event to the callback
     @private
     */
    function fireStateChanged(state) {
        if (stateChangedCallback !== null) {
            stateChangedCallback(state);
        }
    }

    /**
     adds an object that updates the currentUniverseTime using the playback speed
     @private
     */
    function addSimStateObject() {
        controller.addGraphicsObject({
            id : "simState",
            objectName : "simState",
            update : function (elapsedTime) {
                if (elapsedTime !== null) {
                    currentUniverseTime.setTime(currentUniverseTime.getTime() + playbackSpeed * elapsedTime);
                }
            },
            draw : function () {
            }
        });
    }

    /**
     gets called at our state update interval and fires the state change callback
     @private
     */
    function updateState() {
        //create our state object and notify our listener
        var state = {
            currentUniverseTime: new Date(currentUniverseTime)
        };

        fireStateChanged(state);

        // call update() again in a certain number of milliseconds
        updateStateTimeout = setTimeout(function () {
            updateState();
        }, timeBetweenStateUpdatesMs);
    }

    // PROTECTED METHODS (API METHODS)
    this.getCore = function () {
        return core;
    };

    /**
     Start playback for the universe
     @public
     @param {date} startTime
     @param {double} newPlaybackSpeed
     @param {function} newStateChangedCallback
     */
    this.play = function (startTime, newPlaybackSpeed, newStateChangedCallback) {
        if (startTime) {
            currentUniverseTime = new Date(startTime);
        }
        if (newPlaybackSpeed) {
            playbackSpeed = newPlaybackSpeed;
        }

        if (newStateChangedCallback) {
            stateChangedCallback = newStateChangedCallback;
        }

        // update state our first time
        updateState();

        controller.play();
    };

    this.getMinZoomDistance = function () {
        return core.minZoom;
    };

    this.getMaxZoomDistance = function () {
        return core.maxZoom;
    };

    this.setCurrentZoomDistance = function (newDistanceTarget) {
        core.distanceTarget = newDistanceTarget;
    };

    this.getCurrentZoomDistance = function () {
        return core.distanceTarget;
    };

    /**
     Pause playback for the universe
     @public
     */
    this.pause = function () {
        clearTimeout(updateStateTimeout);
        controller.pause();
    };

    /**
     Set the playback speed for the Universe
     @public
     @param {Double} speed
     */
    this.setPlaybackSpeed = function (speed) {
        playbackSpeed = speed;
    };

    /**
     Set the current time of the Universe
     @public
     @param {Date} newUniverseTime
     */
    this.setCurrentUniverseTime = function (newUniverseTime) {
        currentUniverseTime = new Date(newUniverseTime);
        controller.updateOnce();
    };

    /**
     Get the current time of the Universe
     @public
     */
    this.getCurrentUniverseTime = function () {
        return currentUniverseTime;
    };

    /**
     Add a geometry to the universe with an ID and url to retrieve the model's geometry
     @public
     @param {string} modelId
     @param {string} modelUrl - URL for the THREE.js format geometry model
     @param {function} callback - callback function that gets called when the geometry is done loading
     */
    this.addJsonGeometryModel = function (modelId, modelUrl, callback) {
        if (modelId) {
            objectLibrary.addGeometryObjectFromUrl(modelId, modelUrl, callback);
        } else {
            callback();
        }
    };

    /**
     Add an object to the universe
     @public
     @param {UNIVERSE.GraphicsObject} object
     */
    this.addObject = function (object) {
        controller.addGraphicsObject(object);
    };

    /**
     Draws an object in the Universe
     @public
     @param {string} id - identifier for the object
     @param {THREE.Mesh} mesh - THREE.js mesh for the object
     @param {boolean} isScale - specifies whether the object should be scaled to always be the same as the camera moves
     */
    this.draw = function (id, mesh, isScale) {
        core.draw(id, mesh, isScale);
    };

    /**
     Removes an object from the Universe
     @public
     @param {string} id - identifier for the object
     */
    this.unDraw = function (id) {
        core.removeObject(id);
    };

    /**
     Add an object to the Universe.js object pipeline.
     This is useful for storing things that take up GPU memory like geometries so you can reuse them.
     @public
     @param {string} id - identifier for the object
     @param {Object} object - any object you want to store for later retrieval
     */
    this.setObjectInLibrary = function (id, object) {
        objectLibrary.setObject(id, object);
    };

    /**
     Retrieves an object from the Universe.js object pipeline
     @public
     @param {string} id - identifier for the object
     @param {function} callback - method to be called with the retrieved object
     */
    this.getObjectFromLibraryById = function (id, callback) {
        objectLibrary.getObjectById(id, callback);
    };

    /**
     Remove an object completely from the Universe
     @public
     @param {string} id - identifier for the object
     */
    this.removeObject = function (id) {
        controller.removeGraphicsObject(id);
        core.removeObject(id);
    };

    /**
     Snap the Universe's camera to be directly behind an object
     @public
     @param {string} id - identifier for the object
     */
    this.snapToObject = function (id) {
        // get the object's position and copy it into a vector
        var position = core.getObjectPosition(id),
            vector;
        if (position) {
            console.log("positon");
            console.log(positon);
            vector = new THREE.Vector3();
            vector.copy(position);

            // move the point the camera will be at out a bit so we are behind the object
            vector.multiplyScalar(1.4);

            // tell the core to move to the vector
            core.moveCameraTo(vector);
        } // else Object is not added to the core so don't do anything
    };

    this.addRotationToCamera = function (xRotation, yRotation) {
        core.addRotationToCameraTarget(xRotation, yRotation);
    };

    /**
     Remove all objects from the Universe
     @public
     */
    this.removeAll = function () {
        core.removeAllObjects();
        controller.removeAllGraphicsObjects();
    };

    /**
     Get all of the objects currently in the Universe
     @public
     */
    this.getGraphicsObjects = function () {
        return controller.getGraphicsObjects();
    };

    /**
     Get a graphics object by its id
     @public
     @param {string} id
     */
    this.getGraphicsObjectById = function (id) {
        return controller.getGraphicsObjectById(id);
    };

    /**
     @ignore
     */
    //    this.updateObject = function (id, propertyName, propertyValue) {
    // TODO: Implement or delete
    //    };

    this.updateOnce = function () {
        controller.updateOnce();
    };

    /**
     Toggle whether an object is visible in the Universe
     @public
     @param {string} id - identifier for the object
     @param {boolean} isEnabled - whether the object is visible or not
     */
    this.showObject = function (id, isEnabled) {
        core.showObject(id, isEnabled);
    };

    this.updateLight = function (x, y, z, intensity) {
        core.updateLight(new THREE.Vector3(x, y, z), intensity);
    };

    this.addIntersectionListener = function(callback) {
	      core.addIntersectionListener(callback);
    }

    /**
     Basic setup method, needs to be called after all objects are removed from the Universe
     @public
     */
    this.setup = function () {
        addSimStateObject();
    };

    this.core = core;

    this.setup();
};
