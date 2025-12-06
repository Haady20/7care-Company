// src/api/clientApi.js
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3002/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ------- LIST (paged) -------
export async function listClients({ page = 1, pageSize = 20 } = {}) {
  const res = await api.get("/clients", { params: { page, pageSize } });
  // Expected shape:
  // {
  //   data: [...],
  //   page: 1,
  //   pageSize: 20,
  //   total: 5,
  //   totalPages: 1
  // }
  return res.data;
}

// Fetch client by QR token (called when QR code is scanned)
export async function getClientByQrToken(qrToken) {
  // Returns { client, profileUrl }
  const res = await api.get(`/clients/by-qr/${encodeURIComponent(qrToken)}`);
  return res.data;
}

// ------- MUTATIONS (optional) -------
export function createClient(payload) {
  return api.post("/clients", payload);
}

export function updateClient(id, payload) {
  return api.put(`/clients/${id}`, payload);
}

export function deleteClient(id) {
  return api.delete(`/clients/${id}`);
}
// Add other API functions as needed (e.g., search, filter)