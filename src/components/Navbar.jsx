import { useState } from 'react';
import {Link,NavLink} from 'react-router-dom';
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
    const [menuOpen,setmenuOpen] = useState(false);
    const change = () => {
      menuOpen ? setmenuOpen(false) : "";
    }
  return (
    <nav>
      <Link to="/" className="title"><span className='first'>S</span><span className='last'>Kant</span></Link>
      <div className="menu" onClick={()=>{setmenuOpen(!menuOpen)}}>
        <FontAwesomeIcon icon={!menuOpen ? faBars : faXmark} />
      </div>
      <ul className={menuOpen ? "open" : "close"}>
        <li><NavLink to="/" onClick={()=>change()}>Home</NavLink></li>
        <li><NavLink to="/resume" onClick={()=>change()}>Resume</NavLink></li>
        <li><NavLink to="/work" onClick={()=>change()}>Work</NavLink></li>
        <li><NavLink to="/contact" onClick={()=>change()}>Contact</NavLink></li>
        <li><NavLink to="/contact" className="hireme" onClick={()=>change()}>Hire me</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar
