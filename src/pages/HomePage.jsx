import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Divider,
} from '@mui/joy';
import ScrollableSection from '../components/ScrollableSection';
import useIsLogged from '../hooks/useIsLogged';
import { useSelector, shallowEqual } from 'react-redux';

const HomePage = () => {
  const [shops, setShops] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const isLogged = useIsLogged();
  const token = useSelector((state) => state.user.token, shallowEqual);

  const getShops = useCallback(async () => {
    try {
      const res = await axios.get('/shop/grouped');
      setShops(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getFavorites = useCallback(async () => {
    try {
      const res = await axios.get('/shop/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    if (isLogged) {
      getFavorites();
    }
    getShops();
  }, [isLogged, getFavorites, getShops]);

  return (
    <Container sx={{ py: 4 }}>
      {isLogged && favorites.length > 0 && (
        <>
          <ScrollableSection title="Favorilerin" items={favorites} />
          <Divider sx={{ my: 3 }} />
        </>
      )}
      {shops.map((shop, index) => (
        <React.Fragment key={shop.shopType}>
          <ScrollableSection title={shop.shopType} items={shop.shops} />
          {index !== shops.length - 1 && <Divider sx={{ my: 3 }} />}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default React.memo(HomePage);