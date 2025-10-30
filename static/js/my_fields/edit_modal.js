document.addEventListener("DOMContentLoaded", () => {
  const editModal = document.getElementById("edit-modal");
  const editButtons = document.querySelectorAll(".edit-field");

  const fieldId = editModal.querySelector("#field-id-to-edit");
  const fieldStatusActive = editModal.querySelector("#field-status-active");
  const fieldStatusInactive = editModal.querySelector("#field-status-inactive");
  const fieldNameInput = editModal.querySelector("#field-name");
  const fieldTypeSelect = editModal.querySelector("#field-type");
  const fieldPhoneInput = editModal.querySelector("#field-phone");
  const fieldDescriptionTextarea = editModal.querySelector("#field-description");
  const fieldHoursInput = editModal.querySelector("#field-hours");
  const previewImg = editModal.querySelector("#preview-image");
  const imagePreview = editModal.querySelector("#image-preview-container");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      fieldId.value = button.getAttribute("data-field-id");
      fieldNameInput.value = button.getAttribute("data-field-name");
      fieldTypeSelect.value = button.getAttribute("data-field-type");
      fieldPhoneInput.value = button.getAttribute("data-field-phone");
      fieldDescriptionTextarea.value = button.getAttribute("data-field-description");
      fieldHoursInput.value = button.getAttribute("data-field-hours");

      const isVisible = button.getAttribute("data-field-status") === "True";
      if (isVisible) {
        fieldStatusActive.checked = true;
      } else {
        fieldStatusInactive.checked = true;
      }

      const fieldPhoto = button.getAttribute("data-field-photo");
      if (fieldPhoto) {
        previewImg.src = fieldPhoto;
        imagePreview.classList.remove("hidden");
      } else {
        imagePreview.classList.add("hidden");
      }

      openModal(editModal);
    });
  });
});
