import { Component } from 'react';

import { uid } from 'uid';
import Modal from '../Modal/Modal';

import './Form.css';
class Skills extends Component {
  state = {
    showModal: false,
    name: '',
    description: '',
    level: '',
    id: '',
    showEditModal: false,
    allSkills: [
      {
        id: uid(),
        name: 'React',
        description: '',
        level: 3,
      },
    ],
    fields: [
      { name: 'name', label: 'Skills', type: 'text' },
      { name: 'description', label: 'Description', type: 'text' },
      { name: 'level', label: 'Skill Level', type: 'number' },
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
  showModal = (e) => {
    e.preventDefault();
    this.setState({ showModal: true });
  };
  hideModal = (e) => {
    if (this.state.showEditModal) {
      const { allSkills } = this.state;
      const updatedAllSkills = this.state.allSkills.map((indi) => {
        if (indi.id === this.state.selected[0].id) {
          return { ...this.state.selected[0] }; // ✅ Use a copy to avoid mutation issues
        } else {
          return indi;
        }
      });

      this.setState({
        allSkills: updatedAllSkills,
        selected: [], // optional: clear selected if done editing
      });

      console.log('update', updatedAllSkills);
      this.setState({ allSkills: updatedAllSkills });
    }
    e.preventDefault();
    const id = uid();

    const { name, description, level } = this.state;

    const newSkill = { id, name, description, level: parseInt(level) };
    this.setState(
      (prevState) => ({
        allSkills: [...prevState.allSkills, newSkill],
        name: '',
        description: '',
        level: '',
        showModal: false,
      }),
      this.passSkillData
    );
  };
  ModalComponent = () => {
    return (
      <div className='modal'>
        <form>
          <h1>Adds skills</h1>
          <div className='indi'>
            <label htmlFor='name'>Skills : </label>
            <input type='text' id='name' onChange={this.handleOnchange} />
          </div>
          <label htmlFor='level'>Level : </label>
          <input type='number' id='level' onChange={this.handleOnchange} />

          <label htmlFor='Description'>Description : </label>
          <input type='text' id='Description' onChange={this.handleOnchange} />

          <button onClick={this.hideModal}>Add the skills</button>
        </form>
      </div>
    );
  };
  showEditModalComponent = (e) => {
    e.preventDefault();
    console.log('hello from edit modal');
    console.log(this.state.allSkills);
    const selected = this.state.allSkills.filter(
      (indi) => indi.id === e.currentTarget.dataset.id
    );
    console.log('selected : ', selected);

    this.setState({ showEditModal: true, selected: selected });
  };

  passSkillData = () => {
    const { fun } = this.props;
    fun(this.state.allSkills);
  };

  DeleteSkill = (e) => {
    const id = e.target.dataset.id;
    const filteredSkills = this.state.allSkills.filter(
      (skill) => skill.id !== id
    );
    this.setState({ allSkills: filteredSkills }, this.passSkillData);
  };

  allFunction = {
    showEditModalComponent: this.showEditModalComponent,
    hideModal: this.hideModal,
    onChange: this.handleOnchange,
  };

  render() {
    return (
      <div className='skills'>
        <h1>Skills</h1>
        {this.state.showModal && this.ModalComponent()}
        {this.state.showEditModal && (
          <Modal obj={this.state} fun={this.allFunction} />
        )}
        <div className='list'>
          {this.state.allSkills.map((indi, index) => (
            <div key={index} className='child'>
              <h2>{indi.name}</h2>
              <div>
                <i
                  className='fa-solid fa-trash'
                  onClick={this.DeleteSkill}
                  data-id={indi.id}
                ></i>
                <i
                  className='fa-solid fa-pen'
                  onClick={this.showEditModalComponent}
                  data-id={indi.id}
                ></i>
              </div>
            </div>
          ))}
        </div>
        {!this.state.showModal && (
          <button onClick={this.showModal}>Add new Skills</button>
        )}
      </div>
    );
  }
}
export default Skills;
