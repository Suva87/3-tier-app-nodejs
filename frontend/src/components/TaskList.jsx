import TaskItem from "./TaskItem";

export default function TaskList({ title, tasks, onDone, onUndoneRequest, onDelete, loadingAction }) {
  return (
    <section style={styles.section}>
      <h2 style={{ marginTop: 0 }}>
        {title} ({tasks.length})
      </h2>

      {tasks.length === 0 ? (
        <div style={styles.empty}>No tasks here.</div>
      ) : (
        <div style={styles.list}>
          {tasks.map((t) => (
            <TaskItem
              key={t._id}
              task={t}
              onDone={onDone}
              onUndoneRequest={onUndoneRequest}
              onDelete={onDelete}
              loadingAction={loadingAction}
            />
          ))}
        </div>
      )}
    </section>
  );
}

const styles = {
  section: {
    marginTop: 18,
  },
  empty: {
    opacity: 0.8,
    padding: 12,
    borderRadius: 12,
    border: "1px dashed rgba(255,255,255,0.18)",
  },
  list: {
    display: "grid",
    gap: 12,
  },
};
