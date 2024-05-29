import React from 'react'
import { useParams } from 'react-router-dom';

const ManagerProductViewPage = () => {
  const id = useParams().id;
  return (
    <div>ManagerProductsViewPage</div>
  )
}

export default ManagerProductViewPage