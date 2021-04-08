import React from 'react';

//use react-icone instead
const onlineIcon= 'https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png'
//const closeIcon ='../icons/closeIcon.png';
const closeIcon = 'https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/closeIcon.png'
import './info.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/join"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;