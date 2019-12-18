import React from 'react';
import './styles.css';
import cancelIcon from "./cancelIcon.png"

const PopUp = (props) => {
  const { data, text, closePopup, accessKey } = props;
  console.log("PopUp rendered");
  return (
    <div className='popup'>

      <div className="pop-up-container">
        <div className="cancelButton" style={{ backgroundImage: `url(${cancelIcon})` }} onClick={closePopup} ></div>
        <div className="profile-info-ctn">
          <div className="pop-up-profile-pic" style={{ backgroundImage: `url(${data.user.profile_image.small})` }}></div>
          <div className="profile-name">{data.user.username}</div>
        </div>
        <div className="pop-up-pic" style={{ backgroundImage: `url(${data.urls.small})` }} ></div>
        <div className="dwnld-btn-container">
          <a className="dwnld"
            href={`${data.links.download_location}?client_id=${accessKey}`}
            target="_blank"
            download
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}


export default PopUp;