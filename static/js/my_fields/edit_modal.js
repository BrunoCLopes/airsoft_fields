document.addEventListener("DOMContentLoaded", () => {
  const editModal = document.getElementById("edit-modal");
  const editButtons = document.querySelectorAll(".edit-field");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(editModal);
    });
  });
});
