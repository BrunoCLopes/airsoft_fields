document.addEventListener("DOMContentLoaded", () => {
    const fieldForm = document.getElementById("field-form");
    const phoneInput = document.querySelector(".field-phone");
    const description = document.querySelector(".field-description");

    if (phoneInput) {
        phoneInput.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, ""); 
            
            value = value.substring(0, 11);
            value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
            
            e.target.value = value;
        });
    }

    fieldForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let hasErrors = false;

        if(!validateRequiredFields(fieldForm)){
            hasErrors = true;
        };

        if(phoneInput.value.length > 0 && phoneInput.value.length != 15){
            showFieldError(phoneInput.parentElement, phoneInput, 'Telefone incompleto.');
            hasErrors = true;
        } else if (phoneInput.value.length === 15){ 
            clearFieldError(phoneInput.parentElement, phoneInput);
        }

        if(description.value.length > 0 && description.value.length < 60){
            showFieldError(description.parentElement, description, 'A descrição precisa ter ao menos 60 caracteres.');
            hasErrors = true;
        } else if (description.value.length >= 60){ 
            clearFieldError(description.parentElement, description);
        }

        if (hasErrors) return;

        fieldForm.submit();
    });
});
