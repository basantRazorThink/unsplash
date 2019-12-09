import React, { useState, useEffect } from "react";

const Grid = ({ accessKey , handlePopUp, searchValue}) => {
    const [gridContents, setGridContents] = useState(null)

    useEffect(() => {
        const fetchData = async () => {

            // if(!searchValue){
            //     searchValue = "random"
            // }
            searchValue = searchValue ? searchValue : "random"
            const limitPerPage = `9-per-page`;
            const jsonData = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`)
            const data = await jsonData.json();

            // if (data) {
                setGridContents(data)
            // }
        }
        fetchData();
        // console.log("frm cmpodidmnt", data)


    }, [searchValue]);


    return (
        <div className="gridContainer" >
            {/* {gridContents} */}
            {/* {console.log("from grid the  gridContents are", gridContents)} */}
            {gridContents ? gridContents.results.map((pic, index) => {
                return (
                    <div
                        key={index}
                        className="gridItem"
                        id={pic.id}
                    >
                        <img className="img" src={pic.urls.small} alt={pic.alt_description}
                            onClick={() => {
                                handlePopUp(pic.id)
                            }}
                        />
                    </div>
                )
            }) : null
            }
        </div>
    )

}

export default Grid;