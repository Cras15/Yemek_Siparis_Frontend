import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AspectRatio, Box, Button, Card, CardContent, CardOverflow, Chip, IconButton, Link, Sheet, Skeleton, Stack, Typography } from '@mui/joy';
import { FavoriteRounded, FmdGoodRounded, InfoOutlined, KingBedRounded, Star, WifiRounded, WorkspacePremiumRounded } from '@mui/icons-material';
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
        variant="soft"
        orientation="horizontal"
        sx={{
          display: 'flex',
          width: '90%',
          m: 'auto',
          mt: 4,
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
            <Typography level="body-xs" startDecorator={<FmdGoodRounded />}>
              Collingwood VIC
            </Typography>
            <Typography level="body-xs" startDecorator={<KingBedRounded />}>
              1 bed
            </Typography>
            <Typography level="body-xs" startDecorator={<WifiRounded />}>
              Wi-Fi
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ mt: 'auto' }}>
            <Typography
              level="title-sm"
              startDecorator={
                <React.Fragment>
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.200' }} />
                </React.Fragment>
              }
              sx={{ display: 'flex', gap: 1 }}
            >
              4.0
            </Typography>
            <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: 'right' }}>
              <strong>$540</strong> <Typography level="body-md">total</Typography>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
      <div className='mx-8 mt-4 md:m-16 bg-white'>
        {status !== "pending" ?
          <Stack spacing={5} direction="row" flexWrap="wrap" useFlexGap>
            {shop != "" && shop.products.length > 0 ?
              shop.products.map((res) => (
                <ProductsCard data={res} key={res.productsId} />
              )) :
              <Typography startDecorator={<InfoOutlined />} justifyContent="center" textAlign="center" level="h3">Bu işletme henüz birşey eklememiş</Typography>}
          </Stack>
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