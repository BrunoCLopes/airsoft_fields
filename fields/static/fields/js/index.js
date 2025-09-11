document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[name="container-input"]').forEach(clearInput);
    const filledStateField = document.getElementById('filter-state');
    const filledCityField = document.getElementById('filter-city');
    const filledTypeField = document.getElementById('field-type');
    const filledNameField = document.getElementById('field-name');
    const appliedFiltersContainer = document.getElementById('applied-filters-container');
    const citySuggestions = document.getElementById('city-suggestions');
    const searchButton = document.getElementById('search-button-filter')

    function clearInput(container){
        const input = container.querySelector('input[name="trigger-select"], input[name="input-text"]');
        const button = container.querySelector('[name="clear-input-button"]');
        button.addEventListener('click', () =>{
            input.value = "";
        });
    }

    function createFilterTag(value){
        const filterTag = document.createElement('button');
        filterTag.classList.add('applied-filter');
        filterTag.textContent = value;

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-xmark');

        filterTag.addEventListener('click', () => {
            filterTag.removeChild(icon);
            appliedFiltersContainer.removeChild(filterTag);
        });

        appliedFiltersContainer.appendChild(filterTag);
        filterTag.appendChild(icon);
    }

    searchButton.addEventListener('click', () =>{
        appliedFiltersContainer.innerHTML = '';

        const name = filledNameField.value;
        const state = filledStateField.value;
        const city = filledCityField.value;
        const type = filledTypeField.value;

        if(name){
            createFilterTag(name);
            filledNameField.value = '';
        }

        if(state){
            createFilterTag(state);
            filledStateField.value = '';
            filledCityField.disabled = true;
            citySuggestions.innerHTML = '';
        }

        if(city){
            createFilterTag(city);
            filledCityField.value = '';
        }
    
        if(type){
            createFilterTag(type);
            filledTypeField.value = '';
        }  
    });
});