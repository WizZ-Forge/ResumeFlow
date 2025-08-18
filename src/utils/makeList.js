import '../component/Form/Form.css';

const MakeList = (list, obj) => {
  const { deleteItem, editItem } = obj;

  return list.map((item, index) => (
    <div key={index} className='child'>
      <h2>{item.name}</h2>
      <div>
        <i
          className='fa-solid fa-trash'
          data-id={item.id}
          onClick={deleteItem}
        ></i>
        <i className='fa-solid fa-pen' data-id={item.id} onClick={editItem}></i>
      </div>
    </div>
  ));
};
export default MakeList;
