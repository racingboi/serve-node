import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../../../../components/iconify';
import { create, getAll } from '../../../../../redux/slices/subcategory';
import { handleToast } from '../../../../../config/ConfigToats';

export default function AddSubCategory() {
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const status = useSelector((state) => state.categories.status);
  const categoryData = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getAll());
    }
  }, [dispatch, status]);

  React.useEffect(() => {
    if (status === 'success') {
      setSelectedCategory(categoryData.datacategory._id);
    } else if (status === 'failed') {
      handleToast('error', 'Failed to load category');
    }
  }, [status, categoryData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
        New Sub Category
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            formJson.parentId = selectedCategory;
            dispatch(create(formJson));
            handleClose();
          },
        }}
      >
        <DialogTitle>New Sub Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new sub category, please enter the name and select the category here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
            fullWidth
          >
            {categoryData.datacategory &&
              categoryData.datacategory.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
