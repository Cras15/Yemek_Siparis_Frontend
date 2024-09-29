import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AspectRatio, Box, Button, Card, CardContent, CardOverflow, Chip, Divider, Grid, IconButton, Link, Sheet, Skeleton, Stack, Typography } from '@mui/joy';
import { FavoriteRounded, FmdGoodRounded, InfoOutlined, KingBedRounded, MopedOutlined, ShoppingCartOutlined, Star, StarRounded, WifiRounded, WorkspacePremiumRounded } from '@mui/icons-material';
import ProductsCard from '../components/ProductsCard';

const ShopsPage = () => {
  const [shop, setShop] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const { id } = useParams();

  const getShopsById = async (shopId) => {
    await setStatus('pending');
    await axios.get(`/shop/getProducts?shopId=${shopId}`).then((res) => {
      console.log(res);
      setShop(res.data);
      setStatus('success');
    }).catch((error) => {
      setStatus('error');
    })
  }

  React.useEffect(() => {
    getShopsById(id);
  }, []);

  return (
    <>
      <Card
        variant="outlined"
        orientation="horizontal"
        sx={{
          display: 'flex',
          width: '90%',
          m: 'auto',
          mt: 4,
          background: 'transparent',
          flexDirection: { xs: 'column', sm: 'row' },
          // '&:hover': {
          //   boxShadow: 'lg',
          //   borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
          // },
        }}
      >
        <CardOverflow
          sx={{
            mr: { xs: 'var(--CardOverflow-offset)', sm: 0 },
            mb: { xs: 0, sm: 'var(--CardOverflow-offset)' },
            '--AspectRatio-radius': {
              xs: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0',
              sm: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))',
            },
          }}
        >
          <AspectRatio
            ratio="16/9"
            flex
            sx={{
              minWidth: { sm: 160, md: 200 },
              '--AspectRatio-maxHeight': { xs: '160px', sm: '9999px' },
            }}
          >
            <img alt="" src={shop.imageUrl} />
            <Stack
              alignItems="center"
              direction="row"
              sx={{ position: 'absolute', top: 0, width: '100%', p: 1 }}
            >
              <Chip
                variant="soft"
                color="success"
                startDecorator={<WorkspacePremiumRounded />}
                size="md"
              >
                Ödüllü Restoran
              </Chip>
              <IconButton
                variant="plain"
                size="sm"
                // color={isLiked ? 'danger' : 'neutral'}
                // onClick={() => setIsLiked((prev) => !prev)}
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  ml: 'auto',
                  borderRadius: '50%',
                  zIndex: '20',
                }}
              >
                <FavoriteRounded />
              </IconButton>
            </Stack>
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Stack
            spacing={1}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography level="title-md">{shop.shopName}</Typography>
              <Typography level="body-sm">
                {shop.shopDesc}
              </Typography>
            </div>
            <IconButton
              variant="plain"
              size="sm"
              // color={isLiked ? 'danger' : 'neutral'}
              // onClick={() => setIsLiked((prev) => !prev)}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                borderRadius: '50%',
              }}
            >
              <FavoriteRounded />
            </IconButton>
          </Stack>
          <Stack
            spacing="0.25rem 1rem"
            direction="row"
            useFlexGap
            flexWrap="wrap"
            sx={{ my: 0.25 }}
          >
            <Chip color='danger' variant='soft'>%40 İndirim</Chip>
            <Typography level="body-xs" startDecorator={<MopedOutlined />}>
              Ücretsiz Teslimat
            </Typography>
            <Typography level="body-xs" startDecorator={<ShoppingCartOutlined />}>
              Minimum Sepet Tutarı {shop.minOrderPrice}₺
            </Typography>
          </Stack>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }} >
            <StarRounded sx={{ mr: -0.5 }} color='primary' />
            <Typography sx={{ mr: -0.5 }}>{shop.shopRating?.toFixed(1)}</Typography>
            <Typography level='body-xs'>(100+)</Typography>
            <Link fontSize={13} underline='none' variant='plain' p={1} borderRadius={10}>Yorumları Gör</Link>
          </Box>
        </CardContent>
      </Card>
      <Divider sx={{ mt: 2 }} />
      <div className='mx-8 mt-4 md:m-16 bg-white'>
        {status !== "pending" ?
          <Grid container spacing={5}>
            {shop != "" && shop.products.length > 0 ? (
              shop.products.map((res) => (
                <Grid xs={12} md={6} lg={4} key={res.productsId}>
                  <ProductsCard data={res} />
                </Grid>
              ))
            ) : (
              <Grid xs={12}>
                <Typography
                  startDecorator={<InfoOutlined />}
                  justifyContent="center"
                  textAlign="center"
                  level="h3"
                >
                  Bu işletme henüz bir şey eklememiş
                </Typography>
              </Grid>
            )}
          </Grid>

          :
          <Card
            variant="outlined"
            orientation="horizontal"
            sx={{ width: 320 }}>
            <AspectRatio ratio="1" sx={{ width: 90 }}>
              <Skeleton variant="overlay">
                <img
                  alt=""
                  src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                />
              </Skeleton>
            </AspectRatio>
            <CardContent>
              <Typography level="title-lg" id="card-description"><Skeleton>Lahmacun</Skeleton></Typography>
              <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                <Typography><Skeleton>Seydişehir, Konya</Skeleton></Typography>
              </Typography>
              <Typography><Skeleton>123.0₺</Skeleton></Typography>
            </CardContent>
          </Card>}
      </div>
    </>
  )
}

export default ShopsPage;