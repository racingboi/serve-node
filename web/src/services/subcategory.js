import sendRequest from "../utils/resquest";
const SubCategoryService = {
  getAll: () => sendRequest('get', 'subcategory/'),
  create: (data) => sendRequest('post', 'subcategory/', data),
};
export default SubCategoryService;