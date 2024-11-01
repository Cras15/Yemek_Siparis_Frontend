import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { StarRounded, CurrencyLira, QueryBuilder, MopedOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from './Utils';
import { useUI } from '../utils/UIContext';

const ShopsCard = ({ data, maxWidth = 450, minWidth = 220 }) => {
  const navigate = useNavigate();
  const { showErrorSnackbar } = useUI();

  // isOpen hesaplaması
  const isOpen = React.useMemo(() => {
    if (!data.openTime || !data.closeTime) return false;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [openHour, openMinute] = data.openTime.split(':').map(Number);
    const [closeHour, closeMinute] = data.closeTime.split(':').map(Number);

    const openTimeMinutes = openHour * 60 + openMinute;
    const closeTimeMinutes = closeHour * 60 + closeMinute;

    if (openTimeMinutes < closeTimeMinutes) {
      // Aynı gün içerisinde kapanış
      return currentMinutes >= openTimeMinutes && currentMinutes <= closeTimeMinutes;
    } else {
      // Gece yarısını geçen kapanış (örneğin, 18:00 - 02:00)
      return currentMinutes >= openTimeMinutes || currentMinutes <= closeTimeMinutes;
    }
  }, [data.openTime, data.closeTime]);

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: { minWidth },
        width: 'auto',
        maxWidth: { maxWidth },
        bgcolor: 'initial',
        p: 0,
        mt: 4,
        cursor: isOpen ? 'pointer' : 'not-allowed',
        borderRadius: 'xl',
        transition: 'transform 0.3s, border 0.3s',
        '&:hover': {
          transform: isOpen ? 'translateY(-3px)' : 'none',
        },
        position: 'relative',
      }}
      onClick={() => {
        isOpen ? navigate(`/shop/${data.shopId}`) : showErrorSnackbar('Mağaza henüz açılmadı!');
      }}
    >
      <Box>
        <Box sx={{ position: 'relative', width: '100%', mb: 1 }}>
          <AspectRatio ratio="16/9" sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
            <figure>
              <img
                src={data.imageUrl}
                srcSet={`${data.imageUrl}; 2x`}
                loading="lazy"
                alt={data.shopName} // Erişilebilirlik için
              />
            </figure>
          </AspectRatio>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
            boxShadow: 3,
            px: 1,
            pt: 0.5,
            pb: 1.5,
          }}
        >
          <Typography sx={{ ml: 1 }} fontWeight="lg" level="title-md" color="primary">
            {capitalizeFirstLetter(data.shopName)}
          </Typography>
          <StarRounded sx={{ ml: 'auto', mr: -0.8 }} color="primary" />
          <Typography sx={{ mr: -0.5 }}>
            {((data.shopDeliveryRating + data.shopServiceRating + data.shopTasteRating) / 3).toFixed(1)}
          </Typography>
          <Typography level="body-xs">({data.reviewCount || '0'})</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.4,
            alignItems: 'start',
            boxShadow: 3,
            px: 2,
            mt: -1,
            mb: 1,
          }}
        >
          <Typography level="body-sm">
            <CurrencyLira fontSize="small" />
            {data.minOrderPrice}TL minimum {data.categories && (<>• {data.categories}</>)}
          </Typography>
          <Typography level="body-sm">
            <QueryBuilder fontSize="small" /> {data.deliveryTime}dk &nbsp;{/*•&nbsp; 0.3km &nbsp;*/}•&nbsp;
            <MopedOutlined color="primary" />
            <Typography component="span" color="primary">
              Ücretsiz
            </Typography>
          </Typography>
        </Box>
      </Box>

      {/* Mağaza Kapalıysa Overlay Katmanı */}
      {!isOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'inherit',
            flexDirection: 'column',
            p: 2,
            textAlign: 'center',
            zIndex: 1, // Overlay'ın üstte görünmesini sağlar
          }}
        >
          <Typography variant="h6" component="div" color='white' sx={{ mb: 1 }}>
            Mağaza Kapalı
          </Typography>
          <Typography variant="body2" color='white'>Açılış Saatleri:</Typography>
          <Typography variant="body2" color='white' fontWeight="bold">
            {data.openTime} - {data.closeTime}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default ShopsCard;
