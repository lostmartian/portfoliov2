import { llmsFullTxt } from "@/lib/llms";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

// Built from module data only, so it is prerendered at build time.
export function GET() {
  return new Response(llmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
