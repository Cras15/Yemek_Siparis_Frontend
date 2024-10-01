import { Add } from '@mui/icons-material';
import { AspectRatio, Card, CardContent, CircularProgress, IconButton, Typography } from '@mui/joy';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBasketItem, getBasket } from '../redux/basketSlice';
import { STATUS } from './Status';
import { useUI } from '../utils/UIContext';

const ProductsCard = ({ data }) => {
  const status = useSelector((state) => state.basket.status);
  const token = useSelector((state) => state.user.token);
  const { showErrorSnackbar } = useUI();
  const dispatch = useDispatch();

  const addBasket = async () => {
    if (token === "") showErrorSnackbar("Sepete ürün eklemek için giriş yapınız!");
    else await dispatch(addBasketItem(data)).then(() =>
      dispatch(getBasket()));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
        minWidth: { xs: '100%', sm: 280 },
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder', cursor: 'pointer' },
      }}
    >
      <AspectRatio ratio="1" sx={{ width: { xs: '100%', sm: '30%' } }}>
        <img
          src={
            data.imageUrl != null
              ? data.imageUrl
              : "https://images.deliveryhero.io/image/fd-tr/LH/h6km-listing.jpg?width=400&height=292&quot;"
          }
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent sx={{ flex: 1, position: 'relative' }}>
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
          {data.productName}
        </Typography>
        <Typography level="body-md">{data.price} TL</Typography>
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
          {data.productDesc}
        </Typography>
        <IconButton
          aria-label="Sepete Ekle"
          component="button"
          disabled={status === STATUS.LOADING}
          sx={{
            position: { xs: 'static', sm: 'absolute' },
            right: { sm: 0 },
            bottom: { sm: 0 },
            mt: { xs: 1, sm: 0 },
            borderRadius: 20,
            color: "#4393E4",
            "&:hover": { color: "#0B6BCB" },
          }}
          onClick={addBasket}
        >
          {status === STATUS.LOADING ? <CircularProgress /> : <Add />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ProductsCard;
