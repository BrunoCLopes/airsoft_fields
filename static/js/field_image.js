document.addEventListener('DOMContentLoaded', () => {
    const photoInput = document.querySelector('.field-photo');
    const imagePreview = document.getElementById('image-preview-container');
    const previewImg = document.getElementById('preview-image');
    const removeImageBtn = document.getElementById('remove-image');

    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                imagePreview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    removeImageBtn.addEventListener('click', () => {
        photoInput.value = '';
        imagePreview.classList.add('hidden');
        previewImg.src = '';
    });
});