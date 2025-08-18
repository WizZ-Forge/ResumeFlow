import { Component } from 'react';

import { uid } from 'uid';
import Modal from '../Modal/Modal';
import editUtils from '../../utils/editUtil';
import findById from '../../utils/findById';
import hideEditModal from '../../utils/hideEditModal';
import MakeList from '../../utils/makeList';
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
        name: 'Tech Corp',
        position: 'Software Engineer',
        startDate: '2020-01-01',
        endDate: '2021-01-01',
        description: 'Developed web applications.',
      },
    ],
    fields: [
      { name: 'name', label: 'Company Name', type: 'text' },
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

  selectForEdit = (e) => {
    e.preventDefault();
    const selected = findById(this.state.allExperience, e.target.dataset.id);
    console.log('selected', selected);
    this.setState({ selected: [selected], showEditModal: true });
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
  closeEditModal = (allData) => {
    this.setState(
      {
        allExperience: allData,
        showEditModal: false,
        selected: '',
      },
      this.passExperienceData
    );
  };
  handleEditExperience = (e) => {
    e.preventDefault();
    const obj = {
      showEditModal: this.state.showEditModal,
      allData: this.state.allExperience,
      selected: this.state.selected,
      fun: this.closeEditModal,
    };
    hideEditModal(e, obj);
  };
  hideModal = (e) => {
    e.preventDefault();
    if (this.state.showEditModal) {
      this.handleEditExperience(e);
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
    const { name, position, startDate, endDate, description } = this.state;
    const newExperience = {
      id: uid(),
      name,
      position,
      startDate,
      endDate,
      description,
    };
    this.setState(
      (prevState) => ({
        allExperience: [...prevState.allExperience, newExperience],
        name: '',
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
  makeListFunction = {
    deleteItem: this.DeleteSkill,
    editItem: this.selectForEdit,
  };

  render() {
    const { showModal, fields, allExperience, showEditModal, selected } =
      this.state;

    return (
      <div className='experience-form'>
        <h1>Experience</h1>
        {(showModal || showEditModal) && (
          <Modal obj={this.state} fun={this.allFunction} />
        )}

        <div className='list'>
          {MakeList(allExperience, this.makeListFunction)}{' '}
        </div>
        <button onClick={this.showModal}>Add New Item</button>
      </div>
    );
  }
}
export default Experience;
