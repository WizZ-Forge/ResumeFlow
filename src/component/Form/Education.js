import { Component } from 'react';

import './Form.css';
import { uid } from 'uid';
import Modal from '../Modal/Modal';
import editUtils from '../../utils/editUtil';
import findById from '../../utils/findById';
import hideEditModal from '../../utils/hideEditModal';
import MakeList from '../../utils/makeList';

class Education extends Component {
  state = {
    education: {
      id: '',
      name: '',
      degree: '',
      startDate: '',
      endDate: '',
      score: '',
      description: '',
      editModal: false,
      filteredEducation: '',
      allEducation: [],
    },
    showModal: false,
    showEditModal: false,
    selected: [],
    fields: [
      { name: 'name', label: 'Institute Name', type: 'text' },
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

  hideEducationEditModal = () => {
    console.log(this.state.education);
    const { education } = this.state;

    const newObj = {
      id: education.id,
      name: education.name,

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
          name: '',
          degree: '',
          startDate: '',
          endDate: '',

          score: '',
          description: '',
          allEducation: updatedEducationList,
        },
        showEditModal: false,
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
          name: '',
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
  closeEditModal = (allData) => {
    this.setState(
      {
        education: {
          ...this.state.education,
          allEducation: allData,
        },
        showEditModal: false,
        selected: '',
      },
      this.passData
    );
  };
  selectForEdit = (e) => {
    e.preventDefault();
    const { allEducation } = this.state.education;
    const selected = findById(allEducation, e.currentTarget.dataset.id);
    console.log('selected', selected);
    this.setState({ selected: [selected], showEditModal: true });
  };

  hideModal = (e) => {
    console.log(this.state.showModal);
    e.preventDefault();
    if (this.state.showEditModal) {
      const obj = {
        showEditModal: this.state.showEditModal,
        allData: this.state.education.allEducation,
        selected: this.state.selected,
        fun: this.closeEditModal,
      };
      hideEditModal(e, obj);
    }
    if (this.state.showModal) {
      const { name, degree, startDate, endDate, score, description } =
        this.state.education;
      const id = uid();
      const newProfile = {
        id: id,
        name: name,
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
            name: '',
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
  selectForEdit = (e) => {
    e.preventDefault();

    const { allEducation } = this.state.education;
    const selected = findById(allEducation, e.currentTarget.dataset.id);

    this.setState({
      showEditModal: true,
      selected: [selected],
    });
  };
  makeListFunction = {
    deleteItem: this.DeleteEducation,
    editItem: this.selectForEdit,
  };

  render() {
    const allEducation = this.state.education?.allEducation || [];

    return (
      <div>
        <hr />
        <h1>Educations</h1>
        <div>
          {(this.state.showModal || this.state.showEditModal) && (
            <Modal obj={this.state} fun={this.allFunction} />
          )}

          <div className='list'>
            {MakeList(this.state.education.allEducation, this.makeListFunction)}{' '}
          </div>
        </div>
        <button onClick={this.showModal}>+ Add a new Item</button>

        <hr />
      </div>
    );
  }
}
export default Education;
