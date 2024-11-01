import { Key, Mail } from '@mui/icons-material'
import { Box, Button, Checkbox, Divider, FormControl, FormLabel, Grid, Input, Stack, Typography } from '@mui/joy'
import axios from 'axios';
import React, { useState } from 'react'
import { useUI } from '../../utils/UIContext';
import { useSelector } from 'react-redux';

const AdminRegisterUser = () => {
  const { showErrorSnackbar, showDoneSnackbar } = useUI();
  const token = useSelector((state) => state.user.token);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    verified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/admin/user/create', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      console.log(res.data);
      showDoneSnackbar(res.data);
    }).catch(err => {
      console.error(err);
      showErrorSnackbar(err.response.data || err.message);
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '800px',
        width: '90%',
        margin: '50px auto',
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        boxShadow: 'lg',
        borderRadius: 'md',
        backgroundColor: 'background.surface',
      }}
    >
      <Typography
        level="h3"
        component="h1"
        textAlign="center"
        mb={2}
      >
        Kullanıcı Oluştur
      </Typography>

      <Grid container spacing={2}>
        {/* Ad ve Soyad Alanları */}
        <Grid xs={12} md={6}>
          <FormControl>
            <FormLabel>Ad</FormLabel>
            <Input
              name="firstname"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Ad"
              size="md"
            />
          </FormControl>
        </Grid>
        <Grid xs={12} md={6}>
          <FormControl>
            <FormLabel>Soyad</FormLabel>
            <Input
              name="lastname"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Soyad"
              size="md"
            />
          </FormControl>
        </Grid>

        {/* Email ve Telefon Alanları */}
        <Grid xs={12} md={6}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email adresi"
              size="md"
            />
          </FormControl>
        </Grid>
        <Grid xs={12} md={6}>
          <FormControl>
            <FormLabel>Telefon</FormLabel>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Telefon numarası"
              size="md"
            />
          </FormControl>
        </Grid>

        {/* Şifre Alanı */}
        <Grid xs={12}>
          <FormControl>
            <FormLabel>Şifre</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Şifre"
              size="md"
            />
          </FormControl>
        </Grid>

        {/* Mail Doğrulama */}
        <Grid xs={12}>
          <FormControl>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Checkbox
                name="verified"
                checked={formData.verified}
                onChange={handleChange}
                size="md"
              />
              <FormLabel>Mail Doğrulaması Yapılsın mı?</FormLabel>
            </Stack>
          </FormControl>
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        size="md"
        sx={{
          mt: 2,
          padding: 1,
        }}
      >
        Oluştur
      </Button>
    </Box>
  )
}

export default AdminRegisterUser