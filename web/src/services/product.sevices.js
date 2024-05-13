import sendRequest from "../utils/resquest";

const ProductService = {
  getAll: () => sendRequest('get', 'product/'),
  create: (data) => sendRequest('post', 'product/', data),
};

export default ProductService;