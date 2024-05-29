import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';

const ManagerShopEditPage = () => {
    const { id } = useParams();
    const [shop, setShop] = React.useState({});
    const [status, setStatus] = React.useState('idle');

    const getShopsById = async (shopId) => {
        const cancelToken = axios.CancelToken.source();

        setStatus('pending');
        await axios.get(`/shop/getProducts?shopId=${shopId}`, { cancelToken: cancelToken.token }).then((res) => {
            console.log(res);
            setShop(res.data);
            setStatus('success');
        }).catch((error) => {
            if(axios.isCancel(error)) console.log("cancelled");
            setStatus('error');
        })
    }

    React.useEffect(() => {
        getShopsById(id);
    }, []);

    return (
        <div>ManagerShopEditPage</div>
    )
}

export default ManagerShopEditPage