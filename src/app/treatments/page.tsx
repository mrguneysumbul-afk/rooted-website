import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TreatmentsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-5 text-center">
        <h1
          className="text-ink text-balance"
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(36px, 5vw, 52px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Our treatments
        </h1>
        <p className="mt-4 text-[16px] font-medium text-teal">Coming soon</p>
      </section>
      <Footer />
    </main>
  );
}
