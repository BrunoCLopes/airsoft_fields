document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("filter-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll("input, select");
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.disabled = true;
            }
        });
        form.submit();
    });
});