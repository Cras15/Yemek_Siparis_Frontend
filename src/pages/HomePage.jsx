import axios from 'axios';
import React from 'react';
import ShopsCard from '../components/ShopsCard';
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from '@mui/joy';
import { InfoOutlined, TuneRounded } from '@mui/icons-material';
import HomePageFilterModal from '../components/HomePageFilterModal';
import FilterChild from '../components/FilterChild';
import { useLocation } from 'react-router-dom';
import ScrollableSection from '../components/ScrollableSection';

const HomePage = () => {
  const [shops, setShops] = React.useState([]);

  const getShops = async () => {
    try {
      const res = await axios.get('/shop/grouped');
      setShops(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getShops();
  }
    , []);

  return (
    <Container sx={{ py: 4 }}>
      {shops && shops.map((shop, index) => (
        <React.Fragment key={shop.shopType}>
          <ScrollableSection title={shop.shopType} items={shop.shops} />
          {index !== shops.length - 1 && <Divider sx={{ my: 3 }} />}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default HomePage;
