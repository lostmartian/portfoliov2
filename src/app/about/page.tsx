import AboutClient from "./AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Hello, I'm Sahil (lostmartian). A Full-Stack AI Engineer building systems for high-stakes intelligence.",
};

export default function AboutPage() {
  return <AboutClient />;
}
