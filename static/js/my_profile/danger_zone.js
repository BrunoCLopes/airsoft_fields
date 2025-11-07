document.addEventListener("DOMContentLoaded", () => {
    const deleteButton = document.getElementById("delete-account-button");
    const deleteModal = document.getElementById("delete-account-modal");

    deleteButton.addEventListener("click", () => {
        openModal(deleteModal);
    });
});
