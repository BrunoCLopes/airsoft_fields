document.addEventListener('DOMContentLoaded', () => {
    const stateField = document.getElementById('filter-state');
    const cityField = document.getElementById('filter-city');
    const typeField = document.getElementById('field-type');
    const nameField = document.getElementById('field-name');
    const appliedFiltersContainer = document.getElementById('applied-filters-container');
    const citySuggestions = document.getElementById('city-suggestions');
    const searchButton = document.getElementById('search-button-filter')

    document.querySelectorAll('[name="container-input"]').forEach(clearInput);

    function clearInput(container){
        const input = container.querySelector('input[name="trigger-select"], input[name="input-text"]');
        const button = container.querySelector('[name="clear-input-button"]');
        button.addEventListener('click', () =>{
            if(input.id === "filter-state"){
                cityField.value = "";
                cityField.disabled = true;
            }
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

        const name = nameField.value;
        const state = stateField.value;
        const city = cityField.value;
        const type = typeField.value;

        if(name){
            createFilterTag(name);
            nameField.value = '';
        }

        if(state){
            createFilterTag(state);
            stateField.value = '';
            cityField.disabled = true;
            citySuggestions.innerHTML = '';
        }

        if(city){
            createFilterTag(city);
            cityField.value = '';
        }
    
        if(type){
            createFilterTag(type);
            typeField.value = '';
        }  
    });
});