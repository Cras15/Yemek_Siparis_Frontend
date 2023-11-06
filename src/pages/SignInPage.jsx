import * as React from 'react';
import Button from '@mui/joy/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/joy/Checkbox';
import Box from '@mui/joy/Box';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/userSlice';
import { Divider, FormControl, FormLabel, Input, Stack } from '@mui/joy';
import GoogleIcon from '../assets/GoogleIcon'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Key, Mail } from '@mui/icons-material';
import { STATUS } from '../components/Status';
import { setSnackbar } from '../redux/snackbarSlice';

const SignInPage = () => {
  const [googleMail, setGoogleMail] = React.useState('');
  const [firstName, setfirstName] = React.useState('');
  const [lastName, setlastName] = React.useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, user } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('firstname') && data.get('lastname') && data.get('email') != "" && data.get('password') != "") {
      dispatch(userRegister({ firstname: data.get('firstname'), lastname: data.get('lastname'), email: data.get('email'), password: data.get('password') })).then((res => {
        console.log(res);
        dispatch(setSnackbar({ children: res.payload.data, color: res.payload.status == 200 ? 'success' : 'danger' }));
        if (res.payload.status == 200) navigate('/giris');
      }));
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(res => res.data);
      setGoogleMail(userInfo.email);
      setfirstName(userInfo.given_name);
      setlastName(userInfo.family_name);
    }
  });

  React.useEffect(() => {
    if (user != "")
      navigate("/");
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {user == "" &&
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }} >
          <Box
            sx={{
              width:
                'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
              transition: 'width var(--Transition-duration)',
              transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              backdropFilter: 'blur(12px)',
              //backgroundColor: 'rgba(255 255 255 / 0.2)',
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '50dvh',
                width:
                  'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
                maxWidth: '100%',
                px: 2,
              }}>
              <Box
                component="main"
                sx={{
                  my: 'auto',
                  py: 2,
                  pb: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  width: 325,
                  maxWidth: '100%',
                  mx: 'auto',
                  borderRadius: 'sm',
                  '& form': {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  },
                }} >
                <Stack gap={4} sx={{ mt: 2 }}>
                  <form
                    onSubmit={(event) => { handleSubmit(event) }}>
                    <Stack direction="row" spacing={1}>
                      <FormControl required>
                        <FormLabel>Ad</FormLabel>
                        <Input sx={{ maxWidth: 160 }} placeholder="Ad" type="text" name="firstname" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                      </FormControl>
                      <FormControl required>
                        <FormLabel>Soyad</FormLabel>
                        <Input sx={{ maxWidth: 160 }} placeholder="Soyad" type="text" name="lastname" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                      </FormControl>
                    </Stack>
                    <FormControl required>
                      <FormLabel>Email</FormLabel>
                      <Input startDecorator={<Mail />} placeholder='E-Mail' type="email" name="email" value={googleMail} onChange={(e) => setGoogleMail(e.target.value)} />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Şifre</FormLabel>
                      <Input startDecorator={<Key />} placeholder='Şifre' type="password" name="password" />
                    </FormControl>
                    <Stack gap={4} sx={{ mt: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Checkbox size="sm" label="Kullanıcı Sözleşmesi" name="persistent" />
                      </Box>
                      <Button type="submit" fullWidth loading={status == STATUS.LOADING}>
                        Kayıt Ol
                      </Button>
                    </Stack>
                  </form>
                </Stack>
                <Divider>
                  ya da
                </Divider>
                <Button
                  variant="soft"
                  color="neutral"
                  fullWidth
                  onClick={loginWithGoogle}
                  startDecorator={<GoogleIcon />}>
                  Google ile devam et
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      }
      <Copyright />

    </Container>
  )
}

export default SignInPage