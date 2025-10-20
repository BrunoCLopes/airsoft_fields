function validateRequiredFields(form) {
  const requiredFields = form.querySelectorAll(".required");
  let isValid = true;

  requiredFields.forEach((field) => {
    const formContainer = field.closest(".form-item");
    const label = formContainer.querySelector("label").textContent;

    if (field.id === "field-photo") {
      const fileZone = formContainer.querySelector(".file-zone");

      if (field.files.length === 0) {
        isValid = false;
        showFileError(formContainer, fileZone, `O campo ${label} é obrigatório.`);
      } else {
        clearFileError(formContainer, fileZone);
      }
    } else {
      if (!field.value.trim()) {
        isValid = false;
        showFieldError(formContainer, field, `O campo ${label} é obrigatório.`);
      } else {
        clearFieldError(formContainer, field);
      }
    }
  });

  return isValid;
}

function showFileError(formContainer, fileZone, message) {
  if (formContainer.querySelector(".empty-error")) return;

  const span = createErrorElement(message);
  fileZone.classList.remove("outline-gray-300");
  fileZone.classList.add("outline-red-500");
  formContainer.appendChild(span);
}

function clearFileError(formContainer, fileZone) {
  fileZone.classList.remove("outline-red-500");
  fileZone.classList.add("outline-gray-300");
  formContainer.querySelector(".empty-error")?.remove();
}

function showFieldError(formContainer, field, message) {
  if (formContainer.querySelector(".empty-error")) return;

  const span = createErrorElement(message);
  formContainer.appendChild(span);
  field.classList.remove("outline", "outline-gray-300");
  field.classList.add("outline-2", "outline-red-500");
}

function clearFieldError(formContainer, field) {
  field.classList.remove("outline-2", "outline-red-500");
  field.classList.add("outline", "outline-gray-300");
  formContainer.querySelector(".empty-error")?.remove();
}

function createErrorElement(message) {
  const span = document.createElement("span");
  span.textContent = message;
  span.classList.add(
    "empty-error",
    "text-red-500",
    "font-medium",
    "text-sm",
    "block",
    "md:absolute"
  );
  return span;
}
function showFieldError(formContainer, field, message) {
  if (formContainer.querySelector(".empty-error")) return;

  const span = createErrorElement(message);
  formContainer.appendChild(span);
  field.classList.remove("outline", "outline-gray-300");
  field.classList.add("outline-2", "outline-red-500");
}

function clearFieldError(formContainer, field) {
  field.classList.remove("outline-2", "outline-red-500");
  field.classList.add("outline", "outline-gray-300");
  formContainer.querySelector(".empty-error")?.remove();
}

function createErrorElement(message) {
  const span = document.createElement("span");
  span.textContent = message;
  span.classList.add(
    "empty-error",
    "text-red-500",
    "font-medium",
    "text-sm",
    "block",
    "md:absolute"
  );
  return span;
}
function showFieldError(formContainer, field, message) {
  if (formContainer.querySelector(".empty-error")) return;

  const span = createErrorElement(message);
  formContainer.appendChild(span);
  field.classList.remove("outline", "outline-gray-300");
  field.classList.add("outline-2", "outline-red-500");
}

function clearFieldError(formContainer, field) {
  field.classList.remove("outline-2", "outline-red-500");
  field.classList.add("outline", "outline-gray-300");
  formContainer.querySelector(".empty-error")?.remove();
}

function createErrorElement(message) {
  const span = document.createElement("span");
  span.textContent = message;
  span.classList.add(
    "empty-error",
    "text-red-500",
    "font-medium",
    "text-sm",
    "block",
    "md:absolute"
  );
  return span;
}
function showFieldError(formContainer, field, message) {
  if (formContainer.querySelector(".empty-error")) return;

  const span = createErrorElement(message);
  formContainer.appendChild(span);
  field.classList.remove("outline", "outline-gray-300");
  field.classList.add("outline-2", "outline-red-500");
}

function clearFieldError(formContainer, field) {
  field.classList.remove("outline-2", "outline-red-500");
  field.classList.add("outline", "outline-gray-300");
  formContainer.querySelector(".empty-error")?.remove();
}

function createErrorElement(message) {
  const span = document.createElement("span");
  span.textContent = message;
  span.classList.add(
    "empty-error",
    "text-red-500",
    "font-medium",
    "text-sm",
    "block",
    "md:absolute"
  );
  return span;
}
function showFieldError(formContainer, field, message) {
  if (formContainer.querySelector(".empty-error")) return;

  const span = createErrorElement(message);
  formContainer.appendChild(span);
  field.classList.remove("outline", "outline-gray-300");
  field.classList.add("outline-2", "outline-red-500");
}

function clearFieldError(formContainer, field) {
  field.classList.remove("outline-2", "outline-red-500");
  field.classList.add("outline", "outline-gray-300");
  formContainer.querySelector(".empty-error")?.remove();
}

function createErrorElement(message) {
  const span = document.createElement("span");
  span.textContent = message;
  span.classList.add(
    "empty-error",
    "text-red-500",
    "font-medium",
    "text-sm",
    "block",
    "md:absolute"
  );
  return span;
}

function showFieldError(formContainer, field, message) {
  if (formContainer.querySelector(".empty-error")) return;

  const span = createErrorElement(message);
  formContainer.appendChild(span);
  field.classList.remove("outline", "outline-gray-300");
  field.classList.add("outline-2", "outline-red-500");
}

function clearFieldError(formContainer, field) {
  field.classList.remove("outline-2", "outline-red-500");
  field.classList.add("outline", "outline-gray-300");
  formContainer.querySelector(".empty-error")?.remove();
}

function createErrorElement(message) {
  const span = document.createElement("span");
  span.textContent = message;
  span.classList.add(
    "empty-error",
    "text-red-500",
    "font-medium",
    "text-sm",
    "block",
    "md:absolute"
  );
  return span;
}
