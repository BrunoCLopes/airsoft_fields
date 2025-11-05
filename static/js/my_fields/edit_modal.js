document.addEventListener("DOMContentLoaded", () => {
  const editModal = document.getElementById("edit-modal");
  const editButtons = document.querySelectorAll(".edit-field");

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const fieldData = {
        id: this.dataset.fieldId,
        name: this.dataset.fieldName,
        type: this.dataset.fieldType,
        phone: this.dataset.fieldPhone,
        state: this.dataset.fieldState,
        city: this.dataset.fieldCity,
        address: this.dataset.fieldAddress,
        description: this.dataset.fieldDescription,
        hours: this.dataset.fieldHours,
        status: this.dataset.fieldStatus,
        photo: this.dataset.fieldPhoto,
      };

      clearEditModalErrors();
      updateEditModal(fieldData);
      openModal(editModal);
    });
  });

  function clearEditModalErrors() {
    const form = editModal.querySelector("form");
    const requiredFields = form.querySelectorAll(".required");

    requiredFields.forEach((field) => {
      const formContainer = field.closest(".form-item");
      if (formContainer) {
        if (field.type === "file") {
          const fileZone = formContainer.querySelector(".file-zone");
          clearFileError(formContainer, fileZone);
        } else {
          clearFieldError(formContainer, field);
        }
      }
    });
  }

  function updateEditModal(fieldData) {
    document.getElementById("field-id-to-edit").value = fieldData.id;
    document.getElementById("edit-field-name").value = fieldData.name;
    document.getElementById("edit-field-type").value = fieldData.type;
    document.getElementById("edit-field-phone").value = fieldData.phone;
    document.getElementById("edit-field-description").value =
      fieldData.description;
    document.getElementById("edit-field-hours").value = fieldData.hours;

    const fieldStatusActive = document.getElementById("field-status-active");
    const fieldStatusInactive = document.getElementById(
      "field-status-inactive"
    );

    if (fieldData.status === "True" || fieldData.status === true) {
      fieldStatusActive.checked = true;
      fieldStatusInactive.checked = false;
    } else {
      fieldStatusActive.checked = false;
      fieldStatusInactive.checked = true;
    }

    updateFieldImage(fieldData.photo);
  }

  function updateFieldImage(photoUrl) {
    const previewImg = document.getElementById("preview-image");
    const imagePreviewContainer = document.getElementById(
      "image-preview-container"
    );

    if (photoUrl) {
      previewImg.src = photoUrl;
      imagePreviewContainer.classList.remove("hidden");
    } else {
      imagePreviewContainer.classList.add("hidden");
    }
  }
});
