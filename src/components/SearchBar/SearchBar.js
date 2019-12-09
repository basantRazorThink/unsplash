import React, { useState, useEffect } from "react";

const SearchBar = ({ onChange, handleEnterKey, searchPlaceHolder }) => {

    return (
        <div className="searchInputContainer">
            <input
                onChange={onChange}
                onKeyDown={handleEnterKey}
                value={searchPlaceHolder}
            />
        </div>
    )

}

export default SearchBar;