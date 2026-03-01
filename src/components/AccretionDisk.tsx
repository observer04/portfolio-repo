'use client';

import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Shaders ────────────────────────────────────────────────────────

const diskVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const diskFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;

  // Simplex-ish noise for turbulence
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    float dist = length(vPosition.xz);
    float angle = atan(vPosition.z, vPosition.x);

    // Radial falloff — bright core, fading edges
    float innerEdge = smoothstep(0.8, 1.5, dist);
    float outerEdge = smoothstep(5.0, 3.0, dist);
    float radialMask = innerEdge * outerEdge;

    // Swirling turbulence
    float spiral = angle * 3.0 - dist * 2.0 + uTime * 0.8;
    float turb = snoise(vec2(spiral, dist * 3.0 - uTime * 0.3)) * 0.5 + 0.5;
    float turb2 = snoise(vec2(spiral * 2.0 + 1.7, dist * 5.0 - uTime * 0.5)) * 0.5 + 0.5;

    // Color: hot inner (white-blue) to cool outer (orange-red)
    vec3 hotColor = vec3(0.9, 0.95, 1.0);    // white-blue
    vec3 midColor = vec3(1.0, 0.6, 0.15);     // orange
    vec3 coolColor = vec3(0.8, 0.1, 0.05);    // deep red
    vec3 accentColor = vec3(0.0, 1.0, 0.4);   // matrix green accent

    float t = smoothstep(1.0, 4.5, dist);
    vec3 baseColor = mix(hotColor, midColor, t);
    baseColor = mix(baseColor, coolColor, smoothstep(3.0, 5.0, dist));

    // Add subtle green accent in mid-range
    baseColor = mix(baseColor, accentColor, 0.06 * turb2 * smoothstep(2.0, 3.0, dist) * smoothstep(4.5, 3.5, dist));

    // Brightness modulation
    float brightness = radialMask * (0.6 + 0.4 * turb) * (0.8 + 0.2 * turb2);

    // Inner glow intensification
    float innerGlow = smoothstep(1.5, 0.8, dist) * 1.5;
    brightness += innerGlow;

    // Relativistic beaming (one side brighter — Doppler effect)
    float doppler = 0.7 + 0.3 * sin(angle + uTime * 0.3);
    brightness *= doppler;

    float alpha = radialMask * (0.7 + 0.3 * turb);
    alpha *= doppler;

    gl_FragColor = vec4(baseColor * brightness, alpha);
  }
`;

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

    // Black hole shadow
    float shadow = smoothstep(0.05, 0.12, dist);

    // Photon ring — very tight bright ring
    float photonRing = exp(-pow((dist - 0.13) * 40.0, 2.0)) * 2.0;

    // Gravitational lensing glow
    float lensGlow = exp(-dist * 3.0) * 0.6;
    float outerHalo = exp(-pow(dist - 0.3, 2.0) * 8.0) * 0.15;

    // Pulsation
    float pulse = 1.0 + 0.05 * sin(uTime * 2.0);

    float totalGlow = (photonRing + lensGlow + outerHalo) * shadow * pulse;

    vec3 color = mix(
      vec3(0.7, 0.85, 1.0),   // blue-white core
      vec3(1.0, 0.5, 0.1),     // orange rim
      smoothstep(0.1, 0.35, dist)
    );

    gl_FragColor = vec4(color * totalGlow, totalGlow * 0.9);
  }
`;

// ─── Star Field ─────────────────────────────────────────────────────

function StarField({ count = 3000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute on a sphere shell
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 15 + Math.random() * 35;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Color variation: mostly white with some blue and warm tints
      const temp = Math.random();
      if (temp < 0.15) {
        // Blue-white hot stars
        col[i * 3] = 0.7 + Math.random() * 0.3;
        col[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        col[i * 3 + 2] = 1.0;
      } else if (temp < 0.25) {
        // Warm orange/red
        col[i * 3] = 1.0;
        col[i * 3 + 1] = 0.6 + Math.random() * 0.3;
        col[i * 3 + 2] = 0.3 + Math.random() * 0.3;
      } else {
        // White
        const w = 0.8 + Math.random() * 0.2;
        col[i * 3] = w;
        col[i * 3 + 1] = w;
        col[i * 3 + 2] = w;
      }

      siz[i] = 0.02 + Math.random() * 0.08;
    }

    return { positions: pos, colors: col, sizes: siz };
  }, [count]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.005;
      meshRef.current.rotation.x += delta * 0.002;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
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

// ─── Accretion Disk Mesh ────────────────────────────────────────────

function Disk() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 0.42, 0, 0.15]}>
      <ringGeometry args={[0.8, 5, 128, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={diskVertexShader}
        fragmentShader={diskFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ─── Central Glow (Photon Sphere + Lensing) ─────────────────────────

function CentralGlow() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh rotation={[-Math.PI * 0.42, 0, 0.15]}>
      <planeGeometry args={[4, 4]} />
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

// ─── Particle Jets ──────────────────────────────────────────────────

function ParticleJets({ count = 600 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, basePositions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const vel = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spread = Math.random() * 0.3;
      const height = (Math.random() - 0.5) * 2;
      const dir = height > 0 ? 1 : -1;

      base[i * 3] = Math.cos(angle) * spread;
      base[i * 3 + 1] = dir * Math.abs(height) * 3;
      base[i * 3 + 2] = Math.sin(angle) * spread;

      pos[i * 3] = base[i * 3];
      pos[i * 3 + 1] = base[i * 3 + 1];
      pos[i * 3 + 2] = base[i * 3 + 2];

      vel[i] = 0.5 + Math.random() * 1.5;
    }

    return { positions: pos, basePositions: base, velocities: vel };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    timeRef.current += delta;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const dir = basePositions[i * 3 + 1] > 0 ? 1 : -1;
      arr[i * 3 + 1] += dir * velocities[i] * delta;

      // Reset particles that travel too far
      if (Math.abs(arr[i * 3 + 1]) > 4) {
        const angle = Math.random() * Math.PI * 2;
        const spread = Math.random() * 0.15;
        arr[i * 3] = Math.cos(angle) * spread;
        arr[i * 3 + 1] = dir * 0.1;
        arr[i * 3 + 2] = Math.sin(angle) * spread;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} rotation={[-Math.PI * 0.42, 0, 0.15]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#88ccff"
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Nebula Dust Ring ───────────────────────────────────────────────

function NebulaDust({ count = 1500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 5 + Math.random() * 8;
      const ySpread = (Math.random() - 0.5) * 1.5;

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = ySpread;
      pos[i * 3 + 2] = Math.sin(angle) * r;

      // Nebula colors: purples, blues, hints of green
      const pallete = Math.random();
      if (pallete < 0.4) {
        col[i * 3] = 0.3 + Math.random() * 0.2;
        col[i * 3 + 1] = 0.1 + Math.random() * 0.2;
        col[i * 3 + 2] = 0.6 + Math.random() * 0.4;
      } else if (pallete < 0.7) {
        col[i * 3] = 0.1;
        col[i * 3 + 1] = 0.3 + Math.random() * 0.3;
        col[i * 3 + 2] = 0.5 + Math.random() * 0.3;
      } else {
        col[i * 3] = 0.05;
        col[i * 3 + 1] = 0.5 + Math.random() * 0.3;
        col[i * 3 + 2] = 0.2 + Math.random() * 0.2;
      }
    }

    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef} rotation={[-Math.PI * 0.42, 0, 0.15]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.25}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Scene Composition ──────────────────────────────────────────────

function Scene() {
  return (
    <>
      <StarField count={3500} />
      <NebulaDust count={1500} />
      <Disk />
      <CentralGlow />
      <ParticleJets count={500} />
      {/* Ambient volumetric light */}
      <ambientLight intensity={0.05} />
    </>
  );
}

// ─── Main Exported Component ────────────────────────────────────────

export default function AccretionDisk() {
  const handleCreated = useCallback((state: { gl: THREE.WebGLRenderer }) => {
    state.gl.setClearColor('#000000', 1);
    state.gl.toneMapping = THREE.ACESFilmicToneMapping;
    state.gl.toneMappingExposure = 1.2;
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
        camera={{ position: [0, 2, 8], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={handleCreated}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
