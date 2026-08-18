import { motion } from "framer-motion";
import { Tv, Trophy, Radio, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const liveChannels = [
  "CNN", "BBC News", "Sky News", "Fox News", "MSNBC",
  "ABC News", "CBS News", "NBC News", "PBS", "CNBC",
  "Bloomberg", "France 24", "DW News", "C-SPAN"
];

const sportsChannels = [
  "ESPN", "beIN Sports", "Sky Sports", "Fox Sports", "NBA TV", "Eurosport",
  "NFL Network", "CBS Sports", "BT Sport", "DAZN", "WWE Network",
  "MLB Network", "NHL Network", "SuperSport", "TSN", "Golf Channel"
];

const entertainmentChannels = [
  "HBO", "Showtime", "AMC", "FX", "Comedy Central", "Discovery",
  "National Geographic", "History Channel", "TLC", "MTV", "VH1", "E!",
  "Bravo", "A&E", "Syfy", "Paramount+"
];

const popularMovies = [
  "Oppenheimer", "The Batman", "Dune: Part Two", "Interstellar", "Inception",
  "Spider-Man: No Way Home", "Avatar 2", "John Wick 4", "Top Gun: Maverick",
  "The Godfather", "Gladiator II", "Joker", "Parasite", "Avengers: Endgame",
  "The Dark Knight", "Pulp Fiction"
];

const categories = [
  {
    title: "Live TV & Movies",
    icon: Radio,
    items: [...liveChannels, ...popularMovies.slice(0, 4)],
    accent: "primary",
  },
  {
    title: "Sports Channels",
    icon: Trophy,
    items: sportsChannels,
    accent: "primary",
  },
  {
    title: "Entertainment Channels",
    icon: Tv,
    items: entertainmentChannels,
    accent: "accent",
  },
];

const ChannelsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="channels" className="py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-foreground">
            Explore Our <span className="text-gradient">Content Library</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            2000+ live channels and blockbuster movies — all in one place
          </p>
        </motion.div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.title} cat={cat} delay={i * 0.12} onClick={() => navigate("/streaming")} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="gradient-accent border-0 text-accent-foreground glow-accent"
            onClick={() => navigate("/streaming")}
          >
            View Full Library <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({
  cat,
  delay,
  onClick,
}: {
  cat: (typeof categories)[0];
  delay: number;
  onClick: () => void;
}) => {
  const isGold = cat.accent === "accent";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onClick={onClick}
      className={`cursor-pointer rounded-xl border bg-card p-7 transition-all hover:scale-[1.02] ${
        isGold
          ? "border-accent/20 hover:border-accent/50 hover:glow-accent"
          : "border-primary/20 hover:border-primary/50 hover:glow-primary"
      }`}
    >
      <div className="flex items-center justify-center gap-3 mb-5">
        <div
          className={`inline-flex rounded-lg p-2 ${
            isGold ? "gradient-accent" : "gradient-primary"
          } shrink-0`}
        >
          <cat.icon className="h-5 w-5 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground uppercase tracking-wide text-center">{cat.title}</h3>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {cat.items.map((item) => (
          <span
            key={item}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              isGold
                ? "border-accent/20 bg-accent/10 text-accent"
                : "border-primary/20 bg-primary/10 text-primary"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ChannelsSection;
