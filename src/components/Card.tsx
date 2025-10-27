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
      className={`bg-white dark:bg-slate-700 rounded-2xl border border-gray-200 dark:border-slate-600 p-8 transition-all duration-300 ${
        hover ? 'hover:border-gray-300 dark:hover:border-slate-500 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-slate-800' : ''
      } ${className}`}
    >
      {title && (
        <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-gray-100 mb-6">{title}</h3>
      )}
      {children}
    </div>
  );
}
