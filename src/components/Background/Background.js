import React, { useEffect, useState } from "react";
import FetchUtility from "../../FetchUtility";
import "./styles.css";
const Background = ({ accessKey }) => {

    const [background, setBackground] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let url= `https://api.unsplash.com/photos/random?&w=1600&h=1000&client_id=${accessKey}`;
            let res = await FetchUtility(url);
            // console.log("from backgrnd the res is",res )
            setBackground(res)
        }

        fetchData()

    }, [])

    return (
        background ?
            <div className="background-container" >
                <div 
                className="background-image"
                style={{backgroundImage: `url(${background.urls.custom})`}}></div>
                <div className="triangle"></div>
            </div>
            : null

    );

}

export default Background;

