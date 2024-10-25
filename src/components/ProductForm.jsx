// src/components/ProductForm.js

import {
    Box,
    Button,
    Chip,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Option,
    Select,
    Textarea,
    Typography,
} from '@mui/joy';
import { debounce } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useUI } from '../utils/UIContext';

const ProductForm = ({ initialProduct = null, onSubmit, isEdit = false }) => {
    const [categories, setCategories] = useState([]);
    const [imageUrl, setImageUrl] = useState(initialProduct?.imageUrl || '');
    const { showErrorSnackbar, showDoneSnackbar } = useUI();
    const token = useSelector((state) => state.user.token);

    const getCategories = async () => {
        try {
            const res = await axios.get('/category', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories(res.data);
        } catch (error) {
            showErrorSnackbar(error.message);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleImageUrlChange = debounce((value) => {
        setImageUrl(value);
    }, 200);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const productData = {
            productName: data.get('productName'),
            productDesc: data.get('productDesc'),
            imageUrl: data.get('imageUrl'),
            price: parseFloat(data.get('price')),
            stock: parseInt(data.get('stock'), 10),
            categoryIds: JSON.parse(data.getAll('categories')[0]),
        };

        if (isEdit && initialProduct) {
            productData.productsId = initialProduct.productsId;
        }

        try {
            await onSubmit(productData);
        } catch (error) {
            showErrorSnackbar(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    display: 'flex',
                    boxShadow: 'lg',
                    borderRadius: 10,
                    flexDirection: 'column',
                    gap: 2,
                    m: 'auto',
                    width: { xs: '100%', sm: '90%', md: '80%', lg: '60%' },
                    p: 2,
                }}
            >
                <Typography level='title-lg'>
                    {isEdit ? 'Ürün Detayları' : 'Yeni Ürün Oluştur'}
                </Typography>
                <Divider />

                <FormControl>
                    <FormLabel>Ürün Adı</FormLabel>
                    <Input
                        placeholder='Ürün Adı'
                        name='productName'
                        defaultValue={initialProduct?.productName || ''}
                        required
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Fiyat</FormLabel>
                    <Input
                        placeholder='Fiyat'
                        name='price'
                        type='number'
                        defaultValue={initialProduct?.price || ''}
                        required
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Stok</FormLabel>
                    <Input
                        placeholder='Stok'
                        name='stock'
                        type='number'
                        defaultValue={initialProduct?.stock || ''}
                        required
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Kategoriler</FormLabel>
                    <Select
                        multiple
                        name='categories'
                        placeholder='Kategoriler'
                        defaultValue={
                            initialProduct
                                ? initialProduct.categories.map((cat) => cat.categoryId)
                                : []
                        }
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                                {selected.map((selectedOption, i) => {
                                    const category = categories.find(
                                        (cat) => cat.categoryId === selectedOption.value
                                    );
                                    return (
                                        <Chip key={i} variant='soft' color='primary'>
                                            {category ? category.categoryName : 'Bilinmeyen'}
                                        </Chip>
                                    );
                                })}
                            </Box>
                        )}
                        sx={{ minWidth: '15rem' }}
                        slotProps={{
                            listbox: {
                                sx: {
                                    width: '100%',
                                },
                            },
                        }}
                        required
                    >
                        {categories.map((option) => (
                            <Option key={option.categoryId} value={option.categoryId}>
                                {option.categoryName}
                            </Option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Ürün Açıklaması</FormLabel>
                    <Textarea
                        placeholder='Ürün Açıklaması...'
                        name='productDesc'
                        minRows={3}
                        defaultValue={initialProduct?.productDesc || ''}
                        required
                    />
                </FormControl>

                <Divider />

                <Typography level='title-lg'>Ürün Görseli</Typography>

                <FormControl>
                    <FormLabel>Görsel URL</FormLabel>
                    <Textarea
                        placeholder='Görsel URL'
                        name='imageUrl'
                        minRows={3}
                        defaultValue={imageUrl}
                        onChange={(e) => handleImageUrlChange(e.target.value)}
                        required
                    />
                </FormControl>

                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={initialProduct?.imageUrl || 'Ürün Görseli'}
                        style={{ width: '100%', height: 'auto', borderRadius: 10 }}
                    />
                )}

                <Divider />

                <Button color='primary' type='submit'>
                    {isEdit ? 'Düzenle' : 'Oluştur'}
                </Button>
            </Box>
        </form>
    );
};

ProductForm.propTypes = {
    initialProduct: PropTypes.shape({
        productsId: PropTypes.number,
        productName: PropTypes.string,
        productDesc: PropTypes.string,
        imageUrl: PropTypes.string,
        price: PropTypes.number,
        stock: PropTypes.number,
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                categoryId: PropTypes.number,
                categoryName: PropTypes.string,
            })
        ),
    }),
    onSubmit: PropTypes.func.isRequired,
    isEdit: PropTypes.bool,
};

export default ProductForm;
