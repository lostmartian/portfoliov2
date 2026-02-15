'use client';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = '',
  title,
  hover = true
}: CardProps) {
  return (
    <div
      className={`glass-card rounded-3xl p-8 ${hover ? '' : 'hover:transform-none hover:shadow-none'
        } ${className}`}
    >
      {title && (
        <h3 className="text-xl font-elegant font-semibold text-[var(--text-primary)] mb-6 relative z-10">
          {title}
        </h3>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
