import React, { useState, useEeffect } from "react";
import Header from '../components/Header';
import SpaceshipList from "../components/SpaceshipList";

const spaceships = [
    {
        title: 'a',
        stop: 2
    },
    {
        title: 'b',
        stop: 5
    }
]

const Home = () => {
    return (
        <>
            <Header></Header>
            <SpaceshipList list={spaceships}></SpaceshipList>
        </>
    )
}

export default Home;