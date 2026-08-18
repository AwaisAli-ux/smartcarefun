import { motion } from "framer-motion";
import { Monitor, Tablet, Laptop, Smartphone, Tv } from "lucide-react";

const devices = [
  { icon: Tv, name: "Smart TVs", status: "available" },
  { icon: Monitor, name: "Android TVs", status: "available" },
  { icon: Tablet, name: "Tablets", status: "available" },
  { icon: Laptop, name: "Laptops", status: "available" },
  { icon: Smartphone, name: "Mobile Phones", status: "available" },
];

const DevicesSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-foreground">Watch on Any Device</h2>
          <p className="text-muted-foreground">Stream seamlessly across all your favourite devices</p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {devices.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/40"
            >
              <d.icon className="mb-3 h-10 w-10 text-primary" />
              <span className="text-sm font-medium text-foreground">{d.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevicesSection;
