import { AspectRatio, Card, CardContent, CircularProgress, Divider, Link, Stack, Typography } from '@mui/joy'
import React from 'react'
import OrderCard from '../components/OrderCard';
import axios from 'axios';
import { useSelector } from 'react-redux';

const OrdersPage = () => {
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const token = useSelector((state) => state.user.token);

    const getOrders = async () => {
        setLoading(true);
        await axios.get("/orders/getMyOrders", { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            setOrders(res.data);
            console.log(res.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }

    React.useEffect(() => {
        getOrders();
    }, []);
    return (
        <div className='mt-16 '>
            <Stack spacing={2} direction="column" sx={{ width: 600, m: 'auto' }}>
                <Typography level="h4" >Siparişlerim</Typography>
                <Divider />
                {loading ? <CircularProgress /> :
                    orders?.length != 0 ? orders?.map((data) => (
                        <OrderCard data={data} key={data.orderId} />
                    )) :
                        <Typography level="body-md" aria-describedby="card-description">Daha önce sipariş vermemişsin gibi görünüyor.</Typography>}
            </Stack>
        </div>
    )
}

export default OrdersPage;