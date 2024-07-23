import './resume.css';
import './container.css';
import { useState } from 'react';
import Card from './resume/Card';
import Icons from './resume/Icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHtml5, faCss3Alt, faJs, faReact, faBootstrap,faNodeJs, faLinux, faPython} from '@fortawesome/free-brands-svg-icons';
import { faC, faCode } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Resume = () => {
  const [title, setTitle] = useState('My Experience');
  const [page, setPage] = useState(<Experience />);

  return (
    <div className='resume'>
      <div className='R-box'>
        <div className="R-start">
          Why hire me?
        </div>
        <div className="desc">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet dolorum illo sequi ex veritatis enim consequuntur commodi magnam adipisci.
        </div>
        <div className="R-btns">
          <ul>
            <li onClick={() => { setPage(<Experience />); setTitle('My Experience'); }} className={title === 'My Experience' ? 'active' : ''}>Experience</li>
            <li onClick={() => { setPage(<Education />); setTitle('My Education'); }} className={title === 'My Education' ? 'active' : ''}>Education</li>
            <li onClick={() => { setPage(<Skills />); setTitle('My Skills'); }} className={title === 'My Skills' ? 'active' : ''}>Skills</li>
            <li onClick={() => { setPage(<About />); setTitle('About Me'); }} className={title === 'About Me' ? 'active' : ''}>About me</li>
          </ul>
        </div>
      </div>
      <div className="R-box R-box-2">
        <div className="R-start Start-2">
          {title}
        </div>
        <div className="R-pages">
          {page}
        </div>
      </div>
    </div>
  );
};

const Experience = () => (
  <>
    <Card startDate='May-2024' endDate='June-2024' title='Cyber Security Intern' company='CDAC Noida' />
  </>
);

const Education = () => (
  <>
    <Card />
    <Card />
    <Card />
    <Card />
  </>
);

const Skills = () => (
  <>
    <Icons prop={<FontAwesomeIcon icon={faHtml5} className='icon' />} />
    <Icons prop={<FontAwesomeIcon icon={faCss3Alt} className='icon' />} />
    <Icons prop={<FontAwesomeIcon icon={faJs} className='icon' />} />
    <Icons prop={<FontAwesomeIcon icon={faNodeJs} className='icon' />} />
    <Icons prop={<FontAwesomeIcon icon={faReact} className='icon' />} />
    <Icons prop={<FontAwesomeIcon icon={faBootstrap} className='icon' />} />
    <Icons prop={<FontAwesomeIcon icon={faC} className='icon' />} />
    <Icons prop={<FontAwesomeIcon icon={faCode} className='icon' />} />
    <Icons prop={<FontAwesomeIcon icon={faLinux} className='icon' />} />
    <Icons prop={<FontAwesomeIcon icon={faPython} className='icon' />} />
  </>
);
const details = [{'Name':'Shashi Kant'},{'phone':'+91 6394582014'},{'Experience':'less than 1 year'},{'Linkedin':<Link to='https://www.linkedin.com/in/shashi-kant-068587250/' target='_blank'>shashi-kant-068587250</Link>},{'Nationality':'Indian'},{'Email':'shashikantsln1793@gmail.com'},{'Languages':'English, Hindi'},{'Github':<Link to='https://github.com/ShashiKant17092003' target='_blank'>ShashiKant17092003</Link>}]

const About = () => (
  <>
      <div className='aboutOD'>
        {details.map((detail, index) => (
          <p key={index}>
            {Object.entries(detail).map(([key, value]) => (
              <div key={key} className="aboutID"><span className='key'>{key}</span>: <span className='value'>{value}</span></div>
            ))}
          </p>
        ))}
      </div> 
  </>
);

export default Resume;
