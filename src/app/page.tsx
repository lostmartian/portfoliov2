import Hero from "@/components/Hero";
import WorkJourney from "@/components/WorkJourney";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Hero />

      <main className="flex flex-col items-center">
        <WorkJourney />
        
        {/* Other sections like About can go here */}
      </main>
    </div>
  );
}


