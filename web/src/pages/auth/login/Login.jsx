import {  signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel,
  Checkbox, Link, Paper, Box, Grid, Typography, createTheme, ThemeProvider
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useAuth} from '../../../contexts/AuthContext';
import { auth } from '../../../config/firebase';
import GoogleIcon from '../../../assets/google.png';
import { Footer, Navbar } from '../../../layout/web';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAPI, resetLoginState } from '../../../redux/slices/authReducer';
import { useEffect } from 'react';
import { handleToast } from '../../../config/ConfigToats';

const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Đăng nhập hoặc Đăng ký với Google để tiếp tục ' }
      {/* <Link color="inherit" href="">
        Privacy Policy
      </Link> {new Date().getFullYear()}. */}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.data.accessToken);
  const data = useSelector((state) => state.auth.data.userData);
  const img = useSelector((state) => state.auth.data.userData?.img);
  useEffect(() => {
    if (status === 'failed') {
      handleToast('error', error.message);
    }
    if (status === 'success') {
      handleToast('success', 'Đăng nhập thành công');
      dispatch(resetLoginState())
      if (token) {
        localStorage.setItem('token', token);
      }
      if(img){
        localStorage.setItem('img', img);
      }
    }
  }, [status, error, token, dispatch,img]);
  useEffect(() => {
    if (data) {
      if (data.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/home')
      }
    }
   
  }, [data, navigate]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    console.log(email, password);
    dispatch(LoginAPI({ email, password } ));
  };
  
  const { login } = useAuth();
  const provider = new GoogleAuthProvider();
  const handleSignInWithGoogle = () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const dataLogin = {
          email: user.email,
          name: user.displayName,
          avatar: user.photoURL,
          accessToken: token,
        };
        login(token);
        console.log(dataLogin);
        
      })
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Đăng nhập</Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={handleSignInWithGoogle}
                startIcon={<img
                  src={GoogleIcon}
                  alt="Google Icon"
                  style={{ width: '50px', height: '50px', marginRight: '10px'}}
                />}
                sx={{
                  backgroundColor: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: '#357AE8',
                    color: '#FFFFFF',
                  },
                }}
              >
                Sign In with Google
              </Button>

              <Grid container sx={{my: 1}}>
                <Grid item xs>
                  <Link href="#" variant="body2">Quên mật khẩu?</Link>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    <Link component={RouterLink} to="/register">
                      Bạn chưa có tài khoản? Đăng ký
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <div className='py-3'>
        <Footer />
     </div>
    </ThemeProvider>
  );
}
