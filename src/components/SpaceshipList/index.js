import React, { useState, useEeffect } from "react";
import Spaceship from "../Spaceship";

const SpaceshipList = (a) => {
    return (
        <div>
            {
                a.list.map((spaceship, i) => {
                    return (<Spaceship key={i} title={spaceship.title} stop={spaceship.stop}></Spaceship>)
                })
            }
        </div>
    )
}

export default SpaceshipList;