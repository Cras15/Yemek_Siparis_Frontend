import { Stack, capitalize, keyframes } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Typography, Dropdown, Button, Snackbar, IconButton, ListDivider, ListItemDecorator, Menu, MenuButton, MenuItem, Divider } from '@mui/joy';
import { Check, Home, LogoutOutlined, PersonOutline, SettingsOutlined, ShoppingBasketOutlined, SupervisorAccountOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/userSlice';
import BasketDropdown from './BasketDropdown';
import { closeSnackbar, setSnackbar } from '../redux/snackbarSlice';

const inAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const outAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { snackbar } = useSelector((state) => state.snackbar);

  const logout = () => {
    dispatch(userLogout());
    dispatch(setSnackbar({ children: "Başarıyla çıkış yapıldı.", color: "success" }));
    navigate('/');

  }

  return (
    <>
      <nav className="bg-gray-50 shadow-lg">
        <div className="mx-auto px-2 sm:px-6 lg:px-8 mr-10">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <IconButton onClick={() => navigate('/')} size='sm' color='primary'>
                <Home />
              </IconButton>
              {/*<button onClick={() => setActive(!active)} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>

                <span className="sr-only">Ana menüyü aç</span>

                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>*/}
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                color='primary'
                sx={{
                  mr: 2,
                  ml: 6,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  borderRadius: 5,
                  p: 1,
                }}
              >
                Ayağımagelsin
              </Typography>

            </div>

            {user != "" ?
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="relative mr-3">
                  <Dropdown>
                    <MenuButton
                      slots={{ root: IconButton }}
                      color='primary'
                    >
                      <PersonOutline color='primary' />
                      <Typography color='primary'>{capitalize(user.firstname) + " " + capitalize(user.lastname)}</Typography>

                    </MenuButton>
                    <Menu sx={{
                      mx: 44,
                      "--List-radius": "20px",
                      "--ListItem-minHeight": "44px",
                      "--List-padding": "8px",
                      "--List-gap": "1px",
                      "--List-nestedInsetStart": "var(--ListItemDecorator-size)"
                    }} placement="bottom-end">
                      {user.role == "MANAGER" &&
                        <>
                          <MenuItem onClick={() => navigate('/manager')} color='primary'>
                            <ListItemDecorator><SupervisorAccountOutlined /></ListItemDecorator> Yetkili Paneli
                          </MenuItem>
                          <Divider sx={{ my: 1 }} />
                        </>
                      }
                      <MenuItem onClick={() => navigate("/siparislerim")} color='primary' sx={{ pr: 8 }}>
                        <ListItemDecorator>
                          <ShoppingBasketOutlined />
                        </ListItemDecorator>Siparişlerim
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/profil")} color='primary'>
                        <ListItemDecorator >
                          <PersonOutline />
                        </ListItemDecorator>Profil
                      </MenuItem>
                      <MenuItem color='primary'>
                        <ListItemDecorator >
                          <SettingsOutlined />
                        </ListItemDecorator>Ayarlar
                      </MenuItem>
                      <ListDivider />
                      <MenuItem onClick={() => logout()} color='primary'>
                        <ListItemDecorator >
                          <LogoutOutlined />
                        </ListItemDecorator>Çıkış Yap
                      </MenuItem>
                    </Menu>
                  </Dropdown>
                </div>
                <BasketDropdown />
              </div>
              : <>
                <Stack spacing={2} direction="row">
                  {user != "" &&
                    <BasketDropdown />}
                  <Button
                    color="primary"
                    component="a"
                    startDecorator={<PersonIcon />} href='/giris'>
                    Giriş Yap
                  </Button>
                  <Button
                    color="primary"
                    component="a"
                    startDecorator={<PersonAddIcon />} href='/kayit'>
                    Kayıt Ol
                  </Button>
                </Stack>
              </>}
          </div>

          {/* <Collapse in={active}>
            <div className="sm:hidden" id="mobile-menu">
              <div className="space-y-1 px-2 pb-3 pt-2">

              </div>
            </div>
                </Collapse>*/}
        </div >
      </nav >
      <Snackbar
        variant="solid"
        //color="success"
        open={!!snackbar}
        onClose={() => dispatch(closeSnackbar())}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        startDecorator={<Check />}
        autoHideDuration={3000}
        {...snackbar}
        endDecorator={
          <Button
            onClick={() => dispatch(closeSnackbar())}
            size="sm"
            variant="solid"
            color={snackbar?.color}
          >
            OK
          </Button>
        }
        //sx={{ ml: 1 }}
        animationDuration={600}
        sx={{
          ml: 1,
          animation: snackbar?.open
            ? `${inAnimation} ${600}ms forwards`
            : `${outAnimation} ${600}ms forwards`,
        }}
      />
      {/*!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => dispatch(setSnackbar(null))}
          autoHideDuration={4000}
        >
          <Alert {...snackbar} onClose={() => dispatch(setSnackbar(null))} />
        </Snackbar>
         )*/
      }
      <Outlet />
    </>
  )
}

export default Navbar