import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Search, Grid3X3, List, Download, ExternalLink, Copy, Filter,
  FileText, Image, Film, FileSpreadsheet, File, Folder, ChevronDown,
  ArrowRight, Check, Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroMediakit from "@/assets/hero-mediakit.jpg";

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  iconLink?: string;
};

const MOCK_FILES: DriveFile[] = [
  { id: "1", name: "Logo_Trio_Parada_Dura_Principal.png", mimeType: "image/png", size: "2.4 MB", modifiedTime: "2024-11-15", webViewLink: "#", webContentLink: "#" },
  { id: "2", name: "Logo_Trio_Variacao_Dourada.svg", mimeType: "image/svg+xml", size: "148 KB", modifiedTime: "2024-11-15", webViewLink: "#", webContentLink: "#" },
  { id: "3", name: "Release_Oficial_2024.pdf", mimeType: "application/pdf", size: "1.8 MB", modifiedTime: "2024-12-01", webViewLink: "#", webContentLink: "#" },
  { id: "4", name: "Foto_Oficial_01_Alta.jpg", mimeType: "image/jpeg", size: "8.2 MB", modifiedTime: "2024-11-20", webViewLink: "#", webContentLink: "#" },
  { id: "5", name: "Foto_Oficial_02_Palco.jpg", mimeType: "image/jpeg", size: "6.7 MB", modifiedTime: "2024-11-20", webViewLink: "#", webContentLink: "#" },
  { id: "6", name: "Rider_Tecnico_2024.pdf", mimeType: "application/pdf", size: "3.1 MB", modifiedTime: "2024-10-15", webViewLink: "#", webContentLink: "#" },
  { id: "7", name: "Video_Institucional_30s.mp4", mimeType: "video/mp4", size: "45.2 MB", modifiedTime: "2024-09-10", webViewLink: "#", webContentLink: "#" },
  { id: "8", name: "Biografia_Completa.docx", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", size: "520 KB", modifiedTime: "2024-12-05", webViewLink: "#", webContentLink: "#" },
  { id: "9", name: "Tabela_Shows_2025.xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", size: "89 KB", modifiedTime: "2025-01-10", webViewLink: "#", webContentLink: "#" },
  { id: "10", name: "Foto_Banner_Redes.jpg", mimeType: "image/jpeg", size: "4.5 MB", modifiedTime: "2024-11-25", webViewLink: "#", webContentLink: "#" },
];

const FILE_TYPES = [
  { label: "Todos", value: "all" },
  { label: "Imagens", value: "image" },
  { label: "Documentos", value: "document" },
  { label: "Vídeos", value: "video" },
  { label: "Planilhas", value: "spreadsheet" },
];

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return Image;
  if (mimeType.startsWith("video/")) return Film;
  if (mimeType.includes("pdf") || mimeType.includes("document") || mimeType.includes("word")) return FileText;
  if (mimeType.includes("spreadsheet") || mimeType.includes("sheet")) return FileSpreadsheet;
  if (mimeType.includes("folder")) return Folder;
  return File;
};

const getFileCategory = (mimeType: string): string => {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.includes("spreadsheet") || mimeType.includes("sheet")) return "spreadsheet";
  return "document";
};

const MediaKit = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "date" | "size">("name");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  // In production, replace MOCK_FILES with real Google Drive API data
  const files = MOCK_FILES;

  const filtered = useMemo(() => {
    let result = files.filter((f) => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || getFileCategory(f.mimeType) === filter;
      return matchesSearch && matchesFilter;
    });

    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "date") return (b.modifiedTime || "").localeCompare(a.modifiedTime || "");
      return 0;
    });

    return result;
  }, [files, search, filter, sortBy]);

  const handleCopyLink = (file: DriveFile) => {
    navigator.clipboard.writeText(file.webViewLink || "");
    setCopiedId(file.id);
    toast({ title: "Link copiado!", description: file.name });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative section-padding py-24 md:py-32 flex flex-col items-center justify-center min-h-[60vh] overflow-hidden mt-0">
          {/* Background image with parallax/overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroMediakit}
              alt="Mídia Kit Background"
              className="w-full h-full object-cover opacity-30"
              style={{ objectPosition: "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
            <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)" }} />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Materiais Oficiais</span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                Mídia <span className="text-gradient-gold">Kit</span>
              </h1>
              <p className="text-foreground/80 max-w-lg mx-auto leading-relaxed mb-10">
                Acesse fotos oficiais, logos, releases, riders técnicos e todos os materiais
                necessários para imprensa, contratações e parcerias.
              </p>
            </motion.div>

            {/* Quick Access Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto"
            >
              {[
                { name: "Logos", icon: Image, filter: "image" },
                { name: "Clips", icon: Film, filter: "video" },
                { name: "Fotos", icon: Image, filter: "image" },
                { name: "Riders", icon: FileText, filter: "document" },
                { name: "Vídeos Shows", icon: Film, filter: "video" }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setFilter(item.filter);
                    document.getElementById('files-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="glass-panel hover-lift rounded-xl p-4 flex flex-col items-center justify-center gap-3 group transition-colors hover:bg-primary/10 border border-primary/20 hover:border-primary/50"
                >
                  <item.icon size={24} className="text-primary/60 group-hover:text-primary transition-colors" />
                  <span className="font-heading text-xs tracking-wider uppercase">{item.name}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="section-padding pb-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar arquivos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl glass-panel text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all font-body bg-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                {FILE_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setFilter(type.value)}
                    className={`font-heading text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg whitespace-nowrap transition-all duration-300 ${
                      filter === type.value
                        ? "bg-primary text-primary-foreground"
                        : "glass-panel text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Sort & View */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="appearance-none glass-panel rounded-lg px-4 py-2.5 pr-8 text-xs font-heading tracking-wider uppercase text-muted-foreground bg-transparent outline-none cursor-pointer"
                  >
                    <option value="name">Nome</option>
                    <option value="date">Data</option>
                    <option value="size">Tamanho</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
                <div className="flex rounded-lg overflow-hidden glass-panel">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2.5 transition-colors ${view === "grid" ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2.5 transition-colors ${view === "list" ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Files */}
        <section className="section-padding py-8 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "arquivo encontrado" : "arquivos encontrados"}
              </p>
            </div>

            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel rounded-2xl p-16 text-center"
              >
                <Filter size={40} className="mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="font-heading text-lg text-foreground mb-2">Nenhum arquivo encontrado</h3>
                <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou a busca.</p>
              </motion.div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((file, i) => {
                  const Icon = getFileIcon(file.mimeType);
                  return (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="glass-panel rounded-2xl overflow-hidden hover-lift group"
                    >
                      {/* Preview area */}
                      <div className="h-36 bg-muted/30 flex items-center justify-center relative">
                        <Icon size={36} className="text-primary/40 group-hover:text-primary/60 transition-colors" />
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button onClick={() => handleCopyLink(file)} className="p-1.5 rounded-lg bg-background/80 backdrop-blur text-muted-foreground hover:text-foreground transition-colors" title="Copiar link">
                            {copiedId === file.id ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                          <a href={file.webViewLink} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-background/80 backdrop-blur text-muted-foreground hover:text-foreground transition-colors" title="Abrir">
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="text-sm font-medium text-foreground truncate mb-1" title={file.name}>{file.name}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{file.size}</span>
                          <span>{file.modifiedTime}</span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <a
                            href={file.webContentLink}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-heading tracking-wider uppercase px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            <Download size={12} /> Baixar
                          </a>
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground glass-panel transition-colors"
                          >
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-border/30">
                {filtered.map((file, i) => {
                  const Icon = getFileIcon(file.mimeType);
                  return (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      className="flex items-center gap-4 p-4 hover:bg-muted/20 transition-colors group"
                    >
                      <Icon size={20} className="text-primary/50 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.size} · {file.modifiedTime}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleCopyLink(file)} className="p-2 rounded-lg hover:bg-muted/30 text-muted-foreground hover:text-foreground transition-colors" title="Copiar link">
                          {copiedId === file.id ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                        <a href={file.webViewLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted/30 text-muted-foreground hover:text-foreground transition-colors" title="Abrir">
                          <ExternalLink size={14} />
                        </a>
                        <a href={file.webContentLink} className="p-2 rounded-lg hover:bg-muted/30 text-primary transition-colors" title="Baixar">
                          <Download size={14} />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding pb-24">
          <div className="max-w-3xl mx-auto text-center glass-panel rounded-2xl p-10">
            <h3 className="font-display text-2xl font-bold mb-3">
              Precisa de algo <span className="text-gradient-gold">específico</span>?
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Entre em contato com nossa equipe para solicitar materiais personalizados ou de alta resolução.
            </p>
            <a
              href="mailto:contato@trioparadadura.com.br"
              className="inline-flex items-center gap-2 font-heading text-sm tracking-widest uppercase px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all glow-gold"
            >
              Falar com a Equipe <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MediaKit;
