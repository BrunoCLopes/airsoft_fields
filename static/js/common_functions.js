document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[name="container-select"]').forEach(selectSetup);
    const stateSuggestions = document.getElementById('state-suggestions');
    const citySuggestions = document.getElementById('city-suggestions');
    const fieldTypeOptions = document.getElementById('field-type-options');
    const stateField = document.getElementById('filter-state');
    const cityField = document.getElementById('filter-city');
    const typeField = document.getElementById('field-type');

    let states = [];
    let cities = [];
    const fieldTypes = ['Todos', 'CQB', 'Mata', 'Misto'];

    function optionSelected(options_container, field, option){
        field.value = option;
        const parent = options_container.parentElement;
        parent.classList.remove('open');
        parent.style.display = 'none';
    }

    async function loadStates() {
        try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        const data = await response.json();
        states = data.map(state => ({ id: state.id, nome: state.nome }));
        states.forEach(state=>{
            const div = document.createElement('div');
            div.textContent = state.nome;
            div.classList.add('option');
            div.addEventListener('click', () => {
                const stateId = state.id;
                optionSelected(stateSuggestions, stateField, state.nome);
                loadCities(stateId);
                cityField.disabled = false;
            });
            stateSuggestions.appendChild(div);
        });
        } catch (error) {
            console.error("Erro ao buscar estados:", error);
        }
    }

    async function loadCities(stateId){
        try {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + stateId + '/municipios?orderBy=nome');
            const data = await response.json();
            citySuggestions.innerHTML = "";
            cities = data.map(city => city.nome);
            cities.forEach(city=>{
                const div = document.createElement('div');
                div.textContent = city;
                div.classList.add('option');
                div.addEventListener('click', () => {
                    optionSelected(citySuggestions, cityField, city);
                });
                citySuggestions.appendChild(div);
            });
        } catch (error) {
            console.error("Erro ao buscar cidades:", error);
        }
    }

    function createSelectOptions(options_container, options, field){
        options.forEach(option=>{
            const div = document.createElement('div');
            div.textContent = option;
            div.classList.add('option');
            div.addEventListener('click', () => {
                field.value = option;
                options_container.style.display = "none";
                options_container.classList.remove('open');
            });
            options_container.appendChild(div);
        });
    }

    function selectSetup(container){
        const trigger = container.querySelector('[name="trigger-select"]');
        const options = container.querySelector('[name="options-select"]');

        function open(){
            document.querySelectorAll('[name="options-select"]').forEach(option=>{
                option.style.display = 'none';
                option.classList.remove('open');
            });
            options.classList.add('open'); 
            options.style.display = 'block';
        }
        function close(){ options.classList.remove('open'); options.style.display = 'none'; }
        function toggle(){ options.classList.contains('open') ? close() : open(); }

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggle();
        });
        document.addEventListener('click', (e) =>{
            if(!container.contains(e.target)) close();
        });
    }

    loadStates();
    createSelectOptions(fieldTypeOptions, fieldTypes, typeField);
});