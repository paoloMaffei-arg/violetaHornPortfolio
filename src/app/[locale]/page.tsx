import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Reel from "@/components/sections/Reel";
import Stats from "@/components/sections/Stats";

export default function Home() {
  return (
    <main>
      <Hero />
      <Reel />
      <About />
      <Stats />
    </main>
  );
}
