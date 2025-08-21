const form = document.querySelector('form');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    if(!validate_forms(form)){
        return;
    }
    form.submit();
});

function validate_forms(form){
    const inputs = form.querySelectorAll('input');
    let isValid = true;

    inputs.forEach(input => {
        clear_errors(input);

         if (input.value.trim() == ""){
            set_error(input);
            isValid = false;
        }
    });
    return isValid;
}

function set_error(input){
    console.log('CAMPO VAZIO');
    input.classList.add('border-error');
    let span = document.createElement('span');
    span.classList.add('error');
    span.textContent = `O campo ${input.getAttribute('id')} é obrigatório.`
    input.parentElement.appendChild(span);
}

function clear_errors(input){
    input.classList.remove('border-error');
    const span = input.parentElement.querySelector('span');
    if(span) span.remove()
}
