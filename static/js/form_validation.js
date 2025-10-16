document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const requiredFields = form.querySelectorAll(".required");

    requiredFields.forEach((field) => {
      const formContainer = field.closest(".form-item");

      const label = formContainer.querySelector("label").textContent;
      const span = document.createElement("span");

      span.textContent = `O campo ${label} é obrigatório.`;
      span.classList.add(
        "empty-error",
        "text-red-500",
        "font-medium",
        "text-sm",
        "block",
        "md:absolute"
      );

      if (field.id === "field-photo") {
        if (field.files.length === 0) {
          if (formContainer.querySelector(".empty-error")) return;

          formContainer.appendChild(span);
        }else{
            formContainer.querySelector(".empty-error")?.remove();
        }
      } else {
        if (!field.value.trim()) {
          if (formContainer.querySelector(".empty-error")) return;

          formContainer.appendChild(span);
          field.classList.remove("outline", "outline-gray-300");
          field.classList.add("outline-2", "outline-red-500");
        } else {
          field.classList.remove("outline-2", "outline-red-500");
          field.classList.add("outline", "outline-gray-300");
          formContainer.querySelector(".empty-error")?.remove();
        }
      }
    });
  });
});
