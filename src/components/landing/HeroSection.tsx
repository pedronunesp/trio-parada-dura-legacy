import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Disc3, Facebook, Headphones, Instagram, Music2, X, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import heroBand from "@/assets/hero-bg-new.png";
import { mediaKitApi, type ContactChannel } from "@/lib/media-kit-api";

const Model3DViewer = lazy(() => import("./Model3DViewer"));

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
    label: "Spotify",
    href: "https://open.spotify.com/search/Trio%20Parada%20Dura/artists",
    icon: Music2,
  },
  {
    label: "YouTube Music",
    href: "https://music.youtube.com/search?q=Trio%20Parada%20Dura",
    icon: Headphones,
  },
  {
    label: "Deezer",
    href: "https://www.deezer.com/search/Trio%20Parada%20Dura/artist",
    icon: Disc3,
  },
];

const primaryButtonClass =
  "font-heading text-sm tracking-widest uppercase px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 border border-primary transition-all duration-300 glow-gold inline-flex items-center justify-center gap-3";

const HeroSection = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [contacts, setContacts] = useState<ContactChannel[]>([]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await mediaKitApi.listContacts();
        setContacts(data);
      } catch {
        setContacts([]);
      }
    };

    void loadContacts();
  }, []);

  return (
    <>
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
              Os "Rolling Stones do Sertão" seguem no reinado com clássicos imortais, formação atual forte
              e presença viva nos palcos, no streaming e na memória afetiva do Brasil.
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-10">
              <Link to="/midiakit" className={primaryButtonClass}>
                Acessar Mídia Kit
                <ArrowRight size={16} />
              </Link>

              <a href="/conheca-sua-historia.html" className={primaryButtonClass}>
                Conheça Sua História
                <ArrowRight size={16} />
              </a>

              <button type="button" onClick={() => setContactOpen(true)} className={primaryButtonClass}>
                Solicitar Contato
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto mb-10">
              <Suspense
                fallback={
                  <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                }
              >
                <Model3DViewer />
              </Suspense>
            </div>

            <div className="mb-10 flex justify-center">
              <div className="relative inline-flex items-center justify-center px-8 py-6">
                <div
                  className="absolute inset-0 rounded-[2rem] opacity-90 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle at center, hsl(38 75% 58% / 0.42) 0%, hsl(38 70% 52% / 0.22) 38%, transparent 72%)",
                  }}
                />
                <div
                  className="absolute inset-x-8 inset-y-6 rounded-[2rem] border border-primary/20"
                  style={{
                    boxShadow: "0 0 50px hsl(38 75% 58% / 0.18), inset 0 0 24px hsl(38 75% 58% / 0.08)",
                  }}
                />
                <img
                  src="/telefone_mudo.png"
                  alt="Logo Telefone Mudo Promoções"
                  className="relative z-10 w-full max-w-[280px] md:max-w-[340px] h-auto object-contain drop-shadow-[0_0_24px_rgba(245,184,52,0.22)]"
                />
              </div>
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

      {contactOpen && (
        <div className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="glass-panel-strong rounded-3xl w-full max-w-3xl p-6 md:p-8 relative">
            <button
              type="button"
              onClick={() => setContactOpen(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            <p className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-3">
              Solicitar Contato
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Escolha o setor desejado
            </h2>
            <p className="text-foreground/65 mb-8 max-w-2xl">
              Selecione abaixo o contato ideal para seu atendimento. Esses canais são configuráveis pelo painel administrativo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <a
                    key={contact.id}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-primary/20 bg-background/30 p-5 hover:border-primary hover:bg-primary/10 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="font-heading text-sm uppercase tracking-[0.18em] text-foreground">
                        {contact.name}
                      </h3>
                      <ArrowRight size={16} className="text-primary" />
                    </div>
                    <p className="text-sm text-foreground/65">
                      {contact.description || "Canal configurado no painel administrativo."}
                    </p>
                  </a>
                ))
              ) : (
                <div className="rounded-2xl border border-border/50 p-6 text-sm text-muted-foreground">
                  Nenhum contato configurado no momento.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
