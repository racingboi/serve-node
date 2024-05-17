import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, updateCategory } from '../../../../../redux/slices/categoryReducer';
import PropTypes from 'prop-types';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select } from '@mui/material';

export default function EditCategory({ category, open, onClose }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.categories.data?.data);  // Use optional chaining here
  const status = useSelector((state) => state.categories.status);
  // const [selectedChildren, setSelectedChildren] = React.useState(category.children.map(child => child._id));
  // const [dataChildren, setDataChildren] = React.useState([]);  // Initialize as empty array

  React.useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  React.useEffect(() => {
    if (status === 'success' && data) {  // Check for data availability
      // setDataChildren(data);
    }
  }, [status, data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { name } = formJson; // Directly destructure 'name'
    // const selectedParentId = selectedChildren[0]; // If only one parent can be selected or if multiple are allowed, handle accordingly

    dispatch(updateCategory({
      categoryId: category._id,
      data: {
        name: name,
        // parentId: selectedParentId, // Ensure this aligns with your data model and backend expectations
      }
    }));
    onClose();
  };

  // const handleChildChange = (event) => {
  //   // const { value } = event.target;
  //   // setSelectedChildren(value);
  // };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To edit the category, please modify the details here.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          defaultValue={category.name}
          type="text"
          fullWidth
          variant="standard"
        />
        <Select
          multiple
          fullWidth
          // value={selectedChildren}
          // onChange={handleChildChange}
          label="Children"
          sx={{ mt: 2 }}
        >
         
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
}

EditCategory.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
