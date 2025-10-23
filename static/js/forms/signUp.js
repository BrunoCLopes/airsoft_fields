document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.getElementById("signUp-form");

    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let hasErrors = false;

        if(!validateRequiredFields(signUpForm)){
            hasErrors = true;
        };

        const email = document.getElementById("signUp-email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email.value)) {
            showFieldError(email.parentElement, email, 'Email inválido.');
            hasErrors = true;
        }else{
            clearFieldError(email.parentElement, email);
        }
        
        const password = document.getElementById("signUp-password");
        const confirmPassword = document.getElementById("signUp-confirm-password");

        if (password.value != confirmPassword.value){
            showFieldError(confirmPassword.parentElement, confirmPassword, 'As senhas não coincidem.');
            hasErrors = true;
        }else{
            clearFieldError(confirmPassword.parentElement, confirmPassword);
        }

        if (hasErrors) return;

        signUpForm.submit();
    });
});
