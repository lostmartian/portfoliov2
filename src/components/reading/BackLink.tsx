import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink({ href = "/blogs", label = "All writing" }: { href?: string; label?: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
      <ArrowLeft className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1" />
      <span className="link-u">{label}</span>
    </Link>
  );
}
