import './container.css';
import './contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

const Contact = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  async function data() {
    try {
      const response = await fetch('https://contactmeapi.netlify.app/.netlify/functions/express/contact', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${fname} ${lname}`,
          email: email,
          phone: phone,
          service: service,
          message: message
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="container contact-container">
      <div className="contact contact-box1">
        <div className="C-title">Contact me</div>
        <div className="C-desc">Contact me for work collaboration or hire me</div>
        <div className="C-form">
          <input type="text" name="firstname" value={fname} onChange={(e) => { setFname(e.target.value) }} placeholder='First name' autoComplete='hidden' />
          <input type="text" name="lastname" value={lname} onChange={(e) => { setLname(e.target.value) }} placeholder='Last name' autoComplete='hidden' />
          <input type="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email address' autoComplete="off" />
          <input type="number" name="phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder='Phone number' autoComplete='hidden' />
          <input type="text" name="service" value={service} onChange={(e) => { setService(e.target.value) }} placeholder='Service' id='service' autoComplete='hidden' />
          <textarea name="message" id="msg" value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder='Type your message here' autoComplete='hidden' ></textarea>
          <div className="C-btn">
            <button className='C-button' onClick={data} >Send message</button>
          </div>
          {/* <div className="C-note">form is currently disabled</div> */}
        </div>
      </div>
      <div className="contact box2">
        <Info icon={<FontAwesomeIcon icon={faPhone} style={{ color: "#00fe99", backgroundColor: '#302f35' }} />} title='Phone' value='+91 6394582014' />
        <Info icon={<FontAwesomeIcon icon={faEnvelope} style={{ color: "#00fe99", backgroundColor: '#302f35' }} />} title='Email' value='shashikantsln1793@gmail.com' />
        <Info icon={<FontAwesomeIcon icon={faLocationDot} style={{ color: "#00fe99", backgroundColor: '#302f35' }} />} title='Address' value='Kanpur, Uttar Pradesh' />
      </div>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const Info = ({ icon = '', title = '', value = '' }) => {
  return (
    <div className='C-info'>
      <div className='C-info-icon'>{icon}</div>
      <div className='C-info-details'>
        <div className='C-info-title'>{title}</div>
        <div>{value}</div>
      </div>
    </div>
  )
}

export default Contact;
