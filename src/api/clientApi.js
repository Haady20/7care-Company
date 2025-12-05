// src/api/clientApi.js

// 👇 API base URL is loaded from .env file (REACT_APP_API_BASE_URL)
// Default fallback is http://localhost if not set
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ;

const CLIENTS_BASE = `${API_BASE_URL}/api/clients`;

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
  const qs = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  const res = await fetch(`${clientApiUrls.listClients}?${qs.toString()}`);
  return handleResponse(res);
}

// ---- CRUD + QR helpers ----

export async function fetchClients() {
  const res = await fetch(clientApiUrls.listClients);
  const data = await handleResponse(res);
  
  // If the backend wraps clients in an object (e.g., { clients: [...] }),
  // extract the array. Otherwise return data as-is if it's already an array.
  if (Array.isArray(data)) {
    return data;
  }
  
  if (data && Array.isArray(data.clients)) {
    return data.clients;
  }
  
  if (data && Array.isArray(data.data)) {
    return data.data;
  }
  
  // Fallback: return empty array if response is not in expected format
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
    // If it's a File, append as-is; otherwise append string/primitive
    if (k === 'image' && v instanceof File) {
      fd.append('image', v);
    } else {
      fd.append(k, String(v));
    }
  }

  const res = await fetch(clientApiUrls.createClient, {
    method: "POST",
    body: fd,                    // DO NOT set Content-Type; browser will set multipart boundary
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
