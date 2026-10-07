import { StatusBar } from "@/components/StatusBar";
import { Hero } from "@/components/Hero";
import { MigrationMonitor } from "@/components/MigrationMonitor";
import { ExposureIndex } from "@/components/ExposureIndex";
import { ThreatReadout } from "@/components/ThreatReadout";
import { Thesis } from "@/components/Thesis";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden />
      <StatusBar />
      <main className="relative z-10 flex flex-1 flex-col pb-8">
        <Hero />
        <MigrationMonitor />
        <ExposureIndex />
        <ThreatReadout />
        <Thesis />
      </main>
      <Footer />
    </>
  );
}
