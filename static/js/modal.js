function openModal(modal) {
  document.querySelector("body").classList.add("overflow-hidden");
  modal.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const modalBg = document.querySelectorAll(".modal-bg");

  modalBg.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target.classList.contains("close-modal")) {
        document.querySelector("body").classList.remove("overflow-hidden");
        modal.classList.add("hidden");
      }
    });
  });
});
