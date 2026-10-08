import type { CSSProperties, ReactNode } from "react";

/** Inner-page intro on the same 12-column grid as the home sections. */
export default function PageHeader({
  label,
  mr,
  title,
  children,
}: {
  label: string;
  mr?: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 pt-16 pb-16 md:pt-24 md:pb-24">
      <div className="rise lg:col-span-2 flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-2 mb-6 lg:mb-0 lg:pt-4">
        {mr && <span className="deva text-accent text-3xl lg:text-4xl leading-none">{mr}</span>}
        <span className="label">{label}</span>
      </div>
      <div className="lg:col-start-3 lg:col-span-9 space-y-8">
        <h1 className="rise text-[3rem] sm:text-7xl lg:text-[6.5rem] leading-[0.98]" style={{ "--d": "80ms" } as CSSProperties}>
          {title}
        </h1>
        {children && (
          <p className="rise text-lg sm:text-xl text-muted leading-relaxed max-w-2xl" style={{ "--d": "160ms" } as CSSProperties}>
            {children}
          </p>
        )}
      </div>
    </header>
  );
}

/** Body column that lines up under the header title. */
export function PageBody({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10">
      <div className="lg:col-start-3 lg:col-span-9 min-w-0 space-y-12">{children}</div>
    </div>
  );
}
