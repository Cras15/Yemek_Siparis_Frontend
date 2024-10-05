import React from 'react'

import axios from 'axios';
import ManagerProductTable from '../../../components/ManagerProductTable';
import ManagerProductList from '../../../components/ManagerProductList';
import { useSelector } from 'react-redux';

const ManagerProductsPage = () => {
  const [products, setProducts] = React.useState([]);
  const [status, setStatus] = React.useState('idle');
  const { selectedShop } = useSelector((state) => state.shop);

  const getProducts = async () => {
    const cancelToken = axios.CancelToken.source();
    if (selectedShop !== null) {
      setStatus('pending');
      await axios.get(`/shop/getProducts?shopId=${selectedShop?.shopId}`, { cancelToken: cancelToken.token }).then((res) => {
        console.log(res);
        setProducts(res.data);
        setStatus('success');
      }).catch((error) => {
        if (axios.isCancel(error)) return;
        setStatus('error');
      })
    }
  }

  React.useEffect(() => {
    getProducts();
  }, [selectedShop]);

  return (
    <>
      {status === 'pending' && <div>Loading...</div>}
      {status === 'success' && <>
        <ManagerProductTable products={products?.products} getProducts={getProducts} />
        <ManagerProductList listItems={products?.products} />
      </>
      }
    </>
  )
}

export default ManagerProductsPage