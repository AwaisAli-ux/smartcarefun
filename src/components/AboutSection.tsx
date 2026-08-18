import { motion } from "framer-motion";
import { Shield, Globe, Users, Award } from "lucide-react";

const highlights = [
  { icon: Globe, title: "Global Reach", desc: "Broadcasting to 100+ countries with localized content and support." },
  { icon: Users, title: "20K+ Subscribers", desc: "Trusted by over 20,000 happy subscribers all over USA." },
  { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade encryption and 99.9% uptime guaranteed." },
  { icon: Award, title: "Award Winning", desc: "Recognized for excellence in streaming technology and content curation." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-secondary/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-foreground">
            About <span className="text-gradient">Smart Care TV</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
            Smart Care TV is the ultimate destination for premium entertainment, designed to bring you
            closer to the content you love. Our platform offers a massive library of 2000+ live HD channels,
            including global news broadcasts, high-octane sports, blockbuster movies, and award-winning
            original series — all accessible through one sleek, unified experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12 rounded-2xl border border-border bg-card p-8 md:p-12"
        >
          <p className="text-muted-foreground leading-relaxed mb-6">
            At Smart Care TV, we prioritize your viewing quality above all else. Our dedicated team of
            engineers works tirelessly to ensure a buffer-free, crystal-clear streaming experience using
            advanced optimization technology. Whether you're a sports fanatic waiting for the final
            whistle, a movie buff chasing the latest hits, or a news junkie staying informed,
            we deliver what matters most to you, exactly when it happens.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We believe that premium entertainment should be simple, borderless, and affordable. That's why
            Smart Care TV is fully compatible with Smart TVs, Fire Sticks, Android and iOS devices,
            tablets, and laptops. One simple membership plan unlocks a world of endless possibilities,
            giving you the freedom to watch what you want, where you want.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-primary/20 bg-card p-6 text-center"
            >
              <div className="mx-auto mb-4 inline-flex rounded-lg gradient-primary p-3">
                <h.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{h.title}</h3>
              <p className="text-sm text-muted-foreground">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
