// src/api/clientApi.js
import axios from "axios";

const API_BASE_URL =
<<<<<<< HEAD
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";
=======
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3002/api";
>>>>>>> e358e1aa16128d625cfe0ead105dd741127f3d66

const LS_TOKEN_KEY = "auth.token";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(LS_TOKEN_KEY);
  if (token) {
    // make sure headers exists
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
  // If payload is FormData, let axios set multipart/form-data
  const config = payload instanceof FormData ? { headers: {} } : {};
  return api.post("/clients", payload, config);
}

export function updateClient(id, payload) {
  const config = payload instanceof FormData ? { headers: {} } : {};
  return api.put(`/clients/${id}`, payload, config);
}

export function deleteClient(id) {
  return api.delete(`/clients/${id}`);
}
// Add other API functions as needed (e.g., search, filter)