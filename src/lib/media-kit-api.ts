export type MediaCategory = "image" | "video" | "document";

export type MediaEntry = {
  id: string;
  title: string;
  description: string;
  category: MediaCategory;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: string;
  sizeBytes: number;
  format: string;
  updated: string;
  publicUrl: string;
  downloadUrl: string;
};

export type ContactChannel = {
  id: string;
  name: string;
  description: string;
  href: string;
};

type ApiOptions = RequestInit & {
  bodyJson?: unknown;
};

const apiFetch = async <T>(input: string, options: ApiOptions = {}): Promise<T> => {
  const { bodyJson, headers, ...rest } = options;
  const response = await fetch(input, {
    credentials: "include",
    headers: {
      ...(bodyJson ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: bodyJson ? JSON.stringify(bodyJson) : rest.body,
    ...rest,
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type") || "";
    let message = "Erro inesperado.";

    if (contentType.includes("application/json")) {
      const errorBody = await response.json();
      message = errorBody.message || message;
    } else {
      message = await response.text();
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
};

export const mediaKitApi = {
  listPublic: () => apiFetch<MediaEntry[]>("/api/media"),
  listContacts: () => apiFetch<ContactChannel[]>("/api/contacts"),
  checkSession: () => apiFetch<{ authenticated: boolean; username?: string }>("/api/admin/session"),
  listAdminContacts: () => apiFetch<ContactChannel[]>("/api/admin/contacts"),
  login: (username: string, password: string) =>
    apiFetch<{ authenticated: boolean; username: string }>("/api/admin/login", {
      method: "POST",
      bodyJson: { username, password },
    }),
  logout: () =>
    apiFetch<{ authenticated: boolean }>("/api/admin/logout", {
      method: "POST",
    }),
  upload: async (payload: {
    title: string;
    description: string;
    category: MediaCategory;
    file: File;
  }) => {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("category", payload.category);
    formData.append("file", payload.file);

    return apiFetch<MediaEntry>("/api/admin/media", {
      method: "POST",
      body: formData,
    });
  },
  createContact: (payload: Omit<ContactChannel, "id">) =>
    apiFetch<ContactChannel>("/api/admin/contacts", {
      method: "POST",
      bodyJson: payload,
    }),
  updateContact: (id: string, payload: Omit<ContactChannel, "id">) =>
    apiFetch<ContactChannel>(`/api/admin/contacts/${id}`, {
      method: "PUT",
      bodyJson: payload,
    }),
  removeContact: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/admin/contacts/${id}`, {
      method: "DELETE",
    }),
  remove: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/admin/media/${id}`, {
      method: "DELETE",
    }),
};
