import editUtils from './editUtil';
const hideEditModal = (e, props) => {
  e.preventDefault();
  const { showEditModal, allData, selected, fun } = props;

  if (showEditModal) {
    const updatedData = editUtils(allData, selected);

    fun(updatedData);
  }
};
export default hideEditModal;
