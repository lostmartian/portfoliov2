'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { Search, ZoomIn, ZoomOut, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data: Concept Clusters ---
type Category = 'ai' | 'frontend' | 'backend' | 'data' | 'cloud';

interface Concept {
    id: string;
    label: string;
    category: Category;
    pos: [number, number, number]; // x, y, z
}

const generateConcepts = (): Concept[] => {
    const concepts: Concept[] = [];

    const addCluster = (category: Category, items: string[], center: [number, number, number]) => {
        items.forEach((label, i) => {
            // Distribute around center
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1.0 + Math.random() * 1.5; // Tighter clusters

            const x = center[0] + r * Math.sin(phi) * Math.cos(theta);
            const y = center[1] + r * Math.sin(phi) * Math.sin(theta);
            const z = center[2] + r * Math.cos(phi);

            concepts.push({
                id: label.toLowerCase().replace(/\s+/g, '-'),
                label,
                category,
                pos: [x, y, z]
            });
        });
    };

    addCluster('ai', ['LLMs', 'Transformers', 'RAG', 'PyTorch', 'OpenCV', 'Computer Vision', 'Neural Networks', 'Deep Learning', 'Embeddings', 'Vector DB', 'LangChain', 'HuggingFace', 'TensorFlow', 'Keras', 'NLP'], [-4, 2, 0]);
    addCluster('frontend', ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'WebGL', 'HTML5', 'CSS3', 'JavaScript', 'UI/UX', 'Responsive', 'State Management', 'Redux'], [4, 2, 0]);
    addCluster('backend', ['Node.js', 'Python', 'Go', 'API Design', 'Microservices', 'GraphQL', 'REST', 'Authentication', 'System Design', 'Performance', 'Caching', 'Redis', 'WebSockets'], [0, -3, 2]);
    addCluster('data', ['PostgreSQL', 'MongoDB', 'SQL', 'NoSQL', 'Data Modeling', 'ETL Pipelines', 'Analytics', 'Big Data', 'Pandas', 'NumPy'], [-3, -3, -2]);
    addCluster('cloud', ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Serverless', 'Lambda', 'EC2', 'S3', 'Cloud Native', 'DevOps'], [3, -3, -2]);

    return concepts;
};

// --- Math Helpers ---
const Mat4 = {
    perspective: (out: Float32Array, fovy: number, aspect: number, near: number, far: number) => {
        const f = 1.0 / Math.tan(fovy / 2);
        const nf = 1 / (near - far);
        out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0;
        out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0;
        out[8] = 0; out[9] = 0; out[10] = (far + near) * nf; out[11] = -1;
        out[12] = 0; out[13] = 0; out[14] = (2 * far * near) * nf; out[15] = 0;
    },
    lookAt: (out: Float32Array, eye: number[], center: number[], up: number[]) => {
        let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
        let eyex = eye[0], eyey = eye[1], eyez = eye[2];
        let upx = up[0], upy = up[1], upz = up[2];
        let centerx = center[0], centery = center[1], centerz = center[2];

        z0 = eyex - centerx; z1 = eyey - centery; z2 = eyez - centerz;
        len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len; z1 *= len; z2 *= len;

        x0 = upy * z2 - upz * z1; x1 = upz * z0 - upx * z2; x2 = upx * z1 - upy * z0;
        len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!len) { x0 = 0; x1 = 0; x2 = 0; } else { len = 1 / len; x0 *= len; x1 *= len; x2 *= len; }

        y0 = z1 * x2 - z2 * x1; y1 = z2 * x0 - z0 * x2; y2 = z0 * x1 - z1 * x0;
        len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!len) { y0 = 0; y1 = 0; y2 = 0; } else { len = 1 / len; y0 *= len; y1 *= len; y2 *= len; }

        out[0] = x0; out[1] = y0; out[2] = z0; out[3] = 0;
        out[4] = x1; out[5] = y1; out[6] = z1; out[7] = 0;
        out[8] = x2; out[9] = y2; out[10] = z2; out[11] = 0;
        out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        out[15] = 1;
    }
};

export default function NeuralSearch() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const [query, setQuery] = useState('');

    // Camera State
    const cameraState = useRef({
        radius: 14,
        theta: Math.PI / 4, // Vertical angle
        phi: Math.PI / 4,   // Horizontal angle
        target: [0, 0, 0]
    });

    // Touch handling state
    const touchStart = useRef<{ x: number, y: number } | null>(null);
    const lastTouchTime = useRef<number>(0);

    // Data
    const concepts = useMemo(() => generateConcepts(), []);
    const [searchResults, setSearchResults] = useState<Record<string, number>>({}); // id -> distance
    const [relevanceScores, setRelevanceScores] = useState<Record<string, number>>({}); // id -> 0.0 to 1.0
    const [topResults, setTopResults] = useState<{ id: string, label: string, distance: number }[]>([]);
    const [labelPositions, setLabelPositions] = useState<Record<string, { x: number, y: number, visible: boolean, scale: number }>>({});

    // Search Logic: True Distance Attenuation & Top 5
    useEffect(() => {
        if (!query) {
            setSearchResults({});
            setRelevanceScores({});
            setTopResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        // Find best match
        const bestMatch = concepts.find(c => c.label.toLowerCase().includes(lowerQuery));

        const results: Record<string, number> = {};
        const scores: Record<string, number> = {};
        const allDistances: { id: string, label: string, distance: number }[] = [];

        if (bestMatch) {
            // Calculate distances from best match to ALL points
            concepts.forEach(c => {
                const dx = c.pos[0] - bestMatch.pos[0];
                const dy = c.pos[1] - bestMatch.pos[1];
                const dz = c.pos[2] - bestMatch.pos[2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                // Relevance formula: 1.0 at dist 0, decays quickly
                const relevance = 1.0 / (1.0 + dist * 1.5);

                scores[c.id] = relevance;
                allDistances.push({ id: c.id, label: c.label, distance: dist });

                // Only show distance text for reasonably close items
                if (relevance > 0.2) {
                    results[c.id] = dist;
                }
            });

            // Sort by distance and take top 5
            allDistances.sort((a, b) => a.distance - b.distance);
            setTopResults(allDistances.slice(0, 5));

        } else {
            // Fallback: just show matches by name
            concepts.forEach(c => {
                if (c.label.toLowerCase().includes(lowerQuery)) {
                    scores[c.id] = 1.0;
                    results[c.id] = 0;
                    allDistances.push({ id: c.id, label: c.label, distance: 0 });
                } else {
                    scores[c.id] = 0.0;
                }
            });
            setTopResults(allDistances.slice(0, 5));
        }
        setSearchResults(results);
        setRelevanceScores(scores);
    }, [query, concepts]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
        if (!gl) return;

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.disable(gl.DEPTH_TEST);

        // --- Shaders ---
        const vsSource = `
      attribute vec3 aPosition;
      attribute float aSize;
      attribute vec3 aColor;
      attribute float aRelevance; // 0.0 to 1.0
      
      uniform mat4 uProjectionMatrix;
      uniform mat4 uViewMatrix;
      
      varying vec3 vColor;
      varying float vAlpha;
      varying float vRelevance;

      void main() {
        vec4 mvPosition = uViewMatrix * vec4(aPosition, 1.0);
        gl_Position = uProjectionMatrix * mvPosition;
        
        // Size attenuation
        float baseSize = aSize * (400.0 / -mvPosition.z);
        
        // Size based on relevance
        // Inactive: small dot (2px)
        // Active: larger dot (up to 6px)
        float sizeMult = mix(0.5, 1.5, aRelevance);
        gl_PointSize = baseSize * sizeMult;
        
        // Alpha based on relevance
        // Inactive: very dim (0.2)
        // Active: bright (1.0)
        vAlpha = mix(0.3, 1.0, aRelevance);
        
        vColor = aColor;
        vRelevance = aRelevance;
      }
    `;

        const fsSource = `
      precision highp float;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vRelevance;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float r = length(coord);
        if (r > 0.5) discard;
        
        // Sharp circle, no glow
        // Slight anti-aliasing at edge
        float alpha = 1.0 - smoothstep(0.4, 0.5, r);
        
        vec3 finalColor = vColor;
        // Mix to white if highly relevant
        if (vRelevance > 0.8) {
          finalColor = mix(finalColor, vec3(1.0), (vRelevance - 0.8) * 2.0);
        }

        gl_FragColor = vec4(finalColor, vAlpha * alpha);
      }
    `;

        // Line Shader (Axes)
        const lineVsSource = `
      attribute vec3 aPosition;
      attribute vec3 aColor;
      uniform mat4 uProjectionMatrix;
      uniform mat4 uViewMatrix;
      varying vec3 vColor;
      void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * vec4(aPosition, 1.0);
        vColor = aColor;
      }
    `;

        const lineFsSource = `
      precision highp float;
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4(vColor, 0.5);
      }
    `;

        const createProgram = (vs: string, fs: string) => {
            const program = gl.createProgram();
            if (!program) return null;
            const vShader = gl.createShader(gl.VERTEX_SHADER)!;
            gl.shaderSource(vShader, vs);
            gl.compileShader(vShader);
            const fShader = gl.createShader(gl.FRAGMENT_SHADER)!;
            gl.shaderSource(fShader, fs);
            gl.compileShader(fShader);
            gl.attachShader(program, vShader);
            gl.attachShader(program, fShader);
            gl.linkProgram(program);
            return program;
        };

        const particleProgram = createProgram(vsSource, fsSource)!;
        const lineProgram = createProgram(lineVsSource, lineFsSource)!;

        // --- Buffers ---
        const positions = new Float32Array(concepts.length * 3);
        const sizes = new Float32Array(concepts.length);
        const colors = new Float32Array(concepts.length * 3);
        const relevance = new Float32Array(concepts.length);

        concepts.forEach((c, i) => {
            positions[i * 3] = c.pos[0];
            positions[i * 3 + 1] = c.pos[1];
            positions[i * 3 + 2] = c.pos[2];

            sizes[i] = 4.0; // Base size smaller

            let col = [1, 1, 1];
            const isDark = theme === 'dark' || !theme;

            if (isDark) {
                // Neon colors for dark mode
                if (c.category === 'ai') col = [0.8, 0, 1];
                else if (c.category === 'frontend') col = [0, 1, 1];
                else if (c.category === 'backend') col = [0.2, 0.4, 1];
                else if (c.category === 'data') col = [1, 0, 0.5];
                else if (c.category === 'cloud') col = [1, 0.6, 0];
            } else {
                // Darker/Richer colors for light mode (to stand out on white)
                if (c.category === 'ai') col = [0.5, 0, 0.7]; // Dark Purple
                else if (c.category === 'frontend') col = [0, 0.6, 0.6]; // Dark Teal
                else if (c.category === 'backend') col = [0.1, 0.2, 0.8]; // Dark Blue
                else if (c.category === 'data') col = [0.8, 0, 0.3]; // Dark Red/Pink
                else if (c.category === 'cloud') col = [0.9, 0.4, 0]; // Dark Orange
            }

            colors[i * 3] = col[0];
            colors[i * 3 + 1] = col[1];
            colors[i * 3 + 2] = col[2];
        });

        const posBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const sizeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

        const relevanceBuffer = gl.createBuffer();

        // Axis Buffers
        const axisVerts = new Float32Array([
            0, 0, 0, 5, 0, 0, // X
            0, 0, 0, 0, 5, 0, // Y
            0, 0, 0, 0, 0, 5  // Z
        ]);
        const axisColors = new Float32Array([
            1, 0, 0, 1, 0, 0,
            0, 1, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 1
        ]);
        const axisPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, axisPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, axisVerts, gl.STATIC_DRAW);
        const axisColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, axisColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, axisColors, gl.STATIC_DRAW);

        // --- Render Loop ---
        let animationId: number;
        const projMatrix = new Float32Array(16);
        const viewMatrix = new Float32Array(16);

        const render = (time: number) => {
            // Update relevance buffer
            concepts.forEach((c, i) => {
                // Default relevance is low (0.0) unless set
                relevance[i] = relevanceScores[c.id] !== undefined ? relevanceScores[c.id] : 0.0;
            });
            gl.bindBuffer(gl.ARRAY_BUFFER, relevanceBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, relevance, gl.DYNAMIC_DRAW);

            // Camera Math
            const camX = cameraState.current.radius * Math.sin(cameraState.current.phi) * Math.cos(cameraState.current.theta);
            const camY = cameraState.current.radius * Math.cos(cameraState.current.phi);
            const camZ = cameraState.current.radius * Math.sin(cameraState.current.phi) * Math.sin(cameraState.current.theta);

            // Viewport
            const displayWidth = canvas.clientWidth;
            const displayHeight = canvas.clientHeight;
            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
            }
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            const aspect = canvas.width / canvas.height;
            Mat4.perspective(projMatrix, Math.PI / 4, aspect, 0.1, 100.0);
            // Look at a point higher up (y=3) to shift the graph down in the viewport
            Mat4.lookAt(viewMatrix, [camX, camY + 2, camZ], [0, 2, 0], [0, 1, 0]);

            // 1. Draw Axes
            gl.useProgram(lineProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, axisPosBuffer);
            const aLinePos = gl.getAttribLocation(lineProgram, 'aPosition');
            gl.enableVertexAttribArray(aLinePos);
            gl.vertexAttribPointer(aLinePos, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, axisColorBuffer);
            const aLineCol = gl.getAttribLocation(lineProgram, 'aColor');
            gl.enableVertexAttribArray(aLineCol);
            gl.vertexAttribPointer(aLineCol, 3, gl.FLOAT, false, 0, 0);

            gl.uniformMatrix4fv(gl.getUniformLocation(lineProgram, 'uProjectionMatrix'), false, projMatrix);
            gl.uniformMatrix4fv(gl.getUniformLocation(lineProgram, 'uViewMatrix'), false, viewMatrix);
            gl.drawArrays(gl.LINES, 0, 6);

            // 2. Draw Particles
            gl.useProgram(particleProgram);

            gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
            const aPos = gl.getAttribLocation(particleProgram, 'aPosition');
            gl.enableVertexAttribArray(aPos);
            gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
            const aSize = gl.getAttribLocation(particleProgram, 'aSize');
            gl.enableVertexAttribArray(aSize);
            gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            const aColor = gl.getAttribLocation(particleProgram, 'aColor');
            gl.enableVertexAttribArray(aColor);
            gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, relevanceBuffer);
            const aRelevance = gl.getAttribLocation(particleProgram, 'aRelevance');
            gl.enableVertexAttribArray(aRelevance);
            gl.vertexAttribPointer(aRelevance, 1, gl.FLOAT, false, 0, 0);

            gl.uniformMatrix4fv(gl.getUniformLocation(particleProgram, 'uProjectionMatrix'), false, projMatrix);
            gl.uniformMatrix4fv(gl.getUniformLocation(particleProgram, 'uViewMatrix'), false, viewMatrix);

            gl.drawArrays(gl.POINTS, 0, concepts.length);

            // 3. Project Labels
            const newLabelPositions: Record<string, { x: number, y: number, visible: boolean, scale: number }> = {};

            concepts.forEach(c => {
                const x = c.pos[0]; const y = c.pos[1]; const z = c.pos[2];

                // View Transform
                const v0 = x; const v1 = y; const v2 = z; const v3 = 1.0;
                const mv0 = viewMatrix[0] * v0 + viewMatrix[4] * v1 + viewMatrix[8] * v2 + viewMatrix[12] * v3;
                const mv1 = viewMatrix[1] * v0 + viewMatrix[5] * v1 + viewMatrix[9] * v2 + viewMatrix[13] * v3;
                const mv2 = viewMatrix[2] * v0 + viewMatrix[6] * v1 + viewMatrix[10] * v2 + viewMatrix[14] * v3;
                const mv3 = viewMatrix[3] * v0 + viewMatrix[7] * v1 + viewMatrix[11] * v2 + viewMatrix[15] * v3;

                // Clip
                const cp0 = projMatrix[0] * mv0 + projMatrix[4] * mv1 + projMatrix[8] * mv2 + projMatrix[12] * mv3;
                const cp1 = projMatrix[1] * mv0 + projMatrix[5] * mv1 + projMatrix[9] * mv2 + projMatrix[13] * mv3;
                const cp3 = projMatrix[3] * mv0 + projMatrix[7] * mv1 + projMatrix[11] * mv2 + projMatrix[15] * mv3;

                // NDC
                const ndc0 = cp0 / cp3;
                const ndc1 = cp1 / cp3;

                // Screen
                const screenX = (ndc0 + 1) * 0.5 * canvas.width;
                const screenY = (1 - ndc1) * 0.5 * canvas.height;

                // Visibility check (in front of camera)
                const visible = cp3 > 0 && ndc0 >= -1.2 && ndc0 <= 1.2 && ndc1 >= -1.2 && ndc1 <= 1.2;

                if (visible) {
                    newLabelPositions[c.id] = {
                        x: screenX,
                        y: screenY,
                        visible: true,
                        scale: 300.0 / -mv2
                    };
                }
            });

            setLabelPositions(newLabelPositions);

            animationId = requestAnimationFrame(render);
        };

        animationId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [concepts, relevanceScores]); // Re-bind when relevance changes

    // Touch Event Handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStart.current || e.touches.length !== 1) return;

        const deltaX = e.touches[0].clientX - touchStart.current.x;
        const deltaY = e.touches[0].clientY - touchStart.current.y;

        // Sensitivity factor
        const sensitivity = 0.005;

        rotate(-deltaX * sensitivity, -deltaY * sensitivity);

        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
        touchStart.current = null;
    };

    // UI Control Handlers
    const rotate = (dTheta: number, dPhi: number) => {
        cameraState.current.theta += dTheta;
        cameraState.current.phi += dPhi;
        // Clamp phi
        cameraState.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraState.current.phi));
    };

    const zoom = (delta: number) => {
        cameraState.current.radius += delta;
        cameraState.current.radius = Math.max(5, Math.min(30, cameraState.current.radius));
    };

    const resetCamera = () => {
        cameraState.current = {
            radius: 14,
            theta: Math.PI / 4,
            phi: Math.PI / 4,
            target: [0, 0, 0]
        };
    };

    return (
        <div
            className="absolute inset-0 w-full h-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 0 }}
            />

            {/* Search Interface */}
            <div className="absolute top-24 md:top-32 left-1/2 transform -translate-x-1/2 z-20 w-[90%] md:w-full max-w-md px-0 md:px-4 pointer-events-auto">
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="relative flex items-center bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full px-4 py-3 shadow-2xl backdrop-blur-xl">
                        <Search className="w-5 h-5 text-[var(--text-muted)] mr-3" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search concepts..."
                            className="bg-transparent border-none outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)] w-full font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* Top 5 Results Table */}
            <AnimatePresence>
                {query && topResults.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute top-[calc(100vh-280px)] md:top-32 left-4 md:left-auto md:right-8 z-20 w-[calc(100%-2rem)] md:w-64 pointer-events-auto"
                    >
                        <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl p-4 shadow-2xl backdrop-blur-xl">
                            <div className="flex items-center gap-2 mb-3 text-[var(--text-primary)]">
                                <Database size={16} className="text-[var(--neon-purple)]" />
                                <h3 className="text-sm font-bold">Nearest Neighbors</h3>
                            </div>

                            <div className="space-y-2">
                                <div className="grid grid-cols-[1fr_auto] text-[10px] text-[var(--text-muted)] uppercase tracking-wider px-2 pb-1 border-b border-[var(--glass-border)]">
                                    <span>Concept</span>
                                    <span>Distance</span>
                                </div>

                                {topResults.map((result, index) => (
                                    <motion.div
                                        key={result.id}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`grid grid-cols-[1fr_auto] items-center px-2 py-1.5 rounded-md text-xs ${index === 0
                                            ? 'bg-[var(--glass-highlight)] text-[var(--text-primary)] font-bold'
                                            : 'text-[var(--text-secondary)] hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] w-4 ${index === 0 ? 'text-[var(--neon-cyan)]' : 'text-[var(--text-muted)]'}`}>
                                                #{index + 1}
                                            </span>
                                            <span>{result.label}</span>
                                        </div>
                                        <span className="font-mono text-[10px] opacity-80">
                                            {result.distance.toFixed(3)}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dedicated Controls */}
            <div className="absolute top-24 left-4 md:top-32 md:left-8 z-30 flex flex-col gap-2 pointer-events-auto scale-90 md:scale-100 origin-top-left">
                <div className="flex gap-2 justify-center">
                    <button onClick={() => rotate(0, -0.1)} className="p-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-highlight)] transition-colors">
                        <ArrowUp size={16} className="text-[var(--text-primary)]" />
                    </button>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => rotate(-0.1, 0)} className="p-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-highlight)] transition-colors">
                        <ArrowLeft size={16} className="text-[var(--text-primary)]" />
                    </button>
                    <button onClick={resetCamera} className="p-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-highlight)] transition-colors">
                        <RotateCcw size={16} className="text-[var(--text-primary)]" />
                    </button>
                    <button onClick={() => rotate(0.1, 0)} className="p-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-highlight)] transition-colors">
                        <ArrowRight size={16} className="text-[var(--text-primary)]" />
                    </button>
                </div>
                <div className="flex gap-2 justify-center">
                    <button onClick={() => rotate(0, 0.1)} className="p-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-highlight)] transition-colors">
                        <ArrowDown size={16} className="text-[var(--text-primary)]" />
                    </button>
                </div>
                <div className="flex gap-2 justify-center mt-2">
                    <button onClick={() => zoom(-2)} className="p-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-highlight)] transition-colors">
                        <ZoomIn size={16} className="text-[var(--text-primary)]" />
                    </button>
                    <button onClick={() => zoom(2)} className="p-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-highlight)] transition-colors">
                        <ZoomOut size={16} className="text-[var(--text-primary)]" />
                    </button>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {concepts.map((concept) => {
                    const pos = labelPositions[concept.id];
                    if (!pos || !pos.visible) return null;

                    const relevance = relevanceScores[concept.id] || 0;
                    const isActive = relevance > 0.1;
                    const distance = searchResults[concept.id];

                    // Occlusion culling: if too many labels, only show active ones
                    if (!isActive && query.length > 0) return null;

                    return (
                        <div
                            key={concept.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                            style={{
                                left: pos.x,
                                top: pos.y,
                                zIndex: isActive ? 20 : 10,
                                opacity: isActive ? 1 : 0.4,
                                scale: isActive ? 1.1 : 0.8
                            }}
                        >
                            <div className={`flex flex-col items-center ${isActive ? 'scale-110' : ''}`}>
                                <div className={`px-2 py-1 rounded-md backdrop-blur-sm border transition-colors ${isActive
                                    ? 'bg-[var(--glass-highlight)] border-[var(--neon-cyan)] shadow-[0_0_10px_rgba(0,255,255,0.3)]'
                                    : 'bg-black/10 border-transparent'
                                    }`}>
                                    <span className={`text-[10px] font-bold whitespace-nowrap ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                                        }`}>
                                        {concept.label}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
