import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How fast will my streaming service be activated?",
    a: "Your service will be activated within one business day after payment confirmation.",
  },
  {
    q: "Which devices are supported?",
    a: "You can watch on Smart TVs, Android devices, Firestick, tablets, laptops, and smartphones.",
  },
  {
    q: "Is the streaming quality HD or 4K?",
    a: "All our plans support Ultra HD 4K streaming quality for the best viewing experience.",
  },
  {
    q: "Can I watch sports and news channels?",
    a: "Yes, our streaming service includes sports, entertainment, movies, series, and global news channels.",
  },
  {
    q: "Can I use my account on multiple devices?",
    a: "Yes. Each plan allows 1 to 4 devices depending on the plan you choose.",
  },
  {
    q: "What if I need help?",
    a: "Our 24/7 support team is always available to assist you via email at support@smartcaretv.com, SMS at +1 (406) 479-2077 or WhatsApp at +1 (406) 479-2077.",
  },
  {
    q: "Is there a free trial?",
    a: "We offer a 24-hour free trial so you can explore our content library and streaming quality before committing to a plan. Contact our support team to activate.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards, PayPal, and secure online payment methods. All payments are processed with enterprise-grade encryption.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-foreground">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="text-muted-foreground">
            Got questions? We've got answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border bg-card px-6 data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
