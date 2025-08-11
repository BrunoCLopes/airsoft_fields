const filledStateField = document.getElementById('filter-state');
const filledCityField = document.getElementById('filter-city');
const filledTypeField = document.getElementById('field-type');
const filledNameField = document.getElementById('field-name');

const searchStateContainer = document.getElementById('search-state-container');
const searchCityContainer = document.getElementById('search-city-container');
const appliedFiltersContainer = document.getElementById('applied-filters-container');

const searchStateInput = document.getElementById('search-state');
const searchCityInput = document.getElementById('search-city');

const stateSuggestions = document.getElementById('state-suggestions');
const citySuggestions = document.getElementById('city-suggestions');
const fieldOptions = document.getElementById('field-type-options');

const typeOption = document.getElementsByClassName('type-option')

const searchButton = document.getElementById('search-button-filter')


async function loadStates() {
    try {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
    const data = await response.json();
    states = data.map(state => ({ id: state.id, nome: state.nome }));
    } catch (error) {
    console.error("Erro ao buscar estados:", error);
    }
}

async function loadCities(stateId){
    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + stateId + '/municipios?orderBy=nome');
        const data = await response.json();
        cities = data.map(city => city.nome);
    } catch (error) {
        console.error("Erro ao buscar cidades:", error);
    }
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


filledStateField.addEventListener('click', () => {
    if(searchStateContainer.classList.contains('visible')){
        searchStateContainer.classList.remove('visible');
        stateSuggestions.style.display = 'none'
        searchStateInput.value = '';
        stateSuggestions.innerHTML = '';
    }else{
        searchStateContainer.classList.add('visible');
        searchStateInput.focus();
    }
});

filledCityField.addEventListener('click', () => {
    if(searchCityContainer.classList.contains('visible')){
        searchCityContainer.classList.remove('visible')
        citySuggestions.style.display = 'none'
        searchCityInput.value = '';
        citySuggestions.innerHTML = '';
    }else{
        searchCityContainer.classList.add('visible');
        searchCityInput.focus();
    }
});

filledTypeField.addEventListener('click', () => {
    if(fieldOptions.classList.contains('visible')){
        fieldOptions.classList.remove('visible');
    }else{
        fieldOptions.classList.add('visible');
    }
});

document.addEventListener('click', (e) => {
    if (!searchStateContainer.contains(e.target) && e.target !== filledStateField) {
        searchStateContainer.classList.remove('visible');
        stateSuggestions.style.display = 'none';
        stateSuggestions.innerHTML = '';
        searchStateInput.value = '';
    }

    if (!searchCityContainer.contains(e.target) && e.target !== filledCityField) {
        searchCityContainer.classList.remove('visible');
        citySuggestions.style.display = 'none';
        citySuggestions.innerHTML = '';
        searchCityInput.value = '';
    }

    if (!fieldOptions.contains(e.target) && e.target !== filledTypeField) {
        fieldOptions.classList.remove('visible');
    }    
});

searchStateInput.addEventListener('input', () => {
    const value = searchStateInput.value.toLowerCase();
    stateSuggestions.innerHTML = '';

    const filtered = states.filter(state =>
    state.nome.toLowerCase().startsWith(value)
    ).slice(0, 10);

    if (filtered.length === 0) {
        stateSuggestions.style.display = 'none';
        return;
    }

    stateSuggestions.style.display = 'block'
    filtered.forEach(state => {
        const div = document.createElement('div');
        div.textContent = state.nome;
        div.classList.add('autocomplete-suggestion');
        div.addEventListener('click', () => {
            filledStateField.value = state.nome;
            const stateId = state.id;
            loadCities(stateId);
            filledCityField.disabled = false;
            searchStateContainer.classList.remove('visible');
            stateSuggestions.innerHTML = '';
            searchStateInput.value = '';
        });
    stateSuggestions.appendChild(div);
    });
});

searchCityInput.addEventListener('input', () => {
    const value = searchCityInput.value.toLowerCase();
    citySuggestions.innerHTML = '';

    const filtered = cities.filter(city =>
    city.toLowerCase().startsWith(value)
    ).slice(0, 10);

    if (filtered.length === 0) {
        citySuggestions.style.display = 'none';
        return;
    }

    citySuggestions.style.display = 'block'
    filtered.forEach(city => {
        const div = document.createElement('div');
        div.textContent = city;
        div.classList.add('autocomplete-suggestion');
        div.addEventListener('click', () => {
            filledCityField.value = city;
            searchCityContainer.classList.remove('visible');
            citySuggestions.innerHTML = '';
            searchCityInput.value = '';
        });
        citySuggestions.appendChild(div);
    });
});

Array.from(typeOption).forEach(option => {
    option.addEventListener('click', () => {
        filledTypeField.value = option.textContent;
        fieldOptions.classList.remove('visible');
    });
});

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

loadStates();