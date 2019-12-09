import React, { useEffect, useState} from "react";
import "./styles.css"
const Background = ( { accessKey } ) =>{

    const [ background, setBackground ] = useState(null); 
 
    useEffect( () => {
        const fetchData = async () => {
            const jsonData = await fetch(`https://api.unsplash.com/photos/random?&w=1600&h=800&client_id=${accessKey}`);
            const data = await jsonData.json();
            // console.log("from background dta is ==========>>>", data);

            setBackground(data)
        }

        fetchData()
        
    }, [])

    return (
        <div className="background">
           
           { background  ?
               <img className= "backgroundPic" src= {background.urls.custom} alt ={ background.alt_description}/>
           : null}
        </div>
    )

}

export default Background;