const form = document.querySelector('form');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    if(!validateForms(form)){
        return;
    }
    form.submit();
});

function validateForms(form){
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        clearErrors(input);

         if (input.value.trim() == ""){
            setError(input);
            isValid = false;
        }
    });
    return isValid;
}

function setError(input){
    const label = input.parentElement.querySelector('label');
    input.classList.add('border-error');
    let span = document.createElement('span');
    span.classList.add('error');
    span.textContent = `O campo ${label.textContent} é obrigatório.`;
    input.parentElement.appendChild(span);
}

function clearErrors(input){
    input.classList.remove('border-error');
    const span = input.parentElement.querySelector('span');
    if(span) span.remove()
}
