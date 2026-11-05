import type { MetadataRoute } from "next";
import { DESCRIPTION, HANDLE, NAME } from "@/lib/site";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${NAME} (${HANDLE})`,
    short_name: NAME,
    description: DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#fdfdfc",
    theme_color: "#0c0c0d",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
