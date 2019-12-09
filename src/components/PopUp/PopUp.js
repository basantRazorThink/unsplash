import React from 'react';
import './styles.css';

const PopUp  = (props) => {
    console.log("in the  popup the props is", props)
    const { data, text, closePopup } = props;
    return ( 
      <div className='popup'>
        <div className='popup\_inner'>
          <h1>{text}</h1>
          <button onClick={closePopup}>close me</button>
        </div>
        <div className="s"><img src={data} alt=""/></div>
      </div>
    );
  }


export default PopUp;