import React, { useState, useEffect } from "react";
import "./styles.css";
import pic from "./icons8-search-50 (1).png";

const SearchBar = ({ onChange, handleEnterKey, value, handleClick, placeHolder,handleInputClick }) => {
    return (
       
        <div className="searchInputContainer">
            <input
                onChange={onChange}
                onKeyDown={handleEnterKey}
                value={value}
                className="input"
                placeholder= {placeHolder}
                onClick={handleInputClick}
            />
            <div 
               className="searchIcon" 
               style={{
                   backgroundImage: `url(${pic})`
                }} 
                onClick={handleClick}

               >
            </div> 
        </div>
    )

}

export default SearchBar;