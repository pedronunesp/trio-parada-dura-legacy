import { FormEvent, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  mediaKitApi,
  type ContactChannel,
  type MediaCategory,
  type MediaEntry,
} from "@/lib/media-kit-api";
import { Loader2, LogOut, Pencil, Plus, Trash2, Upload } from "lucide-react";

const categories: Array<{ label: string; value: MediaCategory }> = [
  { label: "Imagem", value: "image" },
  { label: "Documento", value: "document" },
  { label: "Vídeo", value: "video" },
];

const formatDate = (value: string) =>
  new Date(value).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

const emptyContactForm = {
  name: "",
  description: "",
  href: "",
};

const Admin = () => {
  const { toast } = useToast();
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminName, setAdminName] = useState("");
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [contacts, setContacts] = useState<ContactChannel[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingContactId, setDeletingContactId] = useState<string | null>(null);
  const [savingContact, setSavingContact] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState(emptyContactForm);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<MediaCategory>("image");
  const [file, setFile] = useState<File | null>(null);

  const selectedFileLabel = useMemo(() => {
    if (!file) return "Nenhum arquivo selecionado";
    return `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB`;
  }, [file]);

  const resetContactForm = () => {
    setContactForm(emptyContactForm);
    setEditingContactId(null);
  };

  const loadEntries = async () => {
    setLoadingEntries(true);
    try {
      const data = await mediaKitApi.listPublic();
      setEntries(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível carregar os arquivos.";
      toast({ title: "Erro ao carregar mídia kit", description: message, variant: "destructive" });
    } finally {
      setLoadingEntries(false);
    }
  };

  const loadContacts = async () => {
    setLoadingContacts(true);
    try {
      const data = await mediaKitApi.listAdminContacts();
      setContacts(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível carregar os contatos.";
      toast({ title: "Erro ao carregar contatos", description: message, variant: "destructive" });
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const session = await mediaKitApi.checkSession();
        setAuthenticated(session.authenticated);
        setAdminName(session.username || "");
        if (session.authenticated) {
          await Promise.all([loadEntries(), loadContacts()]);
        }
      } catch {
        setAuthenticated(false);
      } finally {
        setCheckingSession(false);
      }
    };

    void bootstrap();
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoggingIn(true);

    try {
      const session = await mediaKitApi.login(username, password);
      setAuthenticated(true);
      setAdminName(session.username);
      setPassword("");
      await Promise.all([loadEntries(), loadContacts()]);
      toast({ title: "Acesso liberado", description: "Painel administrativo carregado." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível entrar.";
      toast({ title: "Falha no login", description: message, variant: "destructive" });
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await mediaKitApi.logout();
    setAuthenticated(false);
    setAdminName("");
    setEntries([]);
    setContacts([]);
    resetContactForm();
    toast({ title: "Sessão encerrada" });
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast({ title: "Selecione um arquivo", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const created = await mediaKitApi.upload({
        title: title.trim() || file.name,
        description: description.trim(),
        category,
        file,
      });

      setEntries((current) => [created, ...current]);
      setTitle("");
      setDescription("");
      setCategory("image");
      setFile(null);
      toast({ title: "Upload concluído", description: created.title });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível enviar o arquivo.";
      toast({ title: "Erro no upload", description: message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await mediaKitApi.remove(id);
      setEntries((current) => current.filter((entry) => entry.id !== id));
      toast({ title: "Arquivo removido" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível remover.";
      toast({ title: "Erro ao remover", description: message, variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingContact(true);

    try {
      if (editingContactId) {
        const updated = await mediaKitApi.updateContact(editingContactId, contactForm);
        setContacts((current) => current.map((item) => (item.id === editingContactId ? updated : item)));
        toast({ title: "Contato atualizado", description: updated.name });
      } else {
        const created = await mediaKitApi.createContact(contactForm);
        setContacts((current) => [...current, created]);
        toast({ title: "Contato adicionado", description: created.name });
      }

      resetContactForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível salvar o contato.";
      toast({ title: "Erro ao salvar contato", description: message, variant: "destructive" });
    } finally {
      setSavingContact(false);
    }
  };

  const handleEditContact = (contact: ContactChannel) => {
    setEditingContactId(contact.id);
    setContactForm({
      name: contact.name,
      description: contact.description,
      href: contact.href,
    });
  };

  const handleDeleteContact = async (id: string) => {
    setDeletingContactId(id);
    try {
      await mediaKitApi.removeContact(id);
      setContacts((current) => current.filter((item) => item.id !== id));
      if (editingContactId === id) {
        resetContactForm();
      }
      toast({ title: "Contato removido" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível remover o contato.";
      toast({ title: "Erro ao remover contato", description: message, variant: "destructive" });
    } finally {
      setDeletingContactId(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20 section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-3">Admin</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Painel do Mídia Kit</h1>
            <p className="text-foreground/65 max-w-2xl">
              Faça login para enviar os arquivos reais do mídia kit e gerenciar os contatos exibidos na home.
            </p>
          </div>

          {checkingSession ? (
            <div className="glass-panel rounded-3xl p-12 flex items-center justify-center">
              <Loader2 className="animate-spin text-primary" />
            </div>
          ) : !authenticated ? (
            <div className="glass-panel rounded-3xl p-8 md:p-10 max-w-xl">
              <form className="space-y-5" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="username">Login</Label>
                  <Input id="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loggingIn}>
                  {loggingIn ? <Loader2 className="animate-spin" /> : "Entrar no admin"}
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="glass-panel rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Sessão ativa</p>
                  <p className="font-heading text-lg uppercase tracking-[0.18em] text-primary">{adminName}</p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut /> Sair
                </Button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-8">
                <div className="space-y-8">
                  <div className="glass-panel rounded-3xl p-8">
                    <h2 className="font-display text-3xl font-bold mb-6">Novo upload</h2>

                    <form className="space-y-5" onSubmit={handleUpload}>
                      <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input id="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Nome público do arquivo" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(event) => setDescription(event.target.value)}
                          placeholder="Contexto do material para imprensa e contratantes"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <select
                          id="category"
                          value={category}
                          onChange={(event) => setCategory(event.target.value as MediaCategory)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          {categories.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="file">Arquivo</Label>
                        <Input
                          id="file"
                          type="file"
                          onChange={(event) => setFile(event.target.files?.[0] || null)}
                          required
                        />
                        <p className="text-xs text-muted-foreground">{selectedFileLabel}</p>
                      </div>

                      <Button type="submit" className="w-full" disabled={uploading}>
                        {uploading ? <Loader2 className="animate-spin" /> : <><Upload /> Enviar mídia</>}
                      </Button>
                    </form>
                  </div>

                  <div className="glass-panel rounded-3xl p-8">
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <h2 className="font-display text-3xl font-bold">Contatos da home</h2>
                      <Button variant="outline" onClick={resetContactForm}>
                        <Plus /> Novo
                      </Button>
                    </div>

                    <form className="space-y-4 mb-8" onSubmit={handleSaveContact}>
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Nome</Label>
                        <Input
                          id="contact-name"
                          value={contactForm.name}
                          onChange={(event) => setContactForm((current) => ({ ...current, name: event.target.value }))}
                          placeholder="Agenda, Produção, Financeiro..."
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-description">Descrição</Label>
                        <Input
                          id="contact-description"
                          value={contactForm.description}
                          onChange={(event) => setContactForm((current) => ({ ...current, description: event.target.value }))}
                          placeholder="Resumo curto do setor"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-href">Link de destino</Label>
                        <Input
                          id="contact-href"
                          value={contactForm.href}
                          onChange={(event) => setContactForm((current) => ({ ...current, href: event.target.value }))}
                          placeholder="https://wa.me/... ou mailto:..."
                          required
                        />
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button type="submit" disabled={savingContact}>
                          {savingContact ? <Loader2 className="animate-spin" /> : editingContactId ? "Salvar contato" : "Adicionar contato"}
                        </Button>
                        {editingContactId && (
                          <Button type="button" variant="outline" onClick={resetContactForm}>
                            Cancelar edição
                          </Button>
                        )}
                      </div>
                    </form>

                    <div className="space-y-4">
                      {loadingContacts ? (
                        <div className="rounded-2xl border border-border/50 p-6 text-sm text-muted-foreground flex items-center gap-2">
                          <Loader2 className="animate-spin" /> Carregando contatos...
                        </div>
                      ) : contacts.length === 0 ? (
                        <div className="rounded-2xl border border-border/50 p-6 text-sm text-muted-foreground">
                          Nenhum contato configurado.
                        </div>
                      ) : (
                        contacts.map((contact) => (
                          <div key={contact.id} className="rounded-2xl border border-border/50 p-5 bg-background/30">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div>
                                <h3 className="font-heading text-sm uppercase tracking-[0.18em] text-foreground">
                                  {contact.name}
                                </h3>
                                <p className="text-sm text-foreground/65 mt-2">
                                  {contact.description || "Sem descrição informada."}
                                </p>
                              </div>

                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEditContact(contact)}>
                                  <Pencil />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => void handleDeleteContact(contact.id)}
                                  disabled={deletingContactId === contact.id}
                                >
                                  {deletingContactId === contact.id ? <Loader2 className="animate-spin" /> : <Trash2 />}
                                </Button>
                              </div>
                            </div>

                            <a
                              href={contact.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary break-all hover:underline"
                            >
                              {contact.href}
                            </a>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="glass-panel rounded-3xl p-8">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <h2 className="font-display text-3xl font-bold">Arquivos publicados</h2>
                    <Button variant="outline" onClick={() => void loadEntries()} disabled={loadingEntries}>
                      {loadingEntries ? <Loader2 className="animate-spin" /> : "Atualizar"}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {entries.length === 0 ? (
                      <div className="rounded-2xl border border-border/50 p-6 text-sm text-muted-foreground">
                        Nenhum arquivo enviado ainda.
                      </div>
                    ) : (
                      entries.map((entry) => (
                        <div key={entry.id} className="rounded-2xl border border-border/50 p-5 bg-background/30">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h3 className="font-heading text-sm uppercase tracking-[0.18em] text-foreground">
                                {entry.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {entry.format} · {entry.size} · {formatDate(entry.updated)}
                              </p>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => void handleDelete(entry.id)}
                              disabled={deletingId === entry.id}
                            >
                              {deletingId === entry.id ? <Loader2 className="animate-spin" /> : <Trash2 />}
                            </Button>
                          </div>

                          <p className="text-sm text-foreground/65 mb-4">
                            {entry.description || "Sem descrição informada."}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            <a
                              href={entry.publicUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center rounded-full border border-primary/30 px-4 py-2 text-xs text-primary hover:bg-primary/10"
                            >
                              Abrir arquivo
                            </a>
                            <span className="inline-flex items-center rounded-full border border-border/60 px-4 py-2 text-xs text-muted-foreground">
                              {entry.category}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
