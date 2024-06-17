import './card.css';

// eslint-disable-next-line react/prop-types
const Card = ({ startDate = '0000', endDate = '0000', title = 'Demo Position', company = 'Demo Company' }) => {
  return (
    <div className="experience-container" style={{margin:'2%',marginTop:'0%',marginLeft:'3%'}}>
      <div className="experience-grid">
        <div className="experience-item">
          <div className="title">{startDate} {endDate!=''?'-':''} {endDate}</div>
          <div className="pose">{title}</div>
          <li className="company">{company}</li>
        </div>
      </div>
    </div>
  );
}

export default Card;
