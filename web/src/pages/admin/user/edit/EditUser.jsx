/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../../redux/slices/usersReducer';



const EditUser = ({ open, onClose, user }) => {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { _id, email, name, mobile } = formJson;
    dispatch(updateUser({ userId: _id,data: { email, name, mobile } }));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <DialogContentText>Update user details below:</DialogContentText>
        <TextField
          type="hidden"
          id="_id"
          name="_id"
          value={user._id}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          defaultValue={user.email}
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          defaultValue={user.name}
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="mobile"
          name="mobile"
          label="Phone"
          type="tel"
          defaultValue={user.mobile}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

EditUser.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditUser;
