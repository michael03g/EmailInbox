import axios from "axios";

export const getEmails = async () => {
  const res = await axios.get("/api/emails");
  return res.data;
}

export const loginUser = async (data: any) => {
  const res = await axios.post("/api/login", data);
  return res.data;
}

export const generate = async (data: any) => {
  try {
    const response = await axios.post("/api/generate", data, {
      responseType: "blob",
    });
    const blob = new Blob([response.data], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    alert("Failed to generate GitHub activity");
  }
}

export const markRead = async (id: number) => {
  await axios.put(`/api/emails/${id}/read/true`);
}

export const markUnread = async (id: number) => {
  await axios.put(`/api/emails/${id}/read/false`);
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