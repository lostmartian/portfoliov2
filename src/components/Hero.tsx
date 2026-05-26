import SteelBackground from "./SteelBackground";
import SystemCore from "./SystemCore";


const getCurrentQuarter = () => {
  const now = new Date();
  const quarter = Math.floor(now.getMonth() / 3) + 1;
  return `Q${quarter}_${now.getFullYear()}`;
};

export default function Hero() {
  const availability = getCurrentQuarter();

  return (
    <div className="relative flex flex-col min-h-[90vh] lg:h-screen overflow-hidden -mt-20">
      <SteelBackground />

      <section className="relative flex flex-col justify-center flex-1 w-full max-w-7xl mx-auto px-8 sm:px-16 pt-32 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="absolute inset-0 bg-foreground/20 rounded-full animate-ping" />
                <span className="relative block w-2 h-2 bg-foreground/60 rounded-full" />
              </div>
              <p className="text-technical tracking-[0.2em]">Location: Pune, India / Current Status: Active</p>
            </div>

            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-serif font-medium tracking-tight leading-[1.1] lg:leading-[1.05]">
              <span className="text-foreground/20">Architecting</span> <br />
              <span className="text-foreground">High-Fidelity</span> <br />
              <span className="text-foreground/20">Systems.</span>
            </h1>

            <p className="max-w-2xl text-grey-400 text-lg sm:text-2xl font-light leading-relaxed tracking-tight">
              Independent software engineer merging architectural precision with AI integration to build mission-critical digital infrastructure.
            </p>

            <div className="flex flex-wrap gap-x-12 gap-y-6 pt-6">
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Expertise / Core</p>
                <p className="text-sm font-medium text-foreground/80 tracking-tight">Full-Stack Systems / AI Infrastructure</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Availability</p>
                <p className="text-sm font-medium text-foreground/80 tracking-tight">{availability} / Open for Hire</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-10">
              <a
                href="/work"
                className="group/btn relative px-10 py-4 font-bold transition-all bg-foreground text-background rounded-full overflow-hidden active:scale-95 flex items-center justify-center"
              >
                <span className="relative z-10 uppercase tracking-widest text-[11px] leading-none">Access_Records</span>
              </a>
              <a
                href="/contact"
                className="px-10 py-4 font-bold transition-all border border-border rounded-full hover:bg-foreground/5 backdrop-blur-sm active:scale-95 uppercase tracking-widest text-[11px] flex items-center justify-center leading-none"
              >
                Initiate_Contact
              </a>
            </div>
          </div>

          {/* Right Column: Abstract Visual */}
          <div className="lg:col-span-5 xl:col-span-4 hidden lg:flex items-center justify-center">
            <SystemCore />
          </div>
        </div>
      </section>

    </div>
  );
}
