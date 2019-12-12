import React from "react";
import { footerSearchTags } from "../../Constants";
import "./styles.css"
const Footer = ({handleHeaderSearchTagClick}) => {
    // console.log("from footer", footerSearchTags);

    return (<div className="footer">
        <div className="footer-logo">Search <span className="header-logo-span">it</span></div>
        {footerSearchTags ? <div className="footerSearchTagContainer">
            <div className="footer-popular-searches">Popular Searches</div>
            <div className="footerPopularSearchTagContainer">
              {footerSearchTags.map((tag, index) => <div 
                className="footerSearchTag" 
                key={index}
                onClick={ () => {handleHeaderSearchTagClick(tag)}}
                >{tag}</div>)}
            </div>
        </div> : null}
    </div>
    )
}

export default Footer;