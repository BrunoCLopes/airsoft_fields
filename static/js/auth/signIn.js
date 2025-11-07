document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.getElementById("signIn-form");

    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let hasErrors = false;

        if(!validateRequiredFields(signInForm)){
            hasErrors = true;
        };

        const email = document.getElementById("signIn-email");
        if(!validateEmail(email)){
            hasErrors = true;
        }

        if (hasErrors) return;

        signInForm.submit();
    });
});
