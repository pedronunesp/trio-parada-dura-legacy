import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Phone, MessageCircle, ArrowRight } from "lucide-react";
import {
  bookingPhoneDisplay,
  bookingPhoneHref,
  createWhatsAppHref,
  officialWebsiteHref,
  officialWebsiteLabel,
} from "@/content/siteContent";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      desc: "Atendimento direto para shows, agendas e informações comerciais",
      action: "Enviar Mensagem",
      href: createWhatsAppHref("Olá! Quero informações sobre shows do Trio Parada Dura."),
    },
    {
      icon: Phone,
      title: "Telefone",
      desc: `${bookingPhoneDisplay} para atendimento comercial`,
      action: "Ligar Agora",
      href: bookingPhoneHref,
    },
    {
      icon: Globe,
      title: "Site Oficial",
      desc: "Canal institucional e presença oficial da banda",
      action: "Abrir Site",
      href: officialWebsiteHref,
    },
  ];

  return (
    <section ref={ref} id="contato" className="relative py-24 md:py-40 section-padding">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Contato</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Leve o Trio Parada Dura para o seu <span className="text-gradient-gold">evento</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto mb-16 leading-relaxed">
            Com agenda ativa e repertório consagrado, a equipe está pronta para atender contratações,
            imprensa, parcerias e demandas de produção.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-8 text-center hover-lift group cursor-pointer block"
            >
              <card.icon className="mx-auto mb-4 text-primary/60 group-hover:text-primary transition-colors" size={32} />
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{card.desc}</p>
              <span className="inline-flex items-center gap-2 text-xs font-heading tracking-widest uppercase text-primary group-hover:gap-3 transition-all">
                {card.action} <ArrowRight size={12} />
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 glass-panel rounded-3xl px-8 py-7 flex flex-col lg:flex-row items-center justify-between gap-6 text-left"
        >
          <div>
            <p className="font-heading text-[11px] uppercase tracking-[0.28em] text-primary mb-2">Contato principal</p>
            <p className="font-display text-3xl md:text-4xl text-gradient-gold font-bold">{bookingPhoneDisplay}</p>
          </div>
          <div className="text-sm text-foreground/65 max-w-xl">
            Disponível para eventos em todo o Brasil, com suporte comercial e institucional pelo WhatsApp,
            telefone e site oficial {officialWebsiteLabel}.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
