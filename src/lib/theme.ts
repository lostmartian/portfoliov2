// Theme: follows the system by default (nothing stored). A saved "light" or "dark" in
// localStorage overrides it, resolved to data-theme="light" | "dark" on <html>.

export const THEME_KEY = "theme";

/** Runs in <head> before the first paint, so a saved or system dark theme never flashes light.
 *  It also sets data-motion, which arms the scroll reveals in globals.css. */
export const themeScript = `(function(){try{var p=localStorage.getItem("${THEME_KEY}");var d=p==="dark"||(p!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.setAttribute("data-theme",d?"dark":"light");r.style.colorScheme=d?"dark":"light";r.setAttribute("data-motion","")}catch(e){}})()`;
