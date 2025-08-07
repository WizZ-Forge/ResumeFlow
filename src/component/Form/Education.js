import { Component } from 'react';

import './Form.css';
import { uid } from 'uid';
import Modal from '../Modal/Modal';

class Education extends Component {
  state = {
    education: {
      id: '',
      instituteName: '',
      degree: '',
      startDate: '',
      endDate: '',
      score: '',
      description: '',
      editModal: false,
      filteredEducation: '',
      allEducation: [], // Assuming this is an array to hold multiple education entries
    },
    showModal: false,
    showEditModal: false,
    selected: [],
    fields: [
      { name: 'instituteName', label: 'Institute Name', type: 'text' },
      { name: 'degree', label: 'Degree', type: 'text' },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
      { name: 'score', label: 'Score', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
    selected: [],
  };

  handleOnchange = (e) => {
    const { id, value } = e.target;
    if (this.state.showEditModal) {
      const { selected } = this.state;

      const update = {
        ...selected[0],
        [id]: value,
      };
      console.log(update);
      this.setState({ selected: [update] });
    }

    this.setState((prevState) => ({
      education: {
        ...prevState.education,

        [id]: value,
      },
    }));
  };

  // EditEducationModalComponent = () => {
  //   const { education } = this.state;
  //   const filteredEducation = [education];
  //   return (
  //     <Modal isOpen={this.state.education.editModal}>
  //       <div>
  //         <form>
  //           <label htmlfor='instituteName'>Institute Name:</label>
  //           <input
  //             type='text'
  //             id='instituteName'
  //             name='instituteName'
  //             value={filteredEducation[0].instituteName}
  //             onChange={this.handleOnchange}
  //             data-id='education'
  //           />
  //           <label htmlfor='degree'>Degree:</label>
  //           <input
  //             type='text'
  //             id='degree'
  //             name='degree'
  //             onChange={this.handleOnchange}
  //             data-id='education'
  //             value={filteredEducation[0].degree}
  //           />
  //           <label htmlfor='startDate'>Start Date:</label>
  //           <input
  //             type='date'
  //             id='startDate'
  //             name='startDate'
  //             onChange={this.handleOnchange}
  //             data-id='education'
  //             value={filteredEducation[0].startDate}
  //           />
  //           <label htmlfor='endDate'>End Date:</label>
  //           <input
  //             type='date'
  //             id='endDate'
  //             name='endDate'
  //             onChange={this.handleOnchange}
  //             data-id='education'
  //             value={filteredEducation[0].endDate}
  //           />
  //           <label htmlFor='score'>Score</label>
  //           <input
  //             type='text'
  //             id='score'
  //             name='score'
  //             onChange={this.handleOnchange}
  //             data-id='education'
  //             value={filteredEducation[0].score}
  //           />
  //           <label htmlfor='description'>Description:</label>
  //           <textarea
  //             id='description'
  //             cols='30'
  //             name='description'
  //             rows='10'
  //             onChange={this.handleOnchange}
  //             data-id='education'
  //             value={filteredEducation[0].description}
  //           ></textarea>
  //         </form>
  //         <button onClick={this.hideEducationEditModal}>
  //           Update the Education
  //         </button>
  //       </div>
  //     </Modal>
  //   );
  // };
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
        },
        showEditModal: false, // optional: clear selected if done editing
      }),
      this.passData
    );
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
          id: '',
          instituteName: '',
          degree: '',
          startDate: '',
          endDate: '',
          score: '',
          description: '',
          editModal: false,

          allEducation: filteredEducation,
        },
      }),

      this.passData
    );
  };

  showModal = (e) => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  hideModal = (e) => {
    console.log(this.state.showModal);
    e.preventDefault();
    if (this.state.showEditModal) {
      const { allEducation } = this.state.education;
      const updatedAllEducation = allEducation.map((indi) => {
        if (indi.id === this.state.selected[0].id) {
          return { ...this.state.selected[0] };
        } else {
          return indi;
        }
      });

      this.setState(
        {
          education: {
            id: '',
            instituteName: '',
            degree: '',
            startDate: '',
            endDate: '',
            score: '',
            description: '',

            allEducation: updatedAllEducation,
          },
          selected: [],
          showEditModal: false, // optional: clear selected if done editing
        },
        this.passData
      );

      console.log('update', updatedAllEducation);
    }
    if (this.state.showModal) {
      console.log(this.state.education);
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
            id: '',
            instituteName: '',
            degree: '',
            startDate: '',
            endDate: '',
            score: '',
            description: '',

            allEducation: [...prevState.education.allEducation, newProfile],
          },
          showModal: false,
        }),
        this.passData
      );
    }
  };
  passData = () => {
    const getEducationState = this.props.fun;
    getEducationState(this.state.education.allEducation);
  };
  allFunction = {
    hideModal: this.hideModal,
    onChange: this.handleOnchange,
  };
  showEditModalComponent = (e) => {
    e.preventDefault();
    const { allEducation } = this.state.education;
    const selected = allEducation.filter(
      (indi) => indi.id === e.currentTarget.dataset.id
    );

    this.setState({
      showEditModal: true,
      selected: selected,
    });
  };
  render() {
    const allEducation = this.state.education?.allEducation || [];

    return (
      <div>
        <hr />
        <h1>Educations</h1>
        <div>
          <div>
            {/* {this.state.showModal && this.EducationModalComponent()} */}
            {this.state.showModal && (
              <Modal obj={this.state} fun={this.allFunction} />
            )}
          </div>
          <div>
            {this.state.showEditModal && (
              <Modal obj={this.state} fun={this.allFunction} />
            )}
          </div>
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
                        onClick={this.showEditModalComponent}
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
        <button onClick={this.showModal}>+ Add a new Item</button>

        <hr />
      </div>
    );
  }
}
export default Education;
