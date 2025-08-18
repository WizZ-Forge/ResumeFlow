const findById = (array, id) => {
  console.log('Finding by ID:', id);
  return array.find((item) => item.id === id);
};
export default findById;
