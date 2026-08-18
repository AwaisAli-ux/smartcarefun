import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Radio, Trophy, Film, Clapperboard, MonitorPlay } from "lucide-react";

interface Channel {
  name: string;
  desc: string;
  category: "news" | "sports" | "entertainment" | "series";
  logo: string | null;       // local path or null for text logo
  overlayLogo?: string;      // authentic SVG/brand logo to overlay on background
  logoText?: string;         // short text for text-based logo
  logoColor?: string;        // gradient/color for text logo bg
}

// ── channel data (ALL images are local or text-based — zero external URLs) ──

const liveTVAndMovies: Channel[] = [
  { name: "HBO Max", desc: "Stream the latest Hollywood blockbusters, DC Universe, and HBO originals.", category: "entertainment", logo: "/thumb-hbomax.jpg" },
  { name: "Showtime", desc: "Premium movies, provocative originals, and championship boxing.", category: "entertainment", logo: "/thumb-showtime.jpg" },
  { name: "Starz", desc: "Hit original series and first-run Hollywood movies every week.", category: "entertainment", logo: "/thumb-starz.jpg" },
  { name: "TCM", desc: "Classic cinema treasures — timeless movies from Hollywood's golden age.", category: "entertainment", logo: "/thumb-tcm.jpg" },
  { name: "FX Movies", desc: "Bold, edgy films and acclaimed FX original productions.", category: "entertainment", logo: "/thumb-fx.jpg" },
  { name: "Netflix", desc: "Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.", category: "entertainment", logo: "/thumb-netflix.jpg" },
  { name: "Disney+", desc: "The best stories from Disney, Pixar, Marvel, Star Wars, and National Geographic.", category: "entertainment", logo: "/thumb-disney.jpg" },
  { name: "Hulu", desc: "Stream thousands of shows and movies, with plans starting at just $7.99/month.", category: "entertainment", logo: "/thumb-hulu.jpg" },
];

const sportsChannels: Channel[] = [
  {
    name: "ESPN",
    desc: "The worldwide leader in sports — live games, highlights, and expert analysis.",
    category: "sports",
    logo: "/thumb-espn.png",
    overlayLogo: "/logo-espn.svg"
  },
  {
    name: "beIN Sports",
    desc: "Premium football and sports coverage including La Liga, Ligue 1, and more.",
    category: "sports",
    logo: "/thumb-bein.png",
    overlayLogo: "/logo-bein.svg"
  },
  {
    name: "Sky Sports",
    desc: "Premier League, F1, cricket, golf — the UK's top sports broadcaster.",
    category: "sports",
    logo: "/thumb-skysports.png",
    overlayLogo: "/logo-skysports.svg"
  },
  {
    name: "NBA TV",
    desc: "All things basketball — live NBA games, draft coverage, and classic replays.",
    category: "sports",
    logo: "/thumb-nba.png",
    overlayLogo: "/logo-nbatv.svg"
  },
  {
    name: "Eurosport",
    desc: "Europe's home of sport — tennis, cycling, Olympics, and winter sports.",
    category: "sports",
    logo: "/thumb-eurosport.png",
    overlayLogo: "/logo-eurosport.svg"
  },
];

const entertainmentChannels: Channel[] = [
  { name: "HBO", desc: "Iconic series, blockbuster movies, and award-winning original content.", category: "entertainment", logo: "/logo-hbo.png" },
  { name: "AMC", desc: "Home of The Walking Dead, Better Call Saul, and gripping original drama.", category: "entertainment", logo: "/logo-amc.png" },
  { name: "Comedy Central", desc: "Non-stop laughs — stand-up specials, sitcoms, and late-night hits.", category: "entertainment", logo: "/logo-comedy.png" },
  { name: "Discovery", desc: "Real-life adventures, nature docs, and science — feeding your curiosity.", category: "entertainment", logo: "/logo-discovery.png" },
  { name: "National Geographic", desc: "Explore the planet — wildlife, history, science, and breathtaking stories.", category: "entertainment", logo: "/logo-natgeo.png" },
];

const newsChannels: Channel[] = [
  { name: "CNN", desc: "24/7 breaking news, analysis, and world coverage from CNN's global newsroom.", category: "news", logo: "/logo-cnn.png" },
  { name: "Fox News", desc: "America's most-watched cable news channel with 24/7 coverage and opinion.", category: "news", logo: "/logo-foxnews.jpg" },
  { name: "MSNBC", desc: "In-depth political analysis, breaking news, and award-winning reporting.", category: "news", logo: "/logo-msnbc.jpg" },
  { name: "CBS News", desc: "Trusted journalism since 1927 — America's most-watched evening news.", category: "news", logo: "/logo-cbsnews.jpg" },
  { name: "NBC News", desc: "Today Show, Nightly News, and Dateline — trusted American journalism.", category: "news", logo: "/logo-nbcnews.jpg" },
];

const seriesChannels: Channel[] = [
  { name: "Breaking Bad", desc: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.", category: "series", logo: "/breaking-bad.png" },
  { name: "The Last of Us", desc: "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.", category: "series", logo: "/last-of-us.png" },
  { name: "Stranger Things", desc: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.", category: "series", logo: "/stranger-things.png" },
  { name: "Game of Thrones", desc: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.", category: "series", logo: "/game-of-thrones.png" },
  { name: "Squid Game", desc: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games—high stakes and deadly results await.", category: "series", logo: "https://images.wallpapersden.com/image/download/official-squid-game_bWVlZmWUmZqaraWkpJRnZmtmrWZnZmo.jpg" },
];

const movieChannels: Channel[] = [
  { name: "Oppenheimer", desc: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.", category: "entertainment", logo: "/oppenheimer.png" },
  { name: "Dune: Part Two", desc: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.", category: "entertainment", logo: "/dune.png" },
  { name: "Avatar: Pandora", desc: "Step into the breathtaking world of Pandora—an immersive journey through bioluminescent wonders and epic landscapes.", category: "entertainment", logo: "/thumb-pandora.png" },
  { name: "The Batman", desc: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.", category: "entertainment", logo: "/batman.png" },
  { name: "Interstellar", desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", category: "entertainment", logo: "/interstellar.png" },
];

const sections = [
  { id: "sports", title: "Watch Sports", channels: sportsChannels, icon: Trophy, accent: "primary" },
  { id: "news", title: "Watch News", channels: newsChannels, icon: Radio, accent: "primary" },
  { id: "entertainment", title: "Watch Entertainment", channels: entertainmentChannels, icon: MonitorPlay, accent: "accent" },
  { id: "series", title: "Watch Series", channels: seriesChannels, icon: Clapperboard, accent: "primary" },
  { id: "movies", title: "Watch Movies", channels: movieChannels, icon: Film, accent: "primary" },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "news": return Radio;
    case "sports": return Trophy;
    case "entertainment": return Film;
    case "series": return MonitorPlay;
    default: return MonitorPlay;
  }
};

/* ─── Text Logo component for channels without local images ─── */
const TextLogo = ({ text, gradient }: { text: string; gradient: string }) => (
  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} rounded-md`}>
    <span className="text-white font-black text-2xl md:text-3xl tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-center leading-tight px-4 select-none">
      {text}
    </span>
  </div>
);

const Streaming = () => {
  const navigate = useNavigate();

  const goToPlans = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-20 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <h1 className="mb-6 text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase">
              Content <span className="text-gradient">Library</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">
              Experience the world's best entertainment with
              <span className="text-primary mx-1">2000+</span>
              Premium HD Channels & Original Series.
            </p>
          </motion.div>

          {sections.map((section, sIdx) => {
            const isGold = section.title.includes("Movies");
            return (
              <motion.div
                key={section.title}
                id={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sIdx * 0.1, duration: 0.6 }}
                className="mb-24"
              >
                <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
                  <div className={`p-4 rounded-2xl ${isGold ? 'gradient-accent shadow-accent/20' : 'gradient-primary shadow-primary/20'} shadow-xl`}>
                    <section.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-foreground">{section.title}</h2>
                    <p className="text-sm text-muted-foreground font-medium italic opacity-60">High-Definition Original Broadcasts</p>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {section.channels.map((ch) => {
                    const hasImage = ch.logo !== null;
                    return (
                      <motion.div
                        key={ch.name}
                        whileHover={{ scale: 1.05, y: -8 }}
                        onClick={goToPlans}
                        className={`group cursor-pointer rounded-3xl border bg-card/30 backdrop-blur-md overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] ${isGold
                          ? "border-accent/10 hover:border-accent/40 hover:bg-accent/5"
                          : "border-primary/10 hover:border-primary/40 hover:bg-primary/5"
                          }`}
                      >
                        <div className="aspect-[16/10] w-full relative flex flex-col items-center justify-center transition-all duration-500 overflow-hidden">
                          {/* Show local image poster or text logo */}
                          {hasImage ? (
                            <>
                              <img
                                src={ch.logo!}
                                alt={ch.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                              />
                              {/* Deep cinematic overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20 z-10" />

                              {/* Authentic Channel Logo Overlay */}
                              {ch.overlayLogo && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-black/20 backdrop-brightness-95">
                                  <img
                                    src={ch.overlayLogo}
                                    alt={`${ch.name} logo`}
                                    className="max-h-12 md:max-h-14 w-auto max-w-[80%] object-contain filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] transition-transform duration-500 group-hover:scale-110"
                                  />
                                </div>
                              )}
                            </>
                          ) : (
                            <TextLogo text={ch.logoText || ch.name} gradient={ch.logoColor || "from-gray-700 to-gray-900"} />
                          )}

                          {/* Live Status Badge */}
                          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 border border-white/10 backdrop-blur-xl text-[9px] font-black text-white tracking-[0.2em] uppercase z-20">
                            <span className="text-primary mr-1">●</span> HD
                          </div>
                        </div>

                        <div className="p-6 relative z-10 border-t border-white/5 bg-card/60 backdrop-blur-3xl">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-black text-foreground truncate tracking-tight">{ch.name}</h3>
                            <div className={`h-2 w-2 rounded-full ${isGold ? 'bg-accent' : 'bg-primary'} animate-pulse`} />
                          </div>
                          <p className="mb-5 text-[12px] text-muted-foreground leading-relaxed line-clamp-2 h-10 font-medium">
                            {ch.desc}
                          </p>
                          <div
                            className={`inline-flex items-center gap-2 group/btn rounded-xl px-5 py-4 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500 w-full justify-center ${isGold
                              ? "bg-accent/10 text-accent border border-accent/20 group-hover:bg-accent group-hover:text-accent-foreground group-hover:shadow-[0_15px_40px_-10px_rgba(234,179,8,0.5)]"
                              : "bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_15px_40px_-10px_rgba(155,135,245,0.5)]"
                              }`}
                          >
                            {section.title.includes("Series") ? "Watch Series" : section.title.includes("Movies") ? "Watch Movies" : "Watch Channel"} <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:translate-x-2" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}

          <div className="mt-20 text-center">
            <Button
              size="lg"
              className="gradient-primary border-0 text-primary-foreground glow-primary h-16 px-12 text-xl font-black rounded-2xl uppercase tracking-tighter"
              onClick={goToPlans}
            >
              Get Full Access Now <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <p className="mt-6 text-sm text-muted-foreground font-bold tracking-widest uppercase opacity-60">Trusted by over 20,000 users worldwide</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Streaming;
