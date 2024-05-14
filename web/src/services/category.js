import sendRequest from "../utils/resquest";
const CategoryService = {
  getAll: () => sendRequest('get', 'category/'),
  create: (data) => sendRequest('post', 'category/', data),
};
export default CategoryService;