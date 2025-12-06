import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export async function listClients({ page, pageSize }) {
  const res = await api.get("/clients", {
    params: { page, pageSize },
  });

  const clients = res.data.clients || [];
  const total = res.data.total || clients.length;
  const totalPages = Math.ceil(total / pageSize);

  return {
    data: clients,
    totalPages,
  };
}


export function getClientById(id) {
  return api.get(`/clients/${id}`);
}

export function getClientByQrToken(qrToken) {
  return api.get(`/clients/by-qr/${qrToken}`);
}

export function getClientQrPng(qrToken) {
  return api.get(`/clients/${qrToken}/qr.png`, {
    responseType: "blob",
  });
}

export function createClient(data) {
  return api.post("/clients", data);
}

export function updateClient(id, data) {
  return api.put(`/clients/${id}`, data);
}

export function deleteClient(id) {
  return api.delete(`/clients/${id}`);
}
