import React, { useMemo, useRef, useEffect, useState } from "react";
import { getFluidGradientData } from "@/lib/blog-gradients";

interface FluidMeshHeaderProps {
  title: string;
  className?: string;
}

// Convert HEX to RGB vec3 [0..1]
function hexToRgbVec3(hexStr: string): [number, number, number] {
  const hex = hexStr.replace(/^#/, "");
  if (hex.length === 3) {
    const r = parseInt(hex[0] + hex[0], 16) / 255;
    const g = parseInt(hex[1] + hex[1], 16) / 255;
    const b = parseInt(hex[2] + hex[2], 16) / 255;
    return [r, g, b];
  }
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  return [r, g, b];
}

const VERTEX_SHADER_SRC = `
  attribute vec2 position;
  varying vec2 v_texCoord;
  void main() {
    v_texCoord = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision mediump float;
  varying vec2 v_texCoord;
  
  uniform vec2 u_resolution;
  uniform vec3 u_colorBg;
  uniform vec3 u_colorEnd;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec3 u_color4;
  uniform float u_seed;

  void main() {
    vec2 uv = v_texCoord;
    
    // Smooth, large-scale wave coords (flowery/sky wind flow)
    float wave1 = sin(uv.x * 2.5 + u_seed * 0.1) * cos(uv.y * 2.0 + u_seed * 0.05);
    float wave2 = cos(uv.y * 2.5 + u_seed * 0.15) * sin(uv.x * 2.0 + u_seed * 0.08);
    
    // Displace coordinates gently to create organic, petal-like curves
    vec2 warpedUv = uv + vec2(wave1, wave2) * 0.22;
    
    // Soft radial distance fields representing clouds or floral clusters
    float dist1 = distance(warpedUv, vec2(0.2, 0.2));
    float dist2 = distance(warpedUv, vec2(0.8, 0.3));
    float dist3 = distance(warpedUv, vec2(0.3, 0.8));
    float dist4 = distance(warpedUv, vec2(0.7, 0.7));
    
    // Gentle falloffs using smoothstep
    float f1 = smoothstep(0.8, 0.0, dist1);
    float f2 = smoothstep(0.7, 0.0, dist2);
    float f3 = smoothstep(0.75, 0.0, dist3);
    float f4 = smoothstep(0.85, 0.0, dist4);
    
    // Blend the dreamy palette (cream, warm sunset red, stone text shades)
    vec3 col = mix(u_colorBg, u_colorEnd, uv.x * 0.5 + uv.y * 0.5);
    col = mix(col, u_color1, f1 * 0.7);
    col = mix(col, u_color2, f2 * 0.65);
    col = mix(col, u_color3, f3 * 0.7);
    col = mix(col, u_color4, f4 * 0.6);
    
    // Volumetric sky vignette
    float centerDist = distance(uv, vec2(0.5));
    col *= 1.0 - centerDist * 0.2;
    
    // Soft morning glow shine
    float glow = clamp(1.0 - abs(uv.x - uv.y) * 2.0, 0.0, 1.0);
    col += vec3(glow * 0.035);
    
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function FluidMeshHeader({ title, className = "" }: FluidMeshHeaderProps) {
  const data = useMemo(() => getFluidGradientData(title), [title]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    let vs: WebGLShader | null = null;
    let fs: WebGLShader | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;

    try {
      gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
      if (!gl) {
        setWebglSupported(false);
        return;
      }

      const compileShader = (source: string, type: number) => {
        const shader = gl!.createShader(type);
        if (!shader) {
          setWebglSupported(false);
          return null;
        }
        gl!.shaderSource(shader, source);
        gl!.compileShader(shader);
        if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
          console.warn("WebGL Shader compilation failed:", gl!.getShaderInfoLog(shader));
          gl!.deleteShader(shader);
          setWebglSupported(false);
          return null;
        }
        return shader;
      };

      vs = compileShader(VERTEX_SHADER_SRC, gl.VERTEX_SHADER);
      fs = compileShader(FRAGMENT_SHADER_SRC, gl.FRAGMENT_SHADER);
      if (!vs || !fs) {
        setWebglSupported(false);
        return;
      }

      program = gl.createProgram();
      if (!program) {
        setWebglSupported(false);
        return;
      }
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn("WebGL Program linking failed:", gl.getProgramInfoLog(program));
        setWebglSupported(false);
        return;
      }

      gl.useProgram(program);

      // Setup Quad vertices
      const vertices = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]);

      buffer = gl.createBuffer();
      if (!buffer) {
        setWebglSupported(false);
        return;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      const positionLocation = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      // Convert colors to WebGL vec3 arrays
      const rgbBg = hexToRgbVec3(data.baseColor);
      const rgbEnd = hexToRgbVec3(data.linearGradientEnd);
      const rgb1 = hexToRgbVec3(data.blobs[0]?.color || data.baseColor);
      const rgb2 = hexToRgbVec3(data.blobs[1]?.color || data.baseColor);
      const rgb3 = hexToRgbVec3(data.blobs[2]?.color || data.baseColor);
      const rgb4 = hexToRgbVec3(data.blobs[3]?.color || data.baseColor);

      // Seed calculation
      let seed = 0;
      for (let i = 0; i < title.length; i++) {
        seed += title.charCodeAt(i);
      }

      gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), canvas.width, canvas.height);
      gl.uniform3f(gl.getUniformLocation(program, "u_colorBg"), rgbBg[0], rgbBg[1], rgbBg[2]);
      gl.uniform3f(gl.getUniformLocation(program, "u_colorEnd"), rgbEnd[0], rgbEnd[1], rgbEnd[2]);
      gl.uniform3f(gl.getUniformLocation(program, "u_color1"), rgb1[0], rgb1[1], rgb1[2]);
      gl.uniform3f(gl.getUniformLocation(program, "u_color2"), rgb2[0], rgb2[1], rgb2[2]);
      gl.uniform3f(gl.getUniformLocation(program, "u_color3"), rgb3[0], rgb3[1], rgb3[2]);
      gl.uniform3f(gl.getUniformLocation(program, "u_color4"), rgb4[0], rgb4[1], rgb4[2]);
      gl.uniform1f(gl.getUniformLocation(program, "u_seed"), seed);

      // Draw
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    } catch (e) {
      console.warn("WebGL initialization failed, falling back to CSS gradients.", e);
      setWebglSupported(false);
    }

    // Resource clean
    return () => {
      if (gl) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
      }
    };
  }, [title, data]);

  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-t-lg bg-background ${className}`}>
      {webglSupported ? (
        /* High-res WebGL Canvas rendering the GPU fluid shader */
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          className="w-full h-full object-cover block"
          style={{
            backgroundImage: `linear-gradient(135deg, ${data.baseColor}, ${data.linearGradientEnd})`,
            backgroundSize: "cover",
          }}
        />
      ) : (
        /* Graceful CSS static gradient fallback for older mobile devices or restricted browsers */
        <div
          className="w-full h-full block"
          style={{
            backgroundImage: `linear-gradient(135deg, ${data.baseColor}, ${data.linearGradientEnd})`,
            backgroundSize: "cover",
          }}
        />
      )}
    </div>
  );
}
