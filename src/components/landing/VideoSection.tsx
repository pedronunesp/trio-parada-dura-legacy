import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";

const videos = [
  { title: "Show Completo — Arena Nacional", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", id: "dQw4w9WgXcQ" },
  { title: "Clipe Oficial — Hits Eternos", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", id: "dQw4w9WgXcQ" },
  { title: "Bastidores da Turnê 2024", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", id: "dQw4w9WgXcQ" },
];

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
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Vídeos</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Em <span className="text-gradient-gold">movimento</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <motion.a
              key={i}
              href={`https://youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden aspect-video hover-lift block"
            >
              <div className="absolute inset-0 bg-muted animate-pulse" />
              <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-all duration-500 z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-14 h-14 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-gold">
                  <Play size={20} className="text-primary ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <span className="font-heading text-xs tracking-wider text-foreground/80">{video.title}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
