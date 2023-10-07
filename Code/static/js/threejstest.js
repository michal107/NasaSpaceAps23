import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.127.0/build/three.module.js";

import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";

import {GUI} from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/libs/dat.gui.module.js";

//Renderer Elements
var ctx = document.body.appendChild(document.createElement('canvas')).getContext('2d'),
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

const loader = new THREE.TextureLoader();

document.body.appendChild(renderer.domElement);
renderer.domElement.style.position =
ctx.canvas.style.position = 'fixed';
ctx.canvas.style.background = 'black';

function resize() {
  var ratio = 16 / 9,
    preHeight = window.innerWidth / ratio;

  if (preHeight <= window.innerHeight) {
    renderer.setSize(window.innerWidth, preHeight);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = preHeight;
  } else {
    var newWidth = Math.floor(window.innerWidth - (preHeight - window.innerHeight) * ratio);
    newWidth -= newWidth % 2 !== 0 ? 1 : 0;
    renderer.setSize(newWidth, newWidth / ratio);
    ctx.canvas.width = newWidth;
    ctx.canvas.height = newWidth / ratio;
  }

  renderer.domElement.style.width = '';
  renderer.domElement.style.height = '';
  renderer.domElement.style.left = ctx.canvas.style.left = (window.innerWidth - renderer.domElement.width) / 2 + 'px';
  renderer.domElement.style.top = ctx.canvas.style.top = (window.innerHeight - renderer.domElement.height) / 2 + 'px';
}

window.addEventListener('resize', resize);

resize();

//Scene and Camera
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  20, // Field of view
  16 / 9, // Aspect ratio
  0.1, // Near plane
  10000 // Far plane
);

camera.position.set(700, 235, 0);

var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 1;

//Objects
var map = loader.load('https://solartextures.b-cdn.net/2k_sun.jpg'),
star = new THREE.Mesh(new THREE.SphereBufferGeometry(20, 50, 50), new THREE.MeshBasicMaterial({map}));
// glows = [];

star.castShadow = false;
scene.add(star);

var map = loader.load('https://upload.wikimedia.org/wikipedia/commons/8/85/Solarsystemscope_texture_8k_stars_milky_way.jpg'),
bgSphere = new THREE.Mesh(new THREE.SphereBufferGeometry( 3000, 32, 32).scale( -1, 1, 1),new THREE.MeshBasicMaterial({map}));
bgSphere.castShadow = false;

scene.add(bgSphere);

var gui = new GUI(  );
// gui.domElement.id = 'gui';

let missionDate = {
    timeElapsed: new Date().getTime(),
    timeSpeed: 1.0
};

var buttonPause = { Pause:function(){ missionDate.timeSpeed = 0 }};
var buttonSpeed1 = { Speed1:function(){ missionDate.timeSpeed = 1 }};
var buttonSpeed2 = { Speed2:function(){ missionDate.timeSpeed = 2 }};
// var buttonSpeed3 = { Speed3:function(){ missionDate.timeSpeed = 4 }};
// var buttonSpeed4 = { Speed4:function(){ missionDate.timeSpeed = 8 }};
// var buttonSpeed5 = { Speed5:function(){ missionDate.timeSpeed = 16 }};

var dataObject = {
    message: new Date(missionDate.timeElapsed).toString()
};

gui.add(dataObject, "message").name("Date:").listen();

gui.add(missionDate, 'timeElapsed', new Date().getTime(), new Date().getTime()+631138519494).name("Time Control").listen();

// gui.add(missionDate, 'timeSpeed', 0, 16).name("Predkosc");

gui.add(buttonPause, 'Pause');
gui.add(buttonSpeed1,'Speed1');
gui.add(buttonSpeed2,'Speed2');
// gui.add(buttonSpeed3,'Speed3');
// gui.add(buttonSpeed4,'Speed4');
// gui.add(buttonSpeed5,'Speed5');

var planetColors = [
    0x333333, //grey
    0x993333, //ruddy
    0xAA8239, //tan
    0x2D4671, //blue
    0x599532, //green
    0x267257 //bluegreen
  ],
  planets = [
    
  ];

  const planet_names = [
    "mercury",
    "venus_atmosphere",
    "earth_daymap",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune"
  ];

  const planet_radius = [
    10, 20, 22, 12, 60, 45, 30, 28
  ];

  const planet_orbit_radius = [
    38,72,100,152,520,953,1919,3006
  ]

  const planet_resolution = 0.75;
  const planet_resolution_additive = 4;

  const planet_orbit_radius_scale = 0.1;

for (var p = 0; p < 8; p++) {
    var map = loader.load('https://solartextures.b-cdn.net/2k_'+planet_names[p]+'.jpg'),
    planetGeom = new THREE.Mesh(new THREE.SphereBufferGeometry(Math.floor(planet_radius[p]*0.1), Math.floor(planet_radius[p]*planet_resolution)+planet_resolution_additive, Math.floor(planet_radius[p]*planet_resolution)+planet_resolution_additive), new THREE.MeshBasicMaterial({map})),
    planet = new THREE.Object3D();

    planet.add(planetGeom);

    //TODO
    // var atmoGeom = new THREE.Mesh(
    // new THREE.SphereBufferGeometry(1, 32.5, 32.5),
    // new THREE.MeshLambertMaterial({
    //     color: planetColors[3],
    //     shading: THREE.FlatShading,
    //     transparent: true,
    //     opacity: 0.5
    //   })
    // );

    // atmoGeom.castShadow = false;
    // planet.add(atmoGeom);

    //TODO
    planet.orbitRadius = planet_orbit_radius[p];
    planet.rotSpeed = 0.005 + Math.random() * 0.01;
    // planet.rotSpeed *= Math.random() < .10 ? -1 : 1;
    planet.rot = Math.random();
    planet.orbitSpeed = (0.02 - p * 0.0048) * 0.25;
    // planet.orbit = Math.random() * Math.PI * 2;
    planet.orbit = Math.PI * 2;
    planet.position.set(planet.orbitRadius, 0, 0);

    let pts = new THREE.Path().absarc(0, 0, planet.orbitRadius, 0, Math.PI * 2).getPoints(90);
    let g = new THREE.BufferGeometry().setFromPoints(pts);
    g.rotateX(Math.PI * 0.5);   
    let m = new THREE.LineBasicMaterial( { color: 0xffff00, transparent: true, opacity: 0.75 } );
    let orbit = new THREE.Line(g, m);
    orbit.rotation.x = planet.orbit;

    let pg = new THREE.SphereGeometry(20, 5, 2);
    let pm = new THREE.MeshLambertMaterial({color: "aqua"});
    let pl = new THREE.Mesh(pg, pm);
    pl.rotation.order = "ZYX";

    orbit.add(pl);
    scene.add(orbit);
    planets.push(planet);
    scene.add(planet);
}

//Lights
var light1 = new THREE.PointLight(0xFDDA0D, 2, 0, 0);

light1.position.set(0, 0, 0);
scene.add(light1);

var light2 = new THREE.AmbientLight(0x090909);
scene.add(light2);

let clock = new THREE.Clock();

//Main Loop
function animate() {
//   stats.begin();

  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.25)';

  missionDate.timeElapsed += missionDate.timeSpeed;
  dataObject.message = new Date(missionDate.timeElapsed).toString();

  for (var p in planets) {
    var planet = planets[p];
    planet.rot = planet.rotSpeed*missionDate.timeElapsed;
    planet.rotation.set(0, planet.rot, 0);
    planet.orbit = planet.orbitSpeed*missionDate.timeElapsed;
    planet.position.set(Math.cos(planet.orbit) * planet.orbitRadius, 0, Math.sin(planet.orbit) * planet.orbitRadius);
  }
  
  star.rotation.set(0, missionDate.timeElapsed*0.1, 0);
  
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}
animate();