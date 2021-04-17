
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
    // fetch();
}

const btnCalculate = document.getElementById('calculate');
btnCalculate.addEventListener('click', calculateStops);