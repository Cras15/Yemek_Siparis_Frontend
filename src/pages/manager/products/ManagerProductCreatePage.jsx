// src/pages/manager/products/ManagerProductCreatePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ProductForm from '../../../components/ProductForm';
import { useUI } from '../../../utils/UIContext';

const ManagerProductCreatePage = () => {
  const { showErrorSnackbar, showDoneSnackbar } = useUI();
  const token = useSelector((state) => state.user.token);
  const { selectedShop } = useSelector((state) => state.shop);
  const navigate = useNavigate();

  const handleCreateProduct = async (productData) => {
    console.log(selectedShop);
    try {
      const res = await axios.post(`/manager/products/addProducts?shopId=${selectedShop.shopId}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showDoneSnackbar(res.data);
      navigate('/manager/urunler');
    } catch (error) {
      showErrorSnackbar(error.message);
      throw error; // Hata üst bileşen tarafından yakalanacak
    }
  };

  return (
    <ProductForm onSubmit={handleCreateProduct} isEdit={false} />
  );
};

export default ManagerProductCreatePage;
