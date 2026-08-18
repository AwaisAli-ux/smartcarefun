import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Tv, Sparkles, Send, ArrowLeft, ShieldCheck, Clock, Mail, User, Phone, Smartphone, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const deviceOptions = [
  { id: "firestick", label: "Amazon Firestick / Fire TV", icon: Tv },
  { id: "smart_tv", label: "Smart TV (Samsung/LG/Android)", icon: Tv },
  { id: "android_box", label: "Android TV / TV Box", icon: Tv },
  { id: "mobile", label: "Smartphone / Tablet (iOS/Android)", icon: Smartphone },
  { id: "pc", label: "PC / Laptop / Mac", icon: Laptop },
];

const FreeTrial = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [device, setDevice] = useState("firestick");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage("Please fill in your full name and phone number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/support@smartcaretv.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New 24H Free Trial Request from ${fullName}`,
          "Request Type": "FREE TRIAL REQUEST (24 Hours)",
          "Customer Name": fullName,
          "Phone / WhatsApp": phone,
          "Customer Email": email || "Not Provided",
          "Selected Device": deviceOptions.find((d) => d.id === device)?.label || device,
          SubmittedAt: new Date().toLocaleString(),
        }),
      });

      const data = await response.json();
      if (response.ok || data.success === "true") {
        setIsSuccess(true);
      } else {
        throw new Error(data.message || "Failed to submit request.");
      }
    } catch (err: any) {
      setErrorMessage("Failed to send request. Please try again or contact support directly on WhatsApp/SMS.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-24 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          {/* Back link */}
          <button
            onClick={() => navigate("/")}
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>

          {/* Header section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary mb-4 glow-primary">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" /> 100% Free • No Credit Card Required
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-foreground mb-4">
              Get Your <span className="text-gradient">24-Hour Free Trial</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
              Enjoy all premium & local channels — movies & series included! Fill out the form below for instant free trial activation, or contact our support team.
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-3xl border border-white/10 bg-card/60 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            {isSuccess ? (
              <div className="py-12 text-center space-y-6">
                <div className="mx-auto h-20 w-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">
                  Trial Request Received!
                </h2>
                <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-foreground font-bold">{fullName}</span>! Your 24-hour free trial request has been dispatched to our support team.
                </p>
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 max-w-lg mx-auto text-left space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-emerald-400 shrink-0" />
                    <p className="text-sm font-bold text-emerald-300">
                      Expected Response: Within 10 Minutes
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Our support team has received your free trial request and will contact you shortly.
                  </p>
                </div>

                <div className="pt-6 flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="gradient-primary text-white font-bold px-8 h-14 rounded-2xl"
                    onClick={() => navigate("/")}
                  >
                    Return to Homepage
                  </Button>
                  <a
                    href="https://wa.me/14064792077"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-14 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all"
                  >
                    Need Instant Setup? Chat on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold text-center">
                    {errorMessage}
                  </div>
                )}

                {/* 1. Full Name */}
                <div className="space-y-3">
                  <label className="block text-base font-bold text-foreground flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" /> Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name (e.g. John Smith)"
                    className="w-full h-16 px-6 rounded-2xl bg-secondary/80 border border-white/10 text-foreground text-lg placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>

                {/* 2. Phone or WhatsApp Number */}
                <div className="space-y-3">
                  <label className="block text-base font-bold text-foreground flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" /> Phone or WhatsApp Number <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 (406) 479-2077"
                    className="w-full h-16 px-6 rounded-2xl bg-secondary/80 border border-white/10 text-foreground text-lg placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>

                {/* 3. Email Address (Optional) */}
                <div className="space-y-3">
                  <label className="block text-base font-bold text-foreground flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" /> Email Address <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email (e.g. john@example.com)"
                    className="w-full h-16 px-6 rounded-2xl bg-secondary/80 border border-white/10 text-foreground text-lg placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                  <p className="text-xs text-muted-foreground">Optional if you would like trial credentials emailed to you.</p>
                </div>

                {/* 4. Select Device */}
                <div className="space-y-3">
                  <label className="block text-base font-bold text-foreground flex items-center gap-2">
                    <Tv className="h-5 w-5 text-primary" /> Select Your Device <span className="text-primary">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {deviceOptions.map((opt) => {
                      const isSelected = device === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDevice(opt.id)}
                          className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "gradient-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                              : "bg-secondary/50 border-white/10 text-foreground hover:bg-secondary"
                          }`}
                        >
                          <opt.icon className="h-5 w-5 shrink-0" />
                          <span className="text-sm font-bold">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Trust badge */}
                <div className="p-4 rounded-2xl bg-card/80 border border-white/5 flex items-center gap-3 text-xs text-muted-foreground">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                  <span>
                    Your privacy is 100% protected. We will never share your personal information.
                  </span>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 gradient-primary border-0 text-white font-black text-lg uppercase tracking-wider rounded-2xl glow-primary hover:opacity-95 transition-all shadow-2xl cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5 animate-spin" /> Submitting Request...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" /> Submit Free Trial Request
                    </span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FreeTrial;
