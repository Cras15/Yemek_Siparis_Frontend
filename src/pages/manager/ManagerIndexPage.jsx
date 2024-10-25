import React from 'react'
import DashboardItems from '../../components/DashboardItems'
import {
    Box,
    Button,
    DialogContent,
    DialogTitle,
    Divider,
    Drawer,
    List,
    ModalClose,
    Stack,
    Table,
    Typography,
    Chip,
    Card,
    CardContent,
    CircularProgress,
    ToggleButtonGroup,
    Grid,
    Link,
} from '@mui/joy'
import { ArrowForward } from '@mui/icons-material'
import DOrdersListItems from '../../components/DOrdersListItems'
import ShopIcon from '../../assets/ShopIcon'
import ProductsIcon from '../../assets/ProductsIcon'
import OrderIcon from '../../assets/OrderIcon'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { OrderStatus, OrderStatusColor, PaymentTypes } from '../../components/Utils'
import { format, parseISO } from 'date-fns'
import { useUI } from '../../utils/UIContext'

const ManagerIndexPage = () => {
    const [shopStats, setShopStats] = React.useState([])
    const [clickedOrder, setClickedOrder] = React.useState(null)
    const [earningValue, setEarningValue] = React.useState('daily')
    const { openModal, showDoneSnackbar, showErrorSnackbar } = useUI()
    const { token } = useSelector((state) => state.user)

    const getShopStats = React.useCallback(async () => {
        try {
            const res = await axios.get('/manager/shop/getStats', {
                headers: { Authorization: `Bearer ${token}` },
            })
            setShopStats(res.data)
        } catch (error) {
            console.error(error)
        }
    }, [token])

    React.useEffect(() => {
        getShopStats()
    }, [getShopStats])

    const ApproveOrder = React.useCallback(
        async (order) => {
            await openModal({
                title: 'Sipariş Onayı',
                body: 'Siparişi onaylamak istediğinize emin misiniz?',
                yesButton: 'Onayla',
                yesButtonColor: 'success',
                noButton: 'Vazgeç',
                onAccept: async () => {
                    try {
                        const res = await axios.post(
                            `/orders/approveOrder?orderId=${order.orderId}`,
                            {},
                            { headers: { Authorization: `Bearer ${token}` } }
                        )
                        showDoneSnackbar(res.data)
                        getShopStats()
                        setClickedOrder(null)
                    } catch (error) {
                        showErrorSnackbar(error.message)
                    }
                },
            })
        },
        [openModal, showDoneSnackbar, showErrorSnackbar, getShopStats, token]
    )

    const CancelOrder = React.useCallback(
        async (order) => {
            await openModal({
                title: 'Sipariş İptali',
                body: 'Siparişi iptal etmek istediğinize emin misiniz?',
                yesButton: 'Onayla',
                yesButtonColor: 'danger',
                noButton: 'Vazgeç',
                onAccept: async () => {
                    try {
                        const res = await axios.post(
                            `/orders/cancelOrder?orderId=${order.orderId}`,
                            {},
                            { headers: { Authorization: `Bearer ${token}` } }
                        )
                        showDoneSnackbar(res.data)
                        getShopStats()
                        setClickedOrder(null)
                    } catch (error) {
                        showErrorSnackbar(error.message)
                    }
                },
            })
        },
        [openModal, showDoneSnackbar, showErrorSnackbar, getShopStats, token]
    )

    const tableItems = React.useCallback((title, text) => (
        <tr key={title}>
            <td>
                <Typography level='title-sm' sx={{ fontWeight: 600 }}>
                    {title}
                </Typography>
            </td>
            <td style={{ width: '60%' }}>
                <Typography component='div' level='body-sm'>
                    {text}
                </Typography>
            </td>
        </tr>
    ), [])

    return (
        <div>
            <Grid container spacing={2}>
                <Grid xs={12} md={6} lg={4}>
                    <DashboardItems
                        title='Mağazalarım'
                        value={shopStats.shopCount || 0}
                        icon={<ShopIcon />}
                        child={`${shopStats.shopCount || 0} Tane`}
                        color='success'
                    />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                    <DashboardItems
                        title='Ürünlerim'
                        value={shopStats.totalProductCount || 0}
                        icon={<ProductsIcon />}
                        child={`${shopStats.totalProductCount || 0} Tane`}
                        color='primary'
                        link='/manager/urunler'
                    />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                    <DashboardItems
                        title='Siparişler'
                        value={shopStats.totalOrderCount || 0}
                        icon={<OrderIcon />}
                        child={`${shopStats.totalOrderCount || 0} Tane`}
                        color='warning'
                        link='/manager/siparisler'
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid xs={12} md={8}>
                    <Box sx={{ boxShadow: 'xl', borderRadius: 'xl', p: 3 }}>
                        <Typography
                            id='ellipsis-list-demo'
                            level='body-xs'
                            textTransform='uppercase'
                            sx={{ letterSpacing: '0.15rem', mb: 1 }}
                        >
                            Son Siparişler
                        </Typography>
                        <List aria-labelledby='ellipsis-list-demo' sx={{ '--ListItemDecorator-size': '56px' }}>
                            {shopStats.lastFiveOrders?.map((data, i) => (
                                <DOrdersListItems key={i} order={data} onClick={() => setClickedOrder(data)} />
                            ))}
                            <Divider sx={{ my: 2 }} />
                            <Link
                                variant='plain'
                                underline='none'
                                size='md'
                                sx={{ alignSelf: 'flex-start', borderRadius: 'xl', p: 1.3, mr: -1, my: -1 }}
                                endDecorator={<ArrowForward />}
                                href='/manager/siparisler'
                            >
                                Tüm siparişleri gör
                            </Link>
                        </List>
                    </Box>
                </Grid>
                <Grid xs={12} md={4}>
                    <Card variant='soft' color={''} sx={{ boxShadow: 'lg', borderRadius: 'xl' }}>
                        <ToggleButtonGroup
                            value={earningValue}
                            variant='soft'
                            sx={{ m: 'auto', mb: 1 }}
                            onChange={(event, newValue) => {
                                if (newValue !== null) {
                                    setEarningValue(newValue)
                                }
                            }}
                        >
                            <Button value='daily'>Günlük</Button>
                            <Button value='weekly'>Haftalık</Button>
                            <Button value='monthly'>Aylık</Button>
                            <Button value='all'>Tümü</Button>
                        </ToggleButtonGroup>
                        <CardContent orientation='horizontal' sx={{ alignItems: 'center', py: 2 }}>
                            <CircularProgress size='lg' determinate value={90} color='success' thickness={4}>
                                <ShopIcon />
                            </CircularProgress>
                            <Box sx={{ ml: 2 }}>
                                <Typography level='body-md'>Kazanç</Typography>
                                <Typography level='h3'>
                                    {shopStats[`${earningValue}Earnings`]?.toFixed(2) || '0.00'} TL
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Drawer
                open={Boolean(clickedOrder)}
                onClose={() => setClickedOrder(null)}
                anchor='right'
                slotProps={{
                    backdrop: {
                        style: {
                            backdropFilter: 'blur(0px)',
                            backgroundColor: 'transparent',
                        },
                    },
                }}
            >
                <ModalClose sx={{ borderRadius: 'lg' }} />
                <DialogTitle>Lahmacun Menü</DialogTitle>
                <DialogContent>
                    <Typography level='title-lg' sx={{ ml: 2, mt: 3, mb: 2 }}>
                        Detaylar
                    </Typography>
                    <Table sx={{ textAlign: 'left', px: 2 }} size='md'>
                        <tbody>
                            {tableItems('ID', '#' + clickedOrder?.orderId)}
                            {tableItems('Ad Soyad', `${clickedOrder?.name} ${clickedOrder?.surname}`)}
                            {tableItems('Telefon', clickedOrder?.phone)}
                            {tableItems('Adres', clickedOrder?.address)}
                            {clickedOrder &&
                                tableItems(
                                    'Sipariş Tarihi',
                                    format(parseISO(clickedOrder?.orderDate), 'dd/MM/yyyy HH:mm')
                                )}
                            {tableItems('Ödeme Tipi', PaymentTypes[clickedOrder?.paymentType])}
                            {tableItems('Ürün Fiyatı', `${clickedOrder?.finalPrice.toFixed(2)} TL`)}
                            {tableItems(
                                'Sipariş Durumu',
                                <Chip color={OrderStatusColor[clickedOrder?.status]}>
                                    {OrderStatus[clickedOrder?.status]}
                                </Chip>
                            )}
                        </tbody>
                    </Table>
                    <Stack direction='row' sx={{ mt: -1, mb: 1 }}>
                        <Button
                            sx={{ ml: 'auto', borderRadius: 'lg' }}
                            color='success'
                            variant='soft'
                            disabled={clickedOrder?.status !== 'RECEIVED'}
                            onClick={() => ApproveOrder(clickedOrder)}
                        >
                            Onayla
                        </Button>
                        <Button
                            sx={{ mx: 2, borderRadius: 'lg' }}
                            color='danger'
                            variant='soft'
                            disabled={
                                clickedOrder?.status !== 'RECEIVED' && clickedOrder?.status !== 'GETTING_READY'
                            }
                            onClick={() => CancelOrder(clickedOrder)}
                        >
                            İptal Et
                        </Button>
                    </Stack>
                    <Typography level='title-lg' sx={{ ml: 2, mt: 3, mb: 2 }}>
                        Ürün Detayları
                    </Typography>
                    <Table
                        sx={{
                            textAlign: 'left',
                            px: 2,
                            '& thead th:nth-of-type(1)': { width: '40%' },
                            '& thead th:nth-of-type(2)': { width: '20%' },
                        }}
                        size='md'
                    >
                        <thead>
                            <tr>
                                <th>Ürün</th>
                                <th>Adet</th>
                                <th>Fiyat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clickedOrder?.orderItems?.map((oitems, i) => (
                                <tr key={i}>
                                    <td>
                                        <Typography level='body-md'>{oitems.orderName}</Typography>
                                    </td>
                                    <td>
                                        <Typography level='body-md'>{oitems.unit}</Typography>
                                    </td>
                                    <td>
                                        <Typography level='body-md'>
                                            {(oitems.price * oitems.unit).toFixed(2)} TL
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </DialogContent>
            </Drawer>
        </div>
    )
}

export default ManagerIndexPage
