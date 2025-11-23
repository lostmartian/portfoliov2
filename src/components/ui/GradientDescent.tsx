'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { TrendingDown, Navigation, Ruler } from 'lucide-react';

interface GradientDescentProps {
  learningRate: number;
}

interface PathPoint {
  x: number;
  y: number;
  height: number;
  gradMag: number;
}

interface TurnPoint {
  index: number;
  angle: number;
  position: { x: number; y: number };
}

export default function GradientDescent({ learningRate }: GradientDescentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  // Physics state
  const getRandomStartPoint = () => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.8 + Math.random() * 0.5; // Random radius between 0.8 and 1.3
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  const ballPos = useRef(getRandomStartPoint());
  const velocity = useRef({ x: 0.0, y: 0.0 });
  const pathHistory = useRef<PathPoint[]>([]);
  const turnPoints = useRef<TurnPoint[]>([]);
  const prevGradient = useRef({ dx: 0, dy: 0 });
  const stepCount = useRef(0);
  const totalDistance = useRef(0);

  // Analysis state
  const [currentHeight, setCurrentHeight] = useState(0);
  const [gradientMag, setGradientMag] = useState(0);
  const [distance, setDistance] = useState(0);
  const [turns, setTurns] = useState(0);
  const [steps, setSteps] = useState(0);
  const [lastTurn, setLastTurn] = useState<{ angle: number; stepsAgo: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Vertex Shader
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    // Fragment Shader (Terrain + Ball)
    const fsSource = `
      precision highp float;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uBallPos;
      uniform bool uIsDark;

      // Simple hash function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      // 2D Noise
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      // Height function (Loss Landscape)
      float height(vec2 p) {
        // Combination of sin waves and noise to create peaks/valleys
        float h = sin(p.x * 2.0) * cos(p.y * 2.0) * 0.5;
        h += noise(p * 3.0) * 0.3;
        h += 0.2 * (p.x * p.x + p.y * p.y); // Bowl shape to keep it centered
        return h;
      }

      vec3 getColor(float h) {
        // The height function outputs roughly:
        // - sin*cos term: -0.5 to 0.5
        // - noise term: 0 to 0.3
        // - bowl term: 0 to ~1.8 (at edges)
        // Total range: roughly -0.2 to 2.6
        // We want valleys (low h) to be blue, peaks (high h) to be red
        
        // Normalize to 0-1 range with better mapping
        // Use a wider range to ensure proper color distribution
        float t = clamp((h + 0.3) / 2.0, 0.0, 1.0);
        
        // Colors
        vec3 valley = vec3(0.0, 0.2, 1.0); // Neon Blue
        vec3 mid = vec3(0.5, 0.0, 1.0);    // Neon Purple
        vec3 peak = vec3(1.0, 0.0, 0.2);   // Neon Red
        
        // Light mode adjustments (pastel versions)
        if (!uIsDark) {
           valley = vec3(0.4, 0.6, 1.0);
           mid = vec3(0.7, 0.4, 1.0);
           peak = vec3(1.0, 0.4, 0.5);
        }
        
        // Three-stop gradient: blue -> purple -> red
        if (t < 0.5) return mix(valley, mid, t * 2.0);
        return mix(mid, peak, (t - 0.5) * 2.0);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
        uv *= 3.0; // Zoom out

        // Calculate height for rendering
        float h = height(uv);
        
        // Calculate normal for lighting
        vec2 eps = vec2(0.01, 0.0);
        vec3 normal = normalize(vec3(
          height(uv - eps.xy) - height(uv + eps.xy),
          2.0 * eps.x,
          height(uv - eps.yx) - height(uv + eps.yx)
        ));

        vec3 lightDir = normalize(vec3(0.5, 1.0, -0.5));
        float diff = max(dot(normal, lightDir), 0.0);
        
        // Contour lines
        float contour = step(0.95, fract(h * 10.0));
        
        // Base color from custom ramp
        vec3 col = getColor(h);
        
        col *= (0.6 + 0.4 * diff); // Apply lighting
        col += contour * 0.15; // Add contours

        // Draw Ball
        float d = length(uv - uBallPos);
        float ball = smoothstep(0.1, 0.08, d);
        col = mix(col, vec3(1.0, 1.0, 1.0), ball); // White ball
        
        // Ball Glow
        col += vec3(1.0, 0.8, 0.2) * (0.02 / (d + 0.01));

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader error: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const locations = {
      position: gl.getAttribLocation(program, 'aVertexPosition'),
      resolution: gl.getUniformLocation(program, 'uResolution'),
      time: gl.getUniformLocation(program, 'uTime'),
      ballPos: gl.getUniformLocation(program, 'uBallPos'),
      isDark: gl.getUniformLocation(program, 'uIsDark'),
    };

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]), gl.STATIC_DRAW);

    // Physics Logic (JS side)
    const calculateGradient = (x: number, y: number) => {
      const eps = 0.01;
      const h = (x: number, y: number) => {
        let val = Math.sin(x * 2.0) * Math.cos(y * 2.0) * 0.5;
        val += 0.2 * (x * x + y * y);
        return val;
      };

      const dx = (h(x + eps, y) - h(x - eps, y)) / (2 * eps);
      const dy = (h(x, y + eps) - h(x, y - eps)) / (2 * eps);
      return { dx, dy };
    };

    const calculateHeight = (x: number, y: number) => {
      let val = Math.sin(x * 2.0) * Math.cos(y * 2.0) * 0.5;
      val += 0.2 * (x * x + y * y);
      return val;
    };

    let animationId: number;
    let ctx2d: CanvasRenderingContext2D | null = null;

    const render = (time: number) => {
      // Check convergence - stop if gradient is very small
      const { dx, dy } = calculateGradient(ballPos.current.x, ballPos.current.y);
      const gradMag = Math.sqrt(dx * dx + dy * dy);

      // Convergence threshold - stop if gradient magnitude < 0.01
      if (gradMag < 0.01 && stepCount.current > 10) {
        // Don't update physics, just render
        resize(gl.canvas as HTMLCanvasElement);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.useProgram(program);

        gl.enableVertexAttribArray(locations.position);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0);

        gl.uniform2f(locations.resolution, gl.canvas.width, gl.canvas.height);
        gl.uniform1f(locations.time, time * 0.001);
        gl.uniform2f(locations.ballPos, ballPos.current.x, ballPos.current.y);

        const isDark = theme === 'dark' || !theme;
        gl.uniform1i(locations.isDark, isDark ? 1 : 0);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        animationId = requestAnimationFrame(render);
        return;
      }

      // Detect turns (angle change > 20 degrees)
      if (prevGradient.current.dx !== 0 || prevGradient.current.dy !== 0) {
        const prevMag = Math.sqrt(
          prevGradient.current.dx * prevGradient.current.dx +
          prevGradient.current.dy * prevGradient.current.dy
        );
        const dotProduct = dx * prevGradient.current.dx + dy * prevGradient.current.dy;
        const angle = Math.acos(Math.max(-1, Math.min(1, dotProduct / (gradMag * prevMag))));

        if (angle > Math.PI / 9 && stepCount.current > 5) { // 20 degrees (π/9 radians), after 5 steps
          turnPoints.current.push({
            index: stepCount.current,
            angle: angle * (180 / Math.PI),
            position: { x: ballPos.current.x, y: ballPos.current.y }
          });
          setTurns(turnPoints.current.length);
          setLastTurn({
            angle: angle * (180 / Math.PI),
            stepsAgo: 0
          });
        }
      }

      prevGradient.current = { dx, dy };

      // Momentum-based update
      const friction = 0.9;
      velocity.current.x = velocity.current.x * friction - learningRate * dx * 0.1;
      velocity.current.y = velocity.current.y * friction - learningRate * dy * 0.1;

      const prevX = ballPos.current.x;
      const prevY = ballPos.current.y;

      ballPos.current.x += velocity.current.x;
      ballPos.current.y += velocity.current.y;

      // Calculate distance traveled
      const stepDist = Math.sqrt(
        (ballPos.current.x - prevX) ** 2 +
        (ballPos.current.y - prevY) ** 2
      );
      totalDistance.current += stepDist;

      // Store path history
      const currentHeight = calculateHeight(ballPos.current.x, ballPos.current.y);
      pathHistory.current.push({
        x: ballPos.current.x,
        y: ballPos.current.y,
        height: currentHeight,
        gradMag: gradMag
      });

      // Limit history to 500 points
      if (pathHistory.current.length > 500) {
        pathHistory.current.shift();
      }

      stepCount.current++;

      // Update analysis state
      setCurrentHeight(currentHeight);
      setGradientMag(gradMag);
      setDistance(totalDistance.current);
      setSteps(stepCount.current);
      if (lastTurn) {
        setLastTurn({ ...lastTurn, stepsAgo: stepCount.current - turnPoints.current[turnPoints.current.length - 1]?.index || 0 });
      }

      // Render WebGL
      resize(gl.canvas as HTMLCanvasElement);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.useProgram(program);

      gl.enableVertexAttribArray(locations.position);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(locations.resolution, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(locations.time, time * 0.001);
      gl.uniform2f(locations.ballPos, ballPos.current.x, ballPos.current.y);

      const isDark = theme === 'dark' || !theme;
      gl.uniform1i(locations.isDark, isDark ? 1 : 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Draw path overlay using 2D canvas
      if (!ctx2d && canvas) {
        const overlay = document.createElement('canvas');
        overlay.width = canvas.width;
        overlay.height = canvas.height;
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.pointerEvents = 'none';
        canvas.parentElement?.appendChild(overlay);
        ctx2d = overlay.getContext('2d');
      }

      if (ctx2d && canvas) {
        const overlay = ctx2d.canvas;
        overlay.width = canvas.width;
        overlay.height = canvas.height;
        ctx2d.clearRect(0, 0, overlay.width, overlay.height);

        // Draw path line - Use EXACT inverse of WebGL transformation
        if (pathHistory.current.length > 1) {
          ctx2d.strokeStyle = 'rgba(64, 224, 208, 0.6)'; // Cyan
          ctx2d.lineWidth = 2;
          ctx2d.beginPath();

          pathHistory.current.forEach((point, i) => {
            // WebGL shader does: uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y; uv *= 3.0;
            // So ballPos is in UV space where: uv.x and uv.y are normalized by HEIGHT
            // Inverse: gl_FragCoord.xy = (uv / 3.0) * height + 0.5 * resolution
            const uvX = point.x / 3.0;
            const uvY = point.y / 3.0;

            const screenX = uvX * overlay.height + overlay.width / 2;
            const screenY = -uvY * overlay.height + overlay.height / 2; // Flip Y for canvas

            if (i === 0) {
              ctx2d!.moveTo(screenX, screenY);
            } else {
              ctx2d!.lineTo(screenX, screenY);
            }
          });

          ctx2d.stroke();

          // Turn points removed per user request
          /*
          turnPoints.current.forEach(turn => {
            const uvX = turn.position.x / 3.0;
            const uvY = turn.position.y / 3.0;
            
            const screenX = uvX * overlay.height + overlay.width / 2;
            const screenY = -uvY * overlay.height + overlay.height / 2;

            ctx2d!.fillStyle = 'rgba(255, 100, 100, 0.8)';
            ctx2d!.beginPath();
            ctx2d!.arc(screenX, screenY, 5, 0, Math.PI * 2);
            ctx2d!.fill();

            ctx2d!.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx2d!.lineWidth = 1;
            ctx2d!.stroke();
          });
          */
        }
      }

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

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Use exact inverse of WebGL transformation
      // WebGL: uv = (gl_FragCoord.xy - 0.5 * resolution) / height; uv *= 3.0
      // Inverse: uv = ((click - 0.5 * resolution) / height) * 3.0
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const x = ((clickX - rect.width / 2) / rect.height) * 3.0;
      const y = -((clickY - rect.height / 2) / rect.height) * 3.0; // Flip Y

      ballPos.current = { x, y };
      velocity.current = { x: 0, y: 0 };
      pathHistory.current = [];
      turnPoints.current = [];
      prevGradient.current = { dx: 0, dy: 0 };
      stepCount.current = 0;
      totalDistance.current = 0;
      setTurns(0);
      setSteps(0);
      setDistance(0);
      setLastTurn(null);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.touches[0].clientX - rect.left;
        const clickY = e.touches[0].clientY - rect.top;

        const x = ((clickX - rect.width / 2) / rect.height) * 3.0;
        const y = -((clickY - rect.height / 2) / rect.height) * 3.0; // Flip Y

        ballPos.current = { x, y };
        velocity.current = { x: 0, y: 0 };
        pathHistory.current = [];
        turnPoints.current = [];
        prevGradient.current = { dx: 0, dy: 0 };
        stepCount.current = 0;
        totalDistance.current = 0;
        setTurns(0);
        setSteps(0);
        setDistance(0);
        setLastTurn(null);
      }
    };

    // Use existing canvas variable from outer scope
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('touchstart', handleTouchStart);

    animationId = requestAnimationFrame(render);

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('touchstart', handleTouchStart);
      }
      cancelAnimationFrame(animationId);
      // Clean up overlay canvas
      if (ctx2d) {
        ctx2d.canvas.remove();
      }
    };
  }, [theme, learningRate]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair opacity-60"
        style={{ zIndex: 0 }}
      />

      {/* Analysis Panel */}
      {steps > 0 && (
        <div className="absolute top-24 right-4 md:top-32 md:right-8 z-20 w-64 md:w-72 pointer-events-auto">
          <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-3 text-[var(--text-primary)] border-b border-[var(--glass-border)] pb-2">
              <TrendingDown size={16} className="text-[var(--neon-cyan)]" />
              <h3 className="text-sm font-bold">Optimization Analysis</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-muted)]">Loss J(θ):</span>
                <span className="font-mono text-[var(--text-primary)] font-bold">{currentHeight.toFixed(4)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[var(--text-muted)]">Gradient ||∇J||:</span>
                <span className="font-mono text-[var(--text-primary)]">{gradientMag.toFixed(4)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[var(--text-muted)]">Distance:</span>
                <span className="font-mono text-[var(--text-primary)]">{distance.toFixed(2)} units</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[var(--text-muted)]">Turns:</span>
                <span className="font-mono text-[var(--text-primary)]">{turns}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[var(--text-muted)]">Steps:</span>
                <span className="font-mono text-[var(--text-primary)]">#{steps}</span>
              </div>

              {lastTurn && (
                <>
                  <div className="border-t border-[var(--glass-border)] my-2 pt-2">
                    <div className="text-[var(--text-muted)] mb-1 flex items-center gap-1">
                      <Navigation size={12} />
                      <span>Last Turn:</span>
                    </div>
                    <div className="flex justify-between items-center pl-4">
                      <span className="text-[var(--text-muted)]">Angle:</span>
                      <span className="font-mono text-[var(--neon-pink)]">{lastTurn.angle.toFixed(1)}°</span>
                    </div>
                    <div className="flex justify-between items-center pl-4">
                      <span className="text-[var(--text-muted)]">Steps ago:</span>
                      <span className="font-mono text-[var(--text-secondary)]">{lastTurn.stepsAgo}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-3 pt-2 border-t border-[var(--glass-border)]">
              <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                <Ruler size={10} />
                <span>Cyan line: path | Red dots: turns</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
