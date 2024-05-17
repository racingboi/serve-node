import sendRequest from "../utils/resquest";
const CategoryService = {
  getAll: () => sendRequest('get', 'category/'),
  create: (data) => sendRequest('post', 'category/', data),
  update: (id, data) => sendRequest('put', `category/${id}`, data),
  delete: (id) => sendRequest('delete', `category/${id}`),
  getCategory: (id) => sendRequest('get', `category/${id}`),
};
export default CategoryService;