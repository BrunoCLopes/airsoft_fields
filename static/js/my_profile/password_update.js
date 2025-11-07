document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('password-update-form');
    const newPasswordInput = document.getElementById('new-password');
    const confirmNewPasswordInput = document.getElementById('confirm-new-password');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let hasErrors = false;

        if (!validateRequiredFields(form)) {
            hasErrors = true;
        }

        if (newPasswordInput.value != confirmNewPasswordInput.value){
            showFieldError(confirmNewPasswordInput.parentElement, confirmNewPasswordInput, 'As senhas não coincidem.');
            hasErrors = true;
        }else{
            clearFieldError(confirmNewPasswordInput.parentElement, confirmNewPasswordInput);
        }

        if (hasErrors) return;

        form.submit();
    });
});