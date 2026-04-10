import { Link } from "react-router-dom";
import { Globe, Phone, MessageCircle } from "lucide-react";
import {
  bookingPhoneDisplay,
  bookingPhoneHref,
  createWhatsAppHref,
  officialWebsiteHref,
  officialWebsiteLabel,
} from "@/content/siteContent";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/30">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-transparent" />
      <div className="relative section-padding py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold text-gradient-gold mb-4">
              TRIO PARADA DURA
            </h3>
            <p className="text-muted-foreground max-w-md leading-relaxed text-sm">
              Mais de cinco décadas de história, repertório consagrado e presença viva em shows,
              mídia e plataformas digitais. Um legado sertanejo em plena atividade.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xs tracking-widest uppercase text-primary mb-6">
              Navegação
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Início</Link>
              <Link to="/midiakit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Mídia Kit</Link>
              <a
                href={createWhatsAppHref("Olá! Quero informações sobre shows do Trio Parada Dura.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contato
              </a>
            </nav>
          </div>

          <div>
            <h4 className="font-heading text-xs tracking-widest uppercase text-primary mb-6">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={bookingPhoneHref}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Phone size={14} /> {bookingPhoneDisplay}
              </a>
              <a
                href={createWhatsAppHref("Olá! Quero falar com a equipe do Trio Parada Dura.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <MessageCircle size={14} /> WhatsApp da equipe
              </a>
              <a
                href={officialWebsiteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Globe size={14} /> {officialWebsiteLabel}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex items-center justify-center">
          <p className="text-xs text-muted-foreground text-center">
            2026 Trio Parada Dura. Todos direitos reservados. Material de divulgação oficial.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
