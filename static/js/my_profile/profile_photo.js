document.addEventListener('DOMContentLoaded', () => {
    const profilePhotoInput = document.getElementById('profile-photo-input');
    const photo = document.getElementById('photo');
    const removeButton = document.getElementById('remove-photo');
    const removeFlag = document.getElementById('default-photo');


    profilePhotoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                photo.classList.add('h-full', 'w-full');
                photo.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    removeButton.addEventListener('click', () => {
        profilePhotoInput.value = '';
        photo.classList.remove('h-full', 'w-full');
        photo.classList.add('size-14');
        photo.src = '/static/img/default_photo.svg';
        removeFlag.value = 'True';
    });
});