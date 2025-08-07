const filledStateField = document.getElementById('filter-state');
const filledCityField = document.getElementById('filter-city');
const searchStateContainer = document.getElementById('search-state-container');
const searchCityContainer = document.getElementById('search-city-container')
const searchStateInput = document.getElementById('search-state');
const searchCityInput = document.getElementById('search-city');
const stateSuggestions = document.getElementById('state-suggestions');
const citySuggestions = document.getElementById('city-suggestions');

let states = [];

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

filledStateField.addEventListener('click', () => {
    if (searchStateContainer.classList.contains('visible')) {
        searchStateContainer.classList.remove('visible');
        stateSuggestions.style.display = 'none'
        stateSuggestions.innerHTML = '';
        searchStateInput.value = '';
    } else {
        searchStateContainer.classList.add('visible');
        searchStateInput.focus();
    }
});

filledCityField.addEventListener('click', () => {
    if (searchCityContainer.classList.contains('visible')) {
        searchCityContainer.classList.remove('visible');
    } else {
        searchCityContainer.classList.add('visible');
        searchCityInput.focus();
    }
});

document.addEventListener('click', (e) => {
    if (
    !searchStateContainer.contains(e.target) &&
    e.target !== filledStateField
    ) {
    searchStateContainer.classList.remove('visible');
    stateSuggestions.style.display = 'none'
    stateSuggestions.innerHTML = '';
    searchStateInput.value = '';
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

loadStates();