import client from "./client";

export async function fetchTasks() {
  const res = await client.get("/api/v1/tasks");
  return res.data.data;
}

export async function createTask(payload) {
  const res = await client.post("/api/v1/tasks", payload);
  return res.data.data;
}

export async function deleteTask(id) {
  await client.delete(`/api/v1/tasks/${id}`);
}

export async function markDone(id) {
  const res = await client.patch(`/api/v1/tasks/${id}/done`);
  return res.data.data;
}

export async function markUndone(id) {
  const res = await client.patch(`/api/v1/tasks/${id}/undone`);
  return res.data.data;
}
