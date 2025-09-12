document.addEventListener('DOMContentLoaded', () => {
    const cityField = document.getElementById('filter-city');
    const appliedFiltersContainer = document.getElementById('applied-filters-container');
    const searchButton = document.getElementById('search-button-filter')

    document.querySelectorAll('div[name="container-input"]').forEach(clearInput);

    function clearInput(container){
        const input = container.querySelector('input[name="trigger-select"], input[name="input-text"]');
        const button = container.querySelector('[name="clear-input-button"]');
        button.addEventListener('click', () =>{  
            stateVerification(input);
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
        document.querySelectorAll('input[name="trigger-select"], input[name="input-text"]').forEach(teste);
    });

    function teste(input){
        const value = input.value.trim();

        if(value){
                createFilterTag(value);
                input.value = "";
            }
        stateVerification(input);
        }

    function stateVerification(input){
            if(input.id === "filter-state"){
                cityField.value = "";
                cityField.disabled = true;
            }
            input.value = "";
        }
});