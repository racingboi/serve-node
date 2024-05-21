import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { extractTextFromHtml } from '../../../components/extractTextFromHtml/extractTextFromHtml';
import { getProduct } from '../../../redux/slices/productReducer';
import { getCategory } from '../../../redux/slices/categoryReducer';
import formatPrice from '../../../components/formatPrice/formatPrice';
import { Footer, Navbar } from '../../../layout/web';

export default function ShowProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data.productData);
  const categoryData = useSelector((state) => state.categories.data.data);
  const [mainImage, setMainImage] = useState(products?.images[0]);
  const category = products?.category;
  useEffect(() => {
    if (category) {
      dispatch(getCategory(category));
    }
  }, [dispatch, category]);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setMainImage(products?.images[0]);
  }, [products]);

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  return (
    <>
      <Navbar/>
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <img
              className="img-fluid mb-3"
              src={mainImage}
              alt={`${products?.name} - Main Image`}
              width="100%"
            />
            <div className="row">
              {products?.images.slice(1, 4).map((image, index) => (
                <div className="col-4" key={index}>
                  <img
                    className="img-fluid"
                    src={image}
                    alt={`${products?.name} - Image ${index + 2}`}
                    style={{ cursor: 'pointer', width: '100%', height: 'auto', padding: '10px' }}
                    onClick={() => handleThumbnailClick(image)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6 py-5">
            <h4 className="text-uppercase text-muted">category: {categoryData?.name}</h4>
            <h1 className="display-5">tên: {products?.name}</h1>
            <p className="lead">
              {products?.rating && products.rating.rate} <StarIcon />
            </p>
            <h3 className="display-6 my-4">{formatPrice(products?.price)}</h3>
            <p className="lead">{extractTextFromHtml(products?.description)}</p>
            <button className="btn btn-outline-dark">
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-dark mx-3">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
