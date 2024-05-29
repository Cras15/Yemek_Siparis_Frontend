import React from 'react'

import axios from 'axios';
import ManagerProductTable from '../../../components/ManagerProductTable';
import ManagerProductList from '../../../components/ManagerProductList';

const ManagerProductsPage = () => {
  const [products, setProducts] = React.useState([]);
  const [status, setStatus] = React.useState('idle');

  const getProducts = async () => {
    const cancelToken = axios.CancelToken.source();

    setStatus('pending');
    await axios.get(`/shop/getProducts?shopId=1`, { cancelToken: cancelToken.token }).then((res) => {
      console.log(res);
      setProducts(res.data);
      setStatus('success');
    }).catch((error) => {
      if (axios.isCancel(error)) return;
      setStatus('error');
    })
  }

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {status === 'pending' && <div>Loading...</div>}
      {status === 'success' && <>
        <ManagerProductTable products={products?.products} />
        <ManagerProductList listItems={products?.products} />
      </>
      }
    </>
  )
}

export default ManagerProductsPage