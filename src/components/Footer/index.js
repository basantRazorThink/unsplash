import React from "react";
import { footerSearchTags } from "../../Constants";
import HeaderSearchtag from "../Header/HeaderSearchTags"
import "./styles.css"
const Footer = ({ handleHeaderSearchTagClick }) => {
    console.log("Footer rendered");
    return (<div className="footer">
        <div className="footer-content">
            <div className="footer-logo-container"><span>Search</span><span className="footer-logo-span">it</span></div>
            {footerSearchTags ? <div className="footerSearchTagContainer">
                <div className="footer-popular-searches">Popular Searches</div>
                <div className="footerPopularSearchTagContainer">
                    {footerSearchTags.map((tag, index) => <HeaderSearchtag
                        tag={tag}
                        index={index}
                        key={index}
                    handleHeaderSearchTagClick={handleHeaderSearchTagClick} />)}
                </div>
            </div> : null}
        </div>
    </div >
    )
}

export default Footer;