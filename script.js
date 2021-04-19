const API = {
    baseURL: 'https://swapi.dev/api/'
}

let starships = [];
let currentDistance = null;

const start = async () => {
    const distance = validateDistance(document.getElementById('distance').value);
    console.log('Future validated distance', distance);

    if (distance != currentDistance) {
        currentDistance = distance;
        await findStarhips();
        calculateStops(starships, currentDistance);
    }
}

const calculateStops = (starships, distance) => {
    resetList();
    const qtdStarships = starships.length;

    for (let i = 0; i < qtdStarships; i++) {
        const starship = starships[i];
        const timeSuply = timeSuplyInHours(starship['consumables']);
        const stops = (timeSuply && parseInt(starship.MGLT)) ? Math.trunc(distance / parseInt(starship.MGLT) / timeSuply) : 'Sem informações suficientes :(';

        addStopsToList(stops, starship.name);
    }
}

const getStarshipsOnAPI = async (url) => {
    if (url) {
        await fetch(url)
            .then(response => response.json())
            .then(async data => {
                if (data.results) {
                    starships = starships.concat(data.results);
                    if (data.next) {
                        await getStarshipsOnAPI(data.next);
                    }
                }
            });
    }
}

const findStarhips = async () => {
    if (!starships.length) {
        await getStarshipsOnAPI(API.baseURL + 'starships');
    }
}

const timeSuplyInHours = (consumables) => {
    let timeInHours = null;
    const timeInHoursTable = {
        year: 8760,
        month: 730,
        week: 168,
        day: 24
    }

    const splited = consumables.split(' ');

    if (splited.length === 2) {
        const amount = splited[0];
        const timeString = splited[1];

        Object.keys(timeInHoursTable).forEach(elm => {
            if (timeString.includes(elm)) {
                console.log('ELM', amount, elm, timeString, timeInHoursTable[elm]);
                timeInHours = timeInHoursTable[elm];
                return;
            }
        });

        return timeInHours * amount;
    }

    return false;
}

const resetList = () => {
    const list = document.getElementById('timeList');
    list.textContent = '';
}

const addStopsToList = (stopsNumber, spaceship) => {
    const list = document.getElementById('timeList');
    const listItem = document.createElement('li');
    listItem.innerText = spaceship + ' - ' + stopsNumber;

    list.appendChild(listItem);
}

const btnCalculate = document.getElementById('calculate');
btnCalculate.addEventListener('click', start);