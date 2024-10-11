import React from 'react'
import ManagerOrdersTable from '../../components/ManagerOrdersTable';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ManagerOrdersPage = () => {
    const [orders, setOrders] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const { selectedShop } = useSelector((state) => state.shop);
    const { token } = useSelector((state) => state.user);

    const getOrders = async () => {
        await axios.get(`/orders/getManagerOrders?shopId=${selectedShop.shopId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setLoading(false);
            setOrders(response.data);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    }


    React.useEffect(() => {
        getOrders();
    }, [selectedShop]);

    return (
        <>
            {orders != null ?
                <ManagerOrdersTable orders={orders} getOrders={getOrders} /> :
                <p>Sipariş bulunamadı</p>
            }
        </>
    )
}

export default ManagerOrdersPage