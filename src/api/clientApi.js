// src/api/clientApi.js

// 👇 point this to your backend
// you can override it with REACT_APP_API_BASE_URL in .env if you like
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

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
  if (!response.ok) {
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      throw new Error(data.message || "Request failed");
    } catch {
      throw new Error(text || "Request failed");
    }
  }

  // DELETE returns 204 with empty body
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// ---- CRUD + QR helpers ----

export async function fetchClients() {
  const res = await fetch(clientApiUrls.listClients);
  return handleResponse(res);
}

export async function fetchClientById(id) {
  const res = await fetch(clientApiUrls.clientById(id));
  return handleResponse(res);
}

export async function createClient(payload) {
  const res = await fetch(clientApiUrls.createClient, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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
