import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";

export function mountSculpture(stage: HTMLDivElement) {
  const mobile = window.matchMedia("(max-width: 48rem)");
  const radius = 1.55;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
  renderer.setPixelRatio(pixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const room = new RoomEnvironment();
  const generator = new THREE.PMREMGenerator(renderer);
  const environment = generator.fromScene(room, 0.015);
  room.dispose();
  generator.dispose();
  scene.environment = environment.texture;
  const camera = new THREE.PerspectiveCamera(36, 1, 0.5, 30);
  const sphere = new THREE.SphereGeometry(radius, 72, 48);
  sphere.deleteAttribute("uv");
  sphere.deleteAttribute("normal");
  const geometry = mergeVertices(sphere);
  sphere.dispose();
  const positions = geometry.getAttribute("position") as THREE.BufferAttribute;
  const original = positions.clone();
  positions.setUsage(THREE.DynamicDrawUsage);
  const material = new THREE.MeshPhysicalMaterial({
    metalness: 0.24,
    roughness: 0.16,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    iridescence: 0.42,
    envMapIntensity: 1.35,
  });
  const droplet = new THREE.Mesh(geometry, material);
  scene.add(droplet);
  let previousTime: number | undefined;
  let seconds = 0;

  function resize() {
    const stageWidth = Math.max(1, stage.clientWidth);
    const stageHeight = Math.max(1, stage.clientHeight);
    camera.aspect = stageWidth / stageHeight;
    camera.position.z = 7.85 * Math.max(1, 1.06 / camera.aspect);
    const horizontalSlope = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
    const edgeSlope = 0.98 * horizontalSlope;
    // Leave room for the water ripples at the right edge of the perspective view.
    const outerRadius = radius * 1.104;
    droplet.position.x = mobile.matches
      ? 0
      : edgeSlope * camera.position.z - outerRadius * Math.hypot(1, edgeSlope);
    const horizontalOffset = droplet.position.x / (camera.position.z * horizontalSlope);
    stage.style.setProperty("--shadow-offset", `${horizontalOffset * stageWidth / 2}px`);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    renderer.setSize(stageWidth, stageHeight, false);
  }

  function draw(time: number) {
    const delta = previousTime === undefined ? 0 : THREE.MathUtils.clamp((time - previousTime) / 1000, 0, 0.05);
    previousTime = time;
    seconds += delta;
    for (let i = 0; i < positions.count; i++) {
      const x = original.getX(i);
      const y = original.getY(i);
      const z = original.getZ(i);
      const wave =
        0.052 * Math.sin(3.1 * x + 2.7 * y + 1.8 * z - seconds * 2.1) +
        0.034 * Math.sin(4.8 * z - 3.4 * y + seconds * 2.7) +
        0.018 * Math.sin(7 * y + 3.2 * x - seconds * 3.2);
      positions.setXYZ(i, x * (1 + wave), y * (1 + wave), z * (1 + wave));
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    droplet.rotation.set(0.2 + seconds * 0.1, seconds * 0.38, -0.16);
    material.color.setHSL((0.55 + seconds * 0.048) % 1, 0.68, 0.58);
    const lift = (Math.sin(seconds * 1.45) + 1) * 0.5;
    droplet.position.y = 0.12 + lift * 0.15;
    stage.style.setProperty("--shadow-opacity", (0.97 - lift * 0.34).toFixed(3));
    stage.style.setProperty("--shadow-scale", (0.88 + lift * 0.24).toFixed(3));
    renderer.render(scene, camera);
  }

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (stage.dataset.ready) draw(performance.now());
  });
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    previousTime = undefined;
    renderer.setAnimationLoop(entry.isIntersecting && stage.dataset.ready ? draw : null);
  });

  function contextLost() {
    delete stage.dataset.ready;
    renderer.setAnimationLoop(null);
  }

  resize();
  stage.append(renderer.domElement);
  draw(performance.now());
  stage.dataset.ready = "true";
  resizeObserver.observe(stage);
  mobile.addEventListener("change", resize);
  visibilityObserver.observe(stage);
  renderer.domElement.addEventListener("webglcontextlost", contextLost);

  return () => {
    stage.style.removeProperty("--shadow-opacity");
    stage.style.removeProperty("--shadow-scale");
    stage.style.removeProperty("--shadow-offset");
    delete stage.dataset.ready;
    resizeObserver.disconnect();
    mobile.removeEventListener("change", resize);
    visibilityObserver.disconnect();
    renderer.setAnimationLoop(null);
    renderer.domElement.removeEventListener("webglcontextlost", contextLost);
    renderer.domElement.remove();
    geometry.dispose();
    material.dispose();
    environment.dispose();
    renderer.dispose();
  };
}
