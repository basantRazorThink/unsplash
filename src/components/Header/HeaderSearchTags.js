import React from "react";

const HeaderSearchTag = ({tag, index, handleHeaderSearchTagClick , styleName}) => {

    return <div className={`searchTagKey ${styleName}`}
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