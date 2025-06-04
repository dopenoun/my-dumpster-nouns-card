import * as THREE from 'https://cdn.skypack.dev/three@0.150.1';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.150.1/examples/jsm/controls/OrbitControls.js';

console.log("🚀 Dumpster Fire viewer initialized");

// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('cardCanvas'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lights
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

// Load textures
const loader = new THREE.TextureLoader();
const frontTexture = loader.load('./textures/giselle_front.png', tex => console.log("✅ Front loaded"));
const backTexture = loader.load('./textures/giselle_back.png', tex => console.log("✅ Back loaded"));

// Debug: pink if texture fails
const fallbackMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });

// Create card geometry and materials
const materials = [
  fallbackMaterial,
  fallbackMaterial,
  fallbackMaterial,
  fallbackMaterial,
  new THREE.MeshBasicMaterial({ map: frontTexture || null }),
  new THREE.MeshBasicMaterial({ map: backTexture || null })
];

const geometry = new THREE.BoxGeometry(2.5, 3.5, 0.03);
const card = new THREE.Mesh(geometry, materials);
scene.add(card);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

// Animate
function animate() {
  requestAnimationFrame(animate);
  card.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();
