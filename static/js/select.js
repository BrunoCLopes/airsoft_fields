document.addEventListener('DOMContentLoaded', () => {
    let states = [];
    let cities = [];
    const stateInput = document.querySelector("#field-state");
    const stateOptions = document.querySelector("#state-options");
    const cityInput = document.querySelector("#field-city");
    const cityOptions = document.querySelector("#city-options");
    const clearBtns = document.querySelectorAll('.clear-filter');
    
    async function fetchStates() {
        try {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
            const data = await response.json();
            states = data.map(state => ({ name: state.nome, id: state.id }));
            fillStateOptions(states);
        } catch (error) {
            console.error('Erro ao buscar estados:', error);
        }
    }

    async function fetchCitiesByStateId(stateId) {
        try {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`);
            const data = await response.json();
            cities = data.map(city => city.nome);
        } catch (error) {
            console.error('Erro ao buscar cidades:', error);
        }
    }

    async function selectedStateOption(option, stateId) {
        await fetchCitiesByStateId(stateId);
        fillCityOptions(cities);
        cityInput.disabled = false;
        stateInput.readOnly = true;
        stateInput.value = option;
        stateOptions.classList.add('hidden');
    }

    function selectedCityOption(option) {
        cityInput.value = option;
        cityOptions.classList.add('hidden');
    }

    function fillStateOptions(states) {
        stateOptions.innerHTML = "";
        states.forEach(state => {
            const option = document.createElement('div');
            option.textContent = state.name;
            option.classList.add('px-3', 'py-2', 'hover:bg-indigo-500', 'hover:text-white');
            option.addEventListener('click', () => selectedStateOption(state.name, state.id));
            stateOptions.appendChild(option);
        });
    }

    function fillCityOptions(cities) {
        cityOptions.innerHTML = "";
        cities.forEach(city => {
            const option = document.createElement('div');
            option.textContent = city;
            option.classList.add('px-3', 'py-2', 'hover:bg-indigo-500', 'hover:text-white');
            option.addEventListener('click', () => selectedCityOption(city));
            cityOptions.appendChild(option);
        });
    }

    stateInput.addEventListener('input', () => {
        const searchTerm = stateInput.value;
        const filteredStates = states.filter(state =>
            state.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        fillStateOptions(filteredStates);
        stateOptions.classList.remove('hidden');
    })

    cityInput.addEventListener('input', () => {
        const searchTerm = cityInput.value;
        const filteredCities = cities.filter(city =>
            city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        fillCityOptions(filteredCities);
        cityOptions.classList.remove('hidden');
    })

    stateInput.addEventListener('focus', () => {
        if (!stateInput.readOnly) { 
            stateOptions.classList.remove('hidden');
        }
    })

    cityInput.addEventListener('focus', () => {
        cityOptions.classList.remove('hidden');
    })

    document.addEventListener('click', (e) => {
        if (!stateInput.contains(e.target) && !stateOptions.contains(e.target)) {
            if (!stateOptions.classList.contains('hidden')) {
                stateInput.value = "";
                fillStateOptions(states);
            }
            stateOptions.classList.add('hidden');
        }

        if (!cityInput.contains(e.target) && !cityOptions.contains(e.target)) {
            if (!cityOptions.classList.contains('hidden')) {
                cityInput.value = "";
                fillCityOptions(cities);
            }
            cityOptions.classList.add('hidden');
        }
    });

    clearBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            input.value = "";

            if (input.id === 'field-state') {
                fillStateOptions(states);
                stateInput.readOnly = false;
                cityInput.disabled = true;
                cityInput.value = "";
            }
        });
    });

    fetchStates();
});