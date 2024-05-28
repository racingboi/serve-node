import sendRequest from "../utils/resquest";
const CartService = {
  getCart: () => sendRequest("get", "cart/"),
  addToCart: (data) => sendRequest("post", "cart/", data),
  updateCart: (id, data) => sendRequest("put", `cart/${id}`, data),
  deleteCart: (id) => sendRequest("delete", `cart/${id}` )
};
export default CartService;