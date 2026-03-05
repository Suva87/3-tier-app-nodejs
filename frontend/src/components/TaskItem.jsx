import { formatDateOnly, formatDateTime } from "../utils/date";

export default function TaskItem({ task, onDone, onUndoneRequest, onDelete, loadingAction }) {
  const busy = loadingAction?.id === task._id;

  return (
    <div style={styles.item}>
      <div style={{ flex: 1 }}>
        <div style={styles.titleRow}>
          <span style={styles.title}>{task.title}</span>
          {task.isDone ? <span style={styles.badgeDone}>DONE</span> : <span style={styles.badgePending}>PENDING</span>}
        </div>

        <div style={styles.meta}>
          <div>
            Due: <b>{formatDateOnly(task.dueDate)}</b>
          </div>
          <div>
            Completed At: <b>{task.isDone ? formatDateTime(task.doneAt) : "-"}</b>
          </div>
        </div>
      </div>

      <div style={styles.actions}>
        {!task.isDone ? (
          <button style={styles.btn} disabled={busy} onClick={() => onDone(task._id)}>
            {busy ? "..." : "Mark Done"}
          </button>
        ) : (
          <button style={styles.warnBtn} disabled={busy} onClick={() => onUndoneRequest(task)}>
            {busy ? "..." : "Mark Undone"}
          </button>
        )}

        <button style={styles.dangerBtn} disabled={busy} onClick={() => onDelete(task._id)}>
          {busy ? "..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  item: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
  },
  titleRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  meta: {
    marginTop: 8,
    opacity: 0.9,
    display: "grid",
    gap: 4,
    fontSize: 13,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  btn: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "#fff",
    color: "#000",
    cursor: "pointer",
  },
  warnBtn: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "#ffd36a",
    color: "#000",
    cursor: "pointer",
  },
  dangerBtn: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "#ff6b6b",
    color: "#000",
    cursor: "pointer",
  },
  badgeDone: {
    fontSize: 12,
    padding: "4px 8px",
    borderRadius: 999,
    background: "rgba(0,255,0,0.15)",
    border: "1px solid rgba(0,255,0,0.35)",
  },
  badgePending: {
    fontSize: 12,
    padding: "4px 8px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
  },
};
