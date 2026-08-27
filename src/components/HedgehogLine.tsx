"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hedgehog on the navbar border line.
 * A tiny hedgehog ambles along the bottom border of the header.
 * It walks slowly in one direction, pauses to sniff, then continues.
 * When the cursor gets close, it curls into a ball (spikes out) until
 * the danger passes. Pure CSS animation, no dependencies.
 */

type Phase = "walk" | "sniff" | "curl";

export default function HedgehogLine() {
  const [phase, setPhase] = useState<Phase>("walk");
  const [pos, setPos] = useState<number | null>(null); // null = not mounted
  const [dir, setDir] = useState<1 | -1>(1);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const phaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Random horizontal starting position within 10%-90% of viewport
    setPos(10 + Math.random() * 80);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (phaseTimer.current) clearTimeout(phaseTimer.current);
    };
  }, []);

  // Danger check: is the cursor near the header line? -> curl
  useEffect(() => {
    const id = setInterval(() => {
      if (pos === null) return;
      const { x, y } = mouseRef.current;
      const px = (pos / 100) * window.innerWidth;
      const nearHeader = y < 90;
      const nearMe = Math.abs(x - px) < 90 && y < 140;
      if (nearHeader && nearMe) {
        setPhase((p) => (p !== "curl" ? "curl" : p));
      } else {
        setPhase((p) => (p === "curl" ? "walk" : p));
      }
    }, 200);
    return () => clearInterval(id);
  }, [pos]);

  // Movement loop: walk -> sniff -> walk...
  useEffect(() => {
    if (pos === null || phase === "curl") return;

    if (phase === "sniff") {
      phaseTimer.current = setTimeout(() => {
        // Occasionally turn around after sniffing
        if (Math.random() < 0.35) setDir((d) => (d === 1 ? -1 : 1));
        setPhase("walk");
      }, 1200 + Math.random() * 1500);
      return () => {
        if (phaseTimer.current) clearTimeout(phaseTimer.current);
      };
    }

    const speed = 0.06; // % of width per tick
    const id = setInterval(() => {
      setPos((p) => {
        if (p === null) return p;
        let next = p + dir * speed;
        // Bounce at edges
        if (next < 4 || next > 96) {
          setDir((d) => (d === 1 ? -1 : 1));
          next = Math.min(96, Math.max(4, next));
          setPhase("sniff");
        }
        // Random sniff break
        if (Math.random() < 0.012) setPhase("sniff");
        return next;
      });
    }, 40);
    return () => clearInterval(id);
  }, [pos === null, phase, dir]);

  if (pos === null) {
    return <div className="h-0" aria-hidden="true" />;
  }

  return (
    <div
      className="pointer-events-none absolute -bottom-[9px] z-20"
      style={{ left: `${pos}%`, transform: `translateX(-50%)` }}
      aria-hidden="true"
    >
      {phase === "curl" ? (
        /* Curled into a ball */
        <svg width="26" height="22" viewBox="0 0 26 22" className="drop-shadow-sm">
          <circle cx="13" cy="12" r="8.5" fill="#8a6d4f" />
          {/* Spikes */}
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            const x1 = 13 + Math.cos(a) * 8;
            const y1 = 12 + Math.sin(a) * 8;
            const x2 = 13 + Math.cos(a) * 11.5;
            const y2 = 12 + Math.sin(a) * 11.5;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#5c4430"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            );
          })}
          <circle cx="13" cy="12" r="3.2" fill="#a8845f" />
        </svg>
      ) : (
        /* Walking / sniffing hedgehog */
        <svg
          width="34"
          height="20"
          viewBox="0 0 34 20"
          className="drop-shadow-sm"
          style={{
            transform: `scaleX(${dir === 1 ? 1 : -1})`,
            transition: "transform 0.3s ease",
          }}
        >
          {/* Snout */}
          <circle cx="31" cy="14.5" r="2.6" fill="#c99e73">
            {phase === "sniff" && (
              <animate
                attributeName="cy"
                values="14.5;13.6;14.5;13.6;14.5"
                dur="0.7s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="32" cy="14.2" r="0.9" fill="#3d2c1e" />
          {/* Face */}
          <path d="M 26 17 Q 29 15 31 13.5 Q 27 12 24 13 Z" fill="#c99e73" />
          {/* Eye */}
          <circle cx="27.4" cy="13.6" r="0.8" fill="#241a10" />
          {/* Body (brown) */}
          <ellipse cx="17" cy="14.5" rx="10" ry="5.2" fill="#c99e73" />
          {/* Spiky back */}
          <path
            d="M 6 14 Q 6 4 14 3.2 Q 22 2.6 26 11 L 24 15.5 Q 16 11.5 8 16 Z"
            fill="#6d5138"
          />
          {/* Spike ticks */}
          {Array.from({ length: 6 }).map((_, i) => {
            const x = 8 + i * 3.2;
            const y = 9.5 - Math.sin((i / 6) * Math.PI) * 5.2;
            return (
              <line
                key={i}
                x1={x} y1={y + 2.5} x2={x - 0.6} y2={y - 0.4}
                stroke="#4a3423"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            );
          })}
          {/* Legs (walk animation) */}
          <g>
            <line x1="11" y1="17.5" x2="10" y2="20" stroke="#8a6d4f" strokeWidth="1.8" strokeLinecap="round">
              {phase === "walk" && (
                <animate attributeName="x2" values="10;12;10" dur="0.45s" repeatCount="indefinite" />
              )}
            </line>
            <line x1="22" y1="17.5" x2="23" y2="20" stroke="#8a6d4f" strokeWidth="1.8" strokeLinecap="round">
              {phase === "walk" && (
                <animate attributeName="x2" values="23;21;23" dur="0.45s" repeatCount="indefinite" />
              )}
            </line>
          </g>
        </svg>
      )}
    </div>
  );
}
