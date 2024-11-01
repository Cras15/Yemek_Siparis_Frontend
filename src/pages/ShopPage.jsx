import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AspectRatio, Box, Button, Card, CardContent, CardOverflow, Chip, DialogTitle, Divider, Grid, IconButton, Link, List, ListItem, Modal, ModalClose, ModalDialog, Sheet, Skeleton, Stack, Typography } from '@mui/joy';
import { FavoriteRounded, FmdGoodRounded, InfoOutlined, KingBedRounded, MopedOutlined, ShoppingCartOutlined, Star, StarRounded, WifiRounded, WorkspacePremiumRounded } from '@mui/icons-material';
import ProductsCard from '../components/ProductsCard';
import { capitalizeFirstLetter, timeAgo } from '../components/Utils';
import { Rating, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { useUI } from '../utils/UIContext';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#4393E4',
  },
  '& .MuiRating-iconHover': {
    color: '#06B6BCB',
  },
});

const ShopPage = () => {
  const [commentModal, setCommentModal] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [shop, setShop] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);
  const { showDoneSnackbar, showErrorSnackbar } = useUI();

  const getShopsById = async (shopId) => {
    await setStatus('pending');
    await axios.get(`/shop/getProducts?shopId=${shopId}`).then((res) => {
      setShop(res.data);
      setStatus('success');
    }).catch((error) => {
      setStatus('error');
    })
  }

  const getShopFavorites = async (shopId) => {
    if (token === "" || token === null) return;
    await axios.get(`/shop/isFavorite?shopId=${shopId}`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      setIsFavorite(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const favoriteShop = async () => {
    if (token === "" || token === null) return showErrorSnackbar("Önce giriş yapmalısın");
    await axios.post(`/shop/toggleFavorite?shopId=${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      setIsFavorite(res.data === "Mağaza favoriye eklendi" ? true : false);
      showDoneSnackbar(res.data);
    }).catch((error) => {
      showErrorSnackbar(error.message);
    });
  }

  React.useEffect(() => {
    getShopsById(id);
    getShopFavorites(id);

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
          flexDirection: { xs: 'column', sm: 'row' }
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
                variant="soft"
                size="sm"
                color={isFavorite ? 'danger' : 'neutral'}
                onClick={favoriteShop}
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
              color={isFavorite ? 'danger' : 'neutral'}
              onClick={favoriteShop}
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
            <Typography level='body-xs'>({shop != "" ? shop.reviewCount : '0'})</Typography>
            <Button fontSize={13} onClick={() => setCommentModal(true)} variant='plain' p={1} borderRadius={10}>Yorumları Gör</Button>
          </Box>
        </CardContent>
      </Card>
      <Divider sx={{ mt: 2 }} />
      {/*<div className='mx-8 mt-4 md:m-16 bg-white'>*/}
      <Grid container spacing={5} sx={{ width: '93%', m: 'auto' }}>
        {status !== "pending" ?
          shop != "" && shop.products.length > 0 ? (
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
          )
          :
          <Card
            variant="outlined"
            orientation="horizontal"
            sx={{ width: 320 }}>
            <AspectRatio ratio="1" sx={{ width: 90 }}>
              <Skeleton variant="overlay">
                <img
                  alt=""
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
      </Grid>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={commentModal}
        onClose={() => setCommentModal(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ModalDialog
          layout="center"
          sx={{
            width: {
              xs: '100%', // Ekran genişliği xs (ekran genişliği küçük) için %90 genişlik
              sm: '80%', // sm (küçük) için %80 genişlik
              md: 500,    // md (orta) ve üzeri için 500px genişlik
            },
            maxHeight: '80vh', // Yüksekliği ekranın %80'i ile sınırla
            overflow: 'auto',  // İçerik taşarsa kaydırma ekle
          }}
        >
          <ModalClose />
          <DialogTitle id="modal-title">Değerlendirmeler</DialogTitle>
          <Typography id="modal-desc" level="body-sm" mb={2}>
            {shop?.shopName}
          </Typography>
          <List
            sx={[
              {
                mx: 'calc(-1 * var(--ModalDialog-padding))',
                px: 'var(--ModalDialog-padding)',
              },
              { overflow: 'auto' },
            ]}
          >
            <ListItem>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Typography level="title-sm">Servis: &nbsp;&nbsp;&nbsp;&nbsp;<StyledRating sx={{ top: 4 }} value={shop?.shopServiceRating} precision={0.2} size='small' readOnly /> <Typography fontWeight="bold" color='primary'>{shop?.shopServiceRating >= 0 ? shop.shopServiceRating.toFixed(1) : "Yükleniyor..."}</Typography></Typography>
                  <Typography level="title-sm">Lezzet: &nbsp;&nbsp;&nbsp;<StyledRating sx={{ top: 4 }} value={shop?.shopTasteRating} precision={0.2} size='small' readOnly /> <Typography fontWeight="bold" color='primary'>{shop?.shopTasteRating >= 0 ? shop.shopTasteRating.toFixed(1) : "Yükleniyor..."}</Typography></Typography>
                  <Typography level="title-sm">Teslimat: <StyledRating sx={{ top: 4 }} value={shop?.shopDeliveryRating} precision={0.2} size='small' readOnly /> <Typography fontWeight="bold" color='primary'>{shop?.shopDeliveryRating >= 0 ? shop.shopDeliveryRating.toFixed(1) : "Yükleniyor..."}</Typography></Typography>
                </CardContent>
              </Card>
            </ListItem>
            {shop?.orders?.map((data, index) => (
              data?.review && (
                <ListItem key={index}>
                  <Card variant="soft" sx={{ width: "100%", mx: 0.5 }}>
                    <CardContent>
                      <Typography level="title-lg">{capitalizeFirstLetter(data.review.reviewer)}</Typography>
                      <Typography level='body-sm' sx={{ color: 'text.tertiary' }}> {timeAgo(data.review.reviewDate)} önce</Typography>
                      <Typography level='body-md' sx={{ width: "100%", mb: 2 }}>Servis: <Typography color='primary'>{data.review.serviceRating}</Typography> Lezzet: <Typography color='primary'>{data.review.tasteRating}</Typography> Teslimat: <Typography color='primary'>{data.review.deliveryRating}</Typography></Typography>

                      <Typography>{data.review.comment}</Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              )
            ))}
          </List>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default ShopPage;