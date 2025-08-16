import '../Basic.css';
const Experience = (props) => {
  const { Experience } = props;
  return (
    <div className='experience'>
      <h2>Experience</h2>
      <ul>
        {Experience.map((exp) => (
          <li key={exp.id} className='item'>
            <div className='header'>
              <strong>{exp.companyName}</strong>
              <strong>{`${exp.startDate} - ${exp.endDate}`}</strong>
            </div>
            <h3>{exp.position}</h3>

            <p className='desc'>{exp.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Experience;
