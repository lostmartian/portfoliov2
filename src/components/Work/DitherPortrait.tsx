"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const DitherShaderMaterial = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new THREE.Vector2() },
    time: { value: 0 },
    color1: { value: new THREE.Color("#000000") },
    color2: { value: new THREE.Color("#ffffff") },
    neonColor: { value: new THREE.Color("#00f2ff") }, // Cyan neon
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 neonColor;
    varying vec2 vUv;

    float bayer4x4(vec2 p) {
      int x = int(mod(p.x, 4.0));
      int y = int(mod(p.y, 4.0));
      int index = x + y * 4;
      if (index == 0) return 0.0625; if (index == 1) return 0.5625; if (index == 2) return 0.1875; if (index == 3) return 0.6875;
      if (index == 4) return 0.8125; if (index == 5) return 0.3125; if (index == 6) return 0.9375; if (index == 7) return 0.4375;
      if (index == 8) return 0.25; if (index == 9) return 0.75; if (index == 10) return 0.125; if (index == 11) return 0.625;
      if (index == 12) return 1.0; if (index == 13) return 0.5; if (index == 14) return 0.875; if (index == 15) return 0.375;
      return 0.0;
    }

    float rand(vec2 co) {
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      
      // Stochastic Sporadic Glitch Engine
      float timeSlow = time * 0.5;
      float globalGlitch = step(0.95, rand(vec2(timeSlow, 123.456))) * rand(vec2(timeSlow, 789.012));
      
      // Spiky High Glitch Factor
      float spike = step(0.98, rand(vec2(time * 2.0, 456.789))) * 2.0;
      float intensity = clamp(globalGlitch + spike, 0.0, 1.0);

      // Intense High Glitch Displacement (scaled by sporadic intensity)
      float glitchChance = step(0.9, rand(vec2(time * 2.0, floor(uv.y * 40.0)))) * intensity;
      float displacement = (rand(vec2(time, floor(uv.y * 15.0))) - 0.5) * 0.12;
      uv.x += glitchChance * displacement;

      // Aggressive Chromatic Aberration (scaled by sporadic intensity)
      float shift = 0.01 * sin(time * 30.0) * intensity;
      float r = texture2D(tDiffuse, uv + vec2(shift, 0.0)).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv - vec2(shift, 0.0)).b;
      
      vec3 texel = vec3(r, g, b);
      
      // Stochastic Inversion (Strobe Glitch - triggered only by intensity spikes)
      float invert = step(0.98, rand(vec2(time, 0.0))) * step(0.8, intensity);
      if (invert > 0.5) texel = 1.0 - texel;

      float gray = dot(texel, vec3(0.299, 0.587, 0.114));
      
      vec2 pixelPos = uv * resolution;
      float threshold = bayer4x4(pixelPos);
      
      // Neon Dither Logic
      vec3 baseColor = (gray > threshold) ? color2 : color1;
      
      // Intense Neon Glitch Highlights (flickers more during glitches)
      float neonFlicker = step(0.92 - (intensity * 0.1), rand(vec2(gray, time * 2.0))) * gray;
      vec3 finalColor = mix(baseColor, neonColor, neonFlicker * (0.6 + intensity * 0.4));
      
      // Horizontal Scanline Noise (always subtle, intensifies during glitch)
      float scanline = sin(uv.y * 300.0 + time * 10.0) * (0.01 + intensity * 0.04);
      finalColor += scanline;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

function DitherPlane({ imagePath, color1, color2, neonColor }: { imagePath: string, color1: string, color2: string, neonColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imagePath);
  const { size } = useThree();

  const uniforms = useMemo(() => {
    return {
      tDiffuse: { value: texture },
      resolution: { value: new THREE.Vector2(size.width, size.height) },
      time: { value: 0 },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
      neonColor: { value: new THREE.Color(neonColor) },
    };
  }, [texture, size, color1, color2, neonColor]);

  const timer = useMemo(() => new THREE.Timer(), []);

  useFrame(() => {
    if (meshRef.current) {
      timer.update();
      const elapsed = timer.getElapsed();
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = elapsed;
      // Subtle float
      meshRef.current.position.y = Math.sin(elapsed * 0.5) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} scale={[5, 5, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        args={[DitherShaderMaterial]}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export default function DitherPortrait({ 
  imagePath, 
  color1 = "#000000", 
  color2 = "#ffffff",
  neonColor = "#00f2ff"
}: { 
  imagePath: string, 
  color1?: string, 
  color2?: string,
  neonColor?: string
}) {
  return (
    <div className="w-full aspect-square relative">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <DitherPlane imagePath={imagePath} color1={color1} color2={color2} neonColor={neonColor} />
      </Canvas>
    </div>
  );
}
