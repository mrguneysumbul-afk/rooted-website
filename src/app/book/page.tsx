"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SERVICES, TIME_SLOTS, type Service, type BookingFormData } from "@/types/booking";

const STEPS = ["Coverage", "Service", "Date & time", "Your details"];

const EMPTY_FORM: BookingFormData = {
  postcode: "",
  service: "lllt",
  appointment_date: "",
  appointment_time: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  city: "",
  notes: "",
};

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BookingFormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [reference, setReference] = useState("");
  const [postcodeChecking, setPostcodeChecking] = useState(false);
  const [postcodeCovered, setPostcodeCovered] = useState<boolean | null>(null);

  const update = (field: keyof BookingFormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const checkPostcode = async () => {
    if (!form.postcode.trim()) {
      setError("Please enter your postcode");
      return;
    }
    setPostcodeChecking(true);
    setError("");
    try {
      const res = await fetch("/api/check-postcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postcode: form.postcode }),
      });
      const data = await res.json();
      setPostcodeCovered(data.covered);
      if (data.covered) {
        setTimeout(() => setStep(1), 600);
      }
    } catch {
      setError("Could not check postcode. Please try again.");
    } finally {
      setPostcodeChecking(false);
    }
  };

  const submitBooking = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setReference(data.reference);
      setConfirmed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-hairline bg-white px-4 py-3 text-[15px] text-ink placeholder-ink/40 outline-none transition-all focus:border-teal focus:ring-2 focus:ring-teal/10";

  const labelClass = "block text-[13px] font-medium text-ink/70 mb-1.5";

  if (confirmed) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-20">
          <motion.div
            initial={{ opacity: 1, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-lg text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal/10">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-[32px] font-semibold text-ink" style={{ letterSpacing: "-0.02em" }}>
              You&apos;re booked in
            </h1>
            <p className="mt-3 text-[16px] leading-relaxed text-ink/60">
              A confirmation has been sent to {form.email}. Your specialist will come to you — no clinic visit needed.
            </p>
            <div className="mt-8 rounded-2xl border border-hairline bg-mist p-6">
              <p className="text-[13px] text-ink/50">Booking reference</p>
              <p className="mt-1 font-mono text-[28px] font-bold text-teal tracking-wider">
                {reference}
              </p>
            </div>
            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-teal px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-teal/90"
            >
              Back to home
            </Link>
          </motion.div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="mx-auto max-w-2xl px-5 py-16 md:py-24">
        <div className="mb-12 text-center">
          <h1
            className="text-ink"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 48px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Book your free assessment
          </h1>
          <p className="mt-3 text-[16px] text-ink/60">
            We come to you — mobile service across the UK
          </p>
        </div>

        <div className="mb-10 flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold transition-all ${
                    i < step
                      ? "bg-teal text-white"
                      : i === step
                      ? "bg-teal text-white ring-4 ring-teal/20"
                      : "bg-mist text-ink/40"
                  }`}
                >
                  {i < step ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`mt-1.5 hidden text-[11px] font-medium sm:block ${i === step ? "text-teal" : "text-ink/40"}`}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`mx-2 mb-4 h-px flex-1 transition-all ${i < step ? "bg-teal" : "bg-hairline"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-hairline bg-white p-6 md:p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 1, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 1, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="mb-2 text-[20px] font-semibold text-ink">Check your coverage</h2>
                <p className="mb-6 text-[14px] text-ink/55">Enter your postcode to confirm we service your area.</p>
                <label className={labelClass}>Postcode</label>
                <input
                  className={inputClass}
                  type="text"
                  placeholder="e.g. SW1A 1AA"
                  value={form.postcode}
                  onChange={(e) => {
                    update("postcode", e.target.value.toUpperCase());
                    setPostcodeCovered(null);
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && checkPostcode()}
                />
                {postcodeCovered === false && (
                  <motion.p
                    initial={{ opacity: 1, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-[13px] text-coral"
                  >
                    We don&apos;t currently cover this postcode. We&apos;re expanding fast — check back soon.
                  </motion.p>
                )}
                {postcodeCovered === true && (
                  <motion.p
                    initial={{ opacity: 1, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-[13px] text-teal font-medium"
                  >
                    Great news — we cover your area.
                  </motion.p>
                )}
                {error && <p className="mt-3 text-[13px] text-coral">{error}</p>}
                <button
                  onClick={checkPostcode}
                  disabled={postcodeChecking}
                  className="mt-6 w-full rounded-full bg-teal py-4 text-[15px] font-semibold text-white transition-all hover:bg-teal/90 disabled:opacity-60"
                >
                  {postcodeChecking ? "Checking..." : "Check coverage"}
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 1, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 1, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="mb-2 text-[20px] font-semibold text-ink">Choose your service</h2>
                <p className="mb-6 text-[14px] text-ink/55">Select the treatment you&apos;d like. Not sure? Choose the bundle.</p>
                <div className="flex flex-col gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => update("service", s.id)}
                      className={`w-full rounded-xl border p-4 text-left transition-all ${
                        form.service === s.id
                          ? "border-teal bg-teal/5 ring-2 ring-teal/20"
                          : "border-hairline hover:border-teal/40"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-ink text-[15px]">{s.name}</p>
                          <p className="mt-0.5 text-[13px] text-ink/55">{s.description}</p>
                        </div>
                        <div className="ml-4 flex-shrink-0 text-right">
                          <p className="font-semibold text-teal text-[15px]">{s.price}</p>
                          <p className="text-[12px] text-ink/40">{s.duration}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep(0)}
                    className="flex-1 rounded-full border border-hairline py-4 text-[15px] font-medium text-ink/70 transition-all hover:border-ink/30"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="flex-[2] rounded-full bg-teal py-4 text-[15px] font-semibold text-white transition-all hover:bg-teal/90"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 1, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 1, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="mb-2 text-[20px] font-semibold text-ink">Pick a date and time</h2>
                <p className="mb-6 text-[14px] text-ink/55">Choose when you&apos;d like your specialist to visit.</p>
                <div className="mb-5">
                  <label className={labelClass}>Date</label>
                  <input
                    className={inputClass}
                    type="date"
                    value={form.appointment_date}
                    min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                    onChange={(e) => update("appointment_date", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Time slot</label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => update("appointment_time", t)}
                        className={`rounded-xl border py-3 text-[14px] font-medium transition-all ${
                          form.appointment_time === t
                            ? "border-teal bg-teal/5 text-teal ring-2 ring-teal/20"
                            : "border-hairline text-ink/70 hover:border-teal/40"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                {error && <p className="mt-4 text-[13px] text-coral">{error}</p>}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-full border border-hairline py-4 text-[15px] font-medium text-ink/70 transition-all hover:border-ink/30"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      if (!form.appointment_date || !form.appointment_time) {
                        setError("Please select both a date and a time slot");
                        return;
                      }
                      setError("");
                      setStep(3);
                    }}
                    className="flex-[2] rounded-full bg-teal py-4 text-[15px] font-semibold text-white transition-all hover:bg-teal/90"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 1, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 1, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="mb-2 text-[20px] font-semibold text-ink">Your details</h2>
                <p className="mb-6 text-[14px] text-ink/55">We&apos;ll send your confirmation and come to your address.</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>First name</label>
                    <input className={inputClass} placeholder="Jane" value={form.first_name} onChange={(e) => update("first_name", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Last name</label>
                    <input className={inputClass} placeholder="Smith" value={form.last_name} onChange={(e) => update("last_name", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input className={inputClass} type="email" placeholder="jane@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input className={inputClass} type="tel" placeholder="07700 900000" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Address line 1</label>
                    <input className={inputClass} placeholder="123 Example Street" value={form.address_line1} onChange={(e) => update("address_line1", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Address line 2 <span className="text-ink/30">(optional)</span></label>
                    <input className={inputClass} placeholder="Flat 4, Building name" value={form.address_line2} onChange={(e) => update("address_line2", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>City</label>
                    <input className={inputClass} placeholder="London" value={form.city} onChange={(e) => update("city", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Postcode</label>
                    <input className={`${inputClass} bg-mist cursor-not-allowed`} value={form.postcode} readOnly />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Notes <span className="text-ink/30">(optional)</span></label>
                    <textarea
                      className={`${inputClass} min-h-[80px] resize-none`}
                      placeholder="Parking instructions, access notes, anything we should know..."
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                    />
                  </div>
                </div>
                {error && <p className="mt-4 text-[13px] text-coral">{error}</p>}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 rounded-full border border-hairline py-4 text-[15px] font-medium text-ink/70 transition-all hover:border-ink/30"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      if (!form.first_name || !form.last_name || !form.email || !form.phone || !form.address_line1 || !form.city) {
                        setError("Please fill in all required fields");
                        return;
                      }
                      setError("");
                      submitBooking();
                    }}
                    disabled={loading}
                    className="flex-[2] rounded-full bg-coral py-4 text-[15px] font-semibold text-white shadow-lg transition-all hover:bg-coral/90 disabled:opacity-60"
                  >
                    {loading ? "Confirming..." : "Confirm booking"}
                  </button>
                </div>
                <p className="mt-4 text-center text-[12px] text-ink/35">
                  By confirming you agree to our terms. No payment taken today — free assessment.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </main>
  );
}
