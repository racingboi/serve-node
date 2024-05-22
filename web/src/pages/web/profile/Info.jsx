import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, resetUpdateUserState, updateUser } from '../../../redux/slices/authReducer';
import { handleToast } from '../../../config/ConfigToats';
import AvatarUploader from './Avata';
export default function Info() {
  const dispatch = useDispatch();
  const { statusUser: status, data: { res: data }, error } = useSelector(state => state.auth);
  const statusUpdate = useSelector(state => state.auth.statusUpdate);
  useEffect(() => {
    if (statusUpdate === 'success') {
      handleToast('success', 'Cập nhật thông tin thành công');
      dispatch(getCurrentUser());
      dispatch(resetUpdateUserState())
    } else if (statusUpdate === 'failed') {
      handleToast('error', error.message);
    }

  }, [statusUpdate,dispatch,error]);
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'success') {
      setForm({
        name: data?.name,
        mobile: data?.mobile,
        email: data?.email,
        address: data?.address
      });
    } else if (status === 'failed') {
      handleToast('error', error.message)
    }
  }, [status, data, error]);

  const handleChange = ({ target: { name, value } }) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const createTextField = (label, name, size = 6) => (
    <Grid item xs={12} sm={size}>
      <TextField
        fullWidth
        label={label}
        variant="outlined"
        name={name}
        value={form[name]}
        onChange={handleChange}
      />
    </Grid>
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(form));
  }
  return (
    <>
      <Container>
        <h1>Thông tin cá nhân</h1>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            {createTextField("Họ và tên", "name")}
            {createTextField("Số điện thoại", "mobile")}
            {createTextField("Email", "email")}
            {createTextField("Địa chỉ", "address")}
            <Grid item xs={12}>
              <Button
                sx={{
                  display: 'block',
                  margin: 'auto',
                  width: '50%',
                  height: '50px',
                  backgroundColor: '#f50057',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#ff5983'
                  }
                }}
                variant="outlined"
                onClick={handleSubmit}
              >
                Cập nhật
              </Button>
            </Grid>
            <Grid item xs={12}>
              <AvatarUploader />
              </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
