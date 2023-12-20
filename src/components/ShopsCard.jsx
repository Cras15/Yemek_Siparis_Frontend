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
                src="https://images.deliveryhero.io/image/fd-tr/LH/ppdu-listing.jpg?width=400&height=225"
                srcSet="https://images.deliveryhero.io/image/fd-tr/LH/h6km-listing.jpg?width=400&height=292&quot; 2x"
                loading="lazy"
                alt="Yosemite by Casey Horner"
              />
            </figure>
          </AspectRatio>
          {/* <CardCover
            className="gradient-cover"
            sx={{
              '&:hover, &:focus-within': {
                opacity: 1,
              },
              opacity: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              transition: '0.1s ease-in',
              background:
                'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
            }}
          >
            <div>
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  flexGrow: 1,
                  alignSelf: 'flex-end',
                }}
              >
                <Typography level="title-lg" noWrap sx={{ fontSize: 'lg', color: "#fff" }}>
                  <Link
                    href={`/shop/${data.shopId}`}
                    overlay
                    underline="none"
                    sx={{
                      color: '#fff',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      display: 'block',
                      "&:hover": {
                        color: "#fff"
                      }
                    }}
                  >
                    {data.shopName}
                  </Link>
                </Typography>
                <IconButton
                  size="sm"
                  variant="solid"
                  color="neutral"
                  sx={{ ml: 'auto', bgcolor: 'rgba(0 0 0 / 0.2)' }}
                >
                  <Favorite />
                </IconButton>
              </Box>
            </div>
          </CardCover> */}
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
          <Typography level='body-sm'><CurrencyLira fontSize='small' />50TL minimum • Pide & Lahmacun</Typography>
          <Typography level='body-sm'><QueryBuilder fontSize='small' /> 30dk &nbsp;•&nbsp; 0.3km &nbsp;•&nbsp; <MopedOutlined color='primary' /><Typography color='primary'>Ücretsiz</Typography></Typography>
        </Box>
      </div>
    </Card>
  )
}

export default ShopsCard