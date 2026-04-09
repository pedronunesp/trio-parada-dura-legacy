import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Disc3, Users, CalendarDays, Award } from "lucide-react";

const stats = [
  { icon: Disc3, value: "40+", label: "Álbuns Lançados", desc: "Discografia completa" },
  { icon: Users, value: "50M+", label: "Fãs pelo Brasil", desc: "Público fiel e apaixonado" },
  { icon: CalendarDays, value: "50+", label: "Anos de Estrada", desc: "Legado consolidado" },
  { icon: Award, value: "100+", label: "Prêmios", desc: "Reconhecimentos nacionais" },
];

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-6 md:p-8 text-center hover-lift group"
            >
              <stat.icon className="mx-auto mb-4 text-primary/60 group-hover:text-primary transition-colors" size={28} />
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                {stat.value}
              </div>
              <div className="font-heading text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
