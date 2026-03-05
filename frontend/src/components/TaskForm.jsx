import { useState } from "react";

export default function TaskForm({ onAdd, loading }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    await onAdd({
      title: title.trim(),
      dueDate, // "YYYY-MM-DD"
    });

    setTitle("");
    setDueDate("");
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input style={styles.input} placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <input style={styles.input} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

      <button style={styles.btn} disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    background: "rgba(255,255,255,0.06)",
    padding: 14,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
  },
  input: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "#0b0b0b",
    color: "#fff",
    outline: "none",
    minWidth: 200,
  },
  btn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "#fff",
    color: "#000",
    cursor: "pointer",
  },
};
