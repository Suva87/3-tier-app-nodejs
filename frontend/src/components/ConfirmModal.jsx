export default function ConfirmModal({
  open,
  title = "Confirm",
  message,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>{title}</h3>
        </div>

        <div style={styles.body}>
          <p style={{ marginTop: 0 }}>{message}</p>
        </div>

        <div style={styles.footer}>
          <button style={styles.cancelBtn} onClick={onCancel}>
            {cancelText}
          </button>
          <button style={styles.confirmBtn} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    zIndex: 9999,
  },
  modal: {
    width: "100%",
    maxWidth: 460,
    background: "#111",
    color: "#fff",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
  header: {
    padding: 16,
    borderBottom: "1px solid rgba(255,255,255,0.12)",
  },
  body: {
    padding: 16,
  },
  footer: {
    padding: 16,
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    borderTop: "1px solid rgba(255,255,255,0.12)",
  },
  cancelBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },
  confirmBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "#ffffff",
    color: "#000",
    cursor: "pointer",
  },
};
