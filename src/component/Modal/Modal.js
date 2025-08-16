import { Component } from 'react';
class Modal extends Component {
  formMaker = () => {
    const { fields } = this.props.obj;
    const { showEditModal, showModal } = this.props.obj;
    console.log('showEditModal', showEditModal);
    const { fun } = this.props;

    const { selected } = this.props.obj;
    return (
      <div className='modal'>
        <form>
          {fields.map((indi) => {
            const value = indi.name;
            return (
              <div className='indi'>
                <label htmlFor={indi.name}>{indi.label}:</label>
                {showEditModal ? (
                  indi.type === 'textarea' ? (
                    <textarea
                      id={indi.name}
                      value={selected[0][value]}
                      onChange={fun.onChange}
                    ></textarea>
                  ) : (
                    <input
                      type={indi.type}
                      id={indi.name}
                      value={selected[0][value]}
                      onChange={fun.onChange}
                    />
                  )
                ) : indi.type === 'textarea' ? (
                  <textarea id={indi.name} onChange={fun.onChange}></textarea>
                ) : (
                  <input
                    type={indi.type}
                    id={indi.name}
                    onChange={fun.onChange}
                  />
                )}
              </div>
            );
          })}
          {showEditModal && <button onClick={fun.hideModal}>Edit</button>}
          {showModal && <button onClick={fun.hideModal}>Add</button>}
        </form>
      </div>
    );
  };
  render() {
    const { obj } = this.props;

    return this.formMaker();
  }
}
export default Modal;
