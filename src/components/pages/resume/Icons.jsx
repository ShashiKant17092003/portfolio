import './card.css';
import './icon.css'

// eslint-disable-next-line react/prop-types
const Icons = ({prop}) => {
  return (
    <div className="I-box experience-container " >
    <div className="experience-grid" style={{height:'100%',width:'100%',padding:'0',margin:'0'}}>
        <div className="experience-item Icons" style={{height:'100%',width:'100%',padding:'0',margin:'0'}}>
          {prop}
        </div>
      </div>
    </div>
  )
}

export default Icons
