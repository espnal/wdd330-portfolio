import ls from './localsrg.js';
//DOM Labels variables
const select = document.getElementById("select");
const input = document.getElementById("input");
const plus = document.querySelector(".plus");
const msg = document.querySelector(".msg");
const h_icon = document.querySelector(".h-icon");
const clean = document.querySelector(".clean");

//URL variables
const url = "https://pokeapi.co/api/v2/pokemon";

// clean.onclick = cleanHistory;

//With a click calls history Toggle function
h_icon.addEventListener("click", (e) => {
        toggleHistory()

    })
    //With a click calls the function capturePokemonUrl and give style of inherit to the main content.
plus.addEventListener("click", (e) => {
        if (input.value.length > 0) {
            const mainContent = document.querySelector(".main-content")
            mainContent.style.display = "inherit";
            capturePokemonUrl(e)
        }
    })
    // Scrolling through the options calls the function capturePokemonUrl and give style of inherit to the main content.
select.addEventListener("change", (e) => {
    const mainContent = document.querySelector(".main-content")
    mainContent.style.display = "inherit";
    capturePokemonUrl(e)
});

// Asyn and await function to await the data of the current url
async function getJsonObject(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw Error(response.statusText);
    } else {
        return response.json();
    }
}
//This function is use to transport the URL and to reused with any other function
function getData(url) {
    return getJsonObject(url);
}

//This function will add all the pokemons in the drop down section, 
//and will call the function the loadHistory.
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
    loadHistory()
}

//First this function will clean any information in the img and the inf container,
//second the main content needs to be ajusted by adding margins when the history is not added
//it gets the values either from the drop down or the input,  the function goes a find 
//the url of the specific pokemon and passed the value to displayResults, if any value is found then
//the it will show a message of unsuccessful search results.
function capturePokemonUrl(e) {
    const mainContent = document.querySelector(".main-content");
    if (history.className !== "present") {
        mainContent.style.marginRight = "auto";
        mainContent.style.marginLeft = "auto";
    }

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
                    ls.savePokemon(currentName);
                    displayResults(x, img, inf);
                }
            }
        } else if (input.value) {
            getData(nextUrl).then(function(newData) {
                for (let counter = 0; counter < newData.results.length; counter++) {
                    if (input.value.toLowerCase() === newData.results[counter].name) {
                        let x = newData.results[counter].url;
                        ls.savePokemon(input.value);
                        displayResults(x, img, inf);
                    } else {

                        let img = document.querySelector('.img');
                        img.innerHTML = `<img id="images" src="images/questionMark.png"style="width:140px; margin-left: 1.2em;margin-top: 4.3em"></img>`;
                        msg.textContent = "Sorry we couldn't find that Pokemon";
                        msg.style.marginTop = "3em";
                    }
                }
            })
        }
    })

}

//This function will give the urls values to buildImage and
// buildInfo for them to complete their task
function displayResults(url, img, inf) {
    getData(url).then(function(newData) {
        buildImage(newData, img);
        buildInfo(newData, inf);
    })
}

function buildImage(data, img) {
    img.innerHTML = `<img src="${data.sprites.other.home.front_default}"></img>`;

}

function buildInfo(data, inf) {
    let pokeName = data.name.toUpperCase();
    if (data.types.length > 1) {
        inf.innerHTML =
            `
        <h2 class="name"> ${pokeName}</h2>
        <div class="main-inf">
        <div class="text"><p>${data.types[0].type.name} / ${data.types[1].type.name}</p><span>Type</span></div>
        <div class="text"><p> ${data.weight.toFixed(1)}</p><span>Weight</span> </div>
        <div class="text"><p>${data.height.toFixed(1)}</p><span>Height</span></div>
        </div>
        <button id="show-more"><span>Show more</span><svg width="21" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg></button>
        <div id="more-inf"></div>
    `;
    } else {
        inf.innerHTML =
            `
        <h2 class="name"> ${pokeName}</h2>
        <div class="main-inf">
        <div class="text"><p>${data.types[0].type.name}</p><span>Type</span></div>
        <div class="text"><p> ${data.weight.toFixed(1)}</p><span>Weight</span></div>
        <div class="text"><p>${data.height.toFixed(1)}</p><span>Height</span></div>
        </div>
        <button id="show-more"><span>Show more</span><svg width="21" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg></button>
        <div id="more-inf"></div>
        `;
    }
    const showmore = document.getElementById("show-more");
    showmore.addEventListener("click", (e) => {
        toggleShow(data);
    })

}

function toggleHistory() {
    const history = document.getElementById("history");
    history.classList.toggle("present");

}

function toggleShow(data) {
    const more_inf = document.getElementById("more-inf");
    const showmore = document.getElementById("show-more");
    const mainContent = document.querySelector(".main-content");
    more_inf.classList.toggle("present");
    showmore.classList.toggle("present");
    moreContentInfo(data);

    if (more_inf.className == "present") {
        mainContent.style.height = "860px";
    } else {
        mainContent.style.height = "662px";
    }

}
// This function will load and create all the pokemon 
//in localStorage

function loadHistory() {
    const ul = document.querySelector(".list-container");
    const previousPokemon = ls.loadPokemon();
    previousPokemon.forEach((pokemon) => {
        let li = document.createElement("li");
        li.textContent = `${pokemon}`
        ul.appendChild(li);
    })
}
//This function will filter the text provided of the specific pokemon
//just showing the english ones, the function will show ramdomly all the 
//notes availables.

function moreContentInfo(data) {
    let url = data.species.url;
    getData(url).then(function(data) {
        // 
        let x = data.flavor_text_entries
        let en_text = []
        for (let i = 0; i < x.length; i++) {
            if (x[i].language.name == "en") {
                en_text.push(x[i])
            }
        }
        let random = Math.floor(Math.random() * en_text.length);
        let text_chain = en_text[random].flavor_text;


        const more_inf_div = document.querySelector("#more-inf");
        let about = document.createElement("h2");
        let p = document.createElement("p");
        about.textContent = `About ${data.name}`;
        p.textContent = text_chain;
        if (more_inf_div.childNodes.length == 0) {
            more_inf_div.appendChild(about);
            more_inf_div.appendChild(p);
        }
    })
}

// function cleanHistory() {
//     localStorage.clear()
// }
showList()