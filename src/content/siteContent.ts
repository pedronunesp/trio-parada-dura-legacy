export const bookingPhoneDigits = "5511986896001";
export const bookingPhoneDisplay = "(11) 9 8689-6001";
export const bookingPhoneHref = `tel:+${bookingPhoneDigits}`;
export const officialWebsiteLabel = "trioparadadura.art.br";
export const officialWebsiteHref = "https://trioparadadura.art.br";

export const createWhatsAppHref = (message: string) =>
  `https://wa.me/${bookingPhoneDigits}?text=${encodeURIComponent(message)}`;

export const aboutParagraphs = [
  "Formado em Minas Gerais, em 1973, o Trio Parada Dura se tornou um dos conjuntos mais longevos e bem-sucedidos da música brasileira. São mais de cinco décadas de estrada, palcos históricos e uma identidade sertaneja que atravessa gerações.",
  "O sucesso nacional ganhou força a partir de 1975 com 'Castelo de Amor' e se consolidou com clássicos como 'Telefone Mudo', 'As Andorinhas', 'Blusa Vermelha' e 'Último Adeus', canções que ajudaram a moldar a memória afetiva do sertanejo no país.",
  "Nascido no tempo do vinil e do rádio, o grupo segue relevante no streaming, nos grandes eventos e na cultura popular. A força do Trio está justamente em unir raiz, repertório consagrado e presença contemporânea.",
];

export const currentFormation = [
  {
    name: "Creone",
    role: "Vocal de apoio e violão",
    summary:
      "Integrante desde 1975, é o pilar histórico do grupo e representa a memória viva do sertanejo brasileiro.",
  },
  {
    name: "Leonito",
    role: "Voz principal e violão",
    summary:
      "Na formação desde outubro de 2020, conduz o repertório com potência vocal e respeito ao legado do Trio.",
  },
  {
    name: "Xonadão",
    role: "Sanfona",
    summary:
      "Responsável por preservar a assinatura sonora do Trio com a sanfona e o balanço característico da banda.",
  },
];

export const digitalHighlights = [
  {
    value: "262M+",
    title: "Aceita que Dói Menos",
    subtitle: "com Marília Mendonça",
  },
  {
    value: "130M+",
    title: "Vivendo Aqui no Mato",
    subtitle: "com Zé Neto & Cristiano",
  },
];

export const platformPresence = [
  { name: "Spotify", value: "1.5M+ ouvintes mensais" },
  { name: "YouTube", value: "1.7M+ inscritos" },
  { name: "Catálogo", value: "100M+ discos vendidos" },
];

export const recentProjects = [
  {
    title: "Na Chalana Vol. 3",
    year: "2024",
    description: "Projeto ao vivo que reforça a fase atual da banda com repertório forte e produção moderna.",
  },
  {
    title: "Verão Maior",
    year: "2024",
    description: "Registro ao vivo com energia de palco e forte apelo popular para eventos e divulgação.",
  },
  {
    title: "DVD 50 Anos",
    year: "Legado",
    description: "Marco histórico da carreira, reunindo memória afetiva, repertório consagrado e participações.",
  },
];

export const timelineMilestones = [
  {
    year: "1973",
    title: "Fundação do Trio",
    description:
      "O grupo nasce em Minas Gerais e inicia uma trajetória que se tornaria referência para o sertanejo brasileiro.",
  },
  {
    year: "1975",
    title: "Castelo de Amor",
    description:
      "A canção impulsiona o reconhecimento nacional e abre caminho para uma sequência de grandes sucessos.",
  },
  {
    year: "Décadas de ouro",
    title: "Clássicos eternizados",
    description:
      "Faixas como 'Telefone Mudo', 'As Andorinhas', 'Blusa Vermelha' e 'Último Adeus' consolidam o legado popular do Trio.",
  },
  {
    year: "2020",
    title: "Nova fase em cena",
    description:
      "A formação atual reforça a continuidade do projeto com renovação artística e fidelidade à essência sertaneja.",
  },
  {
    year: "2024+",
    title: "Relevância no digital",
    description:
      "O Trio mantém força em shows, lançamentos e plataformas, conectando público histórico e novas gerações.",
  },
];

export const essentialSongs = [
  {
    title: "Telefone Mudo",
    description:
      "Um dos maiores marcos do repertório sertanejo e uma das músicas mais regravadas do gênero.",
  },
  {
    title: "As Andorinhas",
    description:
      "Canção que ajudou a fixar a assinatura sentimental e popular do Trio Parada Dura.",
  },
  {
    title: "Blusa Vermelha",
    description:
      "Faixa de forte presença nos palcos e na memória do público, sempre lembrada entre os clássicos do grupo.",
  },
];

export type MediaKitCategory = "image" | "document" | "video";

export type MediaKitItem = {
  id: string;
  title: string;
  category: MediaKitCategory;
  format: string;
  updated: string;
  description: string;
};

export const mediaKitItems: MediaKitItem[] = [
  {
    id: "release-oficial",
    title: "Release oficial e histórico do Trio",
    category: "document",
    format: "PDF / texto-base",
    updated: "Atualização institucional",
    description:
      "Resumo biográfico com origem em 1973, trajetória nacional, clássicos e posicionamento atual da banda.",
  },
  {
    id: "formacao-atual",
    title: "Ficha da formação atual",
    category: "document",
    format: "PDF / briefing",
    updated: "Formação vigente",
    description:
      "Material de apoio com Creone, Leonito e Xonadão, funções artísticas e contexto da fase atual.",
  },
  {
    id: "fotos-oficiais-palco",
    title: "Fotos oficiais de palco",
    category: "image",
    format: "JPG alta resolução",
    updated: "Acervo promocional",
    description:
      "Imagens para imprensa, eventos, portais e materiais promocionais com a energia dos shows do Trio.",
  },
  {
    id: "fotos-divulgacao",
    title: "Fotos para divulgação e imprensa",
    category: "image",
    format: "JPG / PNG",
    updated: "Uso editorial",
    description:
      "Seleção visual pensada para matérias, banners, redes sociais, casas de show e organizadores.",
  },
  {
    id: "logos-identidade",
    title: "Logos e assinaturas oficiais",
    category: "image",
    format: "PNG / vetor",
    updated: "Kit de marca",
    description:
      "Versões principais da identidade visual para aplicação em peças digitais, impressas e materiais de evento.",
  },
  {
    id: "rider-show",
    title: "Rider técnico e necessidades de palco",
    category: "document",
    format: "PDF",
    updated: "Operação de show",
    description:
      "Documento voltado para produção, som, palco e alinhamento com equipes técnicas e contratantes.",
  },
  {
    id: "resumo-digital",
    title: "Resumo de presença digital",
    category: "document",
    format: "PDF / apresentação",
    updated: "Números de audiência",
    description:
      "Dados com destaque para Spotify, YouTube, collabs relevantes e alcance recente do grupo no digital.",
  },
  {
    id: "conteudos-video",
    title: "Cortes, vídeos institucionais e chamadas",
    category: "video",
    format: "MP4 / links privados",
    updated: "Entrega sob demanda",
    description:
      "Peças para divulgação, redes sociais, teasers e apoio comercial solicitadas diretamente com a equipe.",
  },
];
