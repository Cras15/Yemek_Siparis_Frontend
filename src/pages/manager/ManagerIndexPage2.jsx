import React from 'react'
import DashboardItems from '../../components/DashboardItems'
import { Box, Button, DialogContent, DialogTitle, Divider, Drawer, IconButton, List, ModalClose, Stack, Table, Typography, Chip, Grid, Card, CardContent, CircularProgress, CardActions, ToggleButtonGroup, Modal, ModalDialog, DialogActions } from '@mui/joy'
import { ArrowForward, WarningRounded } from '@mui/icons-material'
import DOrdersListItems from '../../components/DOrdersListItems'
import ShopIcon from '../../assets/ShopIcon'
import ProductsIcon from '../../assets/ProductsIcon'
import OrderIcon from '../../assets/OrderIcon'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { OrderStatus, OrderStatusColor, timeAgo } from '../../components/Utils'
import { format, parseISO } from 'date-fns'

const tableItems = (title, text) => (
    <tr key={title}>
        <td><Typography level='title-sm' sx={{ fontWeight: 600 }}>{title}</Typography></td>
        <td style={{ width: '60%' }}><Typography level='body-sm'>{text}</Typography></td>
    </tr >
)


const ManagerIndexPage2 = () => {
    const [shopStats, setShopStats] = React.useState([]);
    const [clickedOrder, setClickedOrder] = React.useState(null);
    const [earningValue, setEarningValue] = React.useState('daily');
    const [cancelModal, setCancelModal] = React.useState(false);
    const { token } = useSelector((state) => state.user);

    const getShopStats = async () => {
        await axios.get("/manager/shop/getStats", { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            console.log(res);
            setShopStats(res.data);
        }
        ).catch((error) => {
            console.log(error);
        })
    }

    React.useEffect(() => {
        getShopStats();
    }, []);

    return (
        <div>
            <div className='grid gap-10 grid-flow-row-dense xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1'>
                <DashboardItems title="Marketlerim" value={90} icon={<ShopIcon />} child={`${shopStats.shopCount} Tane`} color="success" />
                <DashboardItems title="Ürünlerim" value={60} icon={<ProductsIcon />} child={`${shopStats.totalProductCount} Tane`} color="primary" />
                <DashboardItems title="Siparişler" value={35} icon={<OrderIcon />} child={`${shopStats.totalOrderCount} Tane`} color="warning" />
            </div>
            <div className='grid gap-10 grid-flow-row-dense xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-10'>
                <div className='col-span-2'>
                    <Box sx={{ boxShadow: 'xl', borderRadius: 'xl', p: 3/*, height: 455*/ }}>
                        <Typography
                            id="ellipsis-list-demo"
                            level="body-xs"
                            textTransform="uppercase"
                            sx={{ letterSpacing: '0.15rem', mb: 1 }}
                        >
                            Son Siparişler
                        </Typography>
                        <List
                            aria-labelledby="ellipsis-list-demo"
                            sx={{ '--ListItemDecorator-size': '56px' }}
                        >
                            {shopStats.lastFiveOrders?.map((data, i) => (
                                <DOrdersListItems key={i} title={data.orderItems?.map((oitems, j) => (oitems.orderName + (j != data.orderItems?.length - 1 ? ', ' : '')))} child={data.address} time={timeAgo(data.orderDate)} onClick={() => setClickedOrder(data)} />
                            ))}
                            <Divider sx={{ my: 2 }} />
                            <IconButton
                                variant="plain"
                                size="md"
                                sx={{ alignSelf: 'flex-start', borderRadius: 'xl', p: 1.3, mr: -1, my: -1 }}>
                                Tüm siparişleri gör &nbsp;<ArrowForward />
                            </IconButton>
                        </List>
                    </Box>
                </div>
                <div>
                    {/* Earnings area for daily, weekly and all */}
                    <Card variant="soft" color='' invertedColors sx={{ maxWidth: 750, boxShadow: 'lg', borderRadius: 'xl' }}>
                        <ToggleButtonGroup
                            value={earningValue}
                            variant='soft'
                            sx={{ m: 'auto', mb: 1 }}
                            onChange={(event, newValue) => {
                                setEarningValue(newValue);
                            }}
                        >
                            <Button value="daily">
                                Günlük
                            </Button>
                            <Button value="weekly">
                                Haftalık
                            </Button>
                            <Button value="monthly">
                                Aylık
                            </Button>
                            <Button value="all">
                                Tümü
                            </Button>
                        </ToggleButtonGroup>
                        <CardContent orientation="horizontal" sx={{ alignItems: 'center', py: 2 }}>
                            <CircularProgress size="lg" determinate value={90} color='success' thickness={4}>
                                <ShopIcon />
                            </CircularProgress>
                            <CardContent>
                                <Typography level="body-md">Kazanç</Typography>
                                <Typography level="h3">{shopStats[earningValue + 'Earnings']?.toFixed(2)}TL</Typography>
                            </CardContent>
                        </CardContent>
                    </Card>
                </div>
                <div></div>
            </div>
            <Drawer open={clickedOrder != null} onClose={() => setClickedOrder(null)} anchor='right' hideBackdrop>
                <ModalClose sx={{ borderRadius: 'lg' }} />
                <DialogTitle>Lahmacun Menü</DialogTitle>
                <DialogContent>
                    <Typography level='title-lg' sx={{ ml: 2, mt: 3, mb: 2 }}>Detaylar</Typography>
                    <Table sx={{ textAlign: 'left', px: 2, }} size='md'>
                        <tbody>
                            {tableItems("ID", "1234567890")}
                            {tableItems("Ad Soyad", "Mert Yener")}
                            {tableItems("Telefon", "0532 123 45 67")}
                            {tableItems("Adres", clickedOrder?.address/*"Anabağlar mah. prof. dr. necmettin erbakan caddesi no:23/4 Seydişehir/Konya"*/)}
                            {clickedOrder && tableItems("Sipariş Tarihi", format(parseISO(clickedOrder?.orderDate), "dd/MM/yyyy HH:mm"))}
                            {tableItems("Ödeme Tipi", "Kart")}
                            {tableItems("Ürün Fiyatı", `${clickedOrder?.finalPrice.toFixed(2)}TL`)}
                            {tableItems("Sipariş Durumu", <Chip color={OrderStatusColor[clickedOrder?.status]}>{OrderStatus[clickedOrder?.status]}</Chip>)}
                            {tableItems()}
                        </tbody>
                    </Table>
                    <Stack direction="row" sx={{ mt: -1, mb: 1 }}>
                        <Button sx={{ ml: 'auto', borderRadius: 'lg' }} color='success' variant='soft' disabled={clickedOrder?.status != 'RECEIVED'}>Onayla</Button>
                        <Button sx={{ mx: 2, borderRadius: 'lg' }} color='danger' variant='soft' disabled={clickedOrder?.status != 'RECEIVED' && clickedOrder?.status != 'GETTING_READY'} onClick={() => setCancelModal(true)}>İptal Et</Button>
                    </Stack>
                    <Typography level='title-lg' sx={{ ml: 2, mt: 3, mb: 2 }}>Ürün Detayları</Typography>
                    <Table sx={{ textAlign: 'left', px: 2, '& thead th:nth-of-type(1)': { width: '40%' }, '& thead th:nth-of-type(2)': { width: '20%' } }} size='md'>
                        <thead>
                            <tr>
                                <th>Ürün</th>
                                <th>Adet</th>
                                <th>Fiyat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clickedOrder?.orderItems?.map((oitems, i) => (
                                <tr key={i} >
                                    <td><Typography level='body-md'>{oitems.orderName}</Typography></td>
                                    <td style={{ width: '60%' }}><Typography level="body-md">{oitems.unit}</Typography></td>
                                    <td><Typography level="body-md">{(oitems.price * oitems.unit).toFixed(2)}TL</Typography></td>
                                </tr >
                            ))}
                            {tableItems()}
                        </tbody>
                    </Table>
                </DialogContent>
            </Drawer>
            <Modal open={cancelModal} onClose={() => setCancelModal(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRounded />
                        Sipariş İptali
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Siparişi İptal etmek istediğine emin misin?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={() => setCancelModal(false)}>
                            İptal et
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setCancelModal(false)}>
                            Vazgeçtim
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </div >
    )
}

export default ManagerIndexPage2