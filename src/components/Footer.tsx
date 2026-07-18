"use client";

import { CONTACT_DATA } from "@/config/contact";

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground/50">
      <div>
        © {new Date().getFullYear()} Sahil Gangurde. All rights reserved.
      </div>
      <div className="flex gap-4">
        <a href={CONTACT_DATA.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
          GitHub
        </a>
        <a href={CONTACT_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
          LinkedIn
        </a>
        <a href={CONTACT_DATA.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
          X / Twitter
        </a>
      </div>
    </footer>
  );
}
