import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";
import { essentialSongs } from "@/content/siteContent";

const VideoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Repertório</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Clássicos que seguem <span className="text-gradient-gold">em movimento</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {essentialSongs.map((song, i) => (
            <motion.div
              key={song.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden min-h-[280px] glass-panel hover-lift"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div className="w-14 h-14 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-gold">
                  <Play size={20} className="text-primary ml-1" />
                </div>

                <div>
                  <p className="font-heading text-[11px] tracking-[0.28em] uppercase text-primary/70 mb-3">Faixa essencial</p>
                  <h3 className="font-display text-3xl font-bold mb-4">{song.title}</h3>
                  <p className="text-sm text-foreground/65 leading-relaxed">{song.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
