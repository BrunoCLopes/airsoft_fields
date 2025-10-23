document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.getElementById("signIn-form");

    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let hasErrors = false;

        if(!validateRequiredFields(signInForm)){
            hasErrors = true;
        };

        const email = document.getElementById("signIn-email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email.value)) {
            showFieldError(email.parentElement, email, 'Email inválido.');
            hasErrors = true;
        }else{
            clearFieldError(email.parentElement, email);
        }

        if (hasErrors) return;

        signInForm.submit();
    });
});
