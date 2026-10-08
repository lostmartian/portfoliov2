"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Optional sound, off by default and remembered per visitor.
 * Everything is synthesised with Web Audio: a soft wooden tick on clicks and a
 * quiet tanpura-style drone (Pa · Sa · Sa · low Sa plucks) while the hero is on screen.
 */

const KEY = "sound";

function readPref() {
  try {
    return localStorage.getItem(KEY) === "on";
  } catch {
    return false;
  }
}

function writePref(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    /* storage unavailable: the toggle still works for this visit */
  }
}

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const pathname = usePathname();
  const ctx = useRef<AudioContext | null>(null);
  const master = useRef<GainNode | null>(null);
  const drone = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setOn(readPref()), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!on) return;

    const ac = ctx.current ?? new AudioContext();
    ctx.current = ac;
    if (!master.current) {
      const g = ac.createGain();
      g.gain.value = 0.9;
      const lp = ac.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 2200;
      g.connect(lp).connect(ac.destination);
      master.current = g;
    }
    const out = master.current;

    const tick = () => {
      if (ac.state === "suspended") ac.resume();
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(880, ac.currentTime);
      o.frequency.exponentialRampToValueAtTime(420, ac.currentTime + 0.06);
      g.gain.setValueAtTime(0.06, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.09);
      o.connect(g).connect(out);
      o.start();
      o.stop(ac.currentTime + 0.1);
    };

    // One tanpura-ish pluck: bright sawtooth through a resonant band, long decay.
    const pluck = (freq: number) => {
      const t0 = ac.currentTime;
      const o = ac.createOscillator();
      const o2 = ac.createOscillator();
      const bp = ac.createBiquadFilter();
      const g = ac.createGain();
      o.type = "sawtooth";
      o2.type = "sawtooth";
      o.frequency.value = freq;
      o2.frequency.value = freq * 1.003;
      bp.type = "bandpass";
      bp.frequency.value = freq * 6;
      bp.Q.value = 1.4;
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.035, t0 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 3.6);
      o.connect(bp);
      o2.connect(bp);
      bp.connect(g).connect(out);
      o.start(t0);
      o2.start(t0);
      o.stop(t0 + 3.7);
      o2.stop(t0 + 3.7);
    };

    const NOTES = [98.0, 130.81, 130.81, 65.41]; // Pa, Sa, Sa, low Sa
    let i = 0;
    const startDrone = () => {
      if (drone.current) return;
      if (ac.state === "suspended") ac.resume();
      drone.current = setInterval(() => pluck(NOTES[i++ % NOTES.length]), 1150);
    };
    const stopDrone = () => {
      if (drone.current) clearInterval(drone.current);
      drone.current = null;
    };

    const onClick = () => tick();
    document.addEventListener("click", onClick, true);

    const hero = document.getElementById("hero");
    const io = hero
      ? new IntersectionObserver(([e]) => (e.isIntersecting ? startDrone() : stopDrone()), { threshold: 0.35 })
      : null;
    if (hero && io) io.observe(hero);

    return () => {
      document.removeEventListener("click", onClick, true);
      io?.disconnect();
      stopDrone();
    };
  }, [on, pathname]);

  const toggle = () => {
    const next = !on;
    setOn(next);
    writePref(next);
    if (next && ctx.current?.state === "suspended") ctx.current.resume();
  };

  return (
    <button
      onClick={toggle}
      className="group label inline-flex items-center gap-2 hover:text-accent transition-colors cursor-pointer"
      aria-pressed={on}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
    >
      <span className="flex items-end gap-[2px] h-3" aria-hidden="true">
        {[0.5, 1, 0.7, 0.9].map((v, i) => (
          <span
            key={i}
            className="w-[2px] bg-current transition-all duration-300"
            style={{ height: on ? `${v * 100}%` : "20%", animation: on ? `twinkle ${0.8 + i * 0.15}s ease-in-out infinite` : "none" }}
          />
        ))}
      </span>
      Sound {on ? "on" : "off"}
    </button>
  );
}
