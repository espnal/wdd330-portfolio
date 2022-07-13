import ls from './localsrg.js';
const select = document.getElementById("select");
const input = document.getElementById("input");
const plus = document.querySelector(".plus");
const msg = document.querySelector(".msg");
const h_icon = document.querySelector(".h-icon");
const clean = document.querySelector(".clean");

const url = "https://pokeapi.co/api/v2/pokemon";
// input.addEventListener("input", (e) => {

// })

function toggleHistory() {
    const history = document.getElementById("history");
    history.classList.toggle("present")
}
// clean.onclick = cleanHistory;

h_icon.addEventListener("click", () => {
    toggleHistory()
    loadHistory()
})

plus.addEventListener("click", (e) => {
    if (input.value.length > 0) {
        const mainContent = document.querySelector(".main-content")
        mainContent.style.display = "inherit";
        capturePokemonUrl(e)
    }
})

select.addEventListener("change", (e) => {
    const mainContent = document.querySelector(".main-content")
    mainContent.style.display = "inherit";
    capturePokemonUrl(e)
});


async function getJsonObject(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw Error(response.statusText);
    } else {
        return response.json();
    }
}

function getData(url) {
    return getJsonObject(url);
}


function showList() {
    getData(url).then(function(data) {
        let inf = data.results
        let select = document.getElementById("select");
        let options = document.createElement('option');
        options.setAttribute("value", "none");
        options.textContent = "Select pokemon";
        select.appendChild(options);
        inf.forEach(items => {
            let options = document.createElement('option');
            options.textContent = items.name;
            select.appendChild(options);
        })
    })
}

function capturePokemonUrl(e) {
    let img = document.querySelector('.img');
    img.innerHTML = "";
    let inf = document.querySelector('.content-inf');
    inf.innerHTML = "";
    const msg = document.createElement("h3")
    msg.className = "msg";
    inf.appendChild(msg);
    getData(url).then(function(data) {
        let numberOfTotalPokemons = data.count
        let currentName = e.target.value;
        const input = document.getElementById("input");
        let nextUrl = `https://pokeapi.co/api/v2/pokemon?offset=20&limit=${numberOfTotalPokemons}`;
        if (currentName) {
            for (let counter = 0; counter < data.results.length; counter++) {
                if (currentName === data.results[counter].name) {
                    let x = data.results[counter].url;
                    ls.savePokemon(currentName)
                    displayResults(x);
                }
            }
        } else if (input.value) {
            getData(nextUrl).then(function(newData) {
                for (let counter = 0; counter < newData.results.length; counter++) {
                    if (input.value.toLowerCase() === newData.results[counter].name) {
                        let x = newData.results[counter].url;
                        ls.savePokemon(input.value)
                        displayResults(x);
                    } else {
                        let img = document.querySelector('.img');
                        img.innerHTML = `<img id="images" src="images/questionMark.png"style="width:150px; margin-left: 4.3em;margin-top: 4.3em"></img>`;
                        msg.textContent = "Sorry we couldn't find that Pokemon";
                    }
                }
            })
        }
    })
}

function displayResults(url) {
    fetch(url)
        .then((response => response.json()))
        .then(data => {
            buildImage(data)
            buildInfo(data)
        })
        .catch((error) => {
            throw (error)
        })
}

function buildImage(data) {
    let img = document.querySelector('.img');
    img.innerHTML = `<img id="images" src="${data.sprites.other.home.front_default}"></img>`;
}

function buildInfo(data) {
    let inf = document.querySelector('.content-inf');
    let pokeName = data.name.toUpperCase();
    if (data.types.length > 1) {
        inf.innerHTML =
            `
        <h2 class="name"> ${pokeName}</h2>
        <div class="main-inf">
        <div class="text"><p>${data.types[0].type.name} / ${data.types[1].type.name}</p><span>Type</span></div>
        <div class="text"><p> ${data.weight}</p><span>Weight</span> </div>
        <div class="text"><p>${data.height}</p><span>Height</span></div>
        </div>
        <button id="show-more">Show more</button>
    `;
    } else {
        inf.innerHTML =
            `
        <h2 class="name"> ${pokeName}</h2>
        <div class="main-inf">
        <div class="text"><p>${data.types[0].type.name}</p><span>Type</span></div>
        <div class="text"><p> ${data.weight}</p><span>Weight</span></div>
        <div class="text"><p>${data.height}</p><span>Height</span></div>
        </div>
        <button id="show-more">Show more</button>
    `;
    }
}

function loadHistory() {
    const ul = document.querySelector(".list-container")
    const previousPokemon = ls.loadPokemon()
    previousPokemon.forEach((pokemon) => {
        let li = document.createElement("li");
        li.textContent = `${pokemon}`
        ul.appendChild(li);
    })
}

// function cleanHistory() {
//     localStorage.clear()
// }
showList()