import './container.css';
import './contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const Contact = () => {
  return (
    <div className="container contact-container">
      <div className="contact contact-box1">
        <div className="C-title">Contact me</div>
        <div className="C-desc">Contact me for work collaboration or hire me </div>
        <div className="C-form">
          <input type="text" name="firstname" placeholder='first name' autoComplete='hidden' disabled/>
          <input type="text" name="lastname" placeholder='second name' autoComplete='hidden' disabled/>
          <input type="email" name="email" placeholder='Email address' autoComplete="off" disabled/>
          <input type="number" name="phone" placeholder='Phone number' autoComplete='hidden'disabled/>
          <input type="text" name="service" placeholder='Service' id='service' autoComplete='hidden' disabled/>
          <textarea name="message" id="msg" placeholder='Type your message here' autoComplete='hidden' disabled></textarea>
          <div className="C-btn">
            <button className='C-button' disabled>Send message</button>
          </div>
            <div className="C-note">form is currently disabled</div>
        </div>
      </div>
      <div className="contact box2">
          <Info icon={<FontAwesomeIcon icon={faPhone} style={{color: "#00fe99",backgroundColor:'#302f35'}} />} title='Phone' value='+91 639458xxxx' />
          <Info icon={<FontAwesomeIcon icon={faEnvelope} style={{color: "#00fe99",backgroundColor:'#302f35'}} />} title='Email' value='shashikantsln1793@gmail.com' />
          <Info icon={<FontAwesomeIcon icon={faLocationDot} style={{color: "#00fe99",backgroundColor:'#302f35'}} />} title='Address' value='Kanpur, Uttar Pradesh' />
      </div>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const Info = ({icon = '', title = '' , value = '' }) => {
  return(
    <div className='C-info'>
      <div className='C-info-icon'>{icon}</div>
      <div className='C-info-details'>
        <div className='C-info-title'>{title}</div>
        <div>{value}</div>
      </div>
    </div>
  )
}


export default Contact
