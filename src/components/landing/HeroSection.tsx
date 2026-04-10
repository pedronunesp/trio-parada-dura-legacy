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
    href: "https://open.spotify.com/artist/41fjoh5NjJhlDHYIUb9Hsk",
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
  "font-heading text-[9px] sm:text-[10px] md:text-sm tracking-[0.04em] md:tracking-widest uppercase px-2.5 sm:px-3 md:px-8 py-2 sm:py-2.5 md:py-4 rounded-2xl md:rounded-full bg-primary text-primary-foreground hover:bg-primary/90 border border-primary transition-all duration-300 glow-gold inline-flex items-center justify-center gap-1 md:gap-3 text-center leading-tight min-h-[3.6rem] sm:min-h-[4rem] md:min-h-0";

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

  useEffect(() => {
    if (!contactOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [contactOpen]);

  return (
    <>
      <section id="contato" className="relative min-h-[100svh] overflow-hidden flex items-center justify-center pt-20 pb-8 md:py-32">
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
            <span className="font-heading text-[10px] sm:text-xs md:text-sm tracking-[0.24em] md:tracking-[0.3em] uppercase text-primary/80 mb-3 md:mb-6 block">
              Mais de 50 anos de história
            </span>

            <h1 className="font-display text-[2.8rem] sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-3 md:mb-6 leading-[0.86] md:leading-[0.9] tracking-tight">
              <span className="text-gradient-gold glow-gold-text">TRIO</span>
              <br />
              <span className="text-foreground">PARADA</span>
              <br />
              <span className="text-gradient-gold glow-gold-text">DURA</span>
            </h1>

            <p className="font-body text-[13px] sm:text-sm md:text-lg text-foreground/70 max-w-[19rem] sm:max-w-xl md:max-w-2xl mx-auto mb-4 md:mb-12 leading-snug md:leading-relaxed">
              Os "Rolling Stones do Sertão" seguem no reinado com clássicos imortais, formação atual forte
              e presença viva nos palcos, no streaming e na memória afetiva do Brasil.
            </p>

            <div className="grid grid-cols-3 gap-2 md:flex md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-4 mb-2 md:mb-10 max-w-[19rem] sm:max-w-[22rem] md:max-w-none mx-auto">
              <Link to="/midiakit" className={primaryButtonClass}>
                Acessar Mídia Kit
                <ArrowRight size={14} />
              </Link>

              <a href="/conheca-sua-historia.html" className={primaryButtonClass}>
                Conheça Sua História
                <ArrowRight size={14} />
              </a>

              <button type="button" onClick={() => setContactOpen(true)} className={primaryButtonClass}>
                Solicitar Contato
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto mb-4 md:mb-10">
              <Suspense
                fallback={
                  <div className="w-full h-[220px] sm:h-[280px] md:h-[500px] flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                }
              >
                <Model3DViewer />
              </Suspense>
            </div>

            <div className="mb-6 md:mb-10 flex justify-center">
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
                  className="relative z-10 w-full max-w-[210px] sm:max-w-[250px] md:max-w-[340px] h-auto object-contain drop-shadow-[0_0_24px_rgba(245,184,52,0.22)]"
                />
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-4 sm:p-5 md:p-8 max-w-4xl mx-auto">
              <p className="font-heading text-[10px] md:text-xs tracking-[0.24em] md:tracking-[0.3em] uppercase text-primary mb-4 md:mb-5">
                Plataformas Oficiais
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
                {platformLinks.map((platform) => {
                  const Icon = platform.icon;

                  return (
                    <a
                      key={platform.label}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/35 px-3.5 sm:px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm text-foreground hover:border-primary hover:bg-primary/10 transition-colors"
                    >
                      <Icon size={14} className="text-primary" />
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
        <div
          className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="glass-panel-strong rounded-t-[2rem] md:rounded-3xl w-full max-w-3xl h-[88vh] md:h-auto md:max-h-[88vh] overflow-hidden relative flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex justify-center pt-3 md:hidden">
              <span className="h-1.5 w-14 rounded-full bg-foreground/15" />
            </div>

            <div className="sticky top-0 z-10 border-b border-border/40 bg-background/88 backdrop-blur-xl px-4 pb-4 pt-3 md:px-8 md:pb-5 md:pt-6">
              <p className="font-heading text-[11px] tracking-[0.3em] uppercase text-primary mb-2">
                Solicitar Contato
              </p>
              <div className="flex items-start justify-between gap-4">
                <div className="pr-8">
                  <h2 className="font-display text-2xl md:text-4xl font-bold mb-2">
                    Escolha o setor desejado
                  </h2>
                  <p className="text-sm md:text-base text-foreground/65">
                    Selecione o atendimento ideal para seguir.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setContactOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                  aria-label="Fechar"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pb-5 pt-4 md:px-8 md:pb-8 md:pt-6 [touch-action:pan-y]">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <a
                      key={contact.id}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl border border-primary/20 bg-background/35 px-4 py-4 md:p-5 hover:border-primary hover:bg-primary/10 active:scale-[0.99] transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-heading text-xs md:text-sm uppercase tracking-[0.18em] text-foreground mb-2">
                            {contact.name}
                          </h3>
                          <p className="text-sm text-foreground/65 leading-relaxed">
                            {contact.description || "Canal configurado no painel administrativo."}
                          </p>
                        </div>
                        <span className="mt-1 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="rounded-2xl border border-border/50 p-5 text-sm text-muted-foreground md:col-span-2">
                    Nenhum contato configurado no momento.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
