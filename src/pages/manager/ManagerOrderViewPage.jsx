import { AspectRatio, Box, Button, Divider, Grid, List, ListDivider, ListItem, ListItemContent, ListItemDecorator, Stack, Typography } from '@mui/joy';
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useUI } from '../../utils/UIContext';

const ManagerOrderViewPage = () => {
    const [order, setOrder] = React.useState(null);
    const { token } = useSelector((state) => state.user);
    const id = useParams().id;
    const { openModal, showDoneSnackbar, showErrorSnackbar } = useUI();

    const handleCancelOrder = async (orderId) => {
        await openModal({
            title: 'Sipariş İptali',
            body: 'Siparişi iptal etmek istediğine emin misin?',
            yesButton: 'Siparişi iptal et',
            noButton: 'Vazgeç',
            onAccept: () => {
                axios
                    .post(`/orders/cancelOrder?orderId=${orderId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        showDoneSnackbar("Sipariş başarıyla iptal edildi.");
                        return response;
                    })
                    .catch((error) => {
                        showErrorSnackbar(error.message);
                    });
            },
        });
    }

    const ApproveOrder = async () => {
        await openModal({
            title: 'Sipariş Onayı',
            body: 'Siparişi onaylamak istediğinize emin misiniz?',
            yesButton: 'Onayla',
            yesButtonColor: 'success',
            noButton: 'Vazgeç',
            onAccept: () => {
                axios
                    .post(
                        `/orders/approveOrder?orderId=${order.orderId}`,
                        {},
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((res) => {
                        showDoneSnackbar(res.data)
                        getOrder()
                    })
                    .catch((error) => {
                        showErrorSnackbar(error.message)
                    })
            },
        })
    }

    const assignCourier = async () => {
        await openModal({
            title: 'Kurye Atama',
            body: 'Siparişin durumunu kureye teslim edildi yapmak istersiniz?',
            yesButtonColor: 'success',
            yesButton: 'Onayla',
            noButton: 'Vazgeç',
            onAccept: () => {
                axios
                    .post(
                        `/orders/assignCourier?orderId=${order.orderId}&courierId=1`,
                        {},
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((res) => {
                        showDoneSnackbar(res.data)
                        getOrder()
                    })
                    .catch((error) => {
                        showErrorSnackbar(error.message)
                    })
            },
        })
    }

    const markAsDelivered = async () => {
        await openModal({
            title: 'Teslim Edildi',
            body: 'Siparişin durumunu teslim edildi yapmak istersiniz?',
            yesButtonColor: 'success',
            yesButton: 'Onayla',
            noButton: 'Vazgeç',
            onAccept: () => {
                axios
                    .post(
                        `/orders/markAsDelivered?orderId=${order.orderId}`,
                        {},
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((res) => {
                        showDoneSnackbar(res.data)
                        getOrder()
                    })
                    .catch((error) => {
                        showErrorSnackbar(error.message)
                    })
            },
        })
    }

    const handleDone = () => {
        if (order.status === "RECEIVED") {
            return ApproveOrder()
        } else if (order.status === "GETTING_READY") {
            return assignCourier()
        } else if (order.status === "ON_THE_WAY") {
            return markAsDelivered()
        }
    }

    const getOrder = async () => {
        await axios.get(`/orders/getOrderById?orderId=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setOrder(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    React.useEffect(() => {
        getOrder();
    }, []);
    return (
        <>
            {order != null ?
                <Grid container spacing={2} alignItems="center" sx={{ width: "100%" }}>
                    <Grid sm={12} md={8} sx={{ mb: 'auto' }}>
                        <Box sx={{ display: 'flex', boxShadow: 'lg', borderRadius: 10, flexDirection: 'column', gap: 2 }}>
                            <Typography level="title-md" fontWeight="bold" sx={{ p: 2 }}>Sipariş Detayı</Typography>
                            <List variant="soft" color="" sx={{ boxShadow: 'm', minWidth: 240, borderRadius: 'sm' }}>
                                {order?.orderItems?.map((data, i) => (
                                    <React.Fragment key={data.orderItemId}>
                                        <ListItem sx={{ mr: 3 }} >
                                            <ListItemDecorator>
                                                <AspectRatio ratio="1" sx={{ width: '70px', borderRadius: "12px", mr: 2 }}>
                                                    <img
                                                        src={data.imageUrl}
                                                        loading="lazy"
                                                        alt=""
                                                    />
                                                </AspectRatio>
                                            </ListItemDecorator>
                                            <Grid container spacing={2} alignItems="center" sx={{ width: "100%" }}>
                                                <Grid xs={8} sm={8} md={10}>
                                                    <ListItemContent>
                                                        <Typography level="title-sm" noWrap>{data.orderDesc}</Typography>
                                                        <Typography level="body-sm" noWrap>{data.orderName}</Typography>
                                                    </ListItemContent>
                                                </Grid>
                                                <Grid xs={2} sm={2} md={1}>
                                                    <Typography level="title-sm">x{data.unit}</Typography>
                                                </Grid>
                                                <Grid xs={2} sm={2} md={1}>
                                                    <Typography level="title-sm">₺{data.price.toFixed(2)}</Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        {order.orderItems.length - 1 !== i && <ListDivider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Box >
                    </Grid>
                    <Grid sm={12} md={4} sx={{ mb: 'auto' }}>
                        <Box sx={{ display: 'flex', boxShadow: 'lg', borderRadius: 10, flexDirection: 'column', gap: 0.5 }}>
                            <Typography level="title-md" fontWeight="bold" sx={{ px: 2, pt: 1 }}>Müşteri Bilgileri</Typography>
                            <Grid container spacing={1.3} alignItems="center" sx={{ width: "100%", my: 1 }}>
                                <OrderListItem title="Ad Soyad" content="Mert Yener" />
                                <OrderListItem title="Mail" content="asda@asd.asd" />
                                <OrderListItem title="Telefon" content="0536 673 3976" />
                                <OrderListItem title="Adres" content={order.address} />
                                <OrderListItem title="Sipariş Notu" content="Mantar istemiyorum" />
                            </Grid>
                            <Divider />
                            <Typography level="title-md" fontWeight="bold" sx={{ px: 2, pt: 1 }}>Ödeme Bilgileri</Typography>
                            <Grid container spacing={1.3} alignItems="center" sx={{ width: "100%", my: 1 }}>
                                <OrderListItem title="Ödeme" content="Online Ödeme" />
                                <OrderListItem title="Ara Toplam" content={`₺${order?.finalPrice.toFixed(2)}`} />
                                <OrderListItem title="Yol Ücreti" content="₺0.00" />
                                <OrderListItem title="İndirim" content={`₺${order?.discount.toFixed(2)}`} />
                                <OrderListItem title="Toplam" content={`₺${(order?.finalPrice - order?.discount).toFixed(2)}`} />
                            </Grid>
                            <Divider />
                            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ p: 2 }}>
                                <Button variant="soft" color="success" sx={{ width: "100%" }}
                                    disabled={order.status === "CANCELED" || order.status === "DELIVERED"}
                                    onClick={handleDone}>
                                    {
                                        order.status === "RECEIVED" ? "Siparişi Onayla" :
                                            order.status === "GETTING_READY" ? "Kureyeye Verildi" :
                                                order.status === "ON_THE_WAY" ? "Teslim Edildi" :
                                                    order.status === "DELIVERED" ? "Teslim Edildi" : "Siparişi Onayla"
                                    }
                                </Button>
                                <Button variant="soft" color="danger" sx={{ width: "100%" }}
                                    disabled={order.status === "CANCELED"}
                                    onClick={() => handleCancelOrder(order.orderId)}>Siparişi İptal Et</Button>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>

                : <p>Sipariş bulunamadı</p>}
        </>
    )
}

const OrderListItem = ({ title, content }) => {
    return (
        <>
            <Grid xs={4} sm={4} md={4} sx={{ mb: 'auto' }}>
                <Typography level="title-sm" sx={{ px: 2, color: 'text.tertiary' }}>{title}</Typography>
            </Grid>
            <Grid xs={8} sm={8} md={8} sx={{ mb: 'auto' }}>
                <Typography level="title-sm" sx={{ px: 2 }}>{content}</Typography>
            </Grid>
        </>
    );
};

export default ManagerOrderViewPage