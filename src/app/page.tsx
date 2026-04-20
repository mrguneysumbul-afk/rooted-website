import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfter from "@/components/BeforeAfter";
import Treatments from "@/components/Treatments";
import SocialProof from "@/components/SocialProof";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <BeforeAfter />
      <Treatments />
      <SocialProof />
      <CtaBanner />
      <Footer />
    </main>
  );
}
