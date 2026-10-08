import Link from "next/link";
import { CONTACT_DATA } from "@/config/contact";
import LocalTime from "@/components/ui/LocalTime";
import { Border, Figure } from "@/components/warli/Warli";
import SoundToggle from "@/components/ui/SoundToggle";

const index = [
  { name: "Work", href: "/work" },
  { name: "Projects", href: "/projects" },
  { name: "Writing", href: "/blogs" },
  { name: "Videos", href: "/videos" },
  { name: "Open Source", href: "/oss-contributions" },
  { name: "Readlist", href: "/readlist" },
  { name: "Now", href: "/now" },
  { name: "Uses", href: "/uses" },
  { name: "Résumé", href: "/resume" },
];

const elsewhere = [
  { name: "GitHub", href: CONTACT_DATA.github },
  { name: "LinkedIn", href: CONTACT_DATA.linkedin },
  { name: "X / Twitter", href: CONTACT_DATA.twitter },
  { name: "YouTube", href: CONTACT_DATA.youtube },
];

export default function Footer() {
  return (
    <footer className="mt-32">
      {/* Sign-off */}
      <div className="reveal flex items-end justify-center gap-4 sm:gap-8 pb-14 text-accent">
        <svg viewBox="-30 -50 60 56" className="w-16 sm:w-24 h-auto overflow-visible shrink-0" aria-hidden="true">
          <Figure pose="hold" s={1.3} />
        </svg>
        <div className="text-center">
          <p className="deva text-[4.5rem] sm:text-[8rem] lg:text-[10rem] leading-[0.9]">भेटूया</p>
          <p className="font-display italic text-xl sm:text-2xl text-muted mt-2">See you around.</p>
        </div>
        <svg viewBox="-30 -50 60 56" className="w-16 sm:w-24 h-auto overflow-visible shrink-0 -scale-x-100" aria-hidden="true">
          <Figure pose="raise" s={1.3} />
        </svg>
      </div>
      <Border className="text-accent/70" />
      <div className="pt-14 pb-12 grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-10">
        <div className="space-y-4 lg:col-span-6">
          <p className="font-display text-5xl sm:text-6xl leading-none">Sahil Gangurde</p>
          <p className="text-sm text-muted leading-relaxed max-w-[16rem]">
            AI &amp; backend engineer. Off the clock, I paint and cook.
          </p>
          <p className="text-sm text-muted pt-1">
            <span className="deva text-accent mr-2">पुणे</span>
            <LocalTime />
          </p>
        </div>

        <FooterCol title="Index">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {index.map((l) => (
              <Link key={l.href} href={l.href} className="link-u w-fit">{l.name}</Link>
            ))}
          </div>
        </FooterCol>

        <FooterCol title="Elsewhere">
          {elsewhere.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-u w-fit">
              {l.name} ↗
            </a>
          ))}
        </FooterCol>
      </div>

      <div className="py-6 border-t border-border flex items-center justify-between gap-3">
        <span className="label">© {new Date().getFullYear()} Sahil Gangurde</span>
        <span className="flex items-center gap-6">
          <span className="hidden sm:inline label">
            Press <kbd className="font-sans normal-case tracking-normal border border-border px-1.5 py-0.5 text-foreground/70">⌘K</kbd> to jump anywhere
          </span>
          <SoundToggle />
          <a href="#top" className="label hover:text-accent transition-colors">Back to top ↑</a>
        </span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 lg:col-span-3">
      <p className="label">{title}</p>
      <div className="flex flex-col gap-2 text-sm">{children}</div>
    </div>
  );
}
