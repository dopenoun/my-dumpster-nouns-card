import * as THREE from 'https://cdn.skypack.dev/three@0.150.1';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.150.1/examples/jsm/controls/OrbitControls.js';

console.log("🚀 Dumpster Fire viewer initialized");
console.log("THREE loaded:", THREE);

// Scene
const scene = new THREE.Scene();
console.log("Scene created:", scene);

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;
console.log("Camera created:", camera);

// Get canvas element
const canvas = document.getElementById('cardCanvas');
console.log("Canvas element:", canvas);

if (!canvas) {
  console.error("❌ Canvas not found!");
}

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
console.log("Renderer created:", renderer);

// Lights
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
console.log("Lights added");

// Create fallback materials first
const fallbackMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
console.log("Fallback material created");

// Create card geometry and initial materials
const materials = [
  new THREE.MeshBasicMaterial({ color: 0x333333 }), // right
  new THREE.MeshBasicMaterial({ color: 0x333333 }), // left  
  new THREE.MeshBasicMaterial({ color: 0x333333 }), // top
  new THREE.MeshBasicMaterial({ color: 0x333333 }), // bottom
  fallbackMaterial, // front - will be replaced if texture loads
  fallbackMaterial  // back - will be replaced if texture loads
];

const geometry = new THREE.BoxGeometry(2.5, 3.5, 0.03);
const card = new THREE.Mesh(geometry, materials);
scene.add(card);
console.log("Card created and added to scene");

// Load textures after card is created
const loader = new THREE.TextureLoader();

// Front texture
loader.load(
  './textures/giselle_front.png',
  (texture) => {
    console.log("✅ Front texture loaded successfully");
    materials[4] = new THREE.MeshBasicMaterial({ map: texture });
    card.material = materials;
  },
  (progress) => {
    console.log("Front texture loading progress:", progress);
  },
  (error) => {
    console.error("❌ Front texture failed to load:", error);
    console.log("Using fallback material for front");
  }
);

// Back texture  
loader.load(
  './textures/giselle_back.png',
  (texture) => {
    console.log("✅ Back texture loaded successfully");
    materials[5] = new THREE.MeshBasicMaterial({ map: texture });
    card.material = materials;
  },
  (progress) => {
    console.log("Back texture loading progress:", progress);
  },
  (error) => {
    console.error("❌ Back texture failed to load:", error);
    console.log("Using fallback material for back");
  }
);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = false;
console.log("Controls created");

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate
let frameCount = 0;
function animate() {
  requestAnimationFrame(animate);
  
  if (frameCount % 60 === 0) { // Log every 60 frames
    console.log("Animation running, frame:", frameCount);
  }
  frameCount++;
  
  card.rotation.y += 0.002;
  controls.update();
  renderer.render(scene, camera);
}

console.log("Starting animation loop");
animate();

console.log("🔥 Setup complete - you should see a rotating card!");
