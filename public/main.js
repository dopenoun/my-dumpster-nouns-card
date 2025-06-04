
import * as THREE from 'https://cdn.skypack.dev/three@0.150.1';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.150.1/examples/jsm/controls/OrbitControls.js';

console.log("🚀 Dumpster Fire viewer initialized");

// ... rest of your working Three.js setup ...
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('cardCanvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const loader = new THREE.TextureLoader();
const frontTexture = loader.load('./textures/giselle_front.png');
const backTexture = loader.load('./textures/giselle_back.png');

const materials = [
  new THREE.MeshBasicMaterial({ color: 0x000000 }),
  new THREE.MeshBasicMaterial({ color: 0x000000 }),
  new THREE.MeshBasicMaterial({ color: 0x000000 }),
  new THREE.MeshBasicMaterial({ color: 0x000000 }),
  new THREE.MeshBasicMaterial({ map: frontTexture }),
  new THREE.MeshBasicMaterial({ map: backTexture })
];

const geometry = new THREE.BoxGeometry(2.5, 3.5, 0.03);
const card = new THREE.Mesh(geometry, materials);
scene.add(card);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

function animate() {
  requestAnimationFrame(animate);
  card.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();
