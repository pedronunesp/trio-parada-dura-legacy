import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import galleryGuitar from "@/assets/gallery-guitar.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-40 section-padding overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: "var(--gradient-radial-gold)" }} />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
            Sobre a Banda
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Uma história escrita
            <br />
            <span className="text-gradient-gold">em acordes</span>
          </h2>
          <div className="space-y-6 text-foreground/60 leading-relaxed">
            <p>
              O Trio Parada Dura é um dos maiores grupos da história da música sertaneja brasileira. 
              Com uma trajetória que ultrapassa cinco décadas, a banda construiu um legado incomparável, 
              marcado por sucessos que se tornaram hinos de uma nação inteira.
            </p>
            <p>
              De palcos em pequenas cidades do interior aos maiores estádios e festivais do Brasil, 
              o Trio carrega em cada acorde a autenticidade, a paixão e a verdade da raiz sertaneja — 
              reinterpretada com a energia e a grandeza que apenas os grandes artistas conseguem alcançar.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            <span className="font-display text-sm italic text-primary/60">"A voz do sertão"</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden glow-gold">
            <img
              src={galleryGuitar}
              alt="Violão com luzes douradas"
              className="w-full h-[500px] object-cover"
              loading="lazy"
              width={800}
              height={1000}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-primary/20 rounded-2xl" />
          <div className="absolute -top-6 -right-6 w-24 h-24 border border-primary/10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
