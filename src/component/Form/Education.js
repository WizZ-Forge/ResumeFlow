import { Component } from 'react';
import Modal from 'react-modal';
import './Form.css';
import { uid } from 'uid';

class Education extends Component {
  state = {
    education: {
      id: '',
      instituteName: 'Uka Tarsadia University',
      degree: 'Bachelor of Technology',
      startDate: '2020-08-01',
      endDate: '2024-05-31',
      score: '8.5',
      description:
        'Pursued a degree in Computer Science and Engineering with a focus on software development and data structures.',
      editModal: false,
      filteredEducation: '',
      allEducation: [], // Assuming this is an array to hold multiple education entries
    },
    showEducationModal: false,
  };
  handleOnchange = (event) => {
    const { name, value } = event.target;
    const SelectedObj = event.target.dataset.id;
    if (SelectedObj) {
      console.log(name, value);
      this.setState((prevState) => ({
        [SelectedObj]: {
          ...prevState[SelectedObj],
          [name]: value,
        },
      }));
    } else {
      this.setState({
        [name]: [value],
      });
    }
  };

  EditEducationModalComponent = () => {
    const { education } = this.state;
    const filteredEducation = [education];
    return (
      <Modal isOpen={this.state.education.editModal}>
        <div>
          <form>
            <label htmlfor='instituteName'>Institute Name:</label>
            <input
              type='text'
              id='instituteName'
              name='instituteName'
              value={filteredEducation[0].instituteName}
              onChange={this.handleOnchange}
              data-id='education'
            />
            <label htmlfor='degree'>Degree:</label>
            <input
              type='text'
              id='degree'
              name='degree'
              onChange={this.handleOnchange}
              data-id='education'
              value={filteredEducation[0].degree}
            />
            <label htmlfor='startDate'>Start Date:</label>
            <input
              type='date'
              id='startDate'
              name='startDate'
              onChange={this.handleOnchange}
              data-id='education'
              value={filteredEducation[0].startDate}
            />
            <label htmlfor='endDate'>End Date:</label>
            <input
              type='date'
              id='endDate'
              name='endDate'
              onChange={this.handleOnchange}
              data-id='education'
              value={filteredEducation[0].endDate}
            />
            <label htmlFor='score'>Score</label>
            <input
              type='text'
              id='score'
              name='score'
              onChange={this.handleOnchange}
              data-id='education'
              value={filteredEducation[0].score}
            />
            <label htmlfor='description'>Description:</label>
            <textarea
              id='description'
              cols='30'
              name='description'
              rows='10'
              onChange={this.handleOnchange}
              data-id='education'
              value={filteredEducation[0].description}
            ></textarea>
          </form>
          <button onClick={this.hideEducationEditModal}>
            Update the Education
          </button>
        </div>
      </Modal>
    );
  };
  hideEducationEditModal = () => {
    console.log(this.state.education);
    const { education } = this.state;

    const newObj = {
      id: education.id,
      instituteName: education.instituteName,

      degree: education.degree,
      startDate: education.startDate,
      endDate: education.endDate,
      score: education.score,
      description: education.description,
    };
    console.log('Edit karne kai badd ye obj aya hai ', newObj);
    const updatedEducationList = education.allEducation.map((indi) => {
      if (education.id == indi.id) {
        return newObj;
      } else {
        return indi;
      }
    });
    console.log('upadted educationLIst  : ', updatedEducationList);

    this.setState(
      (prevState) => ({
        education: {
          id: '',
          instituteName: '',
          degree: '',
          startDate: '',
          endDate: '',
          score: '',
          description: '',
          allEducation: updatedEducationList,

          editModal: false,
        },
      }),
      this.passData
    );
  };

  EditEducation = (e) => {
    const { allEducation } = this.state.education;
    const filteredEducation = allEducation.filter(
      (indi) => indi.id == e.currentTarget.dataset.id
    );
    console.log('FILTERED eDUCATION : ', filteredEducation[0].instituteName);

    const newObj = {
      id: e.currentTarget.dataset.id,

      instituteName: 'Amtics',

      degree: 'Bachelor of Technology',
      startDate: '2020-08-01',
      endDate: '2024-05-31',
      score: '8.5',
    };
    const newList = allEducation.map((indi) => {
      if (indi.id == e.currentTarget.dataset.id) {
        return newObj;
      }
      return indi;
    });
    console.log(newList);
    this.setState((prevState) => ({
      education: {
        ...prevState.education,
        id: filteredEducation[0].id,
        instituteName: filteredEducation[0].instituteName,
        degree: filteredEducation[0].degree,
        startDate: filteredEducation[0].startDate,
        endDate: filteredEducation[0].endDate,
        score: filteredEducation[0].score,
        description: filteredEducation[0].description,

        editModal: true,
        allEducation: newList,
      },
    }));
    this.passData();
  };

  DeleteEducation = (e) => {
    const { allEducation } = this.state.education;
    console.log(e.currentTarget.dataset.id);
    const filteredEducation = allEducation.filter(
      (indi) => indi.id !== e.currentTarget.dataset.id
    );
    console.log('FILTER EDUCATION : ', filteredEducation);
    this.setState(
      (prevState) => ({
        education: {
          ...prevState.education,
          allEducation: filteredEducation,
        },
      }),

      this.passData
    );
  };

  EducationModalComponent = () => {
    console.log(this.state.education);
    return (
      <Modal
        isOpen={this.state.showEducationModal}
        contentLabel='Education Modal'
      >
        <form>
          <label htmlfor='instituteName'>Institute Name:</label>
          <input
            type='text'
            id='instituteName'
            name='instituteName'
            value={this.state.education.instituteName}
            onChange={this.handleOnchange}
            data-id='education'
          />
          <label htmlfor='degree'>Degree:</label>
          <input
            type='text'
            id='degree'
            name='degree'
            onChange={this.handleOnchange}
            data-id='education'
            value={this.state.education.degree}
          />
          <label htmlfor='startDate'>Start Date:</label>
          <input
            type='date'
            id='startDate'
            name='startDate'
            onChange={this.handleOnchange}
            data-id='education'
            value={this.state.education.startDate}
          />
          <label htmlfor='endDate'>End Date:</label>
          <input
            type='date'
            id='endDate'
            name='endDate'
            onChange={this.handleOnchange}
            data-id='education'
            value={this.state.education.endDate}
          />
          <label htmlFor='score'>Score</label>
          <input
            type='text'
            id='score'
            name='score'
            onChange={this.handleOnchange}
            data-id='education'
            value={this.state.education.score}
          />
          <label htmlfor='description'>Description:</label>
          <textarea
            id='description'
            cols='30'
            name='description'
            rows='10'
            onChange={this.handleOnchange}
            data-id='education'
            value={this.state.education.description}
          ></textarea>
          <button
            onClick={this.hideEducationModal}
            className='modal-btn'
            type='button'
          >
            Add Education
          </button>
        </form>
      </Modal>
    );
  };
  showEducationModal = (e) => {
    e.preventDefault();
    this.setState({ showEducationModal: true });
  };

  hideEducationModal = () => {
    const { instituteName, degree, startDate, endDate, score, description } =
      this.state.education;
    const id = uid();
    const newProfile = {
      id: id,
      instituteName: instituteName,
      degree: degree,
      startDate: startDate,
      endDate: endDate,
      score: score,
      description: description,
    };

    this.setState(
      (prevState) => ({
        education: {
          instituteName: '',
          degree: '',
          startDate: '',
          endDate: '',
          score: '',
          description: '',
          allEducation: [...prevState.education.allEducation, newProfile],
        },
        showEducationModal: false,
      }),
      this.passData
    );
  };
  passData = () => {
    const getEducationState = this.props.fun;
    getEducationState(this.state.education.allEducation);
  };
  render() {
    const allEducation = this.state.education?.allEducation || [];

    return (
      <div>
        <hr />
        <h1>Educations</h1>
        <div>
          {allEducation.length > 0 ? (
            <div>
              <ul className='list'>
                {allEducation.map((indi) => (
                  <li className='child'>
                    <div className='profile-item'>{indi.instituteName}</div>
                    <div>
                      <i
                        className='fa-solid fa-trash'
                        onClick={this.DeleteEducation}
                        data-id={indi.id}
                      ></i>
                      <i
                        className='fa-solid fa-pen'
                        onClick={this.EditEducation}
                        data-id={indi.id}
                      ></i>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <button onClick={this.showEducationModal}>+ Add a new Item</button>
        <div>
          {this.state.showEducationModal && this.EducationModalComponent()}
        </div>
        <div>
          {this.state.education.editModal && this.EditEducationModalComponent()}
        </div>
        <hr />
      </div>
    );
  }
}
export default Education;
