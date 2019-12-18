import React from "react";

const Grid = ({ pic, index, handlePopUp }) => {
    console.log("Grid rendered");
    return (
        <div
            key={index}
            className="gridItem"
            id={pic.id}
            style={{
                backgroundImage: `url("${pic.urls.small}")`,
            }}
            onClick={() => {
                handlePopUp(pic.id, pic.user);
            }}>
            <div className="profile-container">
                <div className="profile-pic" style={{ backgroundImage: `url(${pic.user.profile_image.small})` }}></div>
                <div className="profile-name-ctn">
                    <span className="profile-name-by">Image by</span>
                    <span className="profile-name">{pic.user.name}</span>
                </div>

            </div>
        </div>
    )
}

export default Grid;