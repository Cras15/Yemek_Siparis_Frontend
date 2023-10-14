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
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/userSlice';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { STATUS } from '../components/Status';

const SignInPage = () => {
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');
  const [sevenery, setSevenery] = React.useState('');

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('firstname') && data.get('lastname') && data.get('email') != "" && data.get('password') != "") {
      dispatch(userRegister({ firstname: data.get('firstname'), lastname: data.get('lastname'), email: data.get('email'), password: data.get('password') })).then((res => {
        setAlertText(res.payload.data != "undefined" ? res.payload.data : "Kayıt olurken bir hata oluştu!");
        setSevenery(res.payload.status == 200 ? "success" : "error");
        setOpen(true);
      }));
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          Kayıt Ol
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                required
                fullWidth
                id="firstname"
                label="Ad"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastname"
                label="Soyad"
                name="lastname"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Adresi"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Şifre"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Kullanıcı sözleşmesini kabul ediyorum."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={status == STATUS.LOADING}
            sx={{ mt: 3, mb: 2 }}
          >
            {status == STATUS.LOADING ? <CircularProgress color="inherit" size='2rem'/> : "Kayıt Ol"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="giris" variant="body2">
                Zaten üye misin ? Giriş yap
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={3000}
        onClose={() => { setOpen(false) }}
        key={open}
      >
        <Alert onClose={() => { setOpen(false) }} severity={sevenery} sx={{ width: '100%' }}>
          {alertText}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default SignInPage