import React from "react";

const HeaderSearchTag = ({tag, index, handleHeaderSearchTagClick}) => {

    return <div className="searchTagKey"
        onClick={() => {
            //make this map function a component
            handleHeaderSearchTagClick(tag);
        }} key={index}>{tag}</div>
}

export default HeaderSearchTag;

{/* <HeaderSearchtag
              tag={tag}
              index={index}
              handleHeaderSearchTagClick={handleHeaderSearchTagClick} */}