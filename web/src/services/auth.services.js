import sendRequest from '../utils/resquest'
const AuthService = {
  login: (data) => sendRequest('post', 'user/login', data),
  register: (data) => sendRequest('post', 'user/register', data),
  logout: () => sendRequest('get', 'user/logout'),
  getuser: () => sendRequest('get', 'user/current'),
  updateUser: (data) => sendRequest('put', 'user/current', data),
};
export default AuthService;