import { Box, Button, FormControl, FormLabel, Input, Option, Select, Textarea, Typography } from '@mui/joy'
import React, { useState } from 'react'
import { useUI } from '../utils/UIContext';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CreateSupportPage = () => {
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.user);
    const { showDoneSnackbar, showErrorSnackbar } = useUI();

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);

        try {
            const res = await axios.post('/support-tickets', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            showDoneSnackbar("Talebiniz alındı. En kısa sürede geri dönüş yapılacaktır.");
        } catch (err) {
            if (err.response && err.response.data) {
                const errors = err.response.data;
                Object.keys(errors).forEach((key) => {
                    showErrorSnackbar(errors[key]);
                });
            } else {
                showErrorSnackbar("Talebiniz alınamadı. Lütfen tekrar deneyin.");
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
                    Destek Talebi
                </Typography>

                <FormControl required>
                    <FormLabel>Destek Konusu</FormLabel>
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Örneğin: Sipariş Oluşturamıyorum"
                    />
                </FormControl>

                <FormControl required sx={{ mt: 2 }}>
                    <FormLabel>Destek Açıklaması</FormLabel>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Sorununuzu detaylıca açıklayın..."
                        minRows={3}
                    />
                </FormControl>

                <Button
                    type="submit"
                    variant="solid"
                    color="primary"
                    sx={{ mt: 3, width: '100%' }}
                    loading={loading}
                >
                    Destek Talebi Oluştur
                </Button>
            </Box>
        </Box >
    )
}

export default CreateSupportPage