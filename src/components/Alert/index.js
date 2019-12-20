import React from "react";

const Alert = ({ gridContents, isLoading, alertNoMorePics }) => {
    // console.log("alert se bol raha hu", gridContents, isLoading, alertNoMorePics)

    return (!gridContents && !isLoading) ?
        <div className="no-search">no search found</div>
        :
        alertNoMorePics ? <div className="no-search">no more pics to show</div>
            : null

}

export default Alert;