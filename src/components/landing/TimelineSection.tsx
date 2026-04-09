import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const milestones = [
  { year: "1973", title: "O Início", desc: "Nasce o Trio Parada Dura, unindo três vozes que mudariam a música sertaneja para sempre." },
  { year: "1980", title: "Sucesso Nacional", desc: "Os primeiros grandes hits levam o nome do Trio para todo o Brasil, lotando arenas e festivais." },
  { year: "1995", title: "Disco de Ouro", desc: "Reconhecimento da indústria com discos de ouro e platina, consolidando o legado musical." },
  { year: "2010", title: "Nova Geração", desc: "Renovação que mantém a essência viva, conectando tradição com a energia de novos públicos." },
  { year: "2024", title: "Legado Vivo", desc: "Mais de 50 anos de história, centenas de shows e milhões de corações tocados pela música." },
];

const TimelineSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-40 section-padding overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Trajetória</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Uma jornada <span className="text-gradient-gold">épica</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative flex items-start mb-16 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-row`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-gold z-10 mt-2" />

              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <span className="font-display text-3xl font-bold text-gradient-gold">{m.year}</span>
                <h3 className="font-heading text-lg font-semibold text-foreground mt-2 mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
