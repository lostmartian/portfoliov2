"use client";

export default function SystemCore() {
  return (
    <div className="relative w-full aspect-square flex items-center justify-center pointer-events-none group">
      <svg 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[440px]"
      >
        {/* Outer Bounding Box (Drafting Frame) */}
        <rect x="40" y="40" width="320" height="320" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
        
        {/* Main Concentric Precision Circles */}
        <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="0.8" className="text-foreground/20" />
        <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="1.2" className="text-foreground/30" />
        <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-foreground/40" />
        
        {/* Structural Grid Crosshairs */}
        <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="0.5" className="text-foreground/20" />
        <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-foreground/20" />

        {/* Intersecting Architectural Squares */}
        <rect x="100" y="100" width="200" height="200" stroke="currentColor" strokeWidth="1" className="text-foreground/40" />
        <rect x="130" y="130" width="140" height="140" stroke="currentColor" strokeWidth="0.5" className="text-foreground/20 rotate-45 origin-center" />

        {/* Precision Coordinate Nodes */}
        <circle cx="100" cy="100" r="2.5" fill="currentColor" className="text-foreground/60" />
        <circle cx="300" cy="100" r="2.5" fill="currentColor" className="text-foreground/60" />
        <circle cx="100" cy="300" r="2.5" fill="currentColor" className="text-foreground/60" />
        <circle cx="300" cy="300" r="2.5" fill="currentColor" className="text-foreground/60" />

        {/* Diagonal Tension Lines */}
        <line x1="40" y1="40" x2="360" y2="360" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 8" className="text-foreground/10" />
        <line x1="360" y1="40" x2="40" y2="360" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 8" className="text-foreground/10" />

        {/* Center Core Node */}
        <rect x="195" y="195" width="10" height="10" stroke="currentColor" strokeWidth="1" className="text-foreground/80" />
        <circle cx="200" cy="200" r="2" fill="currentColor" className="text-foreground/90" />

        {/* Corner Detail Callouts (No Text) */}
        <path d="M40 60V40H60" stroke="currentColor" strokeWidth="1.5" className="text-foreground/50" />
        <path d="M340 40H360V60" stroke="currentColor" strokeWidth="1.5" className="text-foreground/50" />
        <path d="M360 340V360H340" stroke="currentColor" strokeWidth="1.5" className="text-foreground/50" />
        <path d="M60 360H40V340" stroke="currentColor" strokeWidth="1.5" className="text-foreground/50" />

      </svg>
    </div>
  );
}
