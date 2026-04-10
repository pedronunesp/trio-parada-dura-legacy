export type MediaCategory = "logos" | "clips" | "fotos" | "riders" | "videos-shows";

export const mediaKitCategories: Array<{ label: string; value: MediaCategory }> = [
  { label: "Logos", value: "logos" },
  { label: "Clips", value: "clips" },
  { label: "Fotos", value: "fotos" },
  { label: "Riders", value: "riders" },
  { label: "Vídeos Shows", value: "videos-shows" },
];

export const mediaKitCategoryOptions = [
  { label: "Todos", value: "all" as const },
  ...mediaKitCategories,
];

const mediaKitCategoryLabelMap: Record<MediaCategory, string> = {
  logos: "Logos",
  clips: "Clips",
  fotos: "Fotos",
  riders: "Riders",
  "videos-shows": "Vídeos Shows",
};

const normalizeCategorySlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const normalizeMediaCategory = (value: string): MediaCategory => {
  const normalized = normalizeCategorySlug(value);

  switch (normalized) {
    case "logos":
      return "logos";
    case "clips":
      return "clips";
    case "fotos":
    case "foto":
    case "image":
    case "images":
    case "imagem":
    case "imagens":
      return "fotos";
    case "riders":
    case "rider":
    case "document":
    case "documents":
    case "documento":
    case "documentos":
    case "spreadsheet":
    case "planilha":
      return "riders";
    case "videos-shows":
    case "video-shows":
    case "video-show":
    case "video":
    case "videos":
    case "videosshows":
      return "videos-shows";
    default:
      return "fotos";
  }
};

export const getMediaCategoryLabel = (value: string) =>
  mediaKitCategoryLabelMap[normalizeMediaCategory(value)];
