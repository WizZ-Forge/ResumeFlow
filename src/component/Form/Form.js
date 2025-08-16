import React, { Component } from 'react';
import axios from 'axios';
import Basic from '../Templates/Basic';
import './Form.css';
import Wrapper from '../Wrapper/Wrapper';
import Modal from 'react-modal';
import Skills from './Skills';
import * as icons from 'simple-icons';
import { uid } from 'uid';
import Education from './Education';
import Profile from './Profile';
import Experience from './Experience';

// import { Button, TextField, Flex, Text } from '@radix-ui/themes';

class Form extends Component {
  state = {
    name: '',
    email: '',
    skill: '',
    profileObj: {
      network: 'Github',
      username: 'Harshit0_07',
      link: '',
      logo: '',
      profile: [],
    },

    experience: '',

    showModal: false,
    showEditModal: false,
    selectedProfile: null,
    education: [],
    skills: [
      {
        name: 'React',
        description: '',
        level: 3,
      },
    ],
    experience: [],

    summary: '',
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

  // Education component
  getEducationState = (data) => {
    console.log('data :', data);
    this.setState({ education: data });
  };

  getSkillState = (data) => {
    console.log(data);
    this.setState({ skills: data });
  };
  getExperienceState = (data) => {
    console.log(data);
    this.setState({ experience: data });
  };

  //{ showEducationModal: false }

  // all functions for education modal
  EducationFunction = {
    showEducationModal: this.showEducationModal,
    hideEducationModal: this.hideEducationModal,
    EducationModalComponent: this.EducationModalComponent,
    DeleteEducation: this.DeleteEducation,
    EditEducation: this.EditEducation,
    EditEducationModalComponent: this.EditEducationModalComponent,
  };

  // This is the modal for education hello how are you

  handleShowModal = () => {
    console.log('show moadal called');
    this.setState({ showModal: true });
  };

  handleShowEditModal = (e) => {
    const id = e.currentTarget.dataset.id;
    const profile = this.state.profileObj.profile.find(
      (item) => item.uuid === id
    );
    this.setState({ showEditModal: true, selectedProfile: profile });
  };

  handleHideModal = () => {
    const profileId = uid();
    const { network, username, link } = this.state.profileObj;
    const path = 'si' + network;

    const newProfile = {
      uuid: profileId,
      network,
      username,
      link,
      logo: icons[path]?.path || '',
    };

    this.setState((prevState) => ({
      profileObj: {
        ...prevState.profileObj,
        network: '',
        username: '',
        link: '',
        profile: [...prevState.profileObj.profile, newProfile],
      },

      showModal: false,
    }));
  };

  deleteProfile = (e) => {
    const id = e.currentTarget.dataset.id;
    const filteredProfile = this.state.profileObj.profile.filter(
      (item) => item.uuid !== id
    );
    this.setState((prevState) => ({
      profileObj: {
        ...prevState.profileObj,
        profile: filteredProfile,
      },
    }));
  };

  updateModal = () => {
    const { uuid, network, username, link } = this.state.selectedProfile || {};
    const updatedProfile = {
      uuid,
      network,
      username,
      link,
      logo: icons['si' + network]?.path || '',
    };

    const newProfileList = this.state.profileObj.profile.filter(
      (item) => item.uuid !== uuid
    );

    this.setState((prevState) => ({
      profileObj: {
        network: '',
        username: '',
        link: '',
        profile: [...newProfileList, updatedProfile],
      },

      showEditModal: false,
      selectedProfile: null,
    }));
  };

  onChangeEditField = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      selectedProfile: {
        ...prevState.selectedProfile,
        [name]: value,
      },
    }));
  };

  ModalComponent = () => {
    return (
      <Modal isOpen={this.state.showModal} contentLabel='Create Profile Modal'>
        <form>
          <label htmlFor='network'>Network:</label>
          <input
            type='text'
            id='network'
            data-id='profileObj'
            name='network'
            value={this.state.profileObj.network}
            onChange={this.handleOnchange}
          />
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            data-id='profileObj'
            name='username'
            value={this.state.profileObj.username}
            onChange={this.handleOnchange}
          />
          <label htmlFor='link'>Link:</label>
          <input
            type='text'
            id='link'
            data-id='profileObj'
            name='link'
            value={this.state.profileObj.link}
            onChange={this.handleOnchange}
          />
          <button
            onClick={this.handleHideModal}
            className='modal-btn'
            type='button'
          >
            Create Profile
          </button>
        </form>
      </Modal>
    );
  };

  EditModalComponent = () => {
    const { network, username, link } = this.state.selectedProfile || {};

    return (
      <Modal
        isOpen={this.state.showEditModal}
        contentLabel='Edit Profile Modal'
      >
        <form>
          <label htmlFor='network'>Network:</label>
          <input
            type='text'
            id='network'
            name='network'
            value={network}
            onChange={this.onChangeEditField}
          />
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={this.onChangeEditField}
          />
          <label htmlFor='link'>Link:</label>
          <input
            type='text'
            id='link'
            name='link'
            value={link}
            onChange={this.onChangeEditField}
          />
          <button
            onClick={this.updateModal}
            className='modal-btn'
            type='button'
          >
            Update Profile
          </button>
        </form>
      </Modal>
    );
  };

  submit = (e) => {
    e.preventDefault();

    const { name, email, skill, education, experience, number, address } =
      this.state;
    const data = {
      name: name,
      email: email,
      number: number,
      skill: skill.split(','),
      education: education,
      address: address,
      experience: experience,
    };

    axios
      .post('http://localhost:3000/resume', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('Data submitted successfully:', res.data);
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };
  profileFunction = {
    ModalComponent: this.ModalComponent,
    EditModalComponent: this.EditModalComponent,

    handleShowModal: this.handleShowModal,
    handleShowEditModal: this.handleShowEditModal,
    deleteProfile: this.deleteProfile,
    handleHideModal: this.handleHideModal,
    updateModal: this.updateModal,
    onChangeEditField: this.onChangeEditField,
  };

  //Education modal toggling function

  render() {
    console.log(this.state.skills);
    return (
      <div className='form-container'>
        <div className='left-container'>
          <h1>Form Component</h1>
          <form>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={this.state.name}
              onChange={this.handleOnchange}
            />

            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={this.state.email}
              onChange={this.handleOnchange}
            />

            <label htmlFor='number'>Number:</label>
            <input
              type='number'
              id='number'
              name='number'
              value={this.state.number}
              onChange={this.handleOnchange}
            />

            <label htmlFor='address'>Address:</label>
            <input
              type='text'
              id='address'
              name='address'
              value={this.state.address}
              onChange={this.handleOnchange}
            />

            <Profile obj={this.profileFunction} profile={this.state} />

            <hr />

            <textarea
              name='summary'
              id='summary'
              cols='50'
              rows='10'
              placeholder='Write a summary about yourself'
              value={this.state.summary}
              onChange={this.handleOnchange}
            ></textarea>

            <hr />

            <Education fun={this.getEducationState} />

            <Skills fun={this.getSkillState} />

            <hr />

            <Experience fun={this.getExperienceState} />
          </form>
        </div>
        <div
          className='resume-container'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className='resume-preview' id='resume-preview' ref={this.myRef}>
            <Wrapper obj={this.state} />
          </div>
        </div>
      </div>
    );
  }
}
export default Form;
