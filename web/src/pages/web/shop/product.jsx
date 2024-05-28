import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, resetState } from "../../../redux/slices/productReducer";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../../../layout/web";
import formatPrice from "../../../components/formatPrice/formatPrice";
import { handleToast } from "../../../config/ConfigToats";
import { resetAddToCartState } from "../../../redux/slices/cartReducer";
import { addToCart } from "../../../redux/slices/cartReducer";

export default function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.data?.productDatas);
  const addToCarts = useSelector((state) => state.cart.statusAddCart);
  const error= useSelector((state) => state.cart.error);

  const [data, setData] = useState([]);
useEffect(() => {
  if (addToCarts === "success") {
    handleToast("success", "thêm sản phẩm thành công");
    dispatch(resetAddToCartState());
  }
if (addToCarts === "failed") {
  handleToast("error", error.message);
  }
  
}, [addToCarts,error,dispatch]);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      setData(products);
      dispatch(resetState());
    }
  }, [products, dispatch]);

  const addProduct = (id, price) => {
    const userId = localStorage.getItem("id");
    const productExist = id;
    const totalPrice = price;
    const quantity = 1;
    const total = totalPrice * quantity;
    const data = { userId: userId, productId: productExist, quantity: quantity, totalPrice: total };
    if (data) {
      dispatch(addToCart(data));
    } else {
      handleToast("error", "Please login to add to cart");
    }
  };

  return (
    <>
      <Navbar />
      <div className="py-4 my-4">
        <div className="d-flex">
          {data.length > 0 ? (
            data.map((item) => (
              <div key={item._id} className="card mx-4 text-center">
                <Link to={`/product/show/${item._id}`}>
                  <img
                    className="card-img-top p-3"
                    src={item.images[0]}
                    alt="Detailed description of the image"
                    height="300"
                    width="300"
                    style={{ display: 'block' }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    {item.name.substring(0, 15)}...
                  </h5>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">{formatPrice(item.price)}</li>
                </ul>
                <div className="card-body">
                  <Link to={"/product/show/" + item._id} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(item._id, item.price)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
