import './Basic.css';
import Skills from './Skills/Skills';
const Basic = (props) => {
  const { obj } = props;

  const { education } = obj;
  const allEducation = education;
  const { skills } = obj;

  // Assuming obj contains the resume data
  // You can use obj to populate the fields dynamically if needed
  if (!obj) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='basic-template'>
        <div className='basic-details'>
          <div className='basic-info'>
            <img />

            <h1>{obj.name}</h1>
            <p> </p>
          </div>
          <div className='contact-info'>
            <p>Email: {obj.email} </p>
            <p>|</p>
            <p>Phone no:{obj.number}</p>
            <p>|</p>
            <p>Address:{obj.address}</p>
          </div>
        </div>

        <div className='profiles-container'>
          <h2>Profiles</h2>

          <ul>
            <ul>
              {obj.profileObj.profile.map((item, index) => (
                // Assuming item.logo is an SVG path or component
                <li className='indi-profiles' key={index}>
                  <svg viewBox='0 0 24 24' width='24' height='24'>
                    <path d={item.logo} />
                  </svg>

                  <a href={item.link} target='_blank'>
                    {item.username}
                  </a>
                </li>
              ))}
            </ul>
          </ul>
        </div>

        <div className='summary'>
          <h2>Summary</h2>

          <p> {obj.summary} </p>
        </div>
        <div className='education'>
          <h2>Education</h2>

          <ul className='education'>
            {allEducation.map((indi) => (
              <li className='indi-education'>
                <div className='education-upper'>
                  <strong>{indi.instituteName}</strong>
                  <strong>{`${indi.startDate.split('-')[0]}-${
                    indi.endDate.split('-')[0]
                  }`}</strong>
                </div>
                <div className='education-upper'>
                  <p>{indi.score}</p>
                  <p>{indi.degree}</p>
                </div>
                {indi.description !== '' ? (
                  <div>
                    <p>{indi.description}</p>
                  </div>
                ) : (
                  <div></div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className='experience'>
          <h2>Experience</h2>

          <ul>
            <li>
              <h3>Job Title</h3>
              <p>Company Name</p>
              <p>Duration</p>
              <p>Responsibilities</p>
            </li>
          </ul>
        </div>
        <div className='skills'>
          <h2>Skills</h2>

          <Skills skills={skills} />
        </div>
        <div className='projects'>
          <h2>Projects</h2>
          <ul>
            <li>
              <h3>Project Title</h3>
              <p>Description</p>
              <p>Technologies Used</p>
            </li>
          </ul>
        </div>
        <div className='certifications'>
          <h2>Certifications</h2>

          <ul>
            <li>
              <h3>Certification Title</h3>
              <p>Issuing Organization</p>
              <p>Date of Issue</p>
            </li>
          </ul>
        </div>
        <div className='languages'>
          <h2>Languages</h2>
          <ul>
            <li>Language 1</li>
          </ul>
        </div>
        <div className='hobbies'>
          <h2>Hobbies</h2>
          <ul>
            <li>Hobby 1</li>
          </ul>
        </div>
      </div>
    );
  }
};
export default Basic;
