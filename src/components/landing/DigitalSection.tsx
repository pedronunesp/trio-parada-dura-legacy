import { motion, useInView } from "framer-motion";
import { Music4, PlayCircle, Radio, Sparkles } from "lucide-react";
import { useRef } from "react";
import { digitalHighlights, platformPresence, recentProjects } from "@/content/siteContent";

const platformIcons = [Radio, PlayCircle, Music4];

const DigitalSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 section-padding">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="glass-panel-strong rounded-3xl p-8 md:p-10"
        >
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
            Presença Digital
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-5">
            Tradição que também domina o <span className="text-gradient-gold">agora</span>
          </h2>
          <p className="text-foreground/60 leading-relaxed mb-10 max-w-2xl">
            O projeto que nasceu no rádio e no vinil mantém relevância no streaming, em colaborações de grande alcance
            e em lançamentos que renovam a presença do Trio Parada Dura para novas audiências.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {digitalHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                className="rounded-2xl border border-primary/15 bg-primary/5 p-6"
              >
                <p className="font-display text-4xl text-gradient-gold font-bold mb-2">{item.value}</p>
                <p className="text-lg font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platformPresence.map((item, index) => {
              const Icon = platformIcons[index] ?? Music4;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + index * 0.1 }}
                  className="glass-panel rounded-2xl p-5"
                >
                  <Icon className="text-primary mb-4" size={24} />
                  <p className="font-heading text-xs uppercase tracking-[0.24em] text-primary/70 mb-2">{item.name}</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{item.value}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-panel rounded-3xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.28em] text-primary/70">Projetos recentes</p>
              <h3 className="font-display text-2xl font-bold">Lançamentos em destaque</h3>
            </div>
          </div>

          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="rounded-2xl border border-border/50 bg-background/30 p-5"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h4 className="font-heading text-sm uppercase tracking-[0.18em] text-foreground">{project.title}</h4>
                  <span className="text-xs text-primary">{project.year}</span>
                </div>
                <p className="text-sm text-foreground/65 leading-relaxed">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalSection;
