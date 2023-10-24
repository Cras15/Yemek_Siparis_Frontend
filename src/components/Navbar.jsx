import { Badge, Button, Collapse, Popover, Snackbar, Stack, Typography } from '@mui/material'
import { deepPurple } from '@mui/material/colors';
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AspectRatio, Avatar, Box, Card, CardContent, Chip, Dropdown, IconButton, ListDivider, ListItemDecorator, Menu, MenuButton, MenuItem } from '@mui/joy';
import { Add, Home, Logout, LogoutOutlined, Person, PersonOutline, Remove, Settings, SettingsOutlined, ShoppingBasket } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/userSlice';
import { addBasket, removeBasket } from '../redux/basketSlice';

const Navbar = () => {
  const [active, setActive] = React.useState(false);
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const { status, user } = useSelector((state) => state.user);
  const { baskets } = useSelector((state) => state.basket);

  const logout = () => {
    dispatch(userLogout());
  }

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto px-2 sm:px-6 lg:px-8 mr-10">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <IconButton onClick={()=>navigate('/')} size='sm' sx={{
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
                Ayağıma Gelsin
              </Typography>

            </div>
            <Dropdown>
              <MenuButton color="neutral" sx={{
                mr: 2, color: 'rgb(209,213,  219)',
                "&:hover": {
                  bgcolor: "rgb(55,65,81)",
                  color: "white"
                }
              }} slots={{ root: IconButton }} >
                <Badge badgeContent={baskets.length} showZero={false} color="primary" size='sm' variant="solid">
                  <ShoppingBasket sx={{ color: "rgb(156 163 175)" }} />
                </Badge>
              </MenuButton>
              <Menu>
                {baskets.length > 0 ?
                  baskets.map((data) => (
                    <Card
                      variant="plain"
                      orientation="horizontal"
                      key={data.productsId}
                      sx={{
                        width: 320,
                      }}>
                      <AspectRatio ratio="1" sx={{ width: 90 }}>
                        <img
                          src={data.imageUrl}
                          srcSet={data.imageUrl != null ? data.imageUrl : "https://images.deliveryhero.io/image/fd-tr/LH/h6km-listing.jpg?width=400&height=292&quot;"}
                          loading="lazy"
                          alt=""
                        />
                      </AspectRatio>
                      <CardContent>
                        <Typography level="title-lg" id="card-description">
                          {data.productName}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Chip
                            variant="outlined"
                            color="primary"
                            size="sm"
                            sx={{ pointerEvents: 'none' }}
                          >
                            {data.price}₺
                          </Chip>
                          <IconButton
                            aria-label="Sepete Ekle"
                            component="button"
                            sx={{
                              ml: 'auto',
                              borderRadius: 20,
                              color: "#4393E4",
                              "&:hover":
                                { color: "#0B6BCB" }
                            }}
                            onClick={() => dispatch(removeBasket(data))}
                          >
                            <Remove />
                          </IconButton>
                          <Typography>{data.unit}</Typography>
                          <IconButton
                            aria-label="Sepete Ekle"
                            component="button"
                            sx={{
                              borderRadius: 20,
                              color: "#4393E4",
                              "&:hover":
                                { color: "#0B6BCB" }
                            }}
                            onClick={() => dispatch(addBasket(data))}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  )) : <Typography sx={{ padding: 1, px: 4 }}>Sepetin boş</Typography>}
              </Menu>
            </Dropdown>
            {user != "" ?
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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

      <Outlet />
    </>
  )
}

export default Navbar