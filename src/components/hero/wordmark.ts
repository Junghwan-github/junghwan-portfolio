import * as THREE from "three";

type Point = readonly [number, number];

const outlines: Record<string, Point[]> = {
  J: [[0.58, 1], [0.83, 1], [0.83, 0.29], [0.76, 0.12], [0.57, 0], [0.29, 0], [0.08, 0.13], [0, 0.35], [0.24, 0.35], [0.3, 0.23], [0.49, 0.23], [0.58, 0.33]],
  U: [[0, 1], [0.25, 1], [0.25, 0.36], [0.32, 0.24], [0.52, 0.24], [0.59, 0.36], [0.59, 1], [0.84, 1], [0.84, 0.3], [0.76, 0.12], [0.58, 0], [0.26, 0], [0.08, 0.12], [0, 0.3]],
  N: [[0, 0], [0, 1], [0.24, 1], [0.64, 0.42], [0.64, 1], [0.87, 1], [0.87, 0], [0.64, 0], [0.23, 0.59], [0.23, 0]],
  G: [[0.87, 0.74], [0.63, 0.74], [0.54, 0.79], [0.33, 0.78], [0.24, 0.68], [0.24, 0.32], [0.34, 0.22], [0.61, 0.22], [0.68, 0.3], [0.68, 0.42], [0.48, 0.42], [0.48, 0.62], [0.91, 0.62], [0.91, 0.25], [0.82, 0.08], [0.64, 0], [0.26, 0], [0.08, 0.1], [0, 0.26], [0, 0.74], [0.09, 0.9], [0.26, 1], [0.62, 1], [0.78, 0.92]],
  H: [[0, 0], [0, 1], [0.24, 1], [0.24, 0.62], [0.61, 0.62], [0.61, 1], [0.85, 1], [0.85, 0], [0.61, 0], [0.61, 0.39], [0.24, 0.39], [0.24, 0]],
  W: [[0, 1], [0.24, 1], [0.36, 0.35], [0.51, 1], [0.72, 1], [0.87, 0.35], [0.99, 1], [1.23, 1], [1, 0], [0.76, 0], [0.615, 0.56], [0.47, 0], [0.23, 0]],
  A: [[0, 0], [0.34, 1], [0.62, 1], [0.96, 0], [0.72, 0], [0.65, 0.2], [0.31, 0.2], [0.24, 0]],
};

const layout = [
  { letter: "J", x: -1.72, y: 0.77, z: -0.84, tilt: 0.08 },
  { letter: "U", x: -0.67, y: 0.88, z: 0.44, tilt: -0.09 },
  { letter: "N", x: 0.39, y: 0.71, z: -0.28, tilt: -0.13 },
  { letter: "G", x: 1.49, y: 0.83, z: 0.72, tilt: 0.09 },
  { letter: "H", x: -1.52, y: -0.7, z: -0.65, tilt: -0.085 },
  { letter: "W", x: -0.31, y: -0.82, z: -0.46, tilt: 0.04 },
  { letter: "A", x: 0.91, y: -0.66, z: 0.24, tilt: -0.07 },
  { letter: "N", x: 1.93, y: -0.79, z: 0.56, tilt: 0.12 },
];

function trace(path: THREE.Path, points: Point[]) {
  points.forEach(([x, y], index) => {
    if (index === 0) path.moveTo(x, y);
    else path.lineTo(x, y);
  });
  path.closePath();
}

export function createWordmark() {
  const group = new THREE.Group();
  group.position.x = -0.075;
  const face = new THREE.MeshPhysicalMaterial({
    color: "#343e4d",
    metalness: 0.62,
    roughness: 0.35,
    clearcoat: 0.3,
  });
  const edge = new THREE.MeshPhysicalMaterial({
    color: "#9daebe",
    metalness: 0.78,
    roughness: 0.22,
  });
  const geometries = new Map<string, THREE.ExtrudeGeometry>();

  const letters = layout.map(({ letter }, index) => {
    let geometry = geometries.get(letter);
    if (!geometry) {
      const shape = new THREE.Shape();
      trace(shape, outlines[letter]);
      if (letter === "A") {
        const counter = new THREE.Path();
        trace(counter, [[0.375, 0.4], [0.585, 0.4], [0.48, 0.73]]);
        shape.holes.push(counter);
      }
      geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.28,
        bevelSize: 0.025,
        bevelThickness: 0.025,
        bevelSegments: 3,
      });
      geometry.center();
      geometries.set(letter, geometry);
    }
    const mesh = new THREE.Mesh(geometry, [face, edge]);
    group.add(mesh);
    return { mesh, phase: index * 1.7, speed: 0.63 + index * 0.09 };
  });

  function animate(seconds: number) {
    letters.forEach(({ mesh, phase, speed }, index) => {
      const { x, y, z, tilt } = layout[index];
      const time = seconds * speed + phase;
      mesh.position.set(
        x + Math.sin(time * 0.83) * 0.085,
        y + Math.cos(time) * 0.145,
        z + Math.sin(time * 0.71) * 0.37,
      );
      mesh.rotation.set(
        tilt * 0.7 + Math.sin(time * 0.87) * 0.105,
        tilt * 0.9 + Math.cos(time * 0.78) * 0.185,
        tilt + Math.sin(time * 0.91) * 0.09,
      );
    });
  }

  return {
    group,
    animate,
    dispose() {
      geometries.forEach((geometry) => geometry.dispose());
      face.dispose();
      edge.dispose();
    },
  };
}
