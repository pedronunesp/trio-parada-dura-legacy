import cookieParser from "cookie-parser";
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const storageDir = path.join(rootDir, "storage", "media-kit");
const metadataFile = path.join(dataDir, "media-kit.json");
const contactsFile = path.join(dataDir, "contacts.json");
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(rootDir, "public");

const port = Number(process.env.PORT || 3001);
const adminUsername = process.env.ADMIN_USERNAME || "admin";
const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
const sessionSecret = process.env.ADMIN_SESSION_SECRET || "troque-o-session-secret";

const sessionCookieName = "tpd_admin_session";

const defaultContacts = [
  {
    id: crypto.randomUUID(),
    name: "Agenda",
    description: "Shows, datas e disponibilidade",
    href: "https://wa.me/5511986896001?text=Ol%C3%A1!%20Quero%20falar%20com%20a%20agenda%20do%20Trio%20Parada%20Dura.",
  },
  {
    id: crypto.randomUUID(),
    name: "Produção",
    description: "Rider, palco e operação do evento",
    href: "https://wa.me/5511986896001?text=Ol%C3%A1!%20Quero%20falar%20com%20a%20produ%C3%A7%C3%A3o%20do%20Trio%20Parada%20Dura.",
  },
  {
    id: crypto.randomUUID(),
    name: "Financeiro",
    description: "Contratos, pagamentos e documentação",
    href: "https://wa.me/5511986896001?text=Ol%C3%A1!%20Quero%20falar%20com%20o%20financeiro%20do%20Trio%20Parada%20Dura.",
  },
  {
    id: crypto.randomUUID(),
    name: "Marketing",
    description: "Parcerias, campanhas e ativações",
    href: "https://wa.me/5511986896001?text=Ol%C3%A1!%20Quero%20falar%20com%20o%20marketing%20do%20Trio%20Parada%20Dura.",
  },
  {
    id: crypto.randomUUID(),
    name: "Imprensa",
    description: "Release, mídia kit e atendimento editorial",
    href: "https://wa.me/5511986896001?text=Ol%C3%A1!%20Quero%20falar%20com%20a%20imprensa%20do%20Trio%20Parada%20Dura.",
  },
];

const mimeCategoryMap = {
  image: ["image/"],
  video: ["video/"],
  document: ["application/pdf", "application/msword", "application/vnd", "text/"],
};

const formatBytes = (bytes) => {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;
  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
};

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const detectCategory = (mimeType) => {
  if (mimeCategoryMap.image.some((prefix) => mimeType.startsWith(prefix))) return "image";
  if (mimeCategoryMap.video.some((prefix) => mimeType.startsWith(prefix))) return "video";
  return "document";
};

const createSessionSignature = (payload) =>
  crypto.createHmac("sha256", sessionSecret).update(payload).digest("hex");

const createSessionToken = (username) => {
  const payload = JSON.stringify({
    username,
    expiresAt: Date.now() + 1000 * 60 * 60 * 12,
  });
  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = createSessionSignature(encodedPayload);
  return `${encodedPayload}.${signature}`;
};

const readSessionToken = (token) => {
  if (!token) return null;
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expected = createSessionSignature(encodedPayload);
  const valid =
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

  if (!valid) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    if (payload.expiresAt < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
};

const ensureStorage = async () => {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.mkdir(storageDir, { recursive: true });

  try {
    await fs.access(metadataFile);
  } catch {
    await fs.writeFile(metadataFile, "[]\n", "utf8");
  }

  try {
    await fs.access(contactsFile);
  } catch {
    await fs.writeFile(contactsFile, `${JSON.stringify(defaultContacts, null, 2)}\n`, "utf8");
  }
};

const readMediaEntries = async () => {
  await ensureStorage();
  const raw = await fs.readFile(metadataFile, "utf8");
  return JSON.parse(raw);
};

const writeMediaEntries = async (entries) => {
  await ensureStorage();
  await fs.writeFile(metadataFile, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
};

const readContacts = async () => {
  await ensureStorage();
  const raw = await fs.readFile(contactsFile, "utf8");
  return JSON.parse(raw);
};

const writeContacts = async (entries) => {
  await ensureStorage();
  await fs.writeFile(contactsFile, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
};

const uploadStorage = multer.diskStorage({
  destination: async (_req, _file, callback) => {
    try {
      await ensureStorage();
      callback(null, storageDir);
    } catch (error) {
      callback(error);
    }
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname);
    const baseName = slugify(path.basename(file.originalname, extension)) || "arquivo";
    callback(null, `${Date.now()}-${crypto.randomUUID()}-${baseName}${extension}`);
  },
});

const upload = multer({
  storage: uploadStorage,
  limits: {
    fileSize: 1024 * 1024 * 250,
  },
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(storageDir));
app.use(express.static(publicDir));

const requireAdmin = (req, res, next) => {
  const session = readSessionToken(req.cookies[sessionCookieName]);
  if (!session) {
    res.status(401).json({ message: "Não autenticado." });
    return;
  }
  req.adminSession = session;
  next();
};

app.get("/api/media", async (_req, res) => {
  const entries = await readMediaEntries();
  res.json(entries);
});

app.get("/api/contacts", async (_req, res) => {
  const entries = await readContacts();
  res.json(entries);
});

app.get("/api/admin/session", (req, res) => {
  const session = readSessionToken(req.cookies[sessionCookieName]);
  if (!session) {
    res.status(401).json({ authenticated: false });
    return;
  }
  res.json({ authenticated: true, username: session.username });
});

app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body ?? {};

  if (username !== adminUsername || password !== adminPassword) {
    res.status(401).json({ message: "Login ou senha inválidos." });
    return;
  }

  const token = createSessionToken(username);
  res.cookie(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 12,
  });

  res.json({ authenticated: true, username });
});

app.post("/api/admin/logout", (_req, res) => {
  res.clearCookie(sessionCookieName);
  res.json({ authenticated: false });
});

app.post("/api/admin/media", requireAdmin, upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "Arquivo obrigatório." });
    return;
  }

  const title = `${req.body.title || ""}`.trim() || req.file.originalname;
  const description = `${req.body.description || ""}`.trim();
  const category = ["image", "video", "document"].includes(req.body.category)
    ? req.body.category
    : detectCategory(req.file.mimetype);

  const entry = {
    id: crypto.randomUUID(),
    title,
    description,
    category,
    fileName: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: formatBytes(req.file.size),
    sizeBytes: req.file.size,
    format: path.extname(req.file.originalname).replace(".", "").toUpperCase() || req.file.mimetype,
    updated: new Date().toISOString(),
    publicUrl: `/uploads/${req.file.filename}`,
    downloadUrl: `/uploads/${req.file.filename}`,
  };

  const entries = await readMediaEntries();
  entries.unshift(entry);
  await writeMediaEntries(entries);

  res.status(201).json(entry);
});

app.get("/api/admin/contacts", requireAdmin, async (_req, res) => {
  const entries = await readContacts();
  res.json(entries);
});

app.post("/api/admin/contacts", requireAdmin, async (req, res) => {
  const name = `${req.body.name || ""}`.trim();
  const description = `${req.body.description || ""}`.trim();
  const href = `${req.body.href || ""}`.trim();

  if (!name || !href) {
    res.status(400).json({ message: "Nome e link são obrigatórios." });
    return;
  }

  const entries = await readContacts();
  const entry = {
    id: crypto.randomUUID(),
    name,
    description,
    href,
  };

  entries.push(entry);
  await writeContacts(entries);
  res.status(201).json(entry);
});

app.put("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
  const name = `${req.body.name || ""}`.trim();
  const description = `${req.body.description || ""}`.trim();
  const href = `${req.body.href || ""}`.trim();

  if (!name || !href) {
    res.status(400).json({ message: "Nome e link são obrigatórios." });
    return;
  }

  const entries = await readContacts();
  const index = entries.findIndex((entry) => entry.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ message: "Contato não encontrado." });
    return;
  }

  entries[index] = {
    ...entries[index],
    name,
    description,
    href,
  };

  await writeContacts(entries);
  res.json(entries[index]);
});

app.delete("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
  const entries = await readContacts();
  const target = entries.find((entry) => entry.id === req.params.id);

  if (!target) {
    res.status(404).json({ message: "Contato não encontrado." });
    return;
  }

  await writeContacts(entries.filter((entry) => entry.id !== req.params.id));
  res.json({ success: true });
});

app.delete("/api/admin/media/:id", requireAdmin, async (req, res) => {
  const entries = await readMediaEntries();
  const target = entries.find((entry) => entry.id === req.params.id);

  if (!target) {
    res.status(404).json({ message: "Arquivo não encontrado." });
    return;
  }

  const nextEntries = entries.filter((entry) => entry.id !== req.params.id);
  await writeMediaEntries(nextEntries);

  try {
    await fs.unlink(path.join(storageDir, target.fileName));
  } catch {
    // no-op if file is already gone
  }

  res.json({ success: true });
});

app.use(express.static(distDir));

app.get("*", async (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    next();
    return;
  }

  const indexFile = path.join(distDir, "index.html");
  try {
    await fs.access(indexFile);
    res.sendFile(indexFile);
  } catch {
    res.status(503).send("Frontend ainda não foi buildado. Rode `npm run build`.");
  }
});

await ensureStorage();

app.listen(port, () => {
  console.log(`Admin backend rodando em http://localhost:${port}`);
});
