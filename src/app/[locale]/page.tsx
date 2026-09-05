import About from "@/components/sections/About";
import ActingCV from "@/components/sections/ActingCV";
import Hero from "@/components/sections/Hero";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import Reel from "@/components/sections/Reel";
import Stats from "@/components/sections/Stats";

export default function Home() {
  return (
    <main>
      <Hero />
      <Reel />
      <About />
      <Stats />
      <PortfolioPreview />
      <ActingCV />
    </main>
  );
}
