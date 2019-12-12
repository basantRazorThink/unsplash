import React, { useEffect, useState } from "react";
import "./styles.css"
const Background = ({ accessKey }) => {

    const [background, setBackground] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const jsonData = await fetch(`https://api.unsplash.com/photos/random?&w=1600&h=1000&client_id=${accessKey}`);
            const data = await jsonData.json();
            // console.log("from background dta is ==========>>>", data);

            setBackground(data)
        }

        fetchData()

    }, [])

    return (
        <>{background ?
            <div className="background" style={{
                backgroundImage: `url(${background.urls.custom})`
            }}></div>
            : null}
        </>
    );

}

export default Background;

