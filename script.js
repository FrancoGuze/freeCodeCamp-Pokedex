const pokeName = document.getElementById("pokemon-name")
const pokeId = document.getElementById("pokemon-id")
const pokeWeight = document.getElementById("weight")
const pokeHeight = document.getElementById("height")
const types = document.getElementById("types")
const sprite = document.getElementById('sprite')

const dataDisplay = document.getElementById('pokemon-data')

const hp = document.getElementById('hp')
const atk = document.getElementById('attack')
const def = document.getElementById('defense')
const sAtk = document.getElementById('special-attack')
const sDef = document.getElementById('special-defense')
const spd = document.getElementById('speed')

const input = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const nextBtn = document.getElementById('next-btn')
const prevBtn = document.getElementById('prev-btn')

const loader = document.getElementById('loader')

const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
}
fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon')
    .then(res => res.json())
    .then(data => pokemonList = data.results).catch(err => console.log(err))


let pokemonList = []
let actualPokemon = 0
const findPokemon = (arr, input) => {
    loader.classList.remove('hide')
    dataDisplay.classList.add('hidden')
    try {

        const result = arr.filter((el) => el.id === parseInt(input) || el.name === input.toLowerCase())
        actualPokemon = result[0].id
        return result

    } catch (err) {

        alert('Pokémon not found')
        loader.classList.add('hide')
        actualPokemon = 0
    }

}
const nextPokemon = () => {
    console.log(actualPokemon, 'previo')
    if (actualPokemon <= pokemonList.length - 1) {
        actualPokemon += 1
        console.log(actualPokemon, 'actual')

        search(actualPokemon.toString())
    }
}
const prevPokemon = () => {
    console.log(actualPokemon, 'previo')
    if (actualPokemon > 1) {
        actualPokemon -= 1
        console.log(actualPokemon, 'actual')
        search(actualPokemon.toString())
    }
}
const setPokemonStats = (arr) => {
    hp.textContent = arr[0]['base_stat']
    atk.textContent = arr[1]['base_stat']
    def.textContent = arr[2]['base_stat']
    sAtk.textContent = arr[3]['base_stat']
    sDef.textContent = arr[4]['base_stat']
    spd.textContent = arr[5]['base_stat']
}

const setPokemonTypes = (arr) => {
    types.innerHTML = ''
    let colorsArray = []
    arr.forEach(type => {
        const color = typeColors[type.type.name]
        colorsArray.push(color + 'CC')
        types.innerHTML += `<p class="type" style='background-color:${color}'>${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</p>`
    });

    colorsArray.length === 1 ? colorsArray.push(colorsArray[0]) : colorsArray

    document.documentElement.style.setProperty('--typeColor1', `${colorsArray[0]}`)
    document.documentElement.style.setProperty('--typeColor2', `${colorsArray[1]}`)
}




const search = (selectedValue) => {
    const val = selectedValue

    const pokemonToFetch = findPokemon(pokemonList, val)[0]

    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonToFetch.id}`)
        .then(res => res.json())
        .then(data => {
            dataDisplay.classList.remove('hidden')
            loader.classList.add('hide')

            const { name, id, weight, height } = data

            setPokemonStats(data.stats)
            setPokemonTypes(data.types)
            sprite.src = data.sprites['front_default']
            pokeName.textContent = name.charAt(0).toUpperCase() + name.slice(1)
            pokeId.textContent = `#${id}`
            pokeWeight.textContent = weight
            pokeHeight.textContent = height

            input.value = '';

        })

    console.log(pokemonToFetch, actualPokemon)
}
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        search(input.value)
    }
})
searchBtn.addEventListener('click', () => {
    search(input.value)
});
nextBtn.addEventListener('click', nextPokemon)
prevBtn.addEventListener('click', prevPokemon)

