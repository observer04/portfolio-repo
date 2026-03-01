'use client';

import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Disk tilt applied to all disk-related elements ─────────────────
const DISK_TILT: [number, number, number] = [-Math.PI * 0.38, 0, 0.2];

// ─── Hubble False-Color Palette ─────────────────────────────────────
// Inner → outer: white-hot → magenta/pink → cyan/teal → gold/amber → deep violet
function falseColor(t: number): [number, number, number] {
  // t: 0 = innermost, 1 = outermost
  if (t < 0.15) {
    // White-hot core
    const s = t / 0.15;
    return [
      1.0 - s * 0.05,
      0.95 - s * 0.3,
      1.0 - s * 0.4,
    ];
  } else if (t < 0.35) {
    // Hot magenta / pink
    const s = (t - 0.15) / 0.2;
    return [
      0.95 - s * 0.3,
      0.15 + s * 0.45,
      0.6 + s * 0.3,
    ];
  } else if (t < 0.6) {
    // Cyan / teal
    const s = (t - 0.35) / 0.25;
    return [
      0.15 + s * 0.15,
      0.6 + s * 0.15,
      0.9 - s * 0.1,
    ];
  } else if (t < 0.8) {
    // Warm gold / amber
    const s = (t - 0.6) / 0.2;
    return [
      0.8 + s * 0.2,
      0.55 - s * 0.15,
      0.15 - s * 0.1,
    ];
  } else {
    // Deep violet / cool fade
    const s = (t - 0.8) / 0.2;
    return [
      0.5 - s * 0.3,
      0.15 - s * 0.1,
      0.35 + s * 0.25,
    ];
  }
}

// ─── Gaussian random helper ─────────────────────────────────────────
function gaussRandom(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// ─── Star Field ─────────────────────────────────────────────────────

function StarField({ count = 4000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 18 + Math.random() * 40;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const temp = Math.random();
      if (temp < 0.12) {
        col[i * 3] = 0.7; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 1.0;
      } else if (temp < 0.2) {
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.7; col[i * 3 + 2] = 0.4;
      } else {
        const w = 0.75 + Math.random() * 0.25;
        col[i * 3] = w; col[i * 3 + 1] = w; col[i * 3 + 2] = w;
      }
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.004;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Volumetric Accretion Disk (Particle Torus) ─────────────────────
// Each particle orbits at a Keplerian speed, distributed in a thick
// torus with gaussian vertical spread. This creates genuine 3D depth.

function VolumetricDisk({ count = 10000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  // Per-particle data stored outside the position buffer
  const particleData = useMemo(() => {
    const radii = new Float32Array(count);
    const angles = new Float32Array(count);
    const heights = new Float32Array(count);
    const speeds = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const pos = new Float32Array(count * 3);

    const innerR = 0.8;
    const outerR = 6.0;

    for (let i = 0; i < count; i++) {
      // Bias distribution: more particles near inner region (power law)
      const u = Math.random();
      const r = innerR + (outerR - innerR) * Math.pow(u, 0.6);
      radii[i] = r;

      // Random initial angle
      angles[i] = Math.random() * Math.PI * 2;

      // Gaussian vertical spread — thinner near center, thicker further out
      const verticalScale = 0.04 + (r / outerR) * 0.35;
      heights[i] = gaussRandom() * verticalScale;

      // Keplerian orbital speed: v ∝ r^(-1.5) — inner orbits much faster
      speeds[i] = 1.8 / Math.pow(r, 1.5);

      // False color based on radial position
      const t = (r - innerR) / (outerR - innerR);
      const [cr, cg, cb] = falseColor(t);

      // Add per-particle brightness variation for texture
      const brightnessJitter = 0.6 + Math.random() * 0.4;
      col[i * 3] = cr * brightnessJitter;
      col[i * 3 + 1] = cg * brightnessJitter;
      col[i * 3 + 2] = cb * brightnessJitter;

      // Size: inner particles slightly smaller and denser, outer ones larger and diffuse
      siz[i] = 0.02 + t * 0.06 + Math.random() * 0.03;

      // Initial positions
      pos[i * 3] = Math.cos(angles[i]) * r;
      pos[i * 3 + 1] = heights[i];
      pos[i * 3 + 2] = Math.sin(angles[i]) * r;
    }

    return { radii, angles, heights, speeds, colors: col, sizes: siz, positions: pos };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    timeRef.current += delta;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Advance angle by Keplerian speed
      particleData.angles[i] += particleData.speeds[i] * delta;
      const a = particleData.angles[i];
      const r = particleData.radii[i];

      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = particleData.heights[i];
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} rotation={DISK_TILT}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particleData.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[particleData.colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[particleData.sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Bright Inner Glow Layer ────────────────────────────────────────
// Dense, bright, fast-orbiting particles close to the event horizon

function InnerGlow({ count = 3000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const particleData = useMemo(() => {
    const radii = new Float32Array(count);
    const angles = new Float32Array(count);
    const heights = new Float32Array(count);
    const speeds = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 0.6 + Math.random() * 1.5;
      radii[i] = r;
      angles[i] = Math.random() * Math.PI * 2;
      heights[i] = gaussRandom() * 0.03;
      speeds[i] = 2.5 / Math.pow(r, 1.5);

      // Extremely hot: white to magenta
      const t = Math.random();
      col[i * 3] = 0.9 + t * 0.1;
      col[i * 3 + 1] = 0.4 + t * 0.5;
      col[i * 3 + 2] = 0.8 + t * 0.2;

      pos[i * 3] = Math.cos(angles[i]) * r;
      pos[i * 3 + 1] = heights[i];
      pos[i * 3 + 2] = Math.sin(angles[i]) * r;
    }
    return { radii, angles, heights, speeds, colors: col, positions: pos };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    timeRef.current += delta;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      particleData.angles[i] += particleData.speeds[i] * delta;
      const a = particleData.angles[i];
      const r = particleData.radii[i];
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = particleData.heights[i];
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} rotation={DISK_TILT}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particleData.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[particleData.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Central Glow (Photon Ring + Event Horizon) ─────────────────────
// Shader-based billboard quad for the glow around the black hole center

const glowVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 center = vec2(0.5);
    float dist = length(vUv - center) * 2.0;

    // Event horizon shadow
    float shadow = smoothstep(0.04, 0.14, dist);

    // Photon ring — tight bright ring just outside horizon
    float photonRing = exp(-pow((dist - 0.14) * 35.0, 2.0)) * 2.5;

    // Gravitational lensing glow
    float lensGlow = exp(-dist * 4.0) * 0.5;
    float outerHalo = exp(-pow(dist - 0.25, 2.0) * 12.0) * 0.2;

    float pulse = 1.0 + 0.04 * sin(uTime * 1.8);
    float totalGlow = (photonRing + lensGlow + outerHalo) * shadow * pulse;

    // False-color: hot magenta core → cyan ring → amber halo
    vec3 color = mix(
      vec3(1.0, 0.6, 0.9),    // magenta-white
      vec3(0.3, 0.9, 1.0),    // cyan
      smoothstep(0.08, 0.25, dist)
    );
    color = mix(color, vec3(1.0, 0.75, 0.2), smoothstep(0.2, 0.4, dist));

    gl_FragColor = vec4(color * totalGlow, totalGlow * 0.85);
  }
`;

function CentralGlow() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh rotation={DISK_TILT}>
      <planeGeometry args={[5, 5]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={glowVertexShader}
        fragmentShader={glowFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ─── Diffuse Halo Cloud ─────────────────────────────────────────────
// Large, soft, slowly-orbiting particles forming a diffuse envelope
// around the disk, giving it a volumetric "cloud" appearance

function DiffuseHalo({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Spread from inner to far outer
      const r = 1.5 + Math.random() * 9;
      // Much thicker vertical spread — gives 3D cloud feel
      const ySpread = gaussRandom() * (0.3 + (r / 10) * 0.8);

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = ySpread;
      pos[i * 3 + 2] = Math.sin(angle) * r;

      // Soft false-color nebula tones
      const t = r / 10;
      const palette = Math.random();
      if (palette < 0.35) {
        // Deep violet / purple
        col[i * 3] = 0.4 + t * 0.2;
        col[i * 3 + 1] = 0.1 + t * 0.15;
        col[i * 3 + 2] = 0.6 + t * 0.2;
      } else if (palette < 0.65) {
        // Teal / cyan
        col[i * 3] = 0.05 + t * 0.1;
        col[i * 3 + 1] = 0.3 + t * 0.3;
        col[i * 3 + 2] = 0.5 + t * 0.3;
      } else {
        // Warm amber haze
        col[i * 3] = 0.6 + t * 0.3;
        col[i * 3 + 1] = 0.3 + t * 0.15;
        col[i * 3 + 2] = 0.05 + t * 0.1;
      }
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.012;
    }
  });

  return (
    <points ref={pointsRef} rotation={DISK_TILT}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        vertexColors
        transparent
        opacity={0.12}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Particle Jets ──────────────────────────────────────────────────

function ParticleJets({ count = 500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, basePositions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spread = Math.random() * 0.25;
      const height = (Math.random() - 0.5) * 2;
      const dir = height > 0 ? 1 : -1;

      base[i * 3] = Math.cos(angle) * spread;
      base[i * 3 + 1] = dir * Math.abs(height) * 3.5;
      base[i * 3 + 2] = Math.sin(angle) * spread;

      pos[i * 3] = base[i * 3];
      pos[i * 3 + 1] = base[i * 3 + 1];
      pos[i * 3 + 2] = base[i * 3 + 2];

      vel[i] = 0.6 + Math.random() * 1.8;

      // Jet colors: cyan to white
      const t = Math.random();
      col[i * 3] = 0.4 + t * 0.6;
      col[i * 3 + 1] = 0.7 + t * 0.3;
      col[i * 3 + 2] = 0.9 + t * 0.1;
    }
    return { positions: pos, basePositions: base, velocities: vel, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const dir = basePositions[i * 3 + 1] > 0 ? 1 : -1;
      arr[i * 3 + 1] += dir * velocities[i] * delta;

      if (Math.abs(arr[i * 3 + 1]) > 5) {
        const angle = Math.random() * Math.PI * 2;
        const spread = Math.random() * 0.12;
        arr[i * 3] = Math.cos(angle) * spread;
        arr[i * 3 + 1] = dir * 0.1;
        arr[i * 3 + 2] = Math.sin(angle) * spread;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} rotation={DISK_TILT}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Spiral Arms (density waves) ────────────────────────────────────
// Bright particles concentrated along logarithmic spiral arms

function SpiralArms({ count = 3000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const particleData = useMemo(() => {
    const radii = new Float32Array(count);
    const baseAngles = new Float32Array(count);
    const heights = new Float32Array(count);
    const speeds = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const pos = new Float32Array(count * 3);

    const numArms = 3;
    const innerR = 1.0;
    const outerR = 5.5;

    for (let i = 0; i < count; i++) {
      const arm = i % numArms;
      const armOffset = (arm / numArms) * Math.PI * 2;

      // Radial position along the arm
      const r = innerR + Math.pow(Math.random(), 0.5) * (outerR - innerR);
      radii[i] = r;

      // Logarithmic spiral: angle = armOffset + log(r) * tightness + scatter
      const spiralAngle = armOffset + Math.log(r) * 2.5 + gaussRandom() * 0.25;
      baseAngles[i] = spiralAngle;

      heights[i] = gaussRandom() * (0.02 + (r / outerR) * 0.15);
      speeds[i] = 1.8 / Math.pow(r, 1.5);

      // Brighter false-color along arms
      const t = (r - innerR) / (outerR - innerR);
      const [cr, cg, cb] = falseColor(t);
      const boost = 1.2 + Math.random() * 0.3;
      col[i * 3] = Math.min(cr * boost, 1.0);
      col[i * 3 + 1] = Math.min(cg * boost, 1.0);
      col[i * 3 + 2] = Math.min(cb * boost, 1.0);

      pos[i * 3] = Math.cos(spiralAngle) * r;
      pos[i * 3 + 1] = heights[i];
      pos[i * 3 + 2] = Math.sin(spiralAngle) * r;
    }
    return { radii, baseAngles, heights, speeds, colors: col, positions: pos };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    timeRef.current += delta;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      particleData.baseAngles[i] += particleData.speeds[i] * delta;
      const a = particleData.baseAngles[i];
      const r = particleData.radii[i];
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = particleData.heights[i];
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} rotation={DISK_TILT}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particleData.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[particleData.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Scene Composition ──────────────────────────────────────────────

function Scene() {
  return (
    <>
      <StarField count={4000} />
      <DiffuseHalo count={2000} />
      <VolumetricDisk count={10000} />
      <SpiralArms count={3000} />
      <InnerGlow count={3000} />
      <CentralGlow />
      <ParticleJets count={500} />
      <ambientLight intensity={0.03} />
    </>
  );
}

// ─── Main Exported Component ────────────────────────────────────────

export default function AccretionDisk() {
  const handleCreated = useCallback((state: { gl: THREE.WebGLRenderer }) => {
    state.gl.setClearColor('#000000', 1);
    state.gl.toneMapping = THREE.ACESFilmicToneMapping;
    state.gl.toneMappingExposure = 1.4;
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: '#000000',
      }}
    >
      <Canvas
        camera={{ position: [0, 3, 9], fov: 55, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={handleCreated}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
