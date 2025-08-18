import { Component } from 'react';
import { uid } from 'uid';
import Modal from '../../Modal/Modal';
import editUtils from '../../../utils/editUtil';
import '../Form.css';

class Project extends Component {
  state = {
    showModal: false,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    id: '',
    showEditModal: false,
    allProjects: [
      {
        id: uid(),
        name: 'Project Alpha',
        description: 'A groundbreaking project.',
        startDate: '2021-01-01',
        endDate: '2021-12-31',
      },
    ],
    fields: [
      { name: 'name', label: 'Project Name', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
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
    const { allProjects } = this.state;
    const selected = allProjects.filter((proj) => proj.id === id);
    console.log('selected', selected);
    this.setState({ selected, showEditModal: true });
  };

  hideModal = (e) => {
    e.preventDefault();
    if (this.state.showEditModal) {
      const { allProjects } = this.state;

      const updatedAllProjects = editUtils(allProjects, this.state.selected);
      console.log('updatedAllProjects', updatedAllProjects);
      this.setState({
        allProjects: updatedAllProjects,
        showEditModal: false,
        selected: '',
      });
    }
    
    this.setState({ showModal: false });
  };

  showModal = (e) => {
    e.preventDefault();
    this.setState({ showModal: true });
  }
  passProjectData = () => {
    const { allProjects } = this.state;
    this.props.passData(allProjects);
  };

