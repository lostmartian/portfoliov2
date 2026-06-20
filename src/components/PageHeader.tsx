import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
}

export default function PageHeader({ title, subtitle, description }: PageHeaderProps) {
  return (
    <div className="relative pt-28 sm:pt-44 pb-12 mb-12 overflow-hidden">
      {/* Structural Background */}
      <div className="absolute inset-0 grid-subtle opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-16 relative z-10">
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-foreground/20" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-foreground/40 font-bold">
              {subtitle}
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-serif text-foreground font-light tracking-tight leading-[0.95]">
            {title}
          </h1>
          
          {description && (
            <p className="text-base sm:text-lg text-foreground/40 max-w-2xl leading-relaxed font-light">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
