// src/App.js
import { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { handleToast } from '../../../../../config/ConfigToats';
import { createCategory, resetCreateState } from '../../../../../redux/slices/categoryReducer';
import { Link } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Helmet } from 'react-helmet-async';

function AddCategory() {
  const [name, setName] = useState('');
  const [children, setChildren] = useState([{ name: '' }]);

  const dispatch = useDispatch();
  const statuscreateCategory = useSelector((state) => state.categories.createCategory);
  const error = useSelector((state) => state.categories.error);
  useEffect(() => {
    if (statuscreateCategory === 'failed') {
      handleToast('error', error.message);
    }
    if (statuscreateCategory === 'success') {
      handleToast('success', 'Category created successfully');
      dispatch(resetCreateState())
    }
  }, [statuscreateCategory, error,dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: name,
      children: children,
    };
    dispatch(createCategory(data));
  };
  const handleChildChange = (index, event) => {
    const updatedChildren = children.map((child, i) =>
      i === index ? { ...child, [event.target.name]: event.target.value } : child
    );
    setChildren(updatedChildren);
  };

  const addChild = () => {
    setChildren([...children, { name: '' }]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
        backgroundColor: '#eef2f5',
      }}
    >
      <Helmet>
        <title>Create Category</title>
      </Helmet>
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#f8f9fa",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" component="h1" gutterBottom
            sx={{
              display: "flex",
              justifyContent: "space-between",

              }}>
            Create Category
          <Button
            component={Link} to="/dashboard/category"
            variant="contained" color="inherit"
              startIcon={<FormatListBulletedIcon />}
          >
            List Category
          </Button>
          </Typography>
          <TextField
            label="Category Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Typography variant="h6" component="h2" gutterBottom>
            Children
          </Typography>
          {children.map((child, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12}>
                <TextField
                  label="Child Name"
                  fullWidth
                  name="name"
                  value={child.name}
                  onChange={(e) => handleChildChange(index, e)}
                  required
                />
              </Grid>
            </Grid>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={addChild}
            startIcon={<AddIcon />}
            sx={{ mb: 2 }}
          >
            Add Child
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Create Category
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
export default AddCategory;
