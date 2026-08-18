import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import adClip1 from "@/assets/ad-clip-1.mp4";
import adClip2 from "@/assets/ad-clip-2.mp4";
import adClip3 from "@/assets/ad-clip-3.mp4";

interface Overlay {
  text: string;
  sub?: string;
  style?: string;
}

interface Clip {
  src: string;
  overlay: Overlay;
}

const clips: Clip[] = [
  {
    src: adClip1,
    overlay: {
      text: "Why pay $120+?",
      sub: "Cable bills are out of control.",
      style: "text-destructive",
    },
  },
  {
    src: adClip2,
    overlay: {
      text: "Get everything for just $35",
      sub: "Movies • Live TV • Series • Sports",
    },
  },
  {
    src: adClip3,
    overlay: {
      text: "Watch anywhere. Any device.",
      sub: "Smart TV • Fire Stick • Mobile",
    },
  },
];

const endScreen = {
  headline: "Cut the cable.",
  sub: "Start streaming today.",
};

const Advertisement = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentClip, setCurrentClip] = useState(0);
  const [showEnd, setShowEnd] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);

  const playNext = useCallback(() => {
    if (currentClip < clips.length - 1) {
      setShowOverlay(false);
      setTimeout(() => {
        setCurrentClip((prev) => prev + 1);
        setShowOverlay(true);
      }, 200);
    } else {
      setShowEnd(true);
    }
  }, [currentClip]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || showEnd) return;

    video.src = clips[currentClip].src;
    video.load();
    video.play().catch(() => {});
    setPlaying(true);

    const handleEnded = () => playNext();
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [currentClip, showEnd, playNext]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const restart = () => {
    setShowEnd(false);
    setCurrentClip(0);
    setShowOverlay(true);
  };

  return (
    <div className="relative h-screen w-full bg-background overflow-hidden">
      {/* Back button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-4 z-50 text-foreground/70 hover:text-foreground"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      {/* Video layer */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/50" />

      {/* Text overlays per clip */}
      <AnimatePresence mode="wait">
        {!showEnd && showOverlay && (
          <motion.div
            key={currentClip}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <h1
              className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-4 ${
                clips[currentClip].overlay.style || "text-foreground"
              }`}
            >
              {clips[currentClip].overlay.text}
            </h1>
            {clips[currentClip].overlay.sub && (
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl">
                {clips[currentClip].overlay.sub}
              </p>
            )}

            {/* Clip 1 specific: price comparison */}
            {currentClip === 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-8 flex gap-6"
              >
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-8 py-5 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Cable TV</p>
                  <p className="text-4xl font-bold text-destructive line-through">$120+</p>
                  <p className="text-xs text-muted-foreground">/month</p>
                </div>
                <div className="rounded-xl border border-primary/40 bg-primary/10 px-8 py-5 text-center glow-primary">
                  <p className="text-sm text-muted-foreground mb-1">Smart Care TV</p>
                  <p className="text-4xl font-bold text-primary">$35</p>
                  <p className="text-xs text-muted-foreground">/month</p>
                </div>
              </motion.div>
            )}

            {/* Clip 2: golden accent for price */}
            {currentClip === 1 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-6 rounded-full gradient-accent px-8 py-3"
              >
                <span className="text-lg font-bold text-accent-foreground">
                  Premium Streaming • Unlimited Access
                </span>
              </motion.div>
            )}

            {/* Clip 3: device icons */}
            {currentClip === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-6 flex gap-3"
              >
                {["📺", "🔥", "📱"].map((icon, i) => (
                  <motion.span
                    key={icon}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + i * 0.2 }}
                    className="rounded-xl border border-border bg-card px-5 py-3 text-3xl"
                  >
                    {icon}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* End screen */}
        {showEnd && (
          <motion.div
            key="end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 text-center px-6"
          >
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-extrabold text-gradient mb-4"
            >
              {endScreen.headline}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-3xl text-gradient-gold font-semibold mb-10"
            >
              {endScreen.sub}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >

              <Button
                size="lg"
                variant="outline"
                className="border-green-500/30 text-green-500 hover:bg-green-500/10 text-base"
                asChild
              >
                <a href="https://wa.me/14064792077" target="_blank" rel="noopener noreferrer">
                  WhatsApp Support
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 text-base"
                asChild
              >
                <a href="sms:+14064792077">
                  SMS Only
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground text-base"
                onClick={restart}
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Watch Again
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      {!showEnd && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-card/60 backdrop-blur text-foreground hover:bg-card/80"
            onClick={togglePlay}
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <div className="flex gap-1.5">
            {clips.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-8 rounded-full transition-colors ${
                  i === currentClip ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Advertisement;
