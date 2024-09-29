import React, { useEffect } from 'react'
import { AspectRatio, Badge, Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Dropdown, IconButton, Link, Menu, MenuButton, MenuItem, Stack, Typography } from '@mui/joy';
import { Add, Delete, Remove, ShoppingBasket } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addBasket, addBasketItem, getBasket, removeBasket, removeBasketItem } from '../redux/basketSlice';
import { useNavigate } from 'react-router-dom';
import { STATUS } from './Status';

const BasketDropdown = () => {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { baskets, status } = useSelector((state) => state.basket);

    const handleOpenChange = React.useCallback((event, isOpen) => {
        setOpen(isOpen);
    }, []);

    React.useEffect(() => {
        if (baskets == "")
            dispatch(getBasket());
    }, []);


    return (
        <Dropdown open={open} onOpenChange={handleOpenChange}>
            <MenuButton
                color='primary'
                slots={{ root: IconButton }} >
                <Badge badgeContent={baskets.basketItems?.length} showZero={false} color="primary" size='sm' variant="solid">
                    <ShoppingBasket color='primary' />
                </Badge>
            </MenuButton>
            <Menu>
                <MenuItem sx={{ width: 0, height: 0, p: 0, m: 0, position: 'absolute' }} />
                <div className='overflow-y-auto max-h-64'>
                    {baskets != "" && baskets?.basketItems.length > 0 ?
                        baskets.basketItems.map((data) => (
                            <Card
                                variant="plain"
                                orientation="horizontal"
                                key={data.basketItemId}
                                sx={{
                                    width: 320,
                                    mb: 0.5,
                                    '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder', cursor: 'pointer' }
                                }}>
                                <AspectRatio ratio="1" sx={{ width: 100 }}>
                                    <img
                                        src={data.imageUrl}
                                        srcSet={data.product.imageUrl != null ? data.product.imageUrl : "https://images.deliveryhero.io/image/fd-tr/LH/h6km-listing.jpg?width=400&height=292&quot;"}
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                                <CardContent>
                                    <Typography
                                        level="title-md"
                                        fontWeight="bold"
                                        id="card-description"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: 'block',
                                            whiteSpace: 'nowrap',
                                            width: '100%',
                                        }}
                                    >
                                        {data.product.productName}
                                    </Typography>
                                    <Typography
                                        level="body-sm"
                                        aria-describedby="card-description"
                                        mb={1}
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 1,
                                            wordBreak: 'break-word',
                                            overflowWrap: 'break-word',
                                            whiteSpace: 'normal',
                                            color: 'text.tertiary',
                                        }}
                                    >
                                        {data.product.productDesc}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                        <Chip
                                            variant="outlined"
                                            color="primary"
                                            size="sm"
                                            sx={{ pointerEvents: 'none' }}
                                        >
                                            {data.product.price * data.unit}₺
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
                                            onClick={() => dispatch(removeBasketItem(data.product)).then(() => dispatch(getBasket()))}
                                        >
                                            {status == STATUS.LOADING ? <CircularProgress /> : (data.unit > 1 ? <Remove /> : <Delete />)}
                                        </IconButton>
                                        <Typography>{data.unit}</Typography>
                                        <IconButton
                                            aria-label="Sepete Ekle"
                                            component="button"
                                            loading={status == STATUS.LOADING}
                                            disabled={status == STATUS.LOADING}
                                            sx={{
                                                borderRadius: 20,
                                                color: "#4393E4",
                                                "&:hover":
                                                    { color: "#0B6BCB" }
                                            }}
                                            onClick={() => dispatch(addBasketItem(data.product)).then(() => dispatch(getBasket()))}
                                        >
                                            {status == STATUS.LOADING ? <CircularProgress /> : <Add />}
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        )) : <Typography sx={{ padding: 1, px: 4 }}>Sepetin boş</Typography>}
                </div>
                <Divider />
                <Stack direction="row" spacing={2} sx={{ m: "auto", my: 1, mx: 1 }}>
                    <Button sx={{ width: 145 }} variant='outlined' onClick={() => { navigate('/sepet'); setOpen(false) }}>Sepete Git</Button>
                    <Button sx={{ width: 145 }} onClick={() => { navigate('/odeme'); setOpen(false) }}>Siparişi Tamamla</Button>
                </Stack>
            </Menu>
        </Dropdown>
    )
}

export default BasketDropdown;