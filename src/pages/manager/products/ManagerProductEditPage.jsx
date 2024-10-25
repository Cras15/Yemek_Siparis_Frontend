// src/pages/manager/products/ManagerProductEditPage.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUI } from '../../../utils/UIContext';
import { useSelector } from 'react-redux';
import ProductForm from '../../../components/ProductForm';

const ManagerProductEditPage = () => {
  const [product, setProduct] = useState(null);
  const id = useParams().id;
  const { showErrorSnackbar, showDoneSnackbar } = useUI();
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const res = await axios.get(`/manager/products/getProduct?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(res.data);
    } catch (error) {
      showErrorSnackbar(error.message);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditProduct = async (productData) => {
    try {
      const res = await axios.post(
        '/manager/products/updateProduct',
        productData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showDoneSnackbar(res.data);
      navigate('/manager/urunler');
    } catch (error) {
      showErrorSnackbar(error.message);
      throw error; 
    }
  };

  return (
    <>
      {product && (
        <ProductForm
          initialProduct={product}
          onSubmit={handleEditProduct}
          isEdit={true}
        />
      )}
    </>
  );
};

export default ManagerProductEditPage;
