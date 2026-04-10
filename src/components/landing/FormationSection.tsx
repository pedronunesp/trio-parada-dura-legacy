import { motion, useInView } from "framer-motion";
import { Mic2, Music2, Guitar } from "lucide-react";
import { useRef } from "react";
import { currentFormation } from "@/content/siteContent";

const icons = [Guitar, Mic2, Music2];

const FormationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 section-padding overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="max-w-3xl mb-14"
        >
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
            Formação Atual
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-5">
            A essência do Trio em <span className="text-gradient-gold">plena atividade</span>
          </h2>
          <p className="text-foreground/60 leading-relaxed">
            A fase atual mantém a assinatura sertaneja do Trio Parada Dura com experiência de palco,
            repertório reconhecido nacionalmente e uma formação preparada para grandes eventos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentFormation.map((member, index) => {
            const Icon = icons[index] ?? Music2;

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-panel rounded-3xl p-8 hover-lift"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Icon size={24} />
                </div>
                <p className="font-heading text-[11px] tracking-[0.28em] uppercase text-primary/70 mb-3">
                  Integrante
                </p>
                <h3 className="font-display text-3xl font-bold mb-2">{member.name}</h3>
                <p className="text-sm uppercase tracking-[0.18em] text-primary mb-5">{member.role}</p>
                <p className="text-sm text-foreground/65 leading-relaxed">{member.summary}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FormationSection;
