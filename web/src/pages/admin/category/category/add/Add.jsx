
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, getAll } from '../../../../../redux/slices/categoryReducer';
import Iconify from '../../../../../components/iconify';
import { MenuItem, Select } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
export default function AddCategory() {
  const [open, setOpen] = useState(false);
  const [parentId, setParentId] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.categories.data.data);
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Button onClick={handleClickOpen} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
        New category
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
            const name = formJson.name;
            dispatch(createCategory({ name, parentId: parentId }));
            handleClose();
          },
        }}
      >
        <DialogTitle>
          New category
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new category, please enter the name here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="name"
            type="text"
            fullWidth
            variant="standard"
          />
          <Select
            fullWidth
            labelId="parent-category-label"
            value={parentId}
            label="Parent Category"
            onChange={(e) => setParentId(e.target.value)}
          >
            <MenuItem value={null}>
             None
            </MenuItem>
            {Array.isArray(data) && data.map((category) => (
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
    </Fragment>
  );
}
