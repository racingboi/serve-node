import sendRequest from '../utils/resquest'
const AuthService = {
  login: (data) => sendRequest('post', 'user/login', data),
  register: (data) => sendRequest('post', 'user/register', data),
  logout: () => sendRequest('get', 'logout'),
};
export default AuthService;