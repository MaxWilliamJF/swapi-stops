import React, { useState, useEeffect } from "react";
import Header from '../components/Header';
import SpaceshipList from "../components/SpaceshipList";

const Home = () => {
    return (
        <>
            <Header></Header>
            <SpaceshipList></SpaceshipList>
        </>
    )
}

export default Home;