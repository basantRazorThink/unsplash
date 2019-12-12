import React, { useState, useEffect } from "react";
import "./styles.css";
import pic from "./icons8-search-50 (1).png";

const SearchBar = ({ onChange, handleEnterKey, value, handleClick, placeHolder,handleInputClick }) => {
    //  console.log("from searchbar", value)
    return (
       
        <div className="searchInputContainer">
             {/* {console.log("from seacrchbar", `url(${pic})`)} */}
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
                //   style={{backgroundImage: `url("./searchIcon.png")`}} 

               >
            </div> 
            {/* <img className="searchIcon" src={pic} alt="searchIcon"/> */}
            {/* <div className="searchIcon"></div> */}
        </div>
    )

}

export default SearchBar;