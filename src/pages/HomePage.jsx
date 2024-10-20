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
  Grid,
  Skeleton,
  Typography,
} from '@mui/joy';
import { InfoOutlined, TuneRounded } from '@mui/icons-material';
import HomePageFilterModal from '../components/HomePageFilterModal';
import FilterChild from '../components/FilterChild';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const [shops, setShops] = React.useState([]);
  const [status, setStatus] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortType = searchParams.get('sortType');
  const categoryIds = searchParams.get('categoryIds');
  const minOrderPrice = searchParams.get('minOrderPrice');

  const getShops = async () => {
    setStatus('pending');

    const queryParams = new URLSearchParams();

    if (sortType) queryParams.append('sortType', sortType);
    if (categoryIds) queryParams.append('categoryIds', categoryIds);
    if (minOrderPrice)
      queryParams.append('minOrderPrice', minOrderPrice);

    try {
      const res = await axios.get(
        queryParams.toString()
          ? `/shop/filter?${queryParams.toString()}`
          : '/shop/getAll'
      );
      setShops(res.data);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get('/category');
      setCategories(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  React.useEffect(() => {
    getShops();
    getCategories();
  }, [location.search]);

  return (
    <Grid container spacing={0}>
      <Grid xs={0} md={2}>
        <Card
          variant="outlined"
          invertedColors
          sx={{
            boxShadow: 'xl',
            ml: 7,
            mt: 6.5,
            minWidth: 250,
            position: 'sticky',
            display: {
              lg: 'inherit',
              md: 'none',
              sm: 'none',
              xs: 'none',
            },
          }}
        >
          <CardContent orientation="horizontal">
            <Typography level="title-lg">Filtrele</Typography>
          </CardContent>
          <CardActions>
            <FilterChild categorys={categories} />
          </CardActions>
        </Card>
      </Grid>
      <Button
        variant="solid"
        color="primary"
        sx={{
          borderRadius: 'lg',
          mx: 4,
          mt: 4,
          display: { lg: 'none', md: 'inherit' },
        }}
        fullWidth
        onClick={() => setModalOpen(true)}
        startDecorator={<TuneRounded />}
      >
        Filtrele
      </Button>
      <Grid xs={12} md={12} lg={10}>
        <Box
          sx={{
            mx: { xs: 8, md: 16 },
            mt: 4,
            textAlign: 'center',
            gridColumn: {
              lg: 'span 3',
              xl: 'span 4',
            },
          }}
        >
          {status !== 'pending' ? (
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridAutoFlow: 'row dense',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                },
              }}
            >
              {shops.length !== 0 ? (
                shops.map((data, i) => (
                  <ShopsCard key={i} data={data} />
                ))
              ) : (
                <Typography
                  startDecorator={<InfoOutlined />}
                  justifyContent="center"
                  textAlign="center"
                  level="h3"
                  sx={{ gridColumn: '1/-1' }} // Tüm sütunlara yayılması için eklendi.
                >
                  Bu bölgede henüz hizmet veremiyoruz.
                </Typography>
              )}
            </Box>
          ) : (
            <Card
              variant="outlined"
              sx={{ width: 343, display: 'flex', gap: 2, mx: 'auto', mt: 4 }}
            >
              <AspectRatio ratio="21/9">
                <Skeleton variant="overlay">
                  <img
                    alt=""
                    src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                  />
                </Skeleton>
              </AspectRatio>
              <Typography>
                <Skeleton>
                  Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries.
                </Skeleton>
              </Typography>
            </Card>
          )}
        </Box>
      </Grid>
      <HomePageFilterModal
        open={modalOpen}
        setOpen={setModalOpen}
        categorys={categories}
      />
    </Grid>
  );
};

export default HomePage;
