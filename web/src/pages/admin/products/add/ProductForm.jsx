import { useState } from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';
import { imageDb } from '../../../../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../../../redux/slices/productReducer';
import { Editor } from '@tinymce/tinymce-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    brand: '',
    price: 0,
    quantity: 0,
    images: []
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleDescriptionChange = (content) => {
    setProduct((prevProduct) => ({ ...prevProduct, description: content }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prevProduct) => ({ ...prevProduct, images: files }));

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(filePreviews);
  };

  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadImage = async (image) => {
      const imgRef = ref(imageDb, `products/${v4()}`);
      const snapshot = await uploadBytes(imgRef, image);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    };

    const imageUploadPromises = product.images.map((image) => uploadImage(image));
    const imageUrls = await Promise.all(imageUploadPromises);

    const productData = {
      ...product,
      images: imageUrls
    };

    dispatch(createProduct(productData));

    setProduct({
      name: '',
      description: '',
      brand: '',
      price: 0,
      quantity: 0,
      images: []
    });
    setImagePreviews([]);
  };

  return (
    <>
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          maxWidth: '1200px',
          margin: 'auto',
          marginTop: '30px'
        }}>
          <Grid item xs={12} sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2>Add Product</h2>
            <Button variant="contained" color="inherit"
              startIcon={<FormatListBulletedIcon />}
              component={Link} to="/dashboard/products">
              List
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={product.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Brand"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              name="price"
              value={product.price}
              onChange={handleChange}
              fullWidth
              required
              type="number"
              inputProps={{ step: 0.01 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              fullWidth
              required
              type="number"
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
              }}
              initialValue={product.description}
              onEditorChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
            >
              Upload Images
              <input
                type="file"
                name="images"
                multiple
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            {imagePreviews.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
                {imagePreviews.map((src, index) => (
                  <Box key={index} sx={{ position: 'relative', width: '100px', height: '100px' }}>
                    <img src={src} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }} />
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddProductForm;
