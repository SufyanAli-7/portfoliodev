import DotGridBackground from "@/components/layout/DotGridBackground/DotGridBackground";
import Navbar from "@/components/layout/Navbar/Navbar";
import Hero from "@/components/sections/Hero/Hero";

export default function Home() {
  return (
    <>
      {/* Dark brutalist ambient dot grid background */}
      <DotGridBackground />

      {/* Main page layout */}
      <div className="relative min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex flex-col justify-center">
          <Hero />
        </main>
      </div>
    </>
  );
}
