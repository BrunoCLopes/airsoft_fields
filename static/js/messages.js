document.addEventListener("DOMContentLoaded", () => {
    const messagesContainer = document.querySelectorAll('.message-alert');
    
    messagesContainer.forEach((message) => {
        // Começa a desaparecer após 3 segundos
        setTimeout(() => {
            message.style.transition = 'opacity 0.5s ease-out';
            message.style.opacity = '0';
            
            // Remove do DOM após a animação
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 3000);
    });
});