import { Component } from 'react';

class Profile extends Component {
  render() {
    const {
      handleShowModal,
      handleShowEditModal,
      deleteProfile,
      ModalComponent,
      EditModalComponent,
    } = this.props.obj;
    const { profile } = this.props;
    return (
      <div>
        <h2>Profiles</h2>
        <div>
          <div className='profile-container'></div>
          <ul className='profile-list'>
            {profile.profileObj.profile.map((item) => (
              <li className='profiles' key={item.uuid}>
                <div className='profile-item'>
                  <p>{item.network}</p>
                  <p>{item.username}</p>
                </div>

                <div>
                  <i
                    className='fa-solid fa-trash'
                    onClick={deleteProfile}
                    data-id={item.uuid}
                  ></i>

                  <button
                    onClick={handleShowEditModal}
                    data-id={item.uuid}
                    type='button'
                    className='edit-profile-button'
                  >
                    <i className='fa-solid fa-pen'></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button
            className='add-profile-button'
            onClick={handleShowModal}
            data-type='profileModal'
            type='button'
          >
            + Add a new item
          </button>

          <div className='modal-content'>
            {profile.showModal && ModalComponent()}
            {profile.showEditModal && EditModalComponent()}
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

export default Profile;
