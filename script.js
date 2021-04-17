const API = {
    baseURL: 'https://swapi.dev/api/'
}

let starships = [];

const setStarships = (starships) => starships;

const validateDistance = (distance) => {
    return distance;
}

const calculateStops = () => {
    const distance = validateDistance(document.getElementById('distance').value);
    console.log('Future validated distance', distance);
    if (distance) {
        findStarhips();
    }
}

const findStarhips = () => {
    if (!starships.length) {
        // Get first ten starships
        fetch(API.baseURL + 'starships')
            .then(response => response.json())
            .then(data => {
                if (data.results) {
                    starships = data.results;
                }
            });
    }

    return starships;
}

const btnCalculate = document.getElementById('calculate');
btnCalculate.addEventListener('click', calculateStops);