const POKEMON_LIST = "Pokemonlist"

function loadPokemon() {
    let pokemonliststring = localStorage.getItem(POKEMON_LIST)

    let pokemonlist = []
    if (pokemonliststring) {
        pokemonlist = JSON.parse(pokemonliststring)
    }
    return pokemonlist
}

function savePokemon(pokemon) {
    let pokelist = loadPokemon()
    if (pokelist.length < 10) {
        pokelist.push(pokemon)
        localStorage.setItem(POKEMON_LIST, JSON.stringify(pokelist))
    }

}

export default {
    loadPokemon,
    savePokemon,
}