import { Appbar } from "@/components/buttons/Appbar";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col justify-center">
      <Appbar type="home" />
      <Hero />
      <HeroVideo />
    </main>
  );
}
