import sendRequest from "../utils/resquest";

const ProductService = {
  getAll: () => sendRequest('get', 'product/'),
  create: (data) => sendRequest('post', 'product/', data),
  delete: (id) => sendRequest('delete', `product/${id}`),
  getproduct: (id) => sendRequest('get', `product/${id}`),
};

export default ProductService;