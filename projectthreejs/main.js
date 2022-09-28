import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//space ship 2

//space buttons

let button3 = document.getElementById("buttonExplore");
let button4 = document.getElementById("buttonExploreHide");
let button5 = document.getElementById("buttonExploreShow");
let button6 = document.getElementById("buttonExploreExit");

button4.onclick = function d() {
  x2.style.display = "none";
  x3.style.display = "grid";
  x4.style.display = "grid";
};

button5.onclick = function e() {
  x2.style.display = "grid";
  x3.style.display = "none";
};

button6.onclick = function f() {
  main.style.display = "grid";

  x2.style.display = "none";
  x3.style.display = "none";
  x4.style.display = "none";
};

//button2.onclick = function b() {
//camera.position.z = 300;
// button.innerText = "FOCUS ON Planet Earth";
//};
var x4 = document.getElementById("main4");
var x3 = document.getElementById("main3");
var x2 = document.getElementById("main2");
button3.onclick = function c() {
  x2.style.display = "grid";
  x4.style.display = "none";
  animate2 = stop;

  var x = document.getElementById("main");
  if (x.style.display === "none") {
    x.style.display = "grid";
  } else {
    x.style.display = "none";
  }
};

document.onkeydown = function (e) {
  if (e.keyCode === 32) {
    scene.rotation.y -= 0.000005;
    camera.position.z = +185;
    camera.position.setY(-3);
    camera.position.x = 0;
  } else if (e.keyCode === 65) {
    camera.position.x -= 1;
  } else if (e.keyCode === 68) {
    camera.position.x += 1;
  } else if (e.keyCode === 87) {
    camera.position.z -= 1;
  } else if (e.keyCode === 83) {
    camera.position.z += 1;
  } else if (e.keyCode === 96) {
    camera.position.y += 1;
  } else if (e.keyCode === 13) {
    camera.position.y -= 1;
  } else if (e.keyCode === 27) {
    main.style.display = "grid";
    button.innerText = "Focus on our home planet";
    x2.style.display = "none";
    x3.style.display = "none";
  }
};

const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.5,
  50000
);
camera.position.setY(-20);
camera.position.z = 300;
camera.position.x = +30;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("#bg"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

//Controls

//Saturn ring

const geometry = new THREE.TorusGeometry(10, 3, 2, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x812654999991,
});

const torus = new THREE.Mesh(geometry, material);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

const controls = new OrbitControls(camera, renderer.domElement);

function animate1() {
  requestAnimationFrame(animate1);
  scene.rotation.y += 0.00001;
  controls.update();

  renderer.render(scene, camera);
}
//animate1(scene);

window.requestAnimationFrame(animate1);

scene.add(torus);

//animate 2

function animate2() {
  requestAnimationFrame(animate2);
  camera.position.z += 0.2;
  camera.position.y += 0.2;
  camera.position.x -= 0.2;
  controls.update();

  renderer.render(scene, camera);
}
animate2(scene);

window.requestAnimationFrame(animate2);

//torus

torus.rotateX(-250);

torus.position.z = -350;
torus.position.setY(+13);
torus.position.setX(+160);

//Star
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 34, 34);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(100).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

//animate

//earth

const earthTexture = new THREE.TextureLoader().load("earth.jpg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),

  new THREE.MeshStandardMaterial({ map: earthTexture })
);

scene.add(earth);

earth.position.setY(-3);
earth.position.z = +150;

function earthAnimate() {
  requestAnimationFrame(earthAnimate);

  earth.rotation.y += 0.05;

  controls.update();

  renderer.render(scene, camera);
}

earthAnimate();

//Moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

scene.add(moon);

moon.position.z = +400;
moon.position.setY(-1);
moon.position.x = +20;

function moonAnimate() {
  requestAnimationFrame(moonAnimate);

  moon.rotation.y += 0.02;

  controls.update();

  renderer.render(scene, camera);
}

moonAnimate();

//sun
const sunTexture = new THREE.TextureLoader().load("sun.jpg");

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(50, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);

scene.add(sun);

function sunAnimate() {
  requestAnimationFrame(sunAnimate);

  sun.rotation.y -= 0.002;

  controls.update();

  renderer.render(scene, camera);
}

sunAnimate();

//saturn
const saturnTexture = new THREE.TextureLoader().load("texture sat.jpg");

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
  })
);

scene.add(saturn);
saturn.position.z = -350;
saturn.position.setY(+13);
saturn.position.setX(+160);

function saturnAnimate() {
  requestAnimationFrame(saturnAnimate);

  saturn.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

saturnAnimate();

//venus

const venusTexture = new THREE.TextureLoader().load("venus.jpg");

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(7, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
);

function venusAnimate() {
  requestAnimationFrame(venusAnimate);

  venus.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

venusAnimate();

scene.add(venus);

venus.position.z = -100;

//mercury

const mercuryTexture = new THREE.TextureLoader().load("mercury.png");

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
  })
);

function mercuryAnimate() {
  requestAnimationFrame(mercuryAnimate);

  mercury.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

mercuryAnimate();

scene.add(mercury);

mercury.position.z = 50;
mercury.position.setX(+50);

//mars

const marsTexture = new THREE.TextureLoader().load("mars.jpg");

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);

function marsAnimate() {
  requestAnimationFrame(marsAnimate);

  mars.rotation.y += 0.03;

  controls.update();

  renderer.render(scene, camera);
}

marsAnimate();

scene.add(mars);

mars.position.z = +153;

mars.position.setX(-50);

//jupiter

const jupiterTexture = new THREE.TextureLoader().load("jupiter.jpg");

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);

function jupiterAnimate() {
  requestAnimationFrame(jupiterAnimate);

  jupiter.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

jupiterAnimate();

scene.add(jupiter);

jupiter.position.z = -150;
jupiter.position.setY(+17);
jupiter.position.setX(-100);

//Uranus

const uranusTexture = new THREE.TextureLoader().load("uranus.jpg");

const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
  })
);

function uranusAnimate() {
  requestAnimationFrame(uranusAnimate);

  uranus.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

uranusAnimate();

scene.add(uranus);

uranus.position.z = 400;
uranus.position.y = -10;
uranus.position.setX(-250);
//neptune

const neptuneTexture = new THREE.TextureLoader().load("neptune.jpg");

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
);

function neptuneAnimate() {
  requestAnimationFrame(neptuneAnimate);

  neptune.rotation.y -= 0.01;

  controls.update();

  renderer.render(scene, camera);
}

neptuneAnimate();

scene.add(neptune);

neptune.position.z = +550;
neptune.position.x = -100;

//pluto

const plutoTexture = new THREE.TextureLoader().load("pluto.jpg");

const pluto = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: plutoTexture,
  })
);

function plutoAnimate() {
  requestAnimationFrame(plutoAnimate);

  pluto.rotation.y -= 0.01;

  controls.update();

  renderer.render(scene, camera);
}

plutoAnimate();

scene.add(pluto);

pluto.position.z = -1250;
pluto.position.setY(+35);
pluto.position.x = +500;

//satalite arm1
const playerTexture = new THREE.TextureLoader().load("solarpanel.jpg");

const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 3, 0),
  new THREE.MeshPhongMaterial({
    map: playerTexture,
  })
);
player.rotateX(-500);
player.rotateZ(-900.05);
player.position.set(2.5, 0, 0);
player.castShadow = true;
player.receiveShadow = true;

let player2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
player2.setFromObject(player);

scene.add(player);

//sat arm2

const satarmTexture = new THREE.TextureLoader().load("solarpanel.jpg");

const satarm = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 1, 0),
  new THREE.MeshPhongMaterial({
    map: satarmTexture,
  })
);
satarm.rotateX(-300);
satarm.rotateZ(-900.05);
satarm.position.set(0, +2, +160);
satarm.castShadow = true;
satarm.receiveShadow = true;

scene.add(satarm);

//main sat arm

const satarm2Texture = new THREE.TextureLoader().load("solarpanel.jpg");

const satarm2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 1, 0),
  new THREE.MeshPhongMaterial({
    map: satarm2Texture,
  })
);
satarm2.rotateX(-500);
satarm2.rotateZ(-900.05);
satarm2.position.set(0, -5, +143);
satarm2.castShadow = true;
satarm2.receiveShadow = true;

scene.add(satarm2);

//satarm 3

const satarm3Texture = new THREE.TextureLoader().load("solarpanel.jpg");

const satarm3 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 1, 0),
  new THREE.MeshPhongMaterial({
    map: satarm3Texture,
  })
);
satarm3.rotateY(-300);
satarm3.rotateX(-150);
satarm3.rotateZ(-900.05);
satarm3.position.set(+5, -5, +160);
satarm3.castShadow = true;
satarm3.receiveShadow = true;

scene.add(satarm3);

//playermain

//ball

//satelite ball 2

//satball 3

const ball3Texture = new THREE.TextureLoader().load("deathstar.jpg");

const ball3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.05),
  new THREE.MeshPhongMaterial({ map: ball3Texture })
);

ball3.position.set(+5, -5, +160);
ball3.castShadow = true;
ball3.receiveShadow = true;

let ball3BB = new THREE.Sphere(ball3.position, 1);

scene.add(ball3);

// animate balls and blocks

//check collisions

//animation block and balls

//ring

const ringTexture = new THREE.TextureLoader().load("saturn.jpg");

const ring = new THREE.Mesh(
  new THREE.TorusGeometry(70, 0.01, 2, 100),
  new THREE.MeshPhongMaterial({ map: ringTexture })
);

ring.position.z = 0;
ring.castShadow = true;
ring.receiveShadow = true;

ring.rotateX(-300);

ring.rotation.z -= 0.001;

controls.update();

renderer.render(scene, camera);

scene.add(ring);

//ring 2

const ring2Texture = new THREE.TextureLoader().load("saturn.jpg");

const ring2 = new THREE.Mesh(
  new THREE.TorusGeometry(100, 0.01, 2, 100),
  new THREE.MeshPhongMaterial({ map: ring2Texture })
);

ring2.position.z = 0;
ring2.castShadow = true;
ring2.receiveShadow = true;

ring2.rotateX(-300);

ring2.rotation.z += 0.001;

controls.update();

renderer.render(scene, camera);

scene.add(ring2);

//ring 4

const ring4Texture = new THREE.TextureLoader().load("saturn.jpg");

const ring4 = new THREE.Mesh(
  new THREE.TorusGeometry(160, 0.01, 2, 100),
  new THREE.MeshPhongMaterial({ map: ring4Texture })
);

ring4.position.setY(+5);
ring4.position.z = 0;
ring4.castShadow = true;
ring4.receiveShadow = true;

ring4.rotateX(-300);

ring4.rotation.z += 0.001;

controls.update();

renderer.render(scene, camera);

scene.add(ring4);

//ring3

const ring3Texture = new THREE.TextureLoader().load("saturn.jpg");

const ring3 = new THREE.Mesh(
  new THREE.TorusGeometry(150.5, 0.01, 2, 100),
  new THREE.MeshPhongMaterial({ map: ring3Texture })
);

ring3.position.z = 0;
ring3.castShadow = true;
ring3.receiveShadow = true;

ring3.rotateX(-300);

controls.update();

renderer.render(scene, camera);

scene.add(ring3);

//ring 5

const ring5Texture = new THREE.TextureLoader().load("saturn.jpg");

const ring5 = new THREE.Mesh(
  new THREE.TorusGeometry(180, 0.01, 2, 100),
  new THREE.MeshPhongMaterial({ map: ring5Texture })
);

ring5.position.setY(+13);
ring5.position.z = 0;

ring5.castShadow = true;
ring5.receiveShadow = true;

ring5.rotateX(-300);

controls.update();

renderer.render(scene, camera);

scene.add(ring5);

//ring 6

const ring6Texture = new THREE.TextureLoader().load("saturn.jpg");

const ring6 = new THREE.Mesh(
  new THREE.TorusGeometry(385, 0.01, 2, 100),
  new THREE.MeshPhongMaterial({ map: ring6Texture })
);

ring6.position.setY(5);
ring6.position.z = 0;

ring6.castShadow = true;
ring6.receiveShadow = true;

ring6.rotateX(-300);

controls.update();

renderer.render(scene, camera);

scene.add(ring6);

//ring 7

const ring7Texture = new THREE.TextureLoader().load("saturn.jpg");

const ring7 = new THREE.Mesh(
  new THREE.TorusGeometry(510, 0.01, 2, 100),
  new THREE.MeshPhongMaterial({ map: ring7Texture })
);

ring7.position.setY(+35);
ring7.position.z = 0;

ring7.castShadow = true;
ring7.receiveShadow = true;

ring7.rotateX(-300);

ring7.rotation.z += 0.001;

controls.update();

renderer.render(scene, camera);

scene.add(ring7);

//ring8

const ring8Texture = new THREE.TextureLoader().load("saturn.jpg");

const ring8 = new THREE.Mesh(
  new THREE.TorusGeometry(470, 0.01, 2, 100),
  new THREE.MeshPhongMaterial({ map: ring8Texture })
);

ring8.position.z = 0;

ring8.castShadow = true;
ring8.receiveShadow = true;

ring8.rotateX(-300);

ring8.rotation.z += 0.001;

controls.update();

renderer.render(scene, camera);

scene.add(ring8);

// ring 9

const ring9Texture = new THREE.TextureLoader().load("saturn.jpg");

const ring9 = new THREE.Mesh(
  new THREE.TorusGeometry(560, 0.01, 2, 100),
  new THREE.MeshPhongMaterial({ map: ring9Texture })
);

ring9.position.z = 0;
ring9.position.y = +13;

ring9.castShadow = true;
ring9.receiveShadow = true;

ring9.rotateX(-300);

ring9.rotation.z += 0.001;

controls.update();

renderer.render(scene, camera);

scene.add(ring9);
