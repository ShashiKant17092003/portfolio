import './Home.css';
import './container.css';
import Sk from '../img/SK1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Home = () => {
  return (
    <div className='container'>
     <div className="header">
        <div className="text-area">
          <div className="title">Software Developer</div>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <div className="name white">Hello I'm</div>
          <div className="name green">Shashi Kant</div>
          <div className="description">
            <span>
              I am a driven computer science student at UIET Kanpur, deeply passionate about mastering Data Structures and Algorithms (DSA) while nurturing a keen interest in web development. With a blend of curiosity, determination, and a strong work ethic, I continuously seek to expand my knowledge and skills. I am eager to apply for the web development internship role to further enhance my expertise and contribute effectively to your team.
            </span>
          </div>
          <div className="buttons">
            <div className="button btn">
              <a href="https://drive.google.com/file/d/14vuZSDviGcxV7B9nE2fYBpN2e8WkbE1n/view?usp=drive_link" target='_blank' rel="noopener noreferrer">
                DOWNLOAD CV <FontAwesomeIcon icon={faDownload} className='download'/>
              </a>
            </div>
            <div className="button social">
              <div className="socialIcons">
                <a href="https://github.com/ShashiKant17092003" target='_blank' rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub}  /></a>
              </div>
              <div className="socialIcons">
                <a href="https://www.linkedin.com/in/shashi-kant-068587250/" target='_blank' rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin}  /></a>
              </div>
              <div className="socialIcons">
                <a href="https://www.instagram.com/shashikant_1793_/?igsh=bmtoMGRmdzAxYzdo" target='_blank' rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram}  /></a>
              </div>
              <div className="socialIcons">
                <a href="#" target='_blank' rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter}  /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="img"><img src={Sk} alt="Profile" /></div>
     </div>
     <div className="footer">
        <div className="box">
          <div className="inbox box1">
            <div className="text-box num">00</div>
            <div className="text-box">
              <div className="text-desc">Years of</div>
              <div className="text-desc">Experience</div>
            </div>
          </div>
          <div className="inbox">
            <div className="text-box num">03</div>
            <div className="text-box">
              <div className="text-desc">Projects</div>
              <div className="text-desc">Completed</div>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="inbox">
            <div className="text-box num">05</div>
            <div className="text-box">
              <div className="text-desc">Technologies</div>
              <div className="text-desc">Mastered</div>
            </div>
          </div>
          <div className="inbox">
            <div className="text-box num">50</div>
            <div className="text-box">
              <div className="text-desc">Code</div>
              <div className="text-desc">Commits</div>
            </div>
          </div>
        </div>
     </div>
    </div>
  );
}

export default Home;
