import { motion } from "framer-motion";
import { Download, LogIn, PlayCircle, Monitor, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Download, step: "Step 1", title: "Download the App", desc: "Get our app from the App Store, Google Play, or PC" },
  { icon: LogIn, step: "Step 2", title: "Log In", desc: "Sign in with your account credentials" },
  { icon: PlayCircle, step: "Step 3", title: "Start Watching", desc: "Enjoy live TV, movies and series instantly" },
];

const AppDownloadSection = () => {
  return (
    <section id="download" className="py-24 bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-foreground">Get the App</h2>
          <p className="text-muted-foreground">Three simple steps to start streaming</p>
        </motion.div>

        <div className="mx-auto mb-16 grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 inline-flex rounded-2xl gradient-primary p-5">
                <s.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="mb-2 block text-xs font-semibold text-primary uppercase tracking-wider">{s.step}</span>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="gradient-primary border-0 text-primary-foreground glow-primary" asChild>
            <a href="https://play.google.com/store/apps/details?id=com.smartcaretv.app" target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-5 w-5" /> Download for Android
            </a>
          </Button>
          <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
            <Monitor className="mr-2 h-5 w-5" /> Download for PC
          </Button>
          <Button size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary" asChild>
            <a href="https://play.google.com/store/apps/details?id=com.smartcaretv.app" target="_blank" rel="noopener noreferrer">
              <Tv className="mr-2 h-5 w-5" /> Download for TV
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
