import React, { useState, useEeffect } from "react";
import SearchBox from '../InputField';
import ButtonSearch from '../ButtonSearch';

const Header = () => {
    return (
        <div className="header">
            <SearchBox></SearchBox>
            <ButtonSearch></ButtonSearch>
        </div>
    )
}

export default Header;