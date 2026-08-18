import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import CheckoutModal from "@/components/CheckoutModal";

/* ── Pricing data (exact match from smartcaretv.net) ── */
const plans = [
  {
    label: "1 Month",
    duration: "Monthly License",
    features: [
      "ALL PREMIUM & LOCAL CHANNELS",
      "MOVIES & SERIES INCLUDED",
      "4K/FHD/HD QUALITY",
      "FREE PLAYER INCLUDED",
      "24/7 SUPPORT",
    ],
    prices: [
      { devices: 1, price: 35 },
      { devices: 2, price: 55 },
      { devices: 3, price: 75 },
      { devices: 4, price: 100 },
    ],
  },
  {
    label: "3 Months",
    duration: "Quarterly License",
    features: [
      "ALL PREMIUM & LOCAL CHANNELS",
      "MOVIES & SERIES INCLUDED",
      "4K/FHD/HD QUALITY",
      "FREE PLAYER INCLUDED",
      "24/7 SUPPORT",
    ],
    prices: [
      { devices: 1, price: 100 },
      { devices: 2, price: 135 },
      { devices: 3, price: 150 },
      { devices: 4, price: 170 },
    ],
  },
  {
    label: "6 Months",
    duration: "Semi-Annual License",
    highlight: true,
    features: [
      "ALL PREMIUM & LOCAL CHANNELS",
      "MOVIES & SERIES INCLUDED",
      "4K/FHD/HD QUALITY",
      "WATCH 15 DAYS FOR FREE",
      "FREE PLAYER INCLUDED",
      "24/7 SUPPORT",
    ],
    prices: [
      { devices: 1, price: 180 },
      { devices: 2, price: 210 },
      { devices: 3, price: 240 },
      { devices: 4, price: 260 },
    ],
  },
  {
    label: "1 Year",
    duration: "Annual License",
    features: [
      "ALL PREMIUM & LOCAL CHANNELS",
      "10000+ MOVIES",
      "50000+ SERIES",
      "4K/FHD/HD QUALITY",
      "WATCH 1 MONTH FOR FREE",
      "FREE PLAYER INCLUDED",
      "24/7 SUPPORT",
    ],
    prices: [
      { devices: 1, price: 350 },
      { devices: 2, price: 500 },
      { devices: 3, price: 600 },
      { devices: 4, price: 700 },
    ],
  },
];

interface SelectedPlanType {
  name: string;
  price: string;
  period: string;
}

/* ── Component ── */
const PlansSection = () => {
  const [selectedDevices, setSelectedDevices] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanType | null>(null);

  return (
    <>
      <section id="plans" className="py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          {/* ── Header row ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
          >
            {/* Left: Eyebrow + Title + Subtitle */}
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-gradient">Subscription Plans</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Transparent pricing for the SmartCare TV player software. License
                covers the number of device activations selected.
              </p>
            </div>

            {/* Right: Device selector pill */}
            <div className="glass rounded-full p-1 flex items-center gap-1 self-start lg:self-end shrink-0">
              {[1, 2, 3, 4].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDevices(d)}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 font-medium ${
                    selectedDevices === d
                      ? "gradient-primary glow-primary text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {d} {d === 1 ? "Device" : "Devices"}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Plan cards grid ── */}
          <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {plans.map((plan, i) => {
              const priceObj = plan.prices.find(
                (p) => p.devices === selectedDevices
              );
              const price = priceObj?.price ?? 0;

              return (
                <motion.div
                  key={plan.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative rounded-3xl p-7 overflow-hidden transition-all duration-300 hover:scale-[1.03] flex flex-col justify-between ${
                    plan.highlight
                      ? "glow-primary border border-primary/50"
                      : "border border-white/5"
                  }`}
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                    backdropFilter: "blur(14px)",
                    boxShadow: plan.highlight
                      ? "0 0 0 1px rgba(243,38,42,0.5), 0 0 30px rgba(243,38,42,0.35), 0 1px 0 0 rgba(255,255,255,0.06) inset, 0 30px 60px -30px rgba(0,0,0,0.6)"
                      : "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 30px 60px -30px rgba(0,0,0,0.6)",
                  }}
                >
                  <div>
                    {/* "Most Popular" badge */}
                    {plan.highlight && (
                      <div className="absolute top-4 right-4 text-[10px] uppercase tracking-widest gradient-primary rounded-full px-2.5 py-1 glow-primary font-semibold text-white">
                        Most Popular
                      </div>
                    )}

                    {/* Duration subtitle */}
                    <div className="text-sm text-muted-foreground">
                      {plan.duration}
                    </div>

                    {/* Label */}
                    <div className="mt-1 text-2xl font-semibold text-foreground">
                      {plan.label}
                    </div>

                    {/* Price */}
                    <div className="mt-6 flex items-end gap-1">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${plan.label}-${selectedDevices}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="text-5xl font-bold text-gradient"
                        >
                          ${price}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    {/* Device activation text */}
                    <div className="text-xs text-muted-foreground mt-1">
                      {selectedDevices} device activation
                      {selectedDevices > 1 ? "s" : ""}
                    </div>

                    {/* Features list */}
                    <ul className="mt-6 space-y-2.5">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-xs font-bold uppercase tracking-wide"
                        >
                          <Check
                            className="size-4 text-primary mt-0.5 shrink-0"
                            strokeWidth={2.5}
                          />
                          <span className="text-foreground/90">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() =>
                      setSelectedPlan({
                        name: `${plan.label} (${selectedDevices} ${
                          selectedDevices === 1 ? "Device" : "Devices"
                        })`,
                        price: `$${price}`,
                        period:
                          plan.label === "1 Month"
                            ? "/month"
                            : plan.label === "3 Months"
                            ? "/3 months"
                            : plan.label === "6 Months"
                            ? "/6 months"
                            : "/year",
                      })
                    }
                    className={`mt-7 w-full rounded-xl py-3 text-sm font-medium transition-all duration-300 ${
                      plan.highlight
                        ? "gradient-primary glow-primary text-white hover:opacity-90"
                        : "bg-foreground text-background hover:bg-foreground/90"
                    }`}
                  >
                    Activate {plan.label}
                  </button>
                </motion.div>
              );
            })}
          </div>


        </div>
      </section>

      {/* ── Checkout modal ── */}
      {selectedPlan && (
        <CheckoutModal
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          planPeriod={selectedPlan.period}
        />
      )}
    </>
  );
};

export default PlansSection;

