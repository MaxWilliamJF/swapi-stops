const API = {
    baseURL: 'https://swapi.dev/api/'
}

let starships = [];

const start = async () => {
    const distance = validateDistance(document.getElementById('distance').value);
    console.log('Future validated distance', distance);

    if (distance) {
        await findStarhips();
        calculateStops(starships, distance);
    }
}

const calculateStops = (starships, distance) => {
    const qtdStarships = starships.length;

    for (let i = 0; i < qtdStarships; i++) {
        const starship = starships[i];
        const stops = Math.ceil(distance / Number(starship.MGLT));

        addStopsToList(stops, starship.name);
    }
}

const findStarhips = async () => {
    if (!starships.length) {
        // Get first ten starships
        await fetch(API.baseURL + 'starships')
            .then(response => response.json())
            .then(data => {
                if (data.results) {
                    // Create setter?
                    starships = data.results;
                }
            });
    }
}

const addStopsToList = (stopsNumber, spaceship) => {
    const list = document.getElementById('timeList');
    const listItem = document.createElement('li');
    listItem.innerText = spaceship + ' - ' + stopsNumber;

    list.appendChild(listItem);
}

const btnCalculate = document.getElementById('calculate');
btnCalculate.addEventListener('click', start);