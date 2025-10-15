document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const requiredFields = form.querySelectorAll('.required');
        requiredFields.forEach(field => {
            const formContainer = field.closest('.form-item');
            if (!field.value.trim()) {
                console.log(formContainer);
                if (formContainer.querySelector('span')) return;

                const label = formContainer.querySelector('label').textContent;
                const span = document.createElement('span');

                span.textContent = `O campo ${label} é obrigatório.`;
                span.classList.add('text-red-500', 'font-medium','text-sm', 'block', 'md:absolute');
                formContainer.appendChild(span);
                field.classList.add('outline-2', 'outline-red-500');
            }else{
                field.classList.remove('outline-2', 'outline-red-500');
                formContainer.querySelector('span')?.remove();
            }
        });
    });  
});