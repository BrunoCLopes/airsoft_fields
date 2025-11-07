document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("info-update-form");
  const phoneInput = document.getElementById("phone");
  const email = document.getElementById("email");

  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");

      value = value.substring(0, 11);
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");

      e.target.value = value;
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let hasErrors = false;

    if (!validateRequiredFields(form)) {
      hasErrors = true;
    }

    if(!validateEmail(email)){
      hasErrors = true;
    }

    if (phoneInput.value.length > 0 && phoneInput.value.length != 15) {
      showFieldError(
        phoneInput.parentElement,
        phoneInput,
        "Telefone incompleto."
      );
      hasErrors = true;
    } else if (phoneInput.value.length === 15 || phoneInput.value.length === 0) {
      clearFieldError(phoneInput.parentElement, phoneInput);
    }

    if (hasErrors) return;

    form.submit();
  });
});
