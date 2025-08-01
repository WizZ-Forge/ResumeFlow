import axios from 'axios';
import { Component } from 'react';

class ResumeList extends Component {
  state = {
    resumes: [],
  };

  componentDidMount() {
    axios
      .get('http://localhost:3000/resumes')
      .then((response) => {
        console.log(response.data);
        this.setState({ resumes: response.data });
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching resumes:', error);
        return [];
      });
  }

  render() {
    console.log(this.state.resumes);

    return (
      <div>
        <div>
          <ul>
            {this.state.resumes.map((resume) => {
              return (
                <li key={resume.id}>
                  <h2>Resume ID: {resume.id}</h2>
                  <p>Data: {resume.Data}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
export default ResumeList;
