import React from 'react';
import { Outlet } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  Typography,
  Dropdown,
  Button,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Divider,
  Link,
  Box,
} from '@mui/joy';
import {
  AdminPanelSettingsOutlined,
  Home,
  LogoutOutlined,
  PersonOutline,
  SettingsOutlined,
  ShoppingBasketOutlined,
  SupervisorAccountOutlined,
  SupportOutlined,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import BasketDropdown from './BasketDropdown';
import useUserLogout from '../hooks/useUserLogout';
import { capitalize } from '@mui/material';

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const logout = useUserLogout();

  return (
    <>
      <Box component="nav" sx={{ boxShadow: 'lg' }}>
        <Box
          sx={{
            mx: 'auto',
            px: { xs: 2, sm: 6, lg: 8 },
            // mr: 10, // Kaldırıldı veya aşağıdaki gibi duyarlı hale getirildi
            mr: { xs: 2, sm: 6, lg: 8 },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              height: 64,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                display: { xs: 'flex', sm: 'none' },
                alignItems: 'center',
              }}
            >
              <IconButton component={Link} href="/" size="sm" color="primary">
                <Home />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                alignItems: { xs: 'center', sm: 'stretch' },
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component={Link}
                href="/"
                color="primary"
                sx={{
                  mr: 2,
                  ml: 6,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  borderRadius: 5,
                  p: 1,
                }}
                underline="none"
              >
                Ayağımagelsin
              </Typography>
            </Box>

            {user != '' ? (
              <Box
                sx={{
                  position: { xs: 'absolute', sm: 'static' },
                  top: { xs: 0, sm: 'auto' },
                  bottom: { xs: 0, sm: 'auto' },
                  right: { xs: 0, sm: 'auto' },
                  display: 'flex',
                  alignItems: 'center',
                  pr: { xs: 2, sm: 0 },
                  ml: { xs: 0, sm: 6 },
                }}
              >
                <Box sx={{ position: 'relative', mr: 3 }}>
                  <Dropdown>
                    <MenuButton slots={{ root: IconButton }} color="primary">
                      <PersonOutline color="primary" />
                      <Typography color="primary">
                        {user?.firstname && user?.lastname
                          ? `${capitalize(user.firstname)} ${capitalize(user.lastname)}`
                          : ''}
                      </Typography>
                    </MenuButton>
                    <Menu
                      sx={{
                        mx: 44,
                        '--List-radius': '20px',
                        '--ListItem-minHeight': '44px',
                        '--List-padding': '8px',
                        '--List-gap': '1px',
                        '--List-nestedInsetStart': 'var(--ListItemDecorator-size)',
                      }}
                      placement="bottom-end"
                    >
                      {user.role === 'ADMIN' && (
                        <MenuItem component={Link} href="/admin" color="primary" underline="none">
                          <ListItemDecorator>
                            <AdminPanelSettingsOutlined />
                          </ListItemDecorator>
                          Admin Paneli
                        </MenuItem>
                      )}
                      {(user.role === 'MANAGER' || user.role === 'ADMIN') && (
                        <>
                          <MenuItem component={Link} href="/manager" color="primary" underline="none">
                            <ListItemDecorator>
                              <SupervisorAccountOutlined />
                            </ListItemDecorator>
                            Yetkili Paneli
                          </MenuItem>
                          <Divider sx={{ my: 1 }} />
                        </>
                      )}
                      <MenuItem
                        component={Link}
                        href="/siparislerim"
                        color="primary"
                        underline="none"
                        sx={{ pr: 8 }}
                      >
                        <ListItemDecorator>
                          <ShoppingBasketOutlined />
                        </ListItemDecorator>
                        Siparişlerim
                      </MenuItem>
                      <MenuItem component={Link} href="/profil" color="primary" underline="none">
                        <ListItemDecorator>
                          <PersonOutline />
                        </ListItemDecorator>
                        Profil
                      </MenuItem>
                      <MenuItem component={Link} href="/destek" color="primary" underline="none">
                        <ListItemDecorator>
                          <SupportOutlined />
                        </ListItemDecorator>
                        Destek Taleplerim
                      </MenuItem>
                      <ListDivider />
                      <MenuItem onClick={logout} color="primary">
                        <ListItemDecorator>
                          <LogoutOutlined />
                        </ListItemDecorator>
                        Çıkış Yap
                      </MenuItem>
                    </Menu>
                  </Dropdown>
                </Box>
                <BasketDropdown />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                  ml: { xs: 0, sm: 6 }, // Duyarlı margin-left
                  width: { xs: '100%', sm: 'auto' }, // Mobilde tam genişlik
                  justifyContent: { xs: 'center', sm: 'flex-start' }, // Mobilde ortala
                }}
              >
                <Button
                  color="primary"
                  startDecorator={<PersonIcon />}
                  component={Link}
                  underline="none"
                  href="/giris"
                  sx={{
                    padding: { xs: '6px 12px', sm: '8px 16px' }, // Duyarlı padding
                    minWidth: { xs: 'auto', sm: 'unset' }, // Mobilde minimum genişliği kaldır
                  }}
                >
                  Giriş Yap
                </Button>
                <Button
                  color="primary"
                  startDecorator={<PersonAddIcon />}
                  component={Link}
                  underline="none"
                  href="/kayit"
                  sx={{
                    padding: { xs: '6px 12px', sm: '8px 16px' }, // Duyarlı padding
                    minWidth: { xs: 'auto', sm: 'unset' }, // Mobilde minimum genişliği kaldır
                  }}
                >
                  Kayıt Ol
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
