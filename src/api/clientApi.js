// src/api/clientApi.js

// 👇 Decide API base URL
// 1. Use REACT_APP_API_BASE_URL if provided
// 2. Otherwise fall back to "<current-origin>/api"
const rawBase =
  process.env.REACT_APP_API_BASE_URL ||
  `${window.location.origin}/api`;

// Strip trailing slashes to avoid "//clients"
const API_BASE_URL = rawBase.replace(/\/+$/, "");

// (Optional) debug logs – check in DevTools console once
console.log("API_BASE_URL:", API_BASE_URL);

const CLIENTS_BASE = `${API_BASE_URL}/clients`;
console.log("CLIENTS_BASE:", CLIENTS_BASE);

// All URLs in one place
export const clientApiUrls = {
  base: API_BASE_URL,
  clients: CLIENTS_BASE,
  listClients: CLIENTS_BASE,
  createClient: CLIENTS_BASE,
  clientById: (id) => `${CLIENTS_BASE}/${id}`,
  updateClient: (id) => `${CLIENTS_BASE}/${id}`,
  deleteClient: (id) => `${CLIENTS_BASE}/${id}`,
  clientByQrToken: (qrToken) => `${CLIENTS_BASE}/by-qr/${qrToken}`,
  clientQrPng: (qrToken) => `${CLIENTS_BASE}/${qrToken}/qr.png`,
};

// Small helper for fetch
async function handleResponse(response) {
  // DELETE returns 204 with empty body
  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      throw new Error(data.message || `Request failed: ${response.status}`);
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new Error(`Request failed: ${response.status} - ${text}`);
      }
      throw e;
    }
  }

  return response.json();
}

// ---- Paginated list call ----

export async function listClients({ page = 1, pageSize = 20 } = {}) {
  const qs = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  const res = await fetch(`${clientApiUrls.listClients}?${qs.toString()}`);
  return handleResponse(res);
}

// ---- CRUD + QR helpers ----

export async function fetchClients() {
  const res = await fetch(clientApiUrls.listClients);
  const data = await handleResponse(res);

  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray(data.clients)) {
    return data.clients;
  }

  if (data && Array.isArray(data.data)) {
    return data.data;
  }

  console.warn("fetchClients: Unexpected response format", data);
  return [];
}

export async function fetchClientById(id) {
  const res = await fetch(clientApiUrls.clientById(id));
  return handleResponse(res);
}

export async function createClient(payload) {
  const fd = new FormData();

  // Append primitives
  for (const [k, v] of Object.entries(payload)) {
    if (v === undefined || v === null) continue;
    if (k === "image" && v instanceof File) {
      fd.append("image", v);
    } else {
      fd.append(k, String(v));
    }
  }

  const res = await fetch(clientApiUrls.createClient, {
    method: "POST",
    body: fd, // browser sets multipart boundary
  });
  return handleResponse(res);
}

export async function updateClient(id, payload) {
  const res = await fetch(clientApiUrls.updateClient(id), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteClient(id) {
  const res = await fetch(clientApiUrls.deleteClient(id), {
    method: "DELETE",
  });
  return handleResponse(res);
}

// used when a client scans QR
export async function fetchClientByQrToken(qrToken) {
  const res = await fetch(clientApiUrls.clientByQrToken(qrToken));
  return handleResponse(res);
}

// used if you want to show the QR PNG image
export function getClientQrPngUrl(qrToken) {
  return clientApiUrls.clientQrPng(qrToken);
}
