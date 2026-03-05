import { useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ConfirmModal from "./components/ConfirmModal";

import { createTask, deleteTask, fetchTasks, markDone, markUndone } from "./api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null); // { id }

  const [error, setError] = useState("");

  // modal state for "mark undone"
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToUndone, setTaskToUndone] = useState(null);

  const pendingTasks = useMemo(() => tasks.filter((t) => !t.isDone), [tasks]);
  const doneTasks = useMemo(() => tasks.filter((t) => t.isDone), [tasks]);

  async function load() {
    try {
      setError("");
      setPageLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load tasks");
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(payload) {
    try {
      setAddLoading(true);
      setError("");
      const created = await createTask(payload);
      setTasks((prev) => [created, ...prev]);
    } catch (e) {
      const msg =
        e?.response?.data?.errors?.join(", ") || e?.response?.data?.message || e.message || "Failed to add task";
      setError(msg);
    } finally {
      setAddLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      setLoadingAction({ id });
      setError("");
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to delete task");
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleDone(id) {
    try {
      setLoadingAction({ id });
      setError("");
      const updated = await markDone(id);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to mark done");
    } finally {
      setLoadingAction(null);
    }
  }

  function requestUndone(task) {
    setTaskToUndone(task);
    setConfirmOpen(true);
  }

  async function confirmUndone() {
    if (!taskToUndone) return;

    try {
      setLoadingAction({ id: taskToUndone._id });
      setError("");
      const updated = await markUndone(taskToUndone._id);
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to mark undone");
    } finally {
      setLoadingAction(null);
      setConfirmOpen(false);
      setTaskToUndone(null);
    }
  }

  function cancelUndone() {
    setConfirmOpen(false);
    setTaskToUndone(null);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={{ marginTop: 0 }}>Three-Tier Task App</h1>
        <p style={{ opacity: 0.85, marginTop: 6 }}>
          React (Vite) + Node/Express + MongoDB Atlas — Local first, Docker-ready later.
        </p>

        <TaskForm onAdd={handleAdd} loading={addLoading} />

        {error ? <div style={styles.error}>{error}</div> : null}

        {pageLoading ? (
          <div style={{ marginTop: 16, opacity: 0.85 }}>Loading tasks...</div>
        ) : (
          <>
            <TaskList
              title="Pending"
              tasks={pendingTasks}
              onDone={handleDone}
              onUndoneRequest={requestUndone}
              onDelete={handleDelete}
              loadingAction={loadingAction}
            />

            <TaskList
              title="Completed"
              tasks={doneTasks}
              onDone={handleDone}
              onUndoneRequest={requestUndone}
              onDelete={handleDelete}
              loadingAction={loadingAction}
            />
          </>
        )}
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Warning"
        message="Are you sure you want to mark this undone, all marked info will be lost"
        confirmText="Yes"
        cancelText="No"
        onConfirm={confirmUndone}
        onCancel={cancelUndone}
      />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050505",
    color: "#fff",
    padding: 18,
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
  },
  error: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    background: "rgba(255,0,0,0.12)",
    border: "1px solid rgba(255,0,0,0.35)",
  },
};
