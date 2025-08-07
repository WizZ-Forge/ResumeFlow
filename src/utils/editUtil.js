const editUtils = (dataList, updatedEntry) => {
  console.log('hello from editUtils');
  console.log(dataList, updatedEntry);
  return dataList.map((indi) => {
    if (indi.id === updatedEntry[0].id) {
      return updatedEntry[0];
    } else {
      return indi;
    }
  });
};
export default editUtils;
