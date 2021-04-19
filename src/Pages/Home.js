import React, { useState, useContext, useEffect } from "react";
import Context from "../Store";
import Header from '../components/Header';
import SpaceshipList from "../components/SpaceshipList";

const Home = () => {
    const [state, dispatch] = useContext(Context);

    const [inputValue, setInputValue] = useState();
    const [spaceships, setSpaceships] = useState([
        {
            title: 'Spaceship 1',
            stop: 2
        },
        {
            title: 'Spaceship 2',
            stop: 1
        }
    ]);

    // Call when click on searh or hit enter inside MGLT input button
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
                        // Do note update state like that
                        state.starships = state.starships.concat(data.results);
                        if (data.next) {
                            await getStarshipsOnAPI(data.next);
                        }
                    }
                });
        }
    }
    
    const findStarhips = async () => {
        if (!state.starships.length) {
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

    const addStopsToList = (stopsNumber, spaceship) => {
        state.starships.push = {
            stopsNumber,
            spaceship
        }
    }  
    
    const resetList = () => {
        state.starships = [];
    }

    return (
        <>
            <Header></Header>
            <SpaceshipList list={state.spaceships}></SpaceshipList>
        </>
    )
}

export default Home;