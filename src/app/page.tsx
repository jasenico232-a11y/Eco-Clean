import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { Standards } from "@/components/sections/Standards";
import { Specialties } from "@/components/sections/Specialties";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <Products />
      <Process />
      <Standards />
      <Specialties />
      <Faq />
      <CtaBand />
    </>
  );
}
