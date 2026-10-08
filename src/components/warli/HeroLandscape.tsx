import JourneyFilm from "./JourneyFilm";
import PuneSky from "./PuneSky";
import SkyLife from "./SkyLife";

/**
 * The hero's backdrop: Pune's real sky across the top (sun in the light theme,
 * moon and stars in the dark), birds by day and fireflies by night, and along
 * the bottom the film of my journey, with its own scenery and trees.
 * The middle stays clear for the words.
 */

export default function HeroLandscape() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen text-accent" aria-hidden="true">
      {/* sky: the real sun or moon over Pune */}
      <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMin meet" className="absolute inset-x-0 top-0 w-full h-auto">
        <PuneSky />
      </svg>

      {/* birds by day, fireflies by night (follows the theme) */}
      <SkyLife />

      {/* the film of my journey: its own camera, sized to this strip */}
      <JourneyFilm className="absolute inset-0 w-full h-full" />
    </div>
  );
}
