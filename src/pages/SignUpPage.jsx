import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/userSlice';

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') != "" && data.get('password') != "") {
      dispatch(userLogin({ username: data.get('email'), password: data.get('password') }));
      /*axios.post("/api/auth/login", {
        username: data.get('email'),
        password: data.get('password')
      },).then(function (response) {
        localStorage.setItem('token', response.data);
        navigate("/home");
      })*/
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem('token') != null && localStorage.getItem != "undefined")
      navigate("/home");
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {localStorage.getItem('token') == "null" || localStorage.getItem == "undefined" || !localStorage.getItem('token') &&
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Giriş Yap
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Adresi"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Giriş Yap
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Şifremi unuttum
                </Link>
              </Grid>
              <Grid item>
                <Link href="kayit" variant="body2">
                  {"Hesabın yok mu? Kayıt Ol"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      }
      <Copyright />
    </Container>
  )
}

export default SignUpPage