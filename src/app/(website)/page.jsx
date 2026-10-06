
import Hero from "@/components/Home/Hero";
import { Services } from "@/components/Home/Services";
import { HowItWorks } from "@/components/Home/HowItWorks";
import { WhyUs } from "@/components/Home/WhyUs";
import Testimonials from "@/components/Home/Testimonials";
import ProfitCal from "@/components/Home/ProfitCal";
import { FAQ } from "@/components/Home/FAQ";
import { CTA } from "@/components/Home/CTA";
import OurSeller from "@/components/Home/OurSeller";
import Dashboard from "@/components/Home/Dashboard";
import Catelog from "@/components/Home/Catelog";
export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Catelog />
        <ProfitCal />
        <WhyUs />
        <Dashboard />
        <OurSeller />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}
