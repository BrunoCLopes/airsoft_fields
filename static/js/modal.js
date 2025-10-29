function openModal(modal) {
  modal.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const modalBg = document.querySelectorAll(".modal-bg");

  modalBg.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target.classList.contains("close-modal")) {
        modal.classList.add("hidden");
      }
    });
  });
});
