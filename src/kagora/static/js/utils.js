export function getErrorMessage(error) {
  if (typeof error.detail === "string") {
    return error.detail;
  }

  if (Array.isArray(error.detail)) {
    return error.detail.map((err) => err.msg).join(". ");
  }

  return "An error occurred. Please try again.";
}

export function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.hidden = false;
  const firstControl = modal.querySelector("input, textarea, button");
  if (firstControl) firstControl.focus();
}

export function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.hidden = true;
  modal.dispatchEvent(new Event("hidden.bs.modal"));
}

export function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}