import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from '@mui/joy';
import { useSelector } from 'react-redux';
import { useUI } from '../utils/UIContext';
import axios from 'axios';
import { IMaskInput } from 'react-imask';

const ShopApplicationPage = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.user);
  const { showDoneSnackbar, showErrorSnackbar } = useUI();

  const [formData, setFormData] = useState({
    shopName: '',
    shopDesc: '',
    imageUrl: '',
    minOrderPrice: '',
    deliveryTime: '',
    additionalInfo: '',
    shopType: 'RESTAURANT',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/shop-applications/apply', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      showDoneSnackbar("Başvurunuz alındı. En kısa sürede geri dönüş yapılacaktır.");
    } catch (err) {
      if (err.response && err.response.data) {
        const errors = err.response.data;
        Object.keys(errors).forEach((key) => {
          showErrorSnackbar(errors[key]);
        });
      } else {
        showErrorSnackbar("Başvurunuz alınamadı. Lütfen tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          maxWidth: 600,
          margin: 'auto',
          padding: 4,
          boxShadow: 'md',
          borderRadius: 'md',
          mt: 5,
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography level="h4" mb={2} textAlign="center">
          Mağaza Başvuru Formu
        </Typography>

        <FormControl required>
          <FormLabel>Mağaza Adı</FormLabel>
          <Input
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            placeholder="Örneğin: Bizim Köfteci"
          />
        </FormControl>

        <FormControl required sx={{ mt: 2 }}>
          <FormLabel>Mağaza Açıklaması</FormLabel>
          <Textarea
            name="shopDesc"
            value={formData.shopDesc}
            onChange={handleChange}
            placeholder="Köfte bizim işimiz"
            minRows={3}
          />
        </FormControl>

        <FormControl sx={{ mt: 2 }}>
          <FormLabel>Resim URL'si</FormLabel>
          <Input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </FormControl>

        <FormControl required sx={{ mt: 2 }}>
          <FormLabel>Minimum Sipariş Fiyatı (₺)</FormLabel>
          <Input
            type="number"
            name="minOrderPrice"
            value={formData.minOrderPrice}
            onChange={handleChange}
            placeholder="Örneğin: 50.0"
          />
        </FormControl>

        <FormControl required sx={{ mt: 2 }}>
          <FormLabel>Teslim Süresi (dakika)</FormLabel>
          <Input
            type="number"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleChange}
            placeholder="Örneğin: 30"
          />
        </FormControl>
        <FormControl required sx={{ mt: 2 }}>
          <FormLabel>Açılış Saati</FormLabel>
          <Input
            placeholder="00:00"
            name="openTime"
            slotProps={{
              input: {
                as: IMaskInput,
                mask: "HH:mm",
                blocks: {
                  HH: {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 23,
                  },
                  mm: {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 59,
                  },
                },
              },
            }}
          />
        </FormControl>
        <FormControl required sx={{ mt: 2 }}>
          <FormLabel>Kapanış Saati</FormLabel>
          <Input
            placeholder="23:59"
            name="closeTime"
            slotProps={{
              input: {
                as: IMaskInput,
                mask: "HH:mm",
                blocks: {
                  HH: {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 23,
                  },
                  mm: {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 59,
                  },
                },
              },
            }}
          />
        </FormControl>

        <FormControl required sx={{ mt: 2 }}>
          <FormLabel>Mağaza Tipi</FormLabel>
          <Select defaultValue="RESTAURANT" name="shopType"
            value={formData.shopType} onChange={(e, value) => setFormData({ ...formData, shopType: value })}>
            <Option value="RESTAURANT">Restorant</Option>
            <Option value="MARKET">Market</Option>
            <Option value="">Pet Shop</Option>
            <Option value="">Manav</Option>
          </Select>
        </FormControl>

        <FormControl sx={{ mt: 2 }}>
          <FormLabel>Ek Bilgiler</FormLabel>
          <Textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Herhangi bir ek bilgi..."
            minRows={2}
          />
        </FormControl>

        <Button
          type="submit"
          variant="solid"
          color="primary"
          sx={{ mt: 3, width: '100%' }}
          loading={loading}
        >
          Başvuruyu Gönder
        </Button>
      </Box>
    </Box >
  )
}

export default ShopApplicationPage