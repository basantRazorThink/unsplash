import React from "react";
import { footerSearchTags } from "../../Constants";
import "./styles.css"
const Footer = ({ handleHeaderSearchTagClick }) => {
    // console.log("from footer", footerSearchTags);

    return (<div className="footer">
        <div className="footer-content">
            <div className="footer-logo-container"><span>Search</span><span className="footer-logo-span">it</span></div>
            {footerSearchTags ? <div className="footerSearchTagContainer">
                <div className="footer-popular-searches">Popular Searches</div>
                <div className="footerPopularSearchTagContainer">
                    {footerSearchTags.map((tag, index) => <div
                        className="footerSearchTag"
                        key={index}
                        onClick={() => { handleHeaderSearchTagClick(tag) }}
                    >{tag}</div>)}
                </div>
            </div> : null}
        </div>
    </div>
    )
}

export default Footer;