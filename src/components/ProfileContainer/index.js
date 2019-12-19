import React from "react";

const ProfileContainer = ({picUserName}) => {

    return <div className="profile-name-ctn">
        <span className="profile-name-by">Image by</span>
        <span className="profile-name">{picUserName}</span>
    </div>
}

export default ProfileContainer;