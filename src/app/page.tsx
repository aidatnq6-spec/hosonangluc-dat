import { MobileBar } from "@/components/MobileBar";
import { RegisterProvider } from "@/components/register/RegisterProvider";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Services } from "@/components/sections/Services";
import { WayOfWorking } from "@/components/sections/WayOfWorking";
import { TopNav } from "@/components/TopNav";

export default function Home() {
  return (
    <RegisterProvider>
      <TopNav />
      <Hero />
      <main>
        <About />
        <Journey />
        <Services />
        <WayOfWorking />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </RegisterProvider>
  );
}
