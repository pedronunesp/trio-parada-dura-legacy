import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail, Phone } from "lucide-react";

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
              Mais de cinco décadas de história, emoção e música que atravessa gerações.
              O legado vivo da música sertaneja brasileira.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xs tracking-widest uppercase text-primary mb-6">
              Navegação
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Início</Link>
              <Link to="/midiakit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Mídia Kit</Link>
              <a href="#contato" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contato</a>
            </nav>
          </div>

          <div>
            <h4 className="font-heading text-xs tracking-widest uppercase text-primary mb-6">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:contato@trioparadadura.com.br" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Mail size={14} /> contato@trioparadadura.com.br
              </a>
              <a href="tel:+5500000000000" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Phone size={14} /> (00) 00000-0000
              </a>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube"><Youtube size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Trio Parada Dura. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Site oficial · Assessoria de imprensa e contratações
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
