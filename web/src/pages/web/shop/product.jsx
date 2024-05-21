import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, resetState } from "../../../redux/slices/productReducer";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../../../layout/web";
import formatPrice from "../../../components/formatPrice/formatPrice";

export default function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data.productDatas);
  // const loading = useSelector((state) => state.products.loading);
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  useEffect(() => {
   if (products) {
     setData(products);
     dispatch(resetState());
    }

  }, [products,data,dispatch]);

  return (
    <>
      <Navbar />
      <div className="py-4 my-4">
        <div className="d-flex">
          {data.map((item) => {
            return (
              <div key={item._id} className="card mx-4 text-center">
                <Link to={`/product/show/${item._id}`}>
                  <img
                    className="card-img-top p-3"
                    src={item.images[0]}
                    alt="Detailed description of the image"
                    height="300"
                    width="300"
                    style={{ display: 'block' }} // Ensure the image doesn't inline if needed
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
                  <Link
                    to={"/product/show/" + item._id}
                    className="btn btn-dark m-1"
                  >
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    // onClick={() => addProduct(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}
