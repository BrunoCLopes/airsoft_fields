document.addEventListener("DOMContentLoaded", () => {
  const deleteModal = document.getElementById("delete-modal");
  const deleteButtons = document.querySelectorAll(".delete-field");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const fieldData = {
        id: this.dataset.fieldId,
        name: this.dataset.fieldName,
      };

      updateDeleteModal(fieldData);
      openModal(deleteModal);
    });
  });

  function updateDeleteModal(fieldData) {
    document.getElementById("field-id-to-delete").value = fieldData.id;
    document.getElementById("field-to-delete").textContent = fieldData.name;
  }
});
