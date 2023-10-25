import { Add, Remove } from '@mui/icons-material';
import { AspectRatio, ButtonGroup, Button, Card, CardContent, Chip, IconButton, List, ListDivider, ListItem, ListItemDecorator, Table, Typography, ListSubheader } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux';
import { addBasket, removeBasket } from '../redux/basketSlice';
import { etcString } from '../components/Utils';
import { Box } from '@mui/material';

export const Basket = () => {
  const dispatch = useDispatch();
  const { baskets } = useSelector((state) => state.basket);
  return (
    <div className='m-auto mt-5 w-11/12 sm:w-3/5'>

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
                  {etcString(data.productName,15)}
                </Typography>
                <Typography level="body-sm" aria-describedby="card-description" mb={1} sx={{ color: 'text.tertiary' }}>
                  {etcString("İskender, Ayran, Patates Kızartması", 25)}
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
                      <Remove />
                    </IconButton>
                    <Button disabled>{data.unit}</Button>
                    <IconButton onClick={() => dispatch(addBasket(data))}>
                      <Add />
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
  )
}
