import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { CurrencyLira, MopedOutlined, QueryBuilder, StarRounded } from '@mui/icons-material';
import { capitalizeFirstLetter } from './Utils';
import { ButtonBase } from '@mui/material';

const ShopsCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 220,
        width: 'auto',
        maxWidth: 450,
        bgcolor: 'initial',
        p: 0,
        mt: 4,
        cursor: 'pointer',
        borderRadius: 'xl',
        transition: 'transform 0.3s, border 0.3s',
        '&:hover': {
          transform: 'translateY(-3px)',
        },
      }}
    >
      <div onClick={() => { navigate(`/shop/${data.shopId}`) }}>
        <Box sx={{ position: 'relative', width: "100%", mb: 1 }}>
          <AspectRatio ratio="16/9" sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
            <figure>
              <img
                src={data.imageUrl}
                srcSet={`${data.imageUrl}; 2x`}
                loading="lazy"
              />
            </figure>
          </AspectRatio>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', boxShadow: 3, px: 1, pt: 0.5, pb: 1.5 }} >
          <Typography sx={{ ml: 1 }} fontWeight="lg" level='title-md' color='primary'>
            {capitalizeFirstLetter(data.shopName)}
          </Typography>
          <StarRounded sx={{ ml: 'auto', mr: -0.8 }} color='primary' />
          <Typography sx={{ mr: -0.5 }}>{data.shopRating.toFixed(1)}</Typography>
          <Typography level='body-xs'>(+10)</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4, alignItems: 'start', boxShadow: 3, px: 2, mt: -1, mb: 1 }}>
          <Typography level='body-sm'><CurrencyLira fontSize='small' />{data.minOrderPrice}TL minimum • Pide & Lahmacun</Typography>
          <Typography level='body-sm'><QueryBuilder fontSize='small' /> 30dk &nbsp;•&nbsp; 0.3km &nbsp;•&nbsp; <MopedOutlined color='primary' /><Typography color='primary'>Ücretsiz</Typography></Typography>
        </Box>
      </div>
    </Card>
  )
}

export default ShopsCard