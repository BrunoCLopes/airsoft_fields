    document.addEventListener('DOMContentLoaded', () => {
        const messages = document.getElementById('messages');
        if (messages) {
            setTimeout(() => {
                messages.style.opacity = '0';
                setTimeout(() => messages.remove(), 500);
            }, 3000);
        }
    });