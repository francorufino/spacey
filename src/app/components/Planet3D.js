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

const makeGlowTexture = (innerColor, outerColor = "rgba(255,255,255,0)") => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, innerColor);
  gradient.addColorStop(0.35, innerColor);
  gradient.addColorStop(1, outerColor);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const makeStarSurfaceTexture = (baseColor, flareColor, seed) => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  const random = seeded(seed);

  const gradient = context.createRadialGradient(256, 128, 20, 256, 128, 260);
  gradient.addColorStop(0, flareColor);
  gradient.addColorStop(0.46, baseColor);
  gradient.addColorStop(1, "#27110a");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < 900; index += 1) {
    context.globalAlpha = 0.08 + random() * 0.28;
    context.fillStyle = random() > 0.5 ? flareColor : baseColor;
    context.beginPath();
    context.ellipse(random() * canvas.width, random() * canvas.height, 4 + random() * 22, 2 + random() * 9, random() * Math.PI, 0, Math.PI * 2);
    context.fill();
  }

  for (let index = 0; index < 56; index += 1) {
    context.globalAlpha = 0.1 + random() * 0.25;
    context.strokeStyle = random() > 0.5 ? "#ffffff" : flareColor;
    context.lineWidth = 1 + random() * 2;
    context.beginPath();
    const y = random() * canvas.height;
    context.moveTo(0, y);
    for (let x = 0; x <= canvas.width; x += 32) {
      context.lineTo(x, y + Math.sin(x * 0.02 + random() * 4) * (3 + random() * 11));
    }
    context.stroke();
  }

  context.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
};

const makeAccretionTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 96;
  const context = canvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "rgba(37, 99, 235, 0.05)");
  gradient.addColorStop(0.22, "rgba(59, 130, 246, 0.72)");
  gradient.addColorStop(0.42, "rgba(255, 214, 112, 0.95)");
  gradient.addColorStop(0.54, "rgba(255, 255, 245, 1)");
  gradient.addColorStop(0.68, "rgba(255, 126, 34, 0.92)");
  gradient.addColorStop(0.86, "rgba(190, 24, 93, 0.68)");
  gradient.addColorStop(1, "rgba(37, 99, 235, 0.08)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const random = seeded(4242);
  for (let index = 0; index < 180; index += 1) {
    context.globalAlpha = 0.15 + random() * 0.55;
    context.fillStyle = random() > 0.62 ? "#ffffff" : random() > 0.35 ? "#ff9f1c" : "#60a5fa";
    const x = random() * canvas.width;
    const y = 26 + random() * 44;
    context.fillRect(x, y, 28 + random() * 110, 1 + random() * 4);
  }

  context.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = 2;
  return texture;
};

const applyRadialRingUvs = (geometry, inner, outer) => {
  const positions = geometry.attributes.position;
  const uvs = geometry.attributes.uv;
  for (let index = 0; index < positions.count; index += 1) {
    const radius = Math.hypot(positions.getX(index), positions.getY(index));
    const angle = Math.atan2(positions.getY(index), positions.getX(index));
    uvs.setXY(index, (angle + Math.PI) / (Math.PI * 2), (radius - inner) / (outer - inner));
  }
  uvs.needsUpdate = true;
};

const makeSaturnRingTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 240;
  const context = canvas.getContext("2d");
  const random = seeded(7777);

  const bands = [
    [0.00, 0.08, "rgba(128, 98, 66, 0.12)"],
    [0.08, 0.20, "rgba(238, 215, 166, 0.74)"],
    [0.20, 0.34, "rgba(255, 242, 205, 0.94)"],
    [0.34, 0.43, "rgba(181, 139, 90, 0.52)"],
    [0.43, 0.49, "rgba(5, 9, 18, 0.82)"],
    [0.49, 0.64, "rgba(247, 221, 162, 0.88)"],
    [0.64, 0.78, "rgba(203, 171, 118, 0.72)"],
    [0.78, 0.90, "rgba(250, 239, 204, 0.64)"],
    [0.90, 1.00, "rgba(159, 121, 75, 0.28)"]
  ];

  bands.forEach(([start, end, color]) => {
    context.fillStyle = color;
    context.fillRect(0, start * canvas.height, canvas.width, (end - start) * canvas.height);
  });

  for (let index = 0; index < 520; index += 1) {
    const y = random() * canvas.height;
    const alpha = 0.05 + random() * 0.28;
    context.globalAlpha = alpha;
    context.fillStyle = random() > 0.34 ? "#fff7dc" : "#9b7652";
    context.fillRect(0, y, canvas.width, 0.6 + random() * 2.4);
  }

  for (let index = 0; index < 240; index += 1) {
    context.globalAlpha = 0.05 + random() * 0.18;
    context.fillStyle = random() > 0.55 ? "#ffffff" : "#d4a86f";
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    context.fillRect(x, y, 30 + random() * 180, 1 + random() * 3);
  }

  context.globalAlpha = 1;
  const fade = context.createLinearGradient(0, 0, 0, canvas.height);
  fade.addColorStop(0, "rgba(0,0,0,0.95)");
  fade.addColorStop(0.08, "rgba(0,0,0,0)");
  fade.addColorStop(0.92, "rgba(0,0,0,0)");
  fade.addColorStop(1, "rgba(0,0,0,0.96)");
  context.globalCompositeOperation = "destination-out";
  context.fillStyle = fade;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalCompositeOperation = "source-over";

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = 1.15;
  return texture;
};

const addSaturnRings = (group, disposables) => {
  const ringGroup = new THREE.Group();
  ringGroup.rotation.set(1.22, -0.12, 0.08);
  group.add(ringGroup);

  const addRing = ({ inner, outer, texture, color = "#ffffff", opacity = 1, blending = THREE.NormalBlending }) => {
    const geometry = new THREE.RingGeometry(inner, outer, 384, 8);
    applyRadialRingUvs(geometry, inner, outer);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity,
      depthWrite: false,
      blending
    });
    const ring = new THREE.Mesh(geometry, material);
    ringGroup.add(ring);
    disposables.push(geometry, material);
    return ring;
  };

  const broadTexture = makeSaturnRingTexture();
  disposables.push(broadTexture);
  addRing({ inner: 1.48, outer: 3.24, texture: broadTexture, opacity: 1 });

  addRing({ inner: 1.38, outer: 1.53, color: "#fff4c7", opacity: 0.62, blending: THREE.AdditiveBlending });
  addRing({ inner: 2.95, outer: 3.48, color: "#dcc79c", opacity: 0.32, blending: THREE.AdditiveBlending });
  addRing({ inner: 2.13, outer: 2.29, color: "#020617", opacity: 0.78 });
  addRing({ inner: 2.48, outer: 2.54, color: "#fff8db", opacity: 0.48, blending: THREE.AdditiveBlending });

  const particleCount = 1200;
  const random = seeded(12321);
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const color = new THREE.Color();

  for (let index = 0; index < particleCount; index += 1) {
    const radius = 1.48 + Math.pow(random(), 0.72) * 1.98;
    const angle = random() * Math.PI * 2;
    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = (random() - 0.5) * 0.018;
    positions[index * 3 + 2] = Math.sin(angle) * radius;
    color.setHSL(0.11 + random() * 0.05, 0.45 + random() * 0.3, 0.62 + random() * 0.28);
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.018,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  ringGroup.add(particles);
  disposables.push(particleGeometry, particleMaterial);

  return ringGroup;
};

const addMilkyWay = (group, disposables) => {
  const random = seeded(90210);
  const points = 5200;
  const positions = new Float32Array(points * 3);
  const colors = new Float32Array(points * 3);
  const color = new THREE.Color();
  const arms = 4;

  for (let index = 0; index < points; index += 1) {
    const arm = index % arms;
    const radius = Math.pow(random(), 0.55) * 3.35;
    const spin = radius * 1.45;
    const angle = arm / arms * Math.PI * 2 + spin + (random() - 0.5) * 0.72;
    const thickness = Math.max(0.025, 0.2 - radius * 0.035);
    const haze = (random() - 0.5) * thickness;

    positions[index * 3] = Math.cos(angle) * radius + (random() - 0.5) * 0.18;
    positions[index * 3 + 1] = haze;
    positions[index * 3 + 2] = Math.sin(angle) * radius * 0.62 + (random() - 0.5) * 0.18;

    color.setHSL(0.58 + random() * 0.18, 0.55 + random() * 0.3, 0.62 + random() * 0.3);
    if (radius < 0.55) color.setHSL(0.1, 0.85, 0.78 + random() * 0.18);
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: 0.038,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const galaxy = new THREE.Points(geometry, material);
  galaxy.rotation.set(0.95, 0, -0.32);
  group.add(galaxy);
  disposables.push(geometry, material);

  const coreTexture = makeGlowTexture("rgba(255, 225, 170, 1)", "rgba(255, 136, 64, 0)");
  const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: coreTexture, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }));
  core.scale.set(1.55, 1.55, 1);
  core.position.set(0, 0.05, 0);
  group.add(core);
  disposables.push(coreTexture, core.material);

  const haloTexture = makeGlowTexture("rgba(123, 92, 255, 0.55)", "rgba(15, 23, 42, 0)");
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTexture, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
  halo.scale.set(6.3, 3.2, 1);
  halo.rotation.z = -0.32;
  group.add(halo);
  disposables.push(haloTexture, halo.material);

  return galaxy;
};

const addNeptuneRings = (group, disposables) => {
  const ringGroup = new THREE.Group();
  ringGroup.rotation.set(1.34, 0.02, -0.1);
  group.add(ringGroup);

  const rings = [
    [1.52, 1.56, "#5eead4", 0.32],
    [1.70, 1.75, "#93c5fd", 0.46],
    [1.93, 1.99, "#60a5fa", 0.58],
    [2.18, 2.23, "#bfdbfe", 0.42]
  ];

  rings.forEach(([inner, outer, color, opacity]) => {
    const geometry = new THREE.RingGeometry(inner, outer, 256);
    const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending });
    const ring = new THREE.Mesh(geometry, material);
    ringGroup.add(ring);
    disposables.push(geometry, material);
  });

  const arcs = [
    [1.96, 0.012, 0.52, 0.25, "#e0f2fe"],
    [1.96, 0.014, 0.36, 0.64, "#7dd3fc"],
    [2.2, 0.011, 0.48, 1.08, "#bfdbfe"],
    [2.2, 0.01, 0.28, 1.58, "#38bdf8"]
  ];

  arcs.forEach(([radius, tube, arcLength, start, color]) => {
    const geometry = new THREE.TorusGeometry(radius, tube, 8, 80, arcLength);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending });
    const arc = new THREE.Mesh(geometry, material);
    arc.rotation.z = start;
    ringGroup.add(arc);
    disposables.push(geometry, material);
  });

  return ringGroup;
};

const addAlphaCentauri = (group, disposables) => {
  const makeStar = ({ color, glowColor, radius, position, glowScale, textureSeed }) => {
    const geometry = new THREE.SphereGeometry(radius, 96, 64);
    const surfaceTexture = makeStarSurfaceTexture(color, glowColor, textureSeed);
    const material = new THREE.MeshBasicMaterial({ map: surfaceTexture, color: "#ffffff" });
    const star = new THREE.Mesh(geometry, material);
    star.position.set(...position);
    group.add(star);
    disposables.push(surfaceTexture, geometry, material);

    const glowTexture = makeGlowTexture(glowColor, "rgba(0,0,0,0)");
    const glowMaterial = new THREE.SpriteMaterial({ map: glowTexture, transparent: true, opacity: 0.82, blending: THREE.AdditiveBlending, depthWrite: false });
    const glow = new THREE.Sprite(glowMaterial);
    glow.scale.set(glowScale, glowScale, 1);
    glow.position.copy(star.position);
    group.add(glow);
    disposables.push(glowTexture, glowMaterial);

    return star;
  };

  const alphaA = makeStar({
    color: "#fff6c7",
    glowColor: "rgba(255, 244, 195, 0.95)",
    radius: 0.72,
    position: [-0.72, 0.1, 0],
    glowScale: 2.2,
    textureSeed: 101
  });
  const alphaB = makeStar({
    color: "#ff9f45",
    glowColor: "rgba(255, 150, 62, 0.88)",
    radius: 0.55,
    position: [0.58, -0.08, 0.12],
    glowScale: 1.75,
    textureSeed: 202
  });
  const proxima = makeStar({
    color: "#ff4d4d",
    glowColor: "rgba(255, 66, 66, 0.72)",
    radius: 0.18,
    position: [2.35, 0.82, -0.25],
    glowScale: 0.8,
    textureSeed: 303
  });

  const orbitGeometry = new THREE.TorusGeometry(0.95, 0.006, 8, 160);
  const orbitMaterial = new THREE.MeshBasicMaterial({ color: "#fef3c7", transparent: true, opacity: 0.26, depthWrite: false, blending: THREE.AdditiveBlending });
  const binaryOrbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  binaryOrbit.scale.set(1.3, 0.45, 1);
  binaryOrbit.rotation.set(1.18, 0.1, -0.15);
  binaryOrbit.position.set(-0.08, 0, 0);
  group.add(binaryOrbit);
  disposables.push(orbitGeometry, orbitMaterial);

  const random = seeded(1618);
  const pointCount = 180;
  const positions = new Float32Array(pointCount * 3);
  for (let index = 0; index < pointCount; index += 1) {
    positions[index * 3] = (random() - 0.5) * 5.6;
    positions[index * 3 + 1] = (random() - 0.5) * 2.7;
    positions[index * 3 + 2] = -1.2 - random() * 1.8;
  }
  const starfieldGeometry = new THREE.BufferGeometry();
  starfieldGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const starfieldMaterial = new THREE.PointsMaterial({ color: "#dbeafe", size: 0.026, transparent: true, opacity: 0.72, depthWrite: false, blending: THREE.AdditiveBlending });
  const starfield = new THREE.Points(starfieldGeometry, starfieldMaterial);
  group.add(starfield);
  disposables.push(starfieldGeometry, starfieldMaterial);

  return { rotation: { y: 0 }, stars: [alphaA, alphaB, proxima], starfield };
};

const addBlackHole = (group, disposables) => {
  const glowTexture = makeGlowTexture("rgba(255, 145, 54, 0.95)", "rgba(59, 130, 246, 0)");
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, transparent: true, opacity: 0.72, blending: THREE.AdditiveBlending, depthWrite: false }));
  glow.scale.set(5.6, 5.6, 1);
  group.add(glow);
  disposables.push(glowTexture, glow.material);

  const inner = 1.08;
  const outer = 3.0;
  const diskTexture = makeAccretionTexture();
  const diskGeometry = new THREE.RingGeometry(inner, outer, 256, 5);
  applyRadialRingUvs(diskGeometry, inner, outer);
  const diskMaterial = new THREE.MeshBasicMaterial({
    map: diskTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.96,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const disk = new THREE.Mesh(diskGeometry, diskMaterial);
  disk.rotation.set(1.28, 0.05, -0.18);
  group.add(disk);
  disposables.push(diskTexture, diskGeometry, diskMaterial);

  const farDisk = new THREE.Mesh(diskGeometry.clone(), diskMaterial.clone());
  farDisk.scale.setScalar(0.82);
  farDisk.rotation.set(1.28, 0.05, Math.PI - 0.18);
  farDisk.position.y = 0.05;
  farDisk.material.opacity = 0.34;
  group.add(farDisk);
  disposables.push(farDisk.geometry, farDisk.material);

  const photonGeometry = new THREE.TorusGeometry(1.05, 0.035, 16, 160);
  const photonMaterial = new THREE.MeshBasicMaterial({ color: "#fde68a", transparent: true, opacity: 0.78, blending: THREE.AdditiveBlending });
  const photonRing = new THREE.Mesh(photonGeometry, photonMaterial);
  photonRing.rotation.set(1.28, 0.05, -0.18);
  group.add(photonRing);
  disposables.push(photonGeometry, photonMaterial);

  const sphereGeometry = new THREE.SphereGeometry(0.82, 96, 64);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: "#000000" });
  const eventHorizon = new THREE.Mesh(sphereGeometry, sphereMaterial);
  eventHorizon.position.z = 0.06;
  group.add(eventHorizon);
  disposables.push(sphereGeometry, sphereMaterial);

  return disk;
};

export default function Planet3D({ slug, name }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    const framedDistance = slug === "milky-way-galaxy" ? 8.5 : slug === "black-hole" ? 8.8 : slug === "saturn" ? 11.2 : slug === "alpha-centauri" ? 7.2 : slug === "uranus" ? 9.2 : 8.2;
    camera.position.set(0, 0, framedDistance);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const disposables = [];
    let rotationTarget = group;

    if (slug === "alpha-centauri") {
      rotationTarget = addAlphaCentauri(group, disposables);
    } else if (slug === "milky-way-galaxy") {
      rotationTarget = addMilkyWay(group, disposables);
      group.scale.setScalar(1.05);
    } else if (slug === "black-hole") {
      rotationTarget = addBlackHole(group, disposables);
    } else {
      const texture = textureFiles[slug]
        ? new THREE.TextureLoader().load(textureFiles[slug])
        : makeTexture(slug);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      disposables.push(texture);

      const geometry = new THREE.SphereGeometry(1.35, 128, 96);
      const material = slug === "sun"
        ? new THREE.MeshBasicMaterial({ map: texture })
        : new THREE.MeshStandardMaterial({ map: texture, roughness: 0.82, metalness: 0.02 });
      const planet = new THREE.Mesh(geometry, material);
      group.add(planet);
      rotationTarget = planet;
      disposables.push(geometry, material);

      if (slug === "alpha-centauri") {
        planet.scale.setScalar(0.72);
        planet.position.x = -0.75;
        const secondGeometry = new THREE.SphereGeometry(0.72, 64, 48);
        const secondMaterial = new THREE.MeshBasicMaterial({ color: "#ff8a32" });
        const second = new THREE.Mesh(secondGeometry, secondMaterial);
        second.position.set(0.9, 0.25, -0.15);
        group.add(second);
        disposables.push(secondGeometry, secondMaterial);
      }

      if (slug === "saturn") {
        addSaturnRings(group, disposables);
      } else if (slug === "neptune") {
        addNeptuneRings(group, disposables);
      } else if (["jupiter", "uranus"].includes(slug)) {
        const ringSpecs = {
          jupiter: [[1.53, 1.64, "#8b7666", 0.08]],
          uranus: [[1.62, 1.69, "#9bc8cf", 0.45], [1.79, 1.84, "#6f929b", 0.38], [1.94, 2.0, "#a6d5dc", 0.32]]
        };
        ringSpecs[slug].forEach(([inner, outer, color, opacity]) => {
          const ringGeometry = new THREE.RingGeometry(inner, outer, 256);
          const ringMaterial = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity, depthWrite: false });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.x = slug === "uranus" ? 0.18 : 1.34;
          ring.rotation.y = slug === "uranus" ? 1.48 : 0;
          group.add(ring);
          disposables.push(ringGeometry, ringMaterial);
        });
      }
    }

    scene.add(new THREE.HemisphereLight(0xffffff, 0x18203a, slug === "black-hole" ? 0.6 : 2.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, slug === "black-hole" ? 1.6 : 3.5);
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
    const rotationDirection = Math.sign(signedPeriod) || 1;
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
      if (slug === "alpha-centauri") {
        rotationTarget.stars.forEach((star, index) => {
          star.rotation.y += delta * (0.18 + index * 0.05);
        });
        group.rotation.y += delta * 0.08;
      } else {
        rotationTarget.rotation.y += rotationDirection * delta * (Math.PI * 2) / visualPeriodSeconds;
      }
      if (slug === "black-hole") group.rotation.z += delta * 0.08;
      if (slug === "milky-way-galaxy") group.rotation.y += delta * 0.05;
      controls.update();
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      disposables.forEach((item) => item.dispose?.());
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
