import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Download, FileText, Image } from "lucide-react";
import { Link } from "react-router-dom";

const MediaKitCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-panel-strong rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)" }} />

          <div className="relative z-10">
            <div className="flex justify-center gap-4 mb-8">
              {[FileText, Image, Download].map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center"
                >
                  <Icon size={20} className="text-primary" />
                </motion.div>
              ))}
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Acesse o <span className="text-gradient-gold">Mídia Kit</span> Oficial
            </h2>
            <p className="text-foreground/60 max-w-lg mx-auto mb-10 leading-relaxed">
              Release atualizado, formação atual, fotos oficiais, identidade visual, rider técnico
              e referências institucionais para imprensa, contratantes e parceiros.
            </p>

            <Link
              to="/midiakit"
              className="group inline-flex items-center gap-3 font-heading text-sm tracking-widest uppercase px-10 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 glow-gold"
            >
              Explorar Materiais
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MediaKitCTA;
