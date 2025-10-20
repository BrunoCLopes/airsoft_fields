document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.getElementById("signUp-form");

    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let hasErrors = false;

        if(!validateRequiredFields(signUpForm)) return;

        const email = document.getElementById("signUp-email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email.value)) {
            showFieldError(email.parentElement, email, 'Email inválido.');
            hasErrors = true;
        }
        
        const password = document.getElementById("signUp-password");
        const confirmPassword = document.getElementById("signUp-confirm-password");

        if (password.value != confirmPassword.value){
            showFieldError(confirmPassword.parentElement, confirmPassword, 'As senhas não coincidem.');
            hasErrors = true;
        }

        if (hasErrors) return;

        signUpForm.submit();
    });
});
