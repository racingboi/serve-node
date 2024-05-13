import sendRequest from '../utils/resquest'
const UsersService = {
  getAll: () => sendRequest('get', 'user/'),
  update: (id, data) => sendRequest('put', `user/${id}`, data),
  delete: (id) => sendRequest('delete', `user/${id}`),
  create: (data) => sendRequest('post', 'user/register', data),
};

export default UsersService;