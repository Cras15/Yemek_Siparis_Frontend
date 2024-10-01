import { Add, Check, Delete, Info, KeyboardArrowRight, Remove } from '@mui/icons-material';
import { AspectRatio, ButtonGroup, Button, Card, CardContent, Chip, IconButton, List, ListDivider, ListItem, ListItemDecorator, Table, Typography, ListSubheader, Divider, CardActions, Skeleton, Input, Grid } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux';
import { addBasket, addBasketItem, getBasket, removeBasket, removeBasketItem } from '../redux/basketSlice';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STATUS } from '../components/Status';
import { useUI } from '../utils/UIContext';


const BasketPaymentItem = ({ title, price }) => {
  return (
    <ListItem>
      <ListItemDecorator>
        <Check />
      </ListItemDecorator>
      <Typography sx={{ mr: 'auto' }}> {title}</Typography>
      <Typography>{price}</Typography>
    </ListItem>
  )
}

const BasketPage = () => {
  const [discount, setDiscount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { baskets, status } = useSelector((state) => state.basket);
  const { showErrorSnackbar } = useUI();

  return (
    <div className='m-auto mt-5 w-11/12 sm:w-10/12 rounded-lg grid gap-9 md:grid-flow-col grid-flow-row'>
      <div className='md:col-span-2'>
        <List
          variant="outlined"
          sx={{
            borderRadius: 'sm',
            minWidth: 240,
          }}>
          <ListSubheader color="primary" sx={{ fontWeight: 800 }}>Sepetim</ListSubheader>
          <ListDivider />
          {status != STATUS.LOADING ? (
            baskets != "" && baskets?.basketItems.length != 0 ?
              baskets.basketItems.map((data, i) => (
                <div key={data.basketItemId}>
                  <ListItem>
                    <ListItemDecorator>
                      <AspectRatio ratio="1" sx={{ width: 130 }}>
                        <img
                          src={data.imageUrl}
                          srcSet={data.product.imageUrl != null ? data.product.imageUrl : "https://images.deliveryhero.io/image/fd-tr/LH/h6km-listing.jpg?width=400&height=292&quot;"}
                          loading="lazy"
                          alt=""
                        />
                      </AspectRatio>
                    </ListItemDecorator>
                    <CardContent sx={{ ml: 3 }}>
                      <Typography
                        level="title-md"
                        fontWeight="bold"
                        id="card-description"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'block',
                          whiteSpace: 'nowrap',
                          width: '100%',
                        }}
                      >
                        {data.product.productName}
                      </Typography>
                      <Typography
                        level="body-sm"
                        aria-describedby="card-description"
                        mb={1}
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          whiteSpace: 'normal',
                          color: 'text.tertiary',
                        }}
                      >
                        {data.product.productDesc}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Chip
                          variant="outlined"
                          color="primary"
                          size="md"
                          sx={{ pointerEvents: 'none' }}
                        >
                          {data.product.price * data.unit}₺
                        </Chip>
                        <ButtonGroup aria-label="outlined primary button group" sx={{ ml: 'auto', mb: 'auto' }}>
                          <IconButton onClick={() => dispatch(removeBasketItem(data.product)).then(() => dispatch(getBasket()))}>
                            {data.unit > 1 ? <Remove color='primary' /> : <Delete color='primary' />}
                          </IconButton>
                          <Button disabled>{data.unit}</Button>
                          <IconButton onClick={() => dispatch(addBasketItem(data.product)).then(() => dispatch(getBasket()))}>
                            <Add color='primary' />
                          </IconButton>
                        </ButtonGroup>
                      </Box>
                    </CardContent>
                  </ListItem>
                  {i != baskets.basketItems.length - 1 &&
                    <ListDivider inset="gutter" />
                  }
                </div>
              )) : <Typography level="title-lg" sx={{ textAlign: 'center' }}>Sepetinizde ürün bulunmamaktadır.</Typography>)
            : <ListItem>
              <ListItemDecorator>
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                  <Skeleton>
                    <img
                      src={null}
                      srcSet={null}
                      alt=""
                    />
                  </Skeleton>
                </AspectRatio>
              </ListItemDecorator>
              <CardContent sx={{ ml: 3 }}>
                <Typography level="title-lg" id="card-description">
                  <Skeleton>aaaaaaaaaaaaaaaaaaaaaaaaa</Skeleton>
                </Typography>
                <Typography level="body-sm" aria-describedby="card-description" mb={1} sx={{ color: 'text.tertiary' }}>
                  <Skeleton>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Skeleton>
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Typography><Skeleton>111111₺</Skeleton></Typography>
                  <ButtonGroup aria-label="outlined primary button group" sx={{ ml: 'auto', mb: 'auto' }}>
                    <IconButton>
                      <Skeleton><Remove color='primary' /></Skeleton>
                    </IconButton>
                    <Button><Skeleton>55</Skeleton></Button>
                    <IconButton>
                      <Skeleton><Add color='primary' /></Skeleton>
                    </IconButton>
                  </ButtonGroup>
                </Box>
              </CardContent>
            </ListItem>

          }
        </List>
      </div>
      <div>
        <Card size="lg" variant="outlined">
          <Typography level="h4">Sipariş Özeti</Typography>
          <Divider inset="none" />
          <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
            <BasketPaymentItem title="Ara Toplam" price={`${baskets.totalPrice}₺`} />
            <BasketPaymentItem title="Gönderim Tutarı" price="Ücretsiz" />
            <BasketPaymentItem title="KDV(%20)" price={(baskets.totalPrice * 0.20).toFixed(1) + '₺'} />
            <BasketPaymentItem title="İndirim" price={`${discount}₺`} />
          </List>
          <Divider inset="none" />
          <CardActions>
            <Typography level="title-md" fontWeight="lg" sx={{ mr: 'auto' }}>
              Toplam {' '}
              <Typography fontSize="xs" textColor="text.tertiary">
                (KDV Dahil)
              </Typography>
            </Typography>
            <Typography>
              {(baskets.totalPrice - discount + baskets.totalPrice * 0.18).toFixed(2)}₺
            </Typography>
          </CardActions>
          <Input
            sx={{ '--Input-decoratorChildHeight': '35px' }}
            placeholder="İndirim Kodu"
            endDecorator={
              <Button
                variant="solid"
                color="primary"
                type="submit"
                onClick={() => showErrorSnackbar('Geçersiz İndirim Kodu')}
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                Kod Kullan
              </Button>
            }
          />

          <Button color='primary' endDecorator={<KeyboardArrowRight />} onClick={() => navigate('/odeme')} disabled={baskets.basketItems?.length == 0}>Sepeti Onayla</Button>
        </Card>

      </div>
    </div>
  )
}

export default BasketPage;