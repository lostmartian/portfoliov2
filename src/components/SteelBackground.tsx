"use client";

export default function SteelBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background transition-colors duration-700">
      {/* 1. Primary Metallic Gradient - Smooth depth reflections */}
      <div 
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.6]"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(var(--foreground-rgb), 0.04) 0%,
            rgba(var(--foreground-rgb), 0.01) 25%,
            rgba(var(--foreground-rgb), 0.06) 50%,
            rgba(var(--foreground-rgb), 0.01) 75%,
            rgba(var(--foreground-rgb), 0.04) 100%
          )`,
        }}
      />

      {/* 2. Anisotropic Highlights - Soft vertical sweeps */}
      <div 
        className="absolute inset-0 opacity-[0.2] dark:opacity-[0.4] mix-blend-overlay"
        style={{
          background: `linear-gradient(
            to right,
            transparent 0%,
            rgba(var(--foreground-rgb), 0.05) 15%,
            rgba(var(--foreground-rgb), 0.1) 35%,
            rgba(var(--foreground-rgb), 0.15) 50%,
            rgba(var(--foreground-rgb), 0.1) 65%,
            rgba(var(--foreground-rgb), 0.05) 85%,
            transparent 100%
          )`,
        }}
      />

      {/* 3. The "Brushed" Texture - Toned down micro-grooves */}
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] mix-blend-soft-light"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(var(--foreground-rgb), 0.1) 2px,
            rgba(var(--foreground-rgb), 0.1) 3px
          )`,
          backgroundSize: '4px 100%',
        }}
      />

      {/* 4. Cross-Brushed / Scratch Texture - Smoothed out */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 120px,
            rgba(var(--foreground-rgb), 0.3) 121px,
            transparent 122px
          )`,
          backgroundSize: '100% 180px',
        }}
      />

      {/* 5. Direct Light Source - Extremely soft specular */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(var(--foreground-rgb), 0.1) 0%, transparent 70%)',
        }}
      />

      {/* 6. Ambient Bounce - Softer bounce light */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(var(--foreground-rgb), 0.03) 0%, transparent 80%)',
        }}
      />

      {/* 7. Vignette for Depth - Seamless blend */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(var(--background-rgb), 0.4) 100%)'
        }}
      />

      
      {/* 8. Micro-Grain / Cold Roll Steel Texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
