import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CreateAccountModal from "@/components/CreateAccountModal";
import banner1 from "@/assets/1.png";
import banner2 from "@/assets/2.png";
import banner3 from "@/assets/3.png";
import banner4 from "@/assets/4.png";
import banner5 from "@/assets/5.png";
import banner6 from "@/assets/6.png";

const bannerImages = [banner1, banner2, banner3, banner4, banner5, banner6];

const HeroSection = () => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background - Rotating Banner Images */}
        <div className="absolute inset-0">
          <AnimatePresence mode="sync">
            {bannerImages.map((src, index) => (
              index === currentBanner && (
                <motion.img
                  key={src}
                  src={src}
                  alt={`Entertainment Banner ${index + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              )
            ))}
          </AnimatePresence>

          {/* Left dark gradient for text readability — strong on left, transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          {/* Bottom dark anchor for seamless page transition */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
          {/* Top subtle darkening for navbar */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/50 to-transparent" />
        </div>

        <div className="container relative mx-auto pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
            >
              🔴 Live TV • Movies • Series • Sports
            </motion.span>

            <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-7xl">
              Premium <br />
              <span className="text-gradient">Entertainment</span>
              <br />
              <span className="text-gradient-gold">Unlimited</span>
            </h1>

            <p className="mb-10 max-w-lg text-lg text-muted-foreground">
              Access thousands of live TV channels, blockbuster movies, trending series, and exclusive sports content. Stream on any device, anytime, anywhere.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gradient-primary border-0 text-white glow-primary text-base font-bold uppercase tracking-wider cursor-pointer" asChild>
                <Link to="/free-trial">
                  <Sparkles className="mr-2 h-4 w-4 animate-pulse" /> Free Trial
                </Link>
              </Button>
              <Button size="lg" className="gradient-accent border-0 text-accent-foreground glow-accent text-base cursor-pointer" asChild>
                <a href="#plans">
                  <Play className="mr-2 h-4 w-4" fill="currentColor" /> View Plans
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary text-base cursor-pointer" asChild>
                <a href="#download">
                  <Download className="mr-2 h-4 w-4" /> Download App
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <CreateAccountModal
        isOpen={showCreateAccount}
        onClose={() => setShowCreateAccount(false)}
      />
    </>
  );
};

export default HeroSection;
