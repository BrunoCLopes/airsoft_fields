import requests

def load_states():
    response = requests.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    if response.status_code == 200:
        data = response.json()
        states = {
            state['sigla']: state['nome'] for state in data
        }
        return states
    return {}

def validate_state(state, abbreviation):
    states = load_states()
    return states.get(abbreviation) == state

def validate_city(state_abbreviation, city):
    response = requests.get(f"https://servicodados.ibge.gov.br/api/v1/localidades/estados/{state_abbreviation}/municipios")
    if response.status_code == 200:
        data = response.json()
        cities = [c['nome'] for c in data]
        return city in cities
    return False