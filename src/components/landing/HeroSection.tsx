import { motion } from "framer-motion";
import { ArrowRight, Facebook, Instagram, Music2, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import heroBand from "@/assets/hero-bg-new.png";
import { createWhatsAppHref } from "@/content/siteContent";

const platformLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/trioparadadura",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC10bc436tdXaMUpENud-daQ",
    icon: Youtube,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/otrioparadadura",
    icon: Facebook,
  },
  {
    label: "Palco MP3",
    href: "https://www.palcomp3.com.br/otrioparadadura/",
    icon: Music2,
  },
];

const primaryButtonClass =
  "font-heading text-sm tracking-widest uppercase px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 border border-primary transition-all duration-300 glow-gold inline-flex items-center justify-center gap-3";

const HeroSection = () => {
  return (
    <section id="contato" className="relative min-h-screen overflow-hidden flex items-center justify-center py-32">
      <div className="absolute inset-0">
        <img
          src={heroBand}
          alt="Trio Parada Dura em show ao vivo"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-background/70" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)" }} />
      </div>

      <div className="relative z-10 section-padding w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <span className="font-heading text-xs md:text-sm tracking-[0.3em] uppercase text-primary/80 mb-6 block">
            Mais de 50 anos de história
          </span>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 leading-[0.9] tracking-tight">
            <span className="text-gradient-gold glow-gold-text">TRIO</span>
            <br />
            <span className="text-foreground">PARADA</span>
            <br />
            <span className="text-gradient-gold glow-gold-text">DURA</span>
          </h1>

          <p className="font-body text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            O legado sertanejo que atravessa gerações com clássicos imortais, presença forte nos palcos
            e uma história marcante na música brasileira.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/midiakit" className={primaryButtonClass}>
              Acessar Mídia Kit
              <ArrowRight size={16} />
            </Link>

            <a
              href="/conheca-sua-historia.html"
              className={primaryButtonClass}
            >
              Conheça Sua História
              <ArrowRight size={16} />
            </a>

            <a
              href={createWhatsAppHref("Olá! Quero informações sobre shows do Trio Parada Dura.")}
              target="_blank"
              rel="noopener noreferrer"
              className={primaryButtonClass}
            >
              Solicitar Contato
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="glass-panel rounded-3xl p-6 md:p-8 max-w-4xl mx-auto">
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-5">
              Plataformas Oficiais
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {platformLinks.map((platform) => {
                const Icon = platform.icon;

                return (
                  <a
                    key={platform.label}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/35 px-5 py-3 text-sm text-foreground hover:border-primary hover:bg-primary/10 transition-colors"
                  >
                    <Icon size={16} className="text-primary" />
                    <span>{platform.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
