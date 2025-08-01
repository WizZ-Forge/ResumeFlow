import { Component } from 'react';
class Modal extends Component {
  formMaker = () => {
    const { fields } = this.props.obj;
    const { showEditModal, ShowModal } = this.props.obj;
    const { fun } = this.props;

    const { edit } = this.props;
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
                  <input
                    type={indi.type}
                    id={indi.name}
                    value={selected[0][value]}
                    onChange={fun.onChange}
                  />
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
          {ShowModal && <button>Add</button>}
        </form>
      </div>
    );
  };
  render() {
    const { obj } = this.props;
    console.log('hello from Modal');
    return this.formMaker();
  }
}
export default Modal;
