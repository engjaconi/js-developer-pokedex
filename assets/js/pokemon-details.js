const container = document.getElementById('container');
const idPokemon = window.location.search.replace('?id=', '');

const URL = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;

let pokemonDetails;

fetch(URL)
    .then((response) => response.json())
    .then(detailsJson => pokemonDetails = detailsJson)
    .then(() => console.log(pokemonDetails))
    .then(() => insertPokemonHtml())
    .catch(error => console.log(error));


function insertPokemonHtml() {
    // Alterando o título da página
    document.title = `${pokemonDetails.species.name.toUpperCase()} | Details`;
    // Alterando o ícone
    document.querySelector("link[rel*='icon']").href = `${pokemonDetails.sprites.other.dream_world.front_default}`;

    // Criando as listas de habilidades
    const statNameListHtml = pokemonDetails.stats.map(item => `<li>${item.stat.name}</li>`).join('\n');
    const statValueListHtml = pokemonDetails.stats.map(item => `<li><progress value="${item.base_stat}" max="100" title="${item.base_stat}"></progress></li>`).join('\n');

    // Inserindo no html
    this.container.innerHTML += `
        <div class="pokemon ${pokemonDetails.types[0].type.name}">
            <h1>${pokemonDetails.species.name}</h1>
            <img src="${pokemonDetails.sprites.other.dream_world.front_default}" alt="${pokemonDetails.species.name}">
            <div id="stats">
                <ol id="stats__name">
                    ${statNameListHtml}
                </ol>
                <ol id="stats__value">
                    ${statValueListHtml}
                </ol>
            </div>
            <a href="./index.html">Voltar</a>
        </div>
    `
}