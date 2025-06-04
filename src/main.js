import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('cardCanvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lighting
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Load front/back textures
const loader = new THREE.TextureLoader();
const frontTexture = loader.load('/textures/giselle_front.png');
const backTexture = loader.load('/textures/giselle_back.png');

// Card material
const materials = [
  new THREE.MeshBasicMaterial({ color: 0x000000 }), // right
  new THREE.MeshBasicMaterial({ color: 0x000000 }), // left
  new THREE.MeshBasicMaterial({ color: 0x000000 }), // top
  new THREE.MeshBasicMaterial({ color: 0x000000 }), // bottom
  new THREE.MeshBasicMaterial({ map: frontTexture }), // front
  new THREE.MeshBasicMaterial({ map: backTexture }),  // back
];

// Card geometry (like a trading card)
const geometry = new THREE.BoxGeometry(2.5, 3.5, 0.03);
const card = new THREE.Mesh(geometry, materials);
scene.add(card);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

// Render loop
function animate() {
  requestAnimationFrame(animate);
  card.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();
