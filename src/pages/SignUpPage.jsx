import * as React from 'react';
import Button from '@mui/joy/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/joy/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/userSlice';
import { Divider, FormControl, FormLabel, GlobalStyles, Input, Stack } from '@mui/joy';
import GoogleIcon from '../components/GoogleIcon'

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
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      {localStorage.getItem('token') == "null" || localStorage.getItem == "undefined" || !localStorage.getItem('token') &&
        <Box
          sx={{
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
                minHeight: '100dvh',
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
                  width: 400,
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
                    <FormControl required>
                      <FormLabel>Email</FormLabel>
                      <Input type="email" name="email" />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Şifre</FormLabel>
                      <Input type="password" name="password" />
                    </FormControl>
                    <Stack gap={4} sx={{ mt: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Checkbox size="sm" label="Beni hatırla" name="persistent" />
                        <Link level="title-sm" href="#">
                          Şifreni mi unuttun?
                        </Link>
                      </Box>
                      <Button type="submit" fullWidth>
                        Giriş Yap
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

export default SignUpPage