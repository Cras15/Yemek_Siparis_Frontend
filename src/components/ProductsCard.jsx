import { Add } from '@mui/icons-material'
import { AspectRatio, Box, Card, CardContent, Chip, IconButton, Typography } from '@mui/joy'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addBasket, addBasketItem, getBasket } from '../redux/basketSlice'
import { etcString } from './Utils'

const ProductsCard = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 'auto!important',
        minWidth: 320,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder', cursor: 'pointer' },
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <img
          src={data.imageUrl != null ? data.imageUrl : "https://images.deliveryhero.io/image/fd-tr/LH/h6km-listing.jpg?width=400&height=292&quot;"}
          srcSet={data.imageUrl != null ? data.imageUrl : "https://images.deliveryhero.io/image/fd-tr/LH/h6km-listing.jpg?width=400&height=292&quot;"}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          {etcString(data.productName, 14)}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1} sx={{ color: 'text.tertiary' }}>
          {etcString("İskender, Ayran, Patates Kızartması", 18)}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip
            variant="outlined"
            color="primary"
            size="md"
            sx={{ pointerEvents: 'none' }} >
            {data.price}₺
          </Chip>
          <IconButton
            aria-label="Sepete Ekle"
            component="button"
            sx={{
              ml: 'auto',
              borderRadius: 20,
              color: "#4393E4",
              "&:hover":
                { color: "#0B6BCB" }
            }}
            onClick={() => dispatch(addBasketItem(data)).then(() => dispatch(getBasket()))}>
            <Add />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductsCard;