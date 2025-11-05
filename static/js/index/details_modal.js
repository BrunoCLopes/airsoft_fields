document.addEventListener("DOMContentLoaded", () => {
  const detailsModal = document.getElementById("details-modal");
  const detailsButtons = document.querySelectorAll(".details-field");

  detailsButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const fieldData = {
        name: this.dataset.fieldName,
        type: this.dataset.fieldType,
        phone: this.dataset.fieldPhone,
        state: this.dataset.fieldState,
        city: this.dataset.fieldCity,
        address: this.dataset.fieldAddress,
        description: this.dataset.fieldDescription,
        hours: this.dataset.fieldHours,
        photo: this.dataset.fieldImageUrl
      };
      updateFieldTypeBadge(fieldData.type);
      updateDetailsModal(fieldData);
      openModal(detailsModal);
    });
  });
});

function updateDetailsModal(fieldData) {
  document.getElementById("details-field-name").textContent = fieldData.name;
  document.getElementById("details-field-phone").textContent = fieldData.phone;
  document.getElementById("details-field-state").textContent = fieldData.state;
  document.getElementById("details-field-city").textContent = fieldData.city;
  document.getElementById("details-field-address").textContent = fieldData.address;
  document.getElementById("details-field-description").textContent = fieldData.description;
  document.getElementById("details-field-hours").textContent = fieldData.hours;
  document.getElementById("details-field-image").src = fieldData.photo;
}

function updateFieldTypeBadge(fieldType) {
  const badge = document.getElementById("details-field-type");
  badge.textContent = fieldType;
    badge.classList.remove("bg-yellow-500", "bg-green-600", "bg-blue-600", "bg-red-600");
  
  const colors = {
      "MISTO": "bg-yellow-500",
      "MATA": "bg-green-600",
      "CQB": "bg-blue-600",
      "SPEED": "bg-red-600"
  }

  badge.classList.add(colors[fieldType.toUpperCase()]);
}