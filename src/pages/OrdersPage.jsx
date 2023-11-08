import { AspectRatio, Card, CardContent, Link, Stack, Typography } from '@mui/joy'
import React from 'react'
import OrderCard from '../components/OrderCard';
import axios from 'axios';
import { useSelector } from 'react-redux';

const OrdersPage = () => {
    const [orders, setOrders] = React.useState([]);
    const token = useSelector((state) => state.user.token);

    const getOrders = async () => {
        await axios.get("/orders/getMyOrders", { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            setOrders(res.data);
            console.log(res.data)
        }).catch((error) => {
            console.log(error);
        });
    }

    React.useEffect(() => {
        getOrders();
    }, []);
    return (
        <div className='mt-16 '>
            <Stack spacing={2} direction="column" sx={{ width: 600, m: 'auto' }}>
                <Typography level="h4" >Siparişlerim</Typography>
                {orders?.map((data) => (
                    <OrderCard data={data} key={data.orderId}/>
                ))}
                
            </Stack>
        </div>
    )
}

export default OrdersPage;