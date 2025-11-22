'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function Mandelbrot() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) return;

        // Vertex Shader (Simple pass-through)
        const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

        // Fragment Shader (Mandelbrot Logic)
        const fsSource = `
      precision highp float;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform bool uIsDark;

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        uv.x *= uResolution.x / uResolution.y;
        
        // Map mouse to zoom/pan
        // Center of the screen is (0,0) in complex plane initially
        // Mouse moves the center slightly
        vec2 center = vec2(-0.5, 0.0) + (uMouse - 0.5) * 0.5;
        float zoom = 0.8 + sin(uTime * 0.1) * 0.1; // Subtle breathing zoom
        
        vec2 c = (uv - vec2(0.5 * uResolution.x/uResolution.y, 0.5)) * 3.0 / zoom + center;
        
        vec2 z = vec2(0.0);
        float iter = 0.0;
        const float maxIter = 100.0;
        
        for (float i = 0.0; i < maxIter; i++) {
          if (dot(z, z) > 4.0) break;
          z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
          iter++;
        }
        
        float t = iter / maxIter;
        
        // Color mapping
        vec3 color;
        if (iter == maxIter) {
          color = uIsDark ? vec3(0.0, 0.0, 0.05) : vec3(0.95, 0.95, 1.0); // Inner set color
        } else {
          // Smooth coloring
          float smoothIter = iter - log2(log2(dot(z, z))) + 4.0;
          float hue = smoothIter * 0.05 + uTime * 0.1;
          
          // Mix between our theme colors based on iteration
          vec3 c1 = uColor1; // Cyan/Blue
          vec3 c2 = uColor2; // Purple/Pink
          
          float mixFactor = 0.5 + 0.5 * sin(hue * 3.0);
          color = mix(c1, c2, mixFactor);
          
          // Add a glow effect
          color *= t * 2.0;
        }
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

        // Shader compilation helper
        const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

        if (!vertexShader || !fragmentShader) return;

        const shaderProgram = gl.createProgram();
        if (!shaderProgram) return;
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return;
        }

        // Attribute/Uniform locations
        const programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            },
            uniformLocations: {
                resolution: gl.getUniformLocation(shaderProgram, 'uResolution'),
                mouse: gl.getUniformLocation(shaderProgram, 'uMouse'),
                time: gl.getUniformLocation(shaderProgram, 'uTime'),
                color1: gl.getUniformLocation(shaderProgram, 'uColor1'),
                color2: gl.getUniformLocation(shaderProgram, 'uColor2'),
                isDark: gl.getUniformLocation(shaderProgram, 'uIsDark'),
            },
        };

        // Buffer setup
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        let animationId: number;
        let mouseX = 0.5;
        let mouseY = 0.5;

        const render = (time: number) => {
            resize(gl.canvas as HTMLCanvasElement);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(programInfo.program);

            gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);

            gl.uniform2f(programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height);
            gl.uniform2f(programInfo.uniformLocations.mouse, mouseX, mouseY);
            gl.uniform1f(programInfo.uniformLocations.time, time * 0.001);

            // Theme colors
            const isDark = theme === 'dark' || !theme;
            gl.uniform1i(programInfo.uniformLocations.isDark, isDark ? 1 : 0);

            if (isDark) {
                gl.uniform3f(programInfo.uniformLocations.color1, 0.25, 0.88, 0.82); // Cyan
                gl.uniform3f(programInfo.uniformLocations.color2, 0.69, 0.61, 0.85); // Purple
            } else {
                gl.uniform3f(programInfo.uniformLocations.color1, 0.0, 0.71, 0.85); // Darker Cyan
                gl.uniform3f(programInfo.uniformLocations.color2, 0.45, 0.04, 0.72); // Darker Purple
            }

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            animationId = requestAnimationFrame(render);
        };

        const resize = (canvas: HTMLCanvasElement) => {
            const displayWidth = canvas.clientWidth;
            const displayHeight = canvas.clientHeight;
            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = 1.0 - e.clientY / window.innerHeight; // Flip Y for WebGL
        };

        window.addEventListener('mousemove', handleMouseMove);
        animationId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30 mix-blend-screen dark:mix-blend-screen"
            style={{ zIndex: 0 }}
        />
    );
}
