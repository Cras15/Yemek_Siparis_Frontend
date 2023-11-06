import { Button, Snackbar, Stack } from '@mui/material'
import { deepPurple } from '@mui/material/colors';
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Avatar, Typography, Dropdown, IconButton, ListDivider, ListItemDecorator, Menu, MenuButton, MenuItem, Divider, Alert } from '@mui/joy';
import { Home, LogoutOutlined, PersonOutline, SettingsOutlined, SupervisorAccountOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/userSlice';
import BasketDropdown from './BasketDropdown';
import { setSnackbar } from '../redux/snackbarSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, user } = useSelector((state) => state.user);
  const { snackbar } = useSelector((state) => state.snackbar);

  const logout = () => {
    dispatch(userLogout());
  }

  return (
    <>
      <nav className="bg-gray-800 shadow-lg">
        <div className="mx-auto px-2 sm:px-6 lg:px-8 mr-10">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <IconButton onClick={() => navigate('/')} size='sm' sx={{
                color: 'rgb(209,213,  219)',
                "&:hover": {
                  bgcolor: "rgb(55,65,81)",
                  color: "white"
                }
              }}>
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
                sx={{
                  mr: 2,
                  ml: 6,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  textDecoration: 'none',
                  borderRadius: 2,
                  pl: 1,
                  pr: 1,
                  color: 'rgb(209,213,  219)',
                  "&:hover": {
                    bgcolor: "rgb(55,65,81)",
                    color: "white"
                  }

                }}
              >
                Ayağımagelsin
              </Typography>

            </div>

            {user != "" ?
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <BasketDropdown />
                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </button>

                <div className="relative ml-3">
                  <Dropdown>
                    <MenuButton
                      slots={{ root: IconButton }}
                      sx={{
                        "&:hover": {
                          background: "transparent"
                        }
                      }}
                    >
                      <Avatar sx={{ bgcolor: deepPurple[500], cursor: "pointer", color: "white" }}>{user.firstname.toUpperCase().charAt(0)}{user.lastname.toUpperCase().charAt(0)}</Avatar>
                    </MenuButton>
                    <Menu sx={{ minWidth: 160, '--ListItemDecorator-size': '24px' }} placement="bottom-end">
                      {user.role == "MANAGER" &&
                        <>
                          <MenuItem onClick={() => navigate('/manager')}>
                            <ListItemDecorator sx={{ mr: 1 }}><SupervisorAccountOutlined /></ListItemDecorator> Yetkili Paneli
                          </MenuItem>
                          <Divider />
                        </>
                      }
                      <MenuItem>
                        <ListItemDecorator sx={{ mr: 1 }}>
                          <PersonOutline />
                        </ListItemDecorator>{' '}Profil
                      </MenuItem>
                      <MenuItem>
                        <ListItemDecorator sx={{ mr: 1 }}>
                          <SettingsOutlined />
                        </ListItemDecorator>{' '}Ayarlar
                      </MenuItem>
                      <ListDivider />
                      <MenuItem onClick={() => logout()}>
                        <ListItemDecorator sx={{ mr: 1 }}>
                          <LogoutOutlined />
                        </ListItemDecorator>{' '}Çıkış Yap
                      </MenuItem>
                    </Menu>
                  </Dropdown>
                </div>
              </div>
              : <>
                <Stack spacing={2} direction="row">
                  <BasketDropdown />
                  <Button sx={{
                    color: 'rgb(209,213,  219)',
                    "&:hover": {
                      bgcolor: "rgb(55,65,81)",
                      color: "white"
                    }
                  }} startIcon={<PersonIcon />} href='/giris'>Giriş Yap</Button>
                  <Button sx={{
                    color: 'rgb(209,213,  219)',
                    "&:hover": {
                      bgcolor: "rgb(55,65,81)",
                      color: "white"
                    }
                  }} startIcon={<PersonAddIcon />} href='/kayit'>Kayıt Ol</Button>
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
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => dispatch(setSnackbar(null))}
          autoHideDuration={4000}
        >
          <Alert {...snackbar} onClose={() => dispatch(setSnackbar(null))} />
        </Snackbar>
      )}
      <Outlet />
    </>
  )
}

export default Navbar