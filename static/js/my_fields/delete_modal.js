document.addEventListener("DOMContentLoaded", () => {
  const deleteModal = document.getElementById("delete-modal");
  const deleteButtons = document.querySelectorAll(".delete-field");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const fieldName = deleteModal.querySelector("#field-to-delete");
      const fieldId = deleteModal.querySelector("#field-id-to-delete");

      fieldName.textContent = button.getAttribute("data-field-name");
      fieldId.value = button.getAttribute("data-field-id");

      openModal(deleteModal);
    });
  });
});
