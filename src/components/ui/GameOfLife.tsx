'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function GameOfLife() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Configuration
        const CELL_SIZE = 4; // Smaller cells for higher resolution
        const TRAIL_LENGTH = 0.9; // How much previous frame persists (0-1)
        const SPAWN_RATE = 0.3; // Probability of spawning a cell on mouse move

        let animationId: number;
        let cols: number;
        let rows: number;
        let grid: number[][];
        let nextGrid: number[][];
        let width: number;
        let height: number;

        // Colors based on theme
        const getColors = () => {
            const isDark = theme === 'dark' || !theme; // Default to dark if undefined
            return {
                bg: isDark ? 'rgba(15, 5, 24, 0.1)' : 'rgba(248, 243, 255, 0.1)', // Transparent bg for trail
                alive: isDark ? [64, 224, 208] : [114, 9, 183], // Cyan / Purple
                trail: isDark ? 'rgba(177, 156, 217, 0.1)' : 'rgba(0, 180, 216, 0.1)', // Purple / Cyan trail
            };
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            cols = Math.ceil(width / CELL_SIZE);
            rows = Math.ceil(height / CELL_SIZE);

            // Initialize grid
            grid = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
            nextGrid = new Array(cols).fill(0).map(() => new Array(rows).fill(0));

            // Random initial state (sparse)
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    grid[i][j] = Math.random() > 0.9 ? 1 : 0;
                }
            }
        };

        const draw = () => {
            const colors = getColors();

            // Fade effect for trails
            ctx.fillStyle = colors.bg;
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = `rgb(${colors.alive.join(',')})`;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    if (grid[i][j]) {
                        ctx.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    }
                }
            }
        };

        const update = () => {
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const state = grid[i][j];

                    // Count neighbors
                    let neighbors = 0;
                    for (let x = -1; x <= 1; x++) {
                        for (let y = -1; y <= 1; y++) {
                            if (x === 0 && y === 0) continue;
                            const col = (i + x + cols) % cols;
                            const row = (j + y + rows) % rows;
                            neighbors += grid[col][row];
                        }
                    }

                    // Rules
                    if (state === 0 && neighbors === 3) {
                        nextGrid[i][j] = 1;
                    } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                        nextGrid[i][j] = 0;
                    } else {
                        nextGrid[i][j] = state;
                    }
                }
            }

            // Swap grids
            [grid, nextGrid] = [nextGrid, grid];
        };

        const loop = () => {
            draw();
            update();
            animationId = requestAnimationFrame(loop);
        };

        // Mouse interaction
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
            const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);

            // Paint cells around cursor
            const brushSize = 2;
            for (let i = -brushSize; i <= brushSize; i++) {
                for (let j = -brushSize; j <= brushSize; j++) {
                    const col = (x + i + cols) % cols;
                    const row = (y + j + rows) % rows;
                    if (Math.random() > 1 - SPAWN_RATE) {
                        grid[col][row] = 1;
                    }
                }
            }
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        loop();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen dark:mix-blend-screen"
            style={{ zIndex: 0 }}
        />
    );
}
