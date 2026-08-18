import { motion } from "framer-motion";
import { AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";

const policies = [
  {
    icon: Clock,
    title: "1. Refund Eligibility",
    content: "Customers may request a refund within 7 days (one week) from the date of payment. If the refund request is made within this time period, we will review and process the refund if the request meets our policy requirements. Refund requests made after 7 days of the original payment will not be accepted.",
  },
  {
    icon: CheckCircle,
    title: "2. Conditions for Refund",
    content: "To request a refund, customers must:",
    bullets: [
      "Submit the request within 7 days of purchase",
      "Provide proof of payment (transaction ID or receipt)",
      "Contact our support team through our official support email",
    ],
  },
  {
    icon: XCircle,
    title: "3. Non-Refundable Situations",
    content: "Refunds will not be issued in the following situations:",
    bullets: [
      "Refund requests submitted after the 7-day period",
      "Change of mind after accessing or using the digital content",
      "Violation of our terms of service",
      "Abuse or misuse of the platform",
    ],
  },
  {
    icon: AlertCircle,
    title: "4. Processing Time",
    content: "If your refund request is approved:",
    bullets: [
      "Refunds will be processed within 7–10 business days",
      "The amount will be returned to the original payment method used for the purchase",
      "Processing time may vary depending on your bank or payment provider.",
    ],
  },
];

const RefundPolicySection = () => {
  return (
    <section id="refund" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
            Transparency & Trust
          </div>
          <h2 className="mb-6 text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
            Refund <span className="text-gradient">Information</span>
          </h2>
          <div className="mx-auto max-w-3xl h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed font-medium">
            Thank you for purchasing our Smart Care TV streaming services.
            Please read our refund policy carefully before making a purchase.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {policies.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl p-8 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]"
            >
              <div className="mb-6 inline-flex rounded-2xl gradient-primary p-4 shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                <p.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-4 text-xl font-black text-foreground uppercase tracking-tight">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-medium">
                {p.content}
              </p>
              {p.bullets && (
                <ul className="space-y-3">
                  {p.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 group/item">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 group-hover/item:scale-150 transition-transform" />
                      <span className="text-sm text-muted-foreground font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid max-w-5xl gap-8 md:grid-cols-3 mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl p-10 flex flex-col justify-center"
          >
            <h3 className="text-2xl font-black text-foreground mb-6 uppercase tracking-tight">5. Policy Updates</h3>
            <p className="text-muted-foreground leading-relaxed font-medium">
              We reserve the right to modify or update this Refund Policy at any time.
              Any changes will be posted on this page with an updated effective date.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-primary/20 bg-primary/5 backdrop-blur-xl p-10 border-dashed relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <AlertCircle className="h-24 w-24 text-primary" />
            </div>
            <h3 className="text-2xl font-black text-foreground mb-6 uppercase tracking-tight">6. Contact</h3>
            <p className="text-sm text-muted-foreground mb-6 font-medium">
              For refund requests or billing support, please contact us:
            </p>
            <div className="space-y-4 relative z-10">
              <a
                href="mailto:support@smartcaretv.net"
                className="flex flex-col p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-primary/40 transition-all group/link"
              >
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Official Email</span>
                <span className="text-sm font-bold text-foreground group-hover/link:text-primary transition-colors">support@smartcaretv.net</span>
              </a>
              <a
                href="https://wa.me/14064792077"
                className="flex flex-col p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-primary/40 transition-all group/link"
              >
                <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mb-1">WhatsApp Support</span>
                <span className="text-sm font-bold text-foreground group-hover/link:text-green-500 transition-colors">+1 (406) 479-2077</span>
              </a>
              <a
                href="sms:+14064792077"
                className="flex flex-col p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-primary/40 transition-all group/link"
              >
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">SMS Only</span>
                <span className="text-sm font-bold text-foreground group-hover/link:text-primary transition-colors">+1 (406) 479-2077</span>
              </a>
              <div className="flex flex-col p-4 rounded-2xl bg-black/20 border border-white/5">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Website</span>
                <span className="text-sm font-bold text-foreground">smartcaretv.net</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RefundPolicySection;

