import Hero from "@/components/home/Hero";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import PricingSection from "@/components/home/PricingSection";
import HowItWorks from "@/components/home/HowItWorks";
import SubjectsStats from "@/components/home/SubjectsStats";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedTuitions />
      <HowItWorks />
      <SubjectsStats />
      <PricingSection />
    </>
  );
}