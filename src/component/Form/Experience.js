import { Component } from 'react';

import { uid } from 'uid';
import Modal from '../Modal/Modal';
import editUtils from '../../utils/editUtil';
import './Form.css';

class Experience extends Component {
  state = {
    showModal: false,
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    id: '',
    showEditModal: false,
    allExperience: [
      {
        id: uid(),
        companyName: 'Tech Corp',
        position: 'Software Engineer',
        startDate: '2020-01-01',
        endDate: '2021-01-01',
        description: 'Developed web applications.',
      },
    ],
    fields: [
      { name: 'companyName', label: 'Company Name', type: 'text' },
      { name: 'position', label: 'Position', type: 'text' },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
    selected: '',
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

    this.setState({ [id]: value });
  };

  showEditModalComponent = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('data-id');
    const { allExperience } = this.state;
    const selected = allExperience.filter((exp) => exp.id === id);
    console.log('selected', selected);
    this.setState({ selected: selected, showEditModal: true });
  };
  DeleteSkill = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('data-id');
    const { allExperience } = this.state;
    const updatedAllExperience = allExperience.filter((exp) => exp.id !== id);
    this.setState({ allExperience: updatedAllExperience }, this.passData);
  };

  showModal = (e) => {
    e.preventDefault();
    this.setState({ showModal: true });
  };
  hideModal = (e) => {
    e.preventDefault();
    if (this.state.showEditModal) {
      const { allExperience } = this.state;

      const updatedAllExperience = editUtils(
        allExperience,
        this.state.selected
      );
      console.log('updatedAllExperience', updatedAllExperience);

      this.setState(
        {
          allExperience: updatedAllExperience,
          showEditModal: false,
          selected: '',
        },
        this.passExperienceData
      );
    } else {
      this.addExperience(e);
      this.setState({ showModal: false });
    }
  };
  passExperienceData = () => {
    const { allExperience } = this.state;
    this.props.fun(allExperience);
  };
  addExperience = (e) => {
    e.preventDefault();
    const { companyName, position, startDate, endDate, description } =
      this.state;
    const newExperience = {
      id: uid(),
      companyName,
      position,
      startDate,
      endDate,
      description,
    };
    this.setState(
      (prevState) => ({
        allExperience: [...prevState.allExperience, newExperience],
        companyName: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      }),
      this.passExperienceData
    );
  };
  passData = () => {
    const { allExperience } = this.state;
    this.props.fun(allExperience);
  };
  allFunction = {
    onChange: this.handleOnchange,
    hideModal: this.hideModal,
    addExperience: this.addExperience,
  };

  render() {
    const { showModal, fields, allExperience, showEditModal, selected } =
      this.state;

    return (
      <div className='experience-form'>
        <h1>Experience</h1>
        <div className='list'>
          {allExperience.map((exp) => (
            <div key={exp.id} className='child'>
              <h2>{exp.companyName}</h2>
              <div>
                <i
                  className='fa-solid fa-trash'
                  onClick={this.DeleteSkill}
                  data-id={exp.id}
                ></i>
                <i
                  className='fa-solid fa-pen'
                  onClick={this.showEditModalComponent}
                  data-id={exp.id}
                ></i>
              </div>
            </div>
          ))}
        </div>
        <button onClick={this.showModal}>Add New Item</button>
        {this.state.showModal && (
          <Modal obj={this.state} fun={this.allFunction} />
        )}
        <div>
          {this.state.showEditModal && (
            <Modal obj={this.state} fun={this.allFunction} />
          )}
        </div>
      </div>
    );
  }
}
export default Experience;
