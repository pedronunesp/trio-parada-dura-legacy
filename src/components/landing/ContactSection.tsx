import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MessageCircle, ArrowRight } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      desc: "Fale diretamente com a equipe",
      action: "Enviar Mensagem",
      href: "https://wa.me/5500000000000",
    },
    {
      icon: Mail,
      title: "E-mail",
      desc: "Para contratações e assessoria",
      action: "Enviar E-mail",
      href: "mailto:contato@trioparadadura.com.br",
    },
    {
      icon: Phone,
      title: "Telefone",
      desc: "Atendimento comercial",
      action: "Ligar Agora",
      href: "tel:+5500000000000",
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
            Vamos <span className="text-gradient-gold">conversar</span>
          </h2>
          <p className="text-foreground/60 max-w-md mx-auto mb-16">
            Para contratações, parcerias, imprensa ou qualquer outra demanda, nossa equipe está pronta para atendê-lo.
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
      </div>
    </section>
  );
};

export default ContactSection;
