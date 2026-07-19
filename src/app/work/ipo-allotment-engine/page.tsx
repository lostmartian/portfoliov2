import type { Metadata } from "next";
import IPOAllotmentClient from "./IPOAllotmentClient";

export const metadata: Metadata = {
  title: "IPO Allotment Engine",
  description: "A scale-elastic processing platform for high-stakes IPO settlement and SEBI compliance.",
};

export default function IPOAllotmentPage() {
  return <IPOAllotmentClient />;
}

