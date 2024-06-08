import axios from "axios";

export const getEmails = async () => {
  const res = await axios.get("/api/emails");
  return res.data;
}

export const loginUser = async (data: any) => {
  const res = await axios.post("/api/login", data);
  return res.data;
}

export const markRead = async (id: number) => {
  await axios.post(`/api/emails/${id}/read/true`);
}

export const markUnread = async (id: number) => {
  await axios.post(`/api/emails/${id}/read/false`);
}


export const moveToTrash = async (id: number) => {
  await axios.post(`/api/emails/${id}/trash`);
}

export const recoverFromTrash = async (id: number) => {
  await axios.post(`/api/emails/${id}/recover`);
}

export const deleteEmail = async (id: number) => {
  await axios.delete(`/api/emails/${id}`);
}

export const createEmail = async (data: any) => {
  await axios.post("/api/emails", data);
}