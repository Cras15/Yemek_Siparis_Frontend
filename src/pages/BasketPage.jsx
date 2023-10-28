import { Add, Check, Delete, KeyboardArrowRight, Remove } from '@mui/icons-material';
import { AspectRatio, ButtonGroup, Button, Card, CardContent, Chip, IconButton, List, ListDivider, ListItem, ListItemDecorator, Table, Typography, ListSubheader, Divider, CardActions } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux';
import { addBasket, removeBasket } from '../redux/basketSlice';
import { etcString } from '../components/Utils';
import { Box } from '@mui/material';
import BasketPaymentItem from '../components/BasketPaymentItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BasketPage = () => {
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { baskets } = useSelector((state) => state.basket);

  useEffect(() => {
    setTotal(baskets.reduce((a, v) => a = a + (v.unit * v.price), 0));
  }, [baskets]);


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
          {baskets.map((data, i) => (
            <div key={data.productsId}>
              <ListItem>
                <ListItemDecorator>
                  <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img
                      src={data.imageUrl}
                      srcSet={data.imageUrl != null ? data.imageUrl : "https://images.deliveryhero.io/image/fd-tr/LH/h6km-listing.jpg?width=400&height=292&quot;"}
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                </ListItemDecorator>
                <CardContent sx={{ ml: 3 }}>
                  <Typography level="title-lg" id="card-description">
                    {etcString(data.productName, 15)}
                  </Typography>
                  <Typography level="body-sm" aria-describedby="card-description" mb={1} sx={{ color: 'text.tertiary' }}>
                    {etcString("İskender, Ayran, Patates Kızartması, lahana, turşu, domates, karnabahar", 50)}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Chip
                      variant="outlined"
                      color="primary"
                      size="sm"
                      sx={{ pointerEvents: 'none' }}
                    >
                      {data.price * data.unit}₺
                    </Chip>
                    <ButtonGroup aria-label="outlined primary button group" sx={{ ml: 'auto', mb: 'auto' }}>
                      <IconButton onClick={() => dispatch(removeBasket(data))}>
                        {data.unit > 1 ? <Remove color='primary' /> : <Delete color='primary' />}
                      </IconButton>
                      <Button disabled>{data.unit}</Button>
                      <IconButton onClick={() => dispatch(addBasket(data))}>
                        <Add color='primary' />
                      </IconButton>
                    </ButtonGroup>
                  </Box>
                </CardContent>
              </ListItem>
              {i != baskets.length - 1 &&
                <ListDivider inset="gutter" />
              }
            </div>
          ))}
        </List>
      </div>
      <div>
        <Card size="lg" variant="outlined">
          <Typography level="h3">Sipariş Özeti</Typography>
          <Divider inset="none" />
          <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
            <BasketPaymentItem title="Ara Toplam" price={`${total}₺`} />
            <BasketPaymentItem title="Gönderim Tutarı" price="Ücretsiz" />
            <BasketPaymentItem title="KDV(%20)" price={(total * 0.20).toFixed(1)+ '₺'} />
            <BasketPaymentItem title="İndirim" price={`${discount}₺`} />
          </List>
          <Divider inset="none" />
          <CardActions>
            <Typography level="title-lg" sx={{ mr: 'auto' }}>
              Toplam {' '}
              <Typography fontSize="xs" textColor="text.tertiary">
                (KDV Dahil)
              </Typography>
            </Typography>
            <Typography>
              {(total - discount + total * 0.18)}₺
            </Typography>
          </CardActions>
          <Button color='primary' endDecorator={<KeyboardArrowRight />} onClick={()=>navigate('/odeme')}>Sepeti Onayla</Button>
        </Card>

      </div>
    </div>
  )
}

export default BasketPage;