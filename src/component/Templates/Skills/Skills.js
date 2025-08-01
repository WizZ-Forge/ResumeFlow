import './Skills.css';
const Skills = (props) => {
  const { skills } = props;
  const { level } = props;
  const rate = (level) => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      if (i < level) {
        arr.push(<i class='fa-solid fa-circle'></i>);
      } else {
        arr.push(<i class='fa-regular fa-circle'></i>);
      }
    }
    return <span className='rate'>{arr}</span>;
  };

  return (
    <ul>
      {skills.map((indi) => (
        <div className='skill' key={indi.id}>
          <li>{indi.name}</li>
          {rate(indi.level)}
        </div>
      ))}
    </ul>
  );
};
export default Skills;
