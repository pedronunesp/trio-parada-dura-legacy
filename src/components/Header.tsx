import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { createWhatsAppHref } from "@/content/siteContent";

const navItems = [
  { label: "Início", kind: "route", to: "/" },
  { label: "Mídia Kit", kind: "route", to: "/midiakit" },
  {
    label: "Contato",
    kind: "external",
    href: createWhatsAppHref("Olá! Quero informações sobre shows do Trio Parada Dura."),
  },
] as const;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-panel-strong py-3" : "py-5 bg-transparent"
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="font-display text-xl md:text-2xl font-bold text-gradient-gold tracking-wider">
              TRIO PARADA DURA
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.kind === "route" ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="font-heading text-sm tracking-widest uppercase text-foreground/70 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-sm tracking-widest uppercase text-foreground/70 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </a>
              ),
            )}

            <Link
              to="/midiakit"
              className="font-heading text-sm tracking-widest uppercase px-6 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 glow-gold"
            >
              Acessar Mídia Kit
            </Link>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 glass-panel-strong flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item.kind === "route" ? (
                  <Link
                    to={item.to}
                    className="font-display text-3xl text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-3xl text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/midiakit"
                className="font-heading text-sm tracking-widest uppercase px-8 py-3 rounded-full bg-primary text-primary-foreground glow-gold"
              >
                Acessar Mídia Kit
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
