import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getMediaCategoryLabel,
  mediaKitCategories,
  mediaKitCategoryOptions,
  normalizeMediaCategory,
  type MediaCategory,
} from "@/content/media-kit-categories";
import { mediaKitApi, type MediaEntry } from "@/lib/media-kit-api";
import {
  Camera,
  Check,
  ChevronDown,
  Clapperboard,
  Copy,
  Download,
  ExternalLink,
  File,
  FileText,
  Filter,
  Film,
  Grid3X3,
  Image,
  List,
  Loader2,
  Search,
  Video,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroMediakit from "@/assets/hero-mediakit.jpg";

const categoryIcons: Record<MediaCategory, typeof Image> = {
  logos: Image,
  clips: Clapperboard,
  fotos: Camera,
  riders: FileText,
  "videos-shows": Video,
};

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return Image;
  if (mimeType.startsWith("video/")) return Film;
  if (mimeType.includes("pdf") || mimeType.includes("document") || mimeType.includes("word")) return FileText;
  return File;
};

const scrollToFilesSection = () => {
  const section = document.getElementById("files-section");
  if (!section) return;

  const topOffset = 150;
  const top = section.getBoundingClientRect().top + window.scrollY - topOffset;
  window.scrollTo({ top, behavior: "smooth" });
};

const getMediaPreview = (file: MediaEntry) => {
  if (file.thumbnailUrl) {
    return {
      kind: "image" as const,
      src: file.thumbnailUrl,
    };
  }

  if (file.mimeType.startsWith("image/")) {
    return {
      kind: "image" as const,
      src: file.publicUrl,
    };
  }

  if (file.mimeType.startsWith("video/")) {
    return {
      kind: "video" as const,
      src: file.publicUrl,
    };
  }

  return null;
};

const MediaKit = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "date" | "size">("date");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [files, setFiles] = useState<MediaEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      try {
        const data = await mediaKitApi.listPublic();
        setFiles(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Não foi possível carregar os arquivos.";
        toast({ title: "Erro ao carregar mídia kit", description: message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    void loadFiles();
  }, [toast]);

  const filtered = useMemo(() => {
    const next = files.filter((file) => {
      const query = search.toLowerCase();
      const matchesSearch =
        file.title.toLowerCase().includes(query) || file.originalName.toLowerCase().includes(query);
      const matchesFilter = filter === "all" || normalizeMediaCategory(file.category) === filter;
      return matchesSearch && matchesFilter;
    });

    next.sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "size") return b.sizeBytes - a.sizeBytes;
      return b.updated.localeCompare(a.updated);
    });

    return next;
  }, [files, filter, search, sortBy]);

  const handleCopyLink = (file: MediaEntry) => {
    navigator.clipboard.writeText(file.publicUrl);
    setCopiedId(file.id);
    toast({ title: "Link copiado", description: file.title });
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <section className="relative section-padding py-24 md:py-32 flex flex-col items-center justify-center min-h-[52vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroMediakit}
              alt="Mídia kit"
              className="w-full h-full object-cover opacity-30"
              style={{ objectPosition: "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
            <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)" }} />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
                Materiais Oficiais
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                Mídia <span className="text-gradient-gold">Kit</span>
              </h1>
              <p className="text-foreground/80 max-w-lg mx-auto leading-relaxed mb-10">
                Arquivos oficiais para imprensa, produção e contratação.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto"
            >
              {mediaKitCategories.map((item) => {
                const Icon = categoryIcons[item.value];

                return (
                  <button
                    key={item.value}
                    onClick={() => {
                      setFilter(item.value);
                      requestAnimationFrame(() => scrollToFilesSection());
                    }}
                    className="glass-panel hover-lift rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors hover:bg-primary/10 border border-primary/20 hover:border-primary/50"
                  >
                    <Icon size={24} className="text-primary/60" />
                    <span className="font-heading text-xs tracking-wider uppercase">{item.label}</span>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="section-padding pb-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar arquivos..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl glass-panel text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all font-body bg-transparent"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                {mediaKitCategoryOptions.map((type) => (
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

              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
                    className="appearance-none glass-panel rounded-lg px-4 py-2.5 pr-8 text-xs font-heading tracking-wider uppercase text-muted-foreground bg-transparent outline-none cursor-pointer"
                  >
                    <option value="date">Data</option>
                    <option value="name">Nome</option>
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

        <section id="files-section" className="section-padding py-8 pb-24 scroll-mt-40">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "arquivo encontrado" : "arquivos encontrados"}
              </p>
            </div>

            {loading ? (
              <div className="glass-panel rounded-2xl p-16 text-center">
                <Loader2 size={40} className="mx-auto text-primary animate-spin mb-4" />
                <p className="text-sm text-muted-foreground">Carregando arquivos...</p>
              </div>
            ) : filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel rounded-2xl p-16 text-center">
                <Filter size={40} className="mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="font-heading text-lg text-foreground mb-2">Nenhum arquivo encontrado</h3>
                <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou a busca.</p>
              </motion.div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((file, index) => {
                  const Icon = getFileIcon(file.mimeType);
                  const preview = getMediaPreview(file);

                  return (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                      className="glass-panel rounded-2xl overflow-hidden hover-lift group"
                    >
                      <div className="h-36 bg-muted/30 flex items-center justify-center relative overflow-hidden">
                        {preview?.kind === "image" ? (
                          <img src={preview.src} alt={file.title} className="h-full w-full object-cover" loading="lazy" />
                        ) : preview?.kind === "video" ? (
                          <video
                            src={preview.src}
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                          />
                        ) : (
                          <Icon size={36} className="text-primary/40 group-hover:text-primary/60 transition-colors" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button
                            onClick={() => handleCopyLink(file)}
                            className="p-1.5 rounded-lg bg-background/80 backdrop-blur text-muted-foreground hover:text-foreground transition-colors"
                            title="Copiar link"
                          >
                            {copiedId === file.id ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                          <a
                            href={file.publicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-background/80 backdrop-blur text-muted-foreground hover:text-foreground transition-colors"
                            title="Abrir"
                          >
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="text-sm font-medium text-foreground truncate mb-1" title={file.title}>
                          {file.title}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{getMediaCategoryLabel(file.category)}</span>
                          <span>{new Date(file.updated).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <a
                            href={file.publicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-heading tracking-wider uppercase px-3 py-2 rounded-lg border border-border/60 text-foreground hover:bg-muted/30 transition-colors"
                          >
                            <ExternalLink size={12} /> Preview
                          </a>
                          <a
                            href={file.downloadUrl}
                            download={file.originalName}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-heading tracking-wider uppercase px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            <Download size={12} /> Baixar
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-border/30">
                {filtered.map((file, index) => {
                  const Icon = getFileIcon(file.mimeType);

                  return (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className="flex items-center gap-4 p-4 hover:bg-muted/20 transition-colors group"
                    >
                      <Icon size={20} className="text-primary/50 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{file.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {getMediaCategoryLabel(file.category)} · {file.size} · {new Date(file.updated).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCopyLink(file)}
                          className="p-2 rounded-lg hover:bg-muted/30 text-muted-foreground hover:text-foreground transition-colors"
                          title="Copiar link"
                        >
                          {copiedId === file.id ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                        <a
                          href={file.publicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-muted/30 text-muted-foreground hover:text-foreground transition-colors"
                          title="Preview"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <a
                          href={file.downloadUrl}
                          download={file.originalName}
                          className="p-2 rounded-lg hover:bg-muted/30 text-primary transition-colors"
                          title="Baixar"
                        >
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
      </main>
      <Footer />
    </div>
  );
};

export default MediaKit;
