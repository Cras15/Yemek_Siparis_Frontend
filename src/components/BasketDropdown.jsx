import React from 'react'
import { AspectRatio, Badge, Box, Button, Card, CardContent, Chip, Divider, Dropdown, IconButton, Link, Menu, MenuButton, Stack, Typography } from '@mui/joy';
import { Add, Remove, ShoppingBasket } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addBasket, removeBasket } from '../redux/basketSlice';
import { useNavigate } from 'react-router-dom';

export const BasketDropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { baskets } = useSelector((state) => state.basket);
    return (
        <Dropdown>
            <MenuButton color="neutral" sx={{
                mr: 1, color: 'rgb(209,213,  219)',
                "&:hover": {
                    bgcolor: "rgb(55,65,81)",
                    color: "white"
                }
            }} slots={{ root: IconButton }} >
                <Badge badgeContent={baskets.length} showZero={false} color="primary" size='sm' variant="solid">
                    <ShoppingBasket sx={{ color: "rgb(156 163 175)" }} />
                </Badge>
            </MenuButton>
            <Menu>
                {baskets.length > 0 ?
                    baskets.map((data) => (
                        <Card
                            variant="plain"
                            orientation="horizontal"
                            key={data.productsId}
                            sx={{
                                width: 320,
                            }}>
                            <AspectRatio ratio="1" sx={{ width: 90 }}>
                                <img
                                    src={data.imageUrl}
                                    srcSet={data.imageUrl != null ? data.imageUrl : "https://images.deliveryhero.io/image/fd-tr/LH/h6km-listing.jpg?width=400&height=292&quot;"}
                                    loading="lazy"
                                    alt=""
                                />
                            </AspectRatio>
                            <CardContent>
                                <Typography level="title-lg" id="card-description">
                                    {data.productName}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Chip
                                        variant="outlined"
                                        color="primary"
                                        size="sm"
                                        sx={{ pointerEvents: 'none' }}
                                    >
                                        {data.price * data.unit}₺
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
                                        onClick={() => dispatch(removeBasket(data))}
                                    >
                                        <Remove />
                                    </IconButton>
                                    <Typography>{data.unit}</Typography>
                                    <IconButton
                                        aria-label="Sepete Ekle"
                                        component="button"
                                        sx={{
                                            borderRadius: 20,
                                            color: "#4393E4",
                                            "&:hover":
                                                { color: "#0B6BCB" }
                                        }}
                                        onClick={() => dispatch(addBasket(data))}
                                    >
                                        <Add />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    )) : <Typography sx={{ padding: 1, px: 4 }}>Sepetin boş</Typography>}
                <Divider />
                <Stack direction="row" spacing={2} sx={{ m: "auto", my: 1 }}>
                    <Button sx={{ width: 145 }} variant='outlined' onClick={() => navigate('/basket')}>Sepete Git</Button>
                    <Button sx={{ width: 145 }}>Siparişi Tamamla</Button>
                </Stack>
            </Menu>
        </Dropdown>
    )
}
