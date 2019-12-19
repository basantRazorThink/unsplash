import React from "react";
import "./styles.css";
import { headerSearchTags } from "../../Constants"
import HeaderSearchtag from "./HeaderSearchTags"

const Header = ({ handleHeaderSearchTagClick }) => {
  // console.log("header rendered");
  return (
    <div className="header">
      <span className="header-logo-left-span">Search</span><span className="header-logo-right-span">it</span>
      <div className="header-top-slogan">Free stock photos for everything</div>
      <div className="header-bottom-slogan">We offer the best free photo's all in one place</div>
      {
        headerSearchTags ? <div className="header-search-tags">
          <div className="headerSearchTag">Search by tags:</div>
          {headerSearchTags.map((tag, index) => <HeaderSearchtag
            tag={tag}
            index={index}
            handleHeaderSearchTagClick={handleHeaderSearchTagClick} 
            key={index}/>)}
        </div> : null
      }
    </div>
  )
}

export default Header;