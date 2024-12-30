import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Input,
  Link,
  List,
  ListItem,
  Typography,
  Grid,
} from '@mui/joy';
import { Search } from '@mui/icons-material';
import { useSelector, shallowEqual } from 'react-redux';
import useIsLogged from '../hooks/useIsLogged';
import ScrollableSection from '../components/ScrollableSection';

const HomePage = () => {
  const [shops, setShops] = useState([]);
  const [category, setCategory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const isLogged = useIsLogged();
  const token = useSelector((state) => state.user.token, shallowEqual);

  const getShops = useCallback(async () => {
    try {
      const res = await axios.get('/shop/grouped');
      setShops(res.data);
    } catch (error) {
      console.error('Mağazalar çekilirken hata oluştu:', error);
    }
  }, []);

  const getCategories = useCallback(async () => {
    try {
      const res = await axios.get('/category');
      setCategory(res.data);
    } catch (error) {
      console.log('Kategoriler çekilirken hata oluştu:', error);
    }
  }, []);

  const getFavorites = useCallback(async () => {
    if (!isLogged) return;
    try {
      const res = await axios.get('/shop/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(res.data);
    } catch (error) {
      console.error('Favoriler çekilirken hata oluştu:', error);
    }
  }, [token, isLogged]);

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;
      setQuery(value);

      if (!value.trim()) {
        setResults([]);
        return;
      }

      const filteredResults = shops?.flatMap((shopType) =>
        shopType.shops.filter(
          (shop) =>
            shop.shopName.toLowerCase().includes(value.toLowerCase()) ||
            shop.shopDesc.toLowerCase().includes(value.toLowerCase())
        )
      );
      setResults(filteredResults);
    },
    [shops]
  );

  useEffect(() => {
    getShops();
    getCategories();
  }, [getShops, getCategories]);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  return (
    <Box
      sx={{
        py: { xs: 2, md: 4 },
        px: { xs: 2, sm: 4, md: 10 }, // Farklı ekran boyutları için yatay padding
      }}
    >
      {/* Hero Alanı */}
      <Box
        sx={{
          backgroundImage:
            'url("https://miguzmankasapstr01.blob.core.windows.net/miguzmankasapstr01/iyi-bir-hamburgerin-puf-noktalari-gorsel-1-638143896265794231.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 'lg',
          minHeight: { xs: 180, sm: 220, md: 300 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', sm: 'flex-start' },
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'left',
          mb: 4,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Typography
          level="h1"
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
            fontWeight: 'bold',
            mb: 1,
          }}
          color="black"
        >
          Canın Ne Çekiyor?
        </Typography>
        <Typography
          level="body-lg"
          sx={{
            mb: 2,
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
          color="black"
        >
          Hemen sipariş ver, kapına gelsin!
        </Typography>
        <Button
          variant="solid"
          size="lg"
          sx={{ borderRadius: 'md' }}
          component={Link}
          underline="none"
          href="/shops/restaurant"
        >
          Şimdi Sipariş Ver
        </Button>
      </Box>

      {/* Arama Kutusu Alanı */}
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          margin: '20px auto',
          boxShadow: 'lg',
          p: 2,
          borderRadius: 'lg',
          bgcolor: 'background.level1',
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: '60%', lg: '50%' }, margin: '0 auto' }}>
          <Typography level="h3" sx={{ fontSize: { xs: '1.4rem', sm: '1.6rem' } }}>
            Acıktın mı?
          </Typography>
          <Typography level="body-md" sx={{ my: 1 }}>
            Şimdi yemek veya market alışverişi yapmanın tam sırası! Ara ve bul...
          </Typography>
          <Input
            startDecorator={<Search />}
            placeholder="Mağaza veya ürün ara..."
            value={query}
            onChange={handleSearch}
            size="lg"
            sx={{ marginBottom: 2, width: '100%', borderRadius: 'xl' }}
          />
          {results.length > 0 && (
            <List
              sx={{
                position: 'absolute',
                zIndex: 999,
                borderRadius: 8,
                width: '100%',
                marginTop: '4px',
                boxShadow: 'lg',
                backgroundColor: 'background.level1',
              }}
            >
              {results.map((shop, index) => (
                <React.Fragment key={shop.shopId}>
                  <ListItem
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      gap: 1,
                    }}
                    component={Link}
                    underline="none"
                    href={'/shop/' + shop.shopId}
                  >
                    <img
                      src={shop.imageUrl}
                      alt={shop.shopName}
                      style={{
                        width: '75px',
                        height: '50px',
                        borderRadius: 8,
                        objectFit: 'cover',
                        marginRight: '10px',
                      }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography fontWeight="bold">{shop.shopName}</Typography>
                      <Typography fontSize="sm">{shop.shopDesc}</Typography>
                    </Box>
                  </ListItem>
                  {index + 1 !== results.length && <Divider sx={{ my: 0.5 }} />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      </Box>

      {/* Kategoriler (Mutfaklar) */}
      <Box sx={{ mb: 3 }}>
        <Typography level="h2" color="black" sx={{ mb: 2, fontSize: '1.5rem' }}>
          Mutfaklar
        </Typography>
        <Grid container spacing={2}>
          {category?.map((cat) => (
            <Grid xs={6} sm={4} md={3} lg={2} key={cat.categoryId}>
              <Box
                component={Link}
                href={`/shops/restaurant?categoryIds=${cat.categoryId}`}
                underline="none"
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  boxShadow: 'sm',
                  borderRadius: 'lg',
                  bgcolor: 'background.level1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  textAlign: 'center',
                }}
              >
                <img
                  src={cat.categoryImage}
                  alt={cat.categoryName}
                  style={{
                    width: '75px',
                    height: '50px',
                    borderRadius: 8,
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
                <Typography
                  color={cat.categoryColor}
                  sx={{ mt: 1, fontSize: '0.875rem' }}
                >
                  {cat.categoryName}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Favoriler */}
      {isLogged && favorites.length > 0 && (
        <ScrollableSection title="Favorilerin" items={favorites} />
      )}

      {/* Mağaza Grupları */}
      {shops.map((shopGroup, index) => (
        <ScrollableSection
          title={shopGroup.shopType}
          items={shopGroup.shops}
          key={index}
        />
      ))}
    </Box>
  );
};

export default React.memo(HomePage);
