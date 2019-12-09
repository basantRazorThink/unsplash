import React, { useState, useEffect } from "react";
import "./styles.css";
import pic from "./searchIcon.png"

const SearchBar = ({ onChange, handleEnterKey, searchPlaceHolder }) => {

    return (
        <div className="searchInputContainer">
            <input
                onChange={onChange}
                onKeyDown={handleEnterKey}
                value={searchPlaceHolder}
                className="input"
            />
            <img className="searchIcon" src={pic} alt="alter" />
            {/* <div className="searchIcon"></div> */}
        </div>
    )

}

export default SearchBar;