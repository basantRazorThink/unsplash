import React from "react";
import ProfileContainer from "../ProfileContainer"

const Grid = ({ pic, index, handlePopUp }) => {
    // console.log("Grid rendered");
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
                <ProfileContainer 
                 picUserName={pic.user.name}
                />
            </div>
        </div>
    )
}

export default Grid;