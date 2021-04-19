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
    resetList();
    const qtdStarships = starships.length;

    for (let i = 0; i < qtdStarships; i++) {
        const starship = starships[i];
        const timeSuply = timeSuplyInHours(starship['consumables']);
        const stops = Math.trunc(distance / parseInt(starship.MGLT) / timeSuply);

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

const timeSuplyInHours = (consumables) => {
    let timeInHours = null;
    const timeInHoursTable = {
        year: 8760,
        month: 730,
        week: 168,
        day: 24
    }
    
    const splited = consumables.split(' ');
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