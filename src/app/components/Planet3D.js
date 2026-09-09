"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const palettes = {
  sun: ["#ff7a00", "#ffd166", "#7a1600"], mercury: ["#777777", "#c7c7c7", "#3f3f3f"],
  venus: ["#b87822", "#f2cf78", "#754315"], earth: ["#0b3d91", "#38a7df", "#236b38"],
  moon: ["#777777", "#d5d5d5", "#3f3f3f"], mars: ["#9d3f1f", "#df7844", "#542216"],
  jupiter: ["#b97946", "#ead1a6", "#7f4934"], saturn: ["#c9a96e", "#f0d9a5", "#806b4c"],
  uranus: ["#58cbd6", "#b4f0ee", "#247c91"], neptune: ["#1746b8", "#4b76ef", "#0b1f69"],
  pluto: ["#aa8d79", "#ead9c9", "#654a42"], "alpha-centauri": ["#ffbd4a", "#fff0a8", "#b34c19"],
  "milky-way-galaxy": ["#2d397f", "#cf86cf", "#11142d"], "black-hole": ["#050505", "#ffb347", "#4b1b0d"]
};

const textureFiles = {
  sun: "/textures/sun.jpg", mercury: "/textures/mercury.jpg", venus: "/textures/venus.jpg",
  earth: "/textures/earth.jpg", moon: "/textures/moon.jpg", mars: "/textures/mars.jpg",
  jupiter: "/textures/jupiter.jpg", saturn: "/textures/saturn.jpg", uranus: "/textures/uranus.jpg",
  neptune: "/textures/neptune.jpg", pluto: "/textures/pluto.jpg"
};

const rotationHours = {
  sun: 609.12, mercury: 1407.6, venus: -5832.5, earth: 23.9345, moon: 655.728,
  mars: 24.6229, jupiter: 9.925, saturn: 10.7, uranus: -17.24, neptune: 16.11, pluto: -153.2928,
  "alpha-centauri": 528, "milky-way-galaxy": 96, "black-hole": 24
};

const SECONDS_PER_ROTATION_HOUR = 0.5;

const seeded = (seed) => {
  let value = seed;
  return () => ((value = (value * 9301 + 49297) % 233280) / 233280);
};

const makeTexture = (slug) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  const colors = palettes[slug] || palettes.earth;
  const random = seeded([...slug].reduce((sum, character) => sum + character.charCodeAt(0), 0));

  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, colors[1]);
  gradient.addColorStop(0.5, colors[0]);
  gradient.addColorStop(1, colors[2]);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (["jupiter", "saturn", "uranus", "neptune", "venus"].includes(slug)) {
    for (let y = 0; y < canvas.height; y += 18) {
      context.globalAlpha = 0.12 + random() * 0.22;
      context.fillStyle = random() > 0.5 ? colors[1] : colors[2];
      context.fillRect(0, y, canvas.width, 5 + random() * 16);
    }
    if (slug === "jupiter") {
      context.globalAlpha = 0.9;
      context.fillStyle = "#b84d2d";
      context.beginPath();
      context.ellipse(720, 330, 105, 42, -0.08, 0, Math.PI * 2);
      context.fill();
    }
  } else if (slug === "earth") {
    for (let index = 0; index < 85; index += 1) {
      context.globalAlpha = 0.75;
      context.fillStyle = random() > 0.35 ? "#317545" : "#a98b58";
      context.beginPath();
      context.ellipse(random() * 1024, random() * 512, 25 + random() * 85, 10 + random() * 35, random() * Math.PI, 0, Math.PI * 2);
      context.fill();
    }
    for (let index = 0; index < 100; index += 1) {
      context.globalAlpha = 0.22;
      context.fillStyle = "white";
      context.beginPath();
      context.ellipse(random() * 1024, random() * 512, 20 + random() * 75, 4 + random() * 14, random() * Math.PI, 0, Math.PI * 2);
      context.fill();
    }
  } else if (!["sun", "alpha-centauri", "milky-way-galaxy", "black-hole"].includes(slug)) {
    for (let index = 0; index < 280; index += 1) {
      const radius = 2 + random() * 20;
      context.globalAlpha = 0.08 + random() * 0.28;
      context.fillStyle = random() > 0.5 ? colors[1] : "#000000";
      context.beginPath();
      context.arc(random() * 1024, random() * 512, radius, 0, Math.PI * 2);
      context.fill();
    }
  } else {
    for (let index = 0; index < 500; index += 1) {
      context.globalAlpha = 0.08 + random() * 0.35;
      context.fillStyle = colors[Math.floor(random() * colors.length)];
      context.beginPath();
      context.arc(random() * 1024, random() * 512, 2 + random() * 24, 0, Math.PI * 2);
      context.fill();
    }
  }

  context.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
};

export default function Planet3D({ slug, name }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    const framedDistance = ["saturn", "black-hole"].includes(slug) ? 10.4 : slug === "uranus" ? 9.2 : 8.2;
    camera.position.set(0, 0, framedDistance);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const texture = textureFiles[slug]
      ? new THREE.TextureLoader().load(textureFiles[slug])
      : makeTexture(slug);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const geometry = new THREE.SphereGeometry(1.35, 128, 96);
    const material = slug === "sun"
      ? new THREE.MeshBasicMaterial({ map: texture })
      : new THREE.MeshStandardMaterial({ map: texture, roughness: 0.82, metalness: 0.02 });
    const planet = new THREE.Mesh(geometry, material);
    group.add(planet);

    if (slug === "alpha-centauri") {
      planet.scale.setScalar(0.72);
      planet.position.x = -0.75;
      const second = new THREE.Mesh(new THREE.SphereGeometry(0.72, 64, 48), new THREE.MeshBasicMaterial({ color: "#ff8a32" }));
      second.position.set(0.9, 0.25, -0.15);
      group.add(second);
    }

    if (["jupiter", "saturn", "uranus", "neptune"].includes(slug)) {
      const ringSpecs = {
        jupiter: [[1.52, 1.66, "#8b7666", 0.2]],
        saturn: [[1.62, 2.55, "#e7d2a1", 0.95]],
        uranus: [[1.62, 1.69, "#9bc8cf", 0.45], [1.79, 1.84, "#6f929b", 0.38], [1.94, 2.0, "#a6d5dc", 0.32]],
        neptune: [[1.58, 1.63, "#677080", 0.34], [1.76, 1.8, "#8c929d", 0.3], [1.94, 2.0, "#626a78", 0.38]]
      };
      ringSpecs[slug].forEach(([inner, outer, color, opacity]) => {
        const ringGeometry = new THREE.RingGeometry(inner, outer, 256);
        let ringMap = null;
        if (slug === "saturn") {
          ringMap = new THREE.TextureLoader().load("/textures/saturn-ring.png");
          ringMap.colorSpace = THREE.SRGBColorSpace;
          const positions = ringGeometry.attributes.position;
          const uvs = ringGeometry.attributes.uv;
          for (let index = 0; index < positions.count; index += 1) {
            const radius = Math.hypot(positions.getX(index), positions.getY(index));
            uvs.setXY(index, (radius - inner) / (outer - inner), 0.5);
          }
          uvs.needsUpdate = true;
        }
        const ring = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ map: ringMap, color, side: THREE.DoubleSide, transparent: true, opacity, depthWrite: false }));
        ring.rotation.x = slug === "uranus" ? 0.18 : 1.34;
        ring.rotation.y = slug === "uranus" ? 1.48 : 0;
        group.add(ring);
      });
    }

    if (slug === "black-hole") {
      material.color.set("#000000");
      const disk = new THREE.Mesh(
        new THREE.RingGeometry(1.5, 2.5, 128),
        new THREE.MeshBasicMaterial({ color: "#ff8a2a", side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
      );
      disk.rotation.x = 1.28;
      group.add(disk);
    }

    scene.add(new THREE.HemisphereLight(0xffffff, 0x18203a, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(4, 2, 5);
    scene.add(keyLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.minDistance = framedDistance;
    controls.maxDistance = framedDistance;
    controls.autoRotate = false;

    const clock = new THREE.Clock();
    const signedPeriod = rotationHours[slug] || 48;
    const rotationDirection = Math.sign(signedPeriod);
    const visualPeriodSeconds = Math.abs(signedPeriod) * SECONDS_PER_ROTATION_HOUR;

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    let frame;
    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.05);
      planet.rotation.y += rotationDirection * delta * (Math.PI * 2) / visualPeriodSeconds;
      controls.update();
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      texture.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [slug]);

  return (
    <div className="relative h-[340px] min-w-0 w-full max-w-full overflow-hidden bg-transparent sm:h-[420px]">
      <div ref={mountRef} className="h-full min-w-0 w-full max-w-full cursor-grab overflow-hidden active:cursor-grabbing [&_canvas]:block [&_canvas]:max-w-full" role="img" aria-label={`Interactive 3D view of ${name}`} />
      <p className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-slate-500">Drag to rotate · Real relative rotation</p>
    </div>
  );
}
