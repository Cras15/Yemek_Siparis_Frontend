import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/joy';
import Navbar from './Navbar';
import Footer2 from './Footer2';

const Layout = () => {
  const location = useLocation();
  const isManagerOrAdmin = location.pathname.startsWith('/manager') || location.pathname.startsWith('/admin');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {!isManagerOrAdmin && <Navbar />}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Outlet />
      </Box>
      {!isManagerOrAdmin && <Footer2 />}
    </Box>
  );
};

export default Layout;
