import React, { useEffect, useState} from "react";
const Background = ( { accessKey } ) =>{

    const [ background, setBackground ] = useState(null); 
 
    useEffect( () => {
        const fetchData = async () => {
            const jsonData = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`);
            const data = await jsonData.json();
            // console.log("from background dta is ==========>>>", data);

            setBackground(data)
        }

        fetchData()
        
    }, [])

    return (
        <div className="background">
           
           { background  ?<div> 
               <img src= {background.urls.small} alt ={ background.alt_description}/>
           </div>  : null}
        </div>
    )

}

export default Background;