import { Add, ErrorOutline } from '@mui/icons-material'
import { AspectRatio, Box, Card, CardContent, Chip, CircularProgress, IconButton, Typography } from '@mui/joy'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBasket, addBasketItem, getBasket } from '../redux/basketSlice'
import { etcString } from './Utils'
import { STATUS } from './Status'
import { setSnackbar } from '../redux/snackbarSlice'

const ProductsCard = ({ data }) => {
  const status = useSelector((state) => state.basket.status);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const addBasket = async () => {
    if (token == "") dispatch(setSnackbar({ children: "Sepete ürün eklemek için giriş yapmalısınız.", color: "danger", startDecorator: <ErrorOutline /> }));
    else await dispatch(addBasketItem(data)).then(() => dispatch(getBasket()))
  }

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 'auto!important',
        minWidth: 320,
        height: 165,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder', cursor: 'pointer' },
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 130 }}>
        <img
          src={data.imageUrl != null ? data.imageUrl : "https://images.deliveryhero.io/image/fd-tr/LH/h6km-listing.jpg?width=400&height=292&quot;"}
          srcSet={data.imageUrl != null ? data.imageUrl : "https://images.deliveryhero.io/image/fd-tr/LH/h6km-listing.jpg?width=400&height=292&quot;"}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>

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
        <Typography level='body-md'>{data.price}TL</Typography>
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
          disabled={status == STATUS.LOADING}
          sx={{
            position: 'absolute',
            right: 12,
            bottom: 12,
            borderRadius: 20,
            color: "#4393E4",
            "&:hover":
              { color: "#0B6BCB" }
          }}
          onClick={addBasket}>
          {status == STATUS.LOADING ? <CircularProgress /> : <Add />}
        </IconButton>

      </CardContent>
    </Card>
  )
}

export default ProductsCard;