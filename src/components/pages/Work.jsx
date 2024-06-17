// import React from 'react'
import './work.css';
import './container.css';

import './container.css';
import { useState } from 'react';
import Password from './works/Password';
import UrlShortner from './works/UrlShortner';
import Weather from './works/Weather';

const Work = () => {
  const [listM1,setlistM1] = useState(false);
  const [listM2,setlistM2] = useState(false);
  const [wpage,setWpage] = useState(<Password />);
  return (
    <div className="W-container container">
      <div className="W-box-3">This page is visible only on PC</div>
      <div className="W-box W-box-1">
        <div className="project-type">
          <span className='W-P-Type' onClick={()=>{setlistM1(!listM1)}}>
            Major Projects
          </span>
          <ul className={listM1?'unhide':''}>
            <li onClick={()=>setlistM1(false)}>project-1</li>
            <li onClick={()=>setlistM1(false)}>project-2</li>
            <li onClick={()=>setlistM1(false)}>project-3</li>
          </ul>
        </div>
        <div className="project-type">
          <span className='W-P-Type' onClick={()=>{setlistM2(!listM2)}}>
            Minor Projects
          </span>
          <ul className={listM2?'unhide':''}>
            <li onClick={()=>{setWpage(<Password />);setlistM2(false)}}>Password Genrator</li>
            <li onClick={()=>{setWpage(<UrlShortner />);setlistM2(false)}}>URL Shortner</li>
            <li onClick={()=>{setWpage(< Weather/>);setlistM2(false)}}>Weather App</li>
          </ul>
        </div>
      </div>
      <div className="W-box W-box-2">{wpage}</div>
    </div>
  )
}


export default Work
