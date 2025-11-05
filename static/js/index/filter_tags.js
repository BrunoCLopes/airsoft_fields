document.addEventListener("DOMContentLoaded", () => {
    const filterForm = document.getElementById("filter-form");
    const filterTags = document.querySelectorAll(".filter-tag");

    filterTags.forEach(tag => {
        tagText = tag.querySelector('span');
        if (tagText.textContent !== "CQB") {
            tagText.textContent = tagText.textContent.toLowerCase();
            tagText.classList.add("capitalize");
        }
        tag.addEventListener("click", () => {
            const filterName = tag.getAttribute("data-filter-name");
            const inputToClear = filterForm.querySelector(
                `input[name="${filterName}"], select[name="${filterName}"]`
            );
            if (inputToClear) {
                inputToClear.value = "";

                if (filterName === 'field_state') {
                    const cityInput = filterForm.querySelector('input[name="field_city"]');
                    const stateAbbrInput = filterForm.querySelector('input[name="state_abbreviation"]');

                    if (cityInput) {
                        cityInput.value = "";
                    }
                    if (stateAbbrInput) {
                        stateAbbrInput.value = "";
                    }
                }

                filterForm.submit();
            }
        });
    });
});