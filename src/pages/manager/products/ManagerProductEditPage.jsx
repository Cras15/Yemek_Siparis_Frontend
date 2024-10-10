import { Box, Button, Chip, Divider, FormControl, FormLabel, Input, Option, Select, Textarea, Typography } from '@mui/joy';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUI } from '../../../utils/UIContext';
import { useSelector } from 'react-redux';
import { debounce } from '@mui/material';

const ManagerProductEditPage = () => {
    const [category, setCategory] = useState(null);
    const [product, setProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const id = useParams().id;
    const { showErrorSnackbar, showDoneSnackbar } = useUI();
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();

    const getCategories = async () => {
        await axios.get("/category").then((res) => {
            setCategory(res.data);
        }).catch((error) => {
            showErrorSnackbar(error.message);
        });
    }

    const getProducts = async () => {
        const cancelToken = axios.CancelToken.source();
        await axios.get(`/manager/products/getProduct?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cancelToken: cancelToken.token
        }).then((res) => {
            console.log(res.data);
            setProduct(res.data);
            setImageUrl(res.data.imageUrl);
        }).catch((error) => {
            if (axios.isCancel(error)) return;
        })
    }

    const handleImageUrlChange = debounce((value) => {
        setImageUrl(value);
    }, 200);

    const EditProduct = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('categories'));
        await axios.post("/manager/products/updateProduct", {
            productsId: product.productsId,
            productName: data.get('productName'),
            productDesc: data.get('productDesc'),
            imageUrl: data.get('imageUrl'),
            price: data.get('price'),
            stock: data.get('stock'),
            categoryIds: JSON.parse(data.getAll('categories'))
        }, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            showDoneSnackbar(res.data);
            navigate('/manager/urunler');
        }).catch((error) => {
            showErrorSnackbar(error.message);
            setStatus('error');
        });

    }

    useEffect(() => {
        getCategories();
        getProducts();
    }
        , []);
    return (
        <>
            <form onSubmit={(e) => EditProduct(e)}>
                <Box sx={{
                    display: 'flex', boxShadow: 'lg', borderRadius: 10, flexDirection: 'column', gap: 2, m: 'auto',
                    width: { xs: '100%', sm: '90%', md: '80%', lg: '60%' }, p: 2
                }}>
                    {product !== null && <>
                        <Typography level='title-lg'>Ürün Detayları</Typography>
                        <Divider />
                        <FormControl>
                            <FormLabel>Ürün Adı</FormLabel>
                            <Input placeholder="Ürün Adı" name='productName' defaultValue={product?.productName} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Fiyat</FormLabel>
                            <Input placeholder="Fiyat" name='price' type='number' defaultValue={product?.price} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Stok</FormLabel>
                            <Input placeholder="Stok" name='stock' type='number' defaultValue={product?.stock} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kategoriler</FormLabel>
                            <Select
                                multiple
                                name="categories"
                                placeholder="Kategoriler"
                                defaultValue={product?.categories.map((category) => category.categoryId)}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                                        {selected.map((selectedOption, i) => (
                                            <Chip key={i} variant="soft" color="primary">
                                                {selectedOption.label}
                                            </Chip>
                                        ))}
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
                            >
                                {category?.map((option) => (
                                    <Option key={option.categoryId} value={option.categoryId}>
                                        {option.categoryName}
                                    </Option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Ürün Açıklaması</FormLabel>
                            <Textarea placeholder="Ürün Açıklaması..." name='productDesc' minRows={3} defaultValue={product?.productDesc} />
                        </FormControl>
                        <Divider />
                        <Typography level='title-lg'>Ürün Görseli</Typography>
                        <FormControl>
                            <FormLabel>Görsel URL</FormLabel>
                            <Textarea placeholder="Görsel URL" name='imageUrl' minRows={3} defaultValue={imageUrl} onChange={(e) => handleImageUrlChange(e.target.value)} />
                        </FormControl>
                        <img src={imageUrl} alt={product?.imageUrl} style={{ width: '100%', height: 'auto', borderRadius: 10 }} />
                        <Divider />
                        <Button color='primary' type="submit">Düzenle</Button>
                    </>}
                </Box>
            </form>
        </>
    )
}

export default ManagerProductEditPage