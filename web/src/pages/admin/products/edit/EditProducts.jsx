import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProduct } from '../../../../redux/slices/productReducer';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { getAll } from '../../../../redux/slices/categoryReducer';

export default function EditProducts() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.data.productData);
   const categoryDatas = useSelector((state) => state.categories.data.data);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
    description: '',
    image: [],
    category: '',
  });
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  useEffect(() => {
    if (product) {
      setProductDetails({
        name: product.name,
        price: product.price,
        description: product.description,
        images: product.images,
        category: product.category,
      });
    }
  }, [product]);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);


  return (
    <>
      <Helmet>
        <title>Edit Product</title>
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
          <Grid item xs={12} sm={6}>
            <Select
              labelId="category-select-label"
              id="category-select"
              name='parentId'
              label="Category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              fullWidth
            >
              {Array.isArray(categoryDatas) ? categoryDatas.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              )) : null}
            </Select>
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
              edit Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
